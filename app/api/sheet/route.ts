import {
  ActivityData,
  AnnouncementData,
  FinanceData,
  GalleryData,
  ArticleData,
  VolunteerData,
  MadingData,
} from "@/app/api/sheet/type";
import { NextRequest, NextResponse } from "next/server";
import { parseCurrency, formatCurrency, parseDate } from "@/app/utils/currency";

// Constants
const BASE_URL = "https://sheets.googleapis.com/v4/spreadsheets";
const DEFAULT_RANGE = "A:Z";
const FINANCE_RANGE = "A:E";

// Sheet configuration mapping
const SHEET_CONFIGS = {
  announcement: { name: "Pengumuman", range: DEFAULT_RANGE },
  gallery: { name: "Galeri", range: DEFAULT_RANGE },
  activity: { name: "Kegiatan", range: DEFAULT_RANGE },
  article: { name: "Artikel", range: DEFAULT_RANGE },
  volunteer: { name: "Volunteer", range: DEFAULT_RANGE },
  mading: { name: "Mading", range: DEFAULT_RANGE },
  "announcement-detail": { name: "Pengumuman", range: DEFAULT_RANGE },
  finance: { name: "Dashboard", range: FINANCE_RANGE },
} as const;

// Environment variables validation
const API_KEY = process.env.GOOGLE_SHEETS_API_KEY;
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const FINANCE_SPREADSHEET_ID = process.env.GOOGLE_SHEETS_FINANCE_SPREADSHEET_ID;
const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;

// Error messages constants
const ERROR_MESSAGES = {
  MISSING_TYPE: "Missing type parameter",
  INVALID_TYPE: "Invalid submission type",
  MISSING_ENV_VARS: "Missing required environment variables: API_KEY or SPREADSHEET_ID",
  SHEET_FETCH_FAILED: "Failed to fetch sheet data",
  INTERNAL_ERROR: "Internal server error occurred while processing request",
  SUBMISSION_FAILED: "Failed to process submission",
} as const;

// Type definitions for better type safety
type SheetType = keyof typeof SHEET_CONFIGS;

// Utility functions
function formatDateToIndonesian(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Validates required environment variables
 * @returns Object containing validation result and error message if any
 */
function validateEnvironment(): { isValid: boolean; error?: string } {
  if (!API_KEY || !SPREADSHEET_ID) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.MISSING_ENV_VARS
    };
  }
  return { isValid: true };
}

/**
 * Generates Google Sheets API URL for the specified type
 * @param type - The type of sheet to fetch
 * @returns Complete API URL string
 * @throws Error if type is unknown or spreadsheet ID is missing
 */
function getSheetUrl(type: string): string {
  const config = SHEET_CONFIGS[type as SheetType];
  if (!config) {
    throw new Error(`Unknown sheet type: ${type}`);
  }

  const spreadsheetId = type === "finance" ? FINANCE_SPREADSHEET_ID : SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error(`Missing spreadsheet ID for type: ${type}`);
  }

  return `${BASE_URL}/${spreadsheetId}/values/${encodeURIComponent(
    config.name
  )}!${config.range}?key=${API_KEY}`;
}

// Data Processor Class
class SheetDataProcessor {
  static parseAnnouncement(row: string[]): AnnouncementData {
    return {
      id: row[0] || "",
      title: row[1] || "",
      content: row[8] || "",
      category: (row[9] as "urgent" | "info" | "event") || "info",
      startDate: row[5] || "",
      endDate: row[10] || "",
      isActive: row[11]?.toLowerCase() === "true",
    };
  }

  static parseGallery(row: string[]): GalleryData {
    return {
      id: row[0] || "",
      title: row[1] || "",
      imageUrl: row[2] || "",
      description: row[3] || "",
      category: row[4] || "",
      date: row[5] || "",
      isActive: row[6]?.toLowerCase() === "true",
    };
  }

  static parseActivity(row: string[]): ActivityData {
    return {
      id: row[0] || "",
      title: row[1] || "",
      description: row[2] || "",
      category: (row[3] as "rutin" | "khusus" | "jadwal") || "rutin",
      imageUrl: row[4] || "",
      schedule: row[5] || "",
      location: row[6] || "",
      participants: row[7] || "",
      instructor: row[8] || "",
      isActive: row[9]?.toLowerCase() === "true",
    };
  }

  static parseArticle(row: string[]): ArticleData {
    const originalDate = row[3] || "";
    const parsedDate = parseDate(originalDate);
    const formattedDate = formatDateToIndonesian(parsedDate);

    return {
      id: row[0] || "",
      title: row[1] || "",
      author: row[2] || "",
      date: formattedDate,
      category: row[4] || "",
      content: row[5] || "",
      imageUrl: row[6] || "",
      isActive: row[7]?.toLowerCase() === "true",
    };
  }

  static parseVolunteer(row: string[]): VolunteerData {
    return {
      id: row[0] || "",
      title: row[1] || "",
      description: row[2] || "",
      category: row[3] || "",
      requirements: row[4] || "",
      commitment: row[5] || "",
      spots: parseInt(row[6]) || 0,
      time: row[7] || "",
      location: row[8] || "",
      isActive: row[9]?.toLowerCase() === "true",
    };
  }

  static parseMading(row: string[]): MadingData {
    return {
      id: row[0] || "",
      title: row[1] || "",
      content: row[2] || "",
      author: row[3] || "",
      date: row[4] || "",
      category: row[5] || "",
      imageUrl: row[6] || "",
      isActive: row[7]?.toLowerCase() === "true",
    };
  }

  static parseAnnouncementDetail(row: string[]) {
    return {
      id: row[0] || "",
      title: row[1] || "",
      description: row[2] || "",
      speaker: row[3] || "",
      staff: row[4] || "",
      datetime: row[5] || "",
      location: row[6] || "",
      participants: row[7] || "",
      isActive: row[11]?.toLowerCase() === "true",
    };
  }

  static parseFinance(row: string[], index: number): FinanceData {
    const income = parseCurrency(row[2] || "0");
    const expense = parseCurrency(row[3] || "0");
    const originalDate = row[0] || "";
    const parsedDate = parseDate(originalDate);
    const formattedDate = formatDateToIndonesian(parsedDate);

    return {
      id: (index + 1).toString(),
      date: formattedDate,
      description: row[1] || "",
      income,
      expense,
      fund: (row[4] as "Ummat" | "Kas") || "Ummat",
      formattedIncome: formatCurrency(income),
      formattedExpense: formatCurrency(expense),
    };
  }

  static filterActiveItems<T extends { isActive: boolean }>(items: T[]): T[] {
    return items.filter(item => item.isActive);
  }

  static filterActiveAnnouncements(announcements: AnnouncementData[]): AnnouncementData[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return announcements.filter(announcement =>
      announcement.isActive &&
      (!announcement.endDate || parseDate(announcement.endDate).getTime() >= today.getTime())
    );
  }

  static filterUmmatFinance(financeData: FinanceData[]): FinanceData[] {
    return financeData.filter(item => item.fund === "Ummat");
  }
}

// --- Main API handler ---
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  if (!type) {
    return NextResponse.json({ error: ERROR_MESSAGES.MISSING_TYPE }, { status: 400 });
  }

  const envValidation = validateEnvironment();
  if (!envValidation.isValid) {
    return NextResponse.json({ error: envValidation.error }, { status: 500 });
  }

  try {
    const url = getSheetUrl(type);
    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json(
        { error: `${ERROR_MESSAGES.SHEET_FETCH_FAILED}: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const rows = Array.isArray(data.values) ? data.values.slice(1) : [];

    const result = processSheetData(type, rows);
    return NextResponse.json(result);

  } catch (error) {
    console.error("Error fetching sheet data:", error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.INTERNAL_ERROR },
      { status: 500 }
    );
  }
}

// Data processing function
function processSheetData(type: string, rows: string[][]) {
  switch (type) {
    case "announcement":
      const announcements = rows.map(SheetDataProcessor.parseAnnouncement);
      const filteredAnnouncements = SheetDataProcessor.filterActiveAnnouncements(announcements);
      return { values: filteredAnnouncements };

    case "gallery":
      const galleries = rows.map(SheetDataProcessor.parseGallery);
      const filteredGalleries = SheetDataProcessor.filterActiveItems(galleries);
      return { values: filteredGalleries };

    case "activity":
      const activities = rows.map(SheetDataProcessor.parseActivity);
      const filteredActivities = SheetDataProcessor.filterActiveItems(activities);
      return { values: filteredActivities };

    case "article":
      const articles = rows.map(SheetDataProcessor.parseArticle);
      const filteredArticles = SheetDataProcessor.filterActiveItems(articles);
      return { values: filteredArticles };

    case "volunteer":
      const volunteers = rows.map(SheetDataProcessor.parseVolunteer);
      const filteredVolunteers = SheetDataProcessor.filterActiveItems(volunteers);
      return { values: filteredVolunteers };

    case "mading":
      const madings = rows.map(SheetDataProcessor.parseMading);
      const filteredMadings = SheetDataProcessor.filterActiveItems(madings);
      return { values: filteredMadings };

    case "announcement-detail":
      const announcementDetails = rows.map(SheetDataProcessor.parseAnnouncementDetail);
      return { values: announcementDetails };

    case "finance":
      const finances = rows.map((row, idx) => SheetDataProcessor.parseFinance(row, idx));
      const filteredFinances = SheetDataProcessor.filterUmmatFinance(finances);
      return { values: filteredFinances };

    default:
      return { values: rows };
  }
}

// Form Submission Handler Class
class FormSubmissionHandler {
  private static generateTimestamp(): string {
    return new Date().toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  static async handleSubmission(type: string, body: Record<string, unknown>) {
    const timestamp = this.generateTimestamp();
    const dataWithTimestamp = { ...body, tanggal: timestamp };

    switch (type) {
      case "dkm-registration":
        return await this.submitToGoogleSheets("dkm", dataWithTimestamp);
      case "volunteer-registration":
        return await this.submitToGoogleSheets("volunteer", dataWithTimestamp);
      case "contact":
        return await this.submitToGoogleSheets("contact", dataWithTimestamp);
      default:
        throw new Error(ERROR_MESSAGES.INVALID_TYPE);
    }
  }

  private static async submitToGoogleSheets<T>(
    sheetType: string,
    data: T
  ): Promise<{ success: boolean; message: string; data: T }> {
    if (!APPS_SCRIPT_URL) {
      // Demo mode fallback
      console.log(`[DEMO] ${sheetType} submission:`, data);
      return {
        success: true,
        message: `Pendaftaran ${sheetType} berhasil dikirim! (Mode demo - data tidak tersimpan)`,
        data,
      };
    }

    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: sheetType,
          data: data,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error(`Error submitting to Google Sheets (${sheetType}):`, error);
      throw error;
    }
  }
}

// POST handler for form submissions
export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    if (!type) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.MISSING_TYPE },
        { status: 400 }
      );
    }

    const body = await req.json();
    const response = await FormSubmissionHandler.handleSubmission(type, body);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error processing form submission:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: `${ERROR_MESSAGES.SUBMISSION_FAILED}: ${errorMessage}` },
      { status: 500 }
    );
  }
}
