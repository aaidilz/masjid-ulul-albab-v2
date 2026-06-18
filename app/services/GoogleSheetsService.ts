import type {
  AnnouncementData,
  GalleryData,
  ActivityData,
  FinanceData,
  FinanceSummary,
  FinanceFilter,
  PaginatedFinanceData,
  ContactData,
  ContactSubmissionResponse,
  AnnouncementDetailData,
  ArticleData,
  VolunteerData,
  MadingData,
  DkmMemberData,
  DkmSubmissionResponse,
  VolunteerRegistrationData,
  VolunteerSubmissionResponse,
} from "@/app/api/sheet/type";

// Constants
const DATE_PATTERNS = {
  DDMMYYYY: /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
  ISO: /^(\d{4})-(\d{1,2})-(\d{1,2})$/,
} as const;

const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  DATE_RANGE: { MIN_YEAR: 1900, MAX_YEAR: 2100 },
} as const;

const ERROR_MESSAGES = {
  REQUIRED_FIELD: "Field wajib harus diisi",
  INVALID_EMAIL: "Format email tidak valid",
  SUBMISSION_ERROR: "Terjadi kesalahan saat mengirim",
  CONNECTION_ERROR:
    "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
} as const;

/**
 * Logger utility for consistent logging across the service
 */
class Logger {
  private isDev: boolean;

  constructor() {
    this.isDev = process.env.NODE_ENV === "development";
  }

  log(message: string, data?: unknown): void {
    if (
      this.isDev &&
      (message.includes("error") || message.includes("failed"))
    ) {
      console.log(`[GoogleSheets] ${message}`, data || "");
    }
  }

  error(message: string, error?: unknown): void {
    if (this.isDev) {
      console.error(`[GoogleSheets] ${message}`, error || "");
    }
  }
}

/**
 * Handles all data parsing and transformation logic
 */
class DataParser {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  parseCurrency(value: string): number {
    if (!value || value.trim() === "" || value === "0") return 0;
    const cleanValue = value
      .replace(/Rp\s*/g, "")
      .replace(/\./g, "")
      .replace(/,/g, "")
      .trim();
    return parseInt(cleanValue) || 0;
  }

  formatCurrency(amount: number): string {
    if (amount === 0) return "Rp 0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  parseDate(dateStr: string): Date {
    if (!dateStr || dateStr.trim() === "") {
      return new Date();
    }

    try {
      const cleanDateStr = dateStr.trim();

      // Try DD/MM/YYYY format
      const ddmmyyyyMatch = cleanDateStr.match(DATE_PATTERNS.DDMMYYYY);
      if (ddmmyyyyMatch) {
        const [, day, month, year] = ddmmyyyyMatch;
        const parsedDay = parseInt(day);
        const parsedMonth = parseInt(month);
        const parsedYear = parseInt(year);

        if (this.isValidDate(parsedDay, parsedMonth, parsedYear)) {
          const date = new Date(parsedYear, parsedMonth - 1, parsedDay);
          if (this.isDateValid(date, parsedDay, parsedMonth - 1, parsedYear)) {
            this.logger.log(
              `Parsed date: ${cleanDateStr} → ${date.toISOString()}`,
            );
            return date;
          }
        }
      }

      // Try ISO format
      const isoMatch = cleanDateStr.match(DATE_PATTERNS.ISO);
      if (isoMatch) {
        const [, year, month, day] = isoMatch;
        const parsedDay = parseInt(day);
        const parsedMonth = parseInt(month);
        const parsedYear = parseInt(year);

        if (this.isValidDate(parsedDay, parsedMonth, parsedYear)) {
          const date = new Date(parsedYear, parsedMonth - 1, parsedDay);
          if (this.isDateValid(date, parsedDay, parsedMonth - 1, parsedYear)) {
            this.logger.log(
              `Parsed date (ISO): ${cleanDateStr} → ${date.toISOString()}`,
            );
            return date;
          }
        }
      }

      // Fallback to native Date parsing
      const fallbackDate = new Date(cleanDateStr);
      if (!isNaN(fallbackDate.getTime())) {
        this.logger.log(
          `Parsed date (fallback): ${cleanDateStr} → ${fallbackDate.toISOString()}`,
        );
        return fallbackDate;
      }

      this.logger.error(`Unable to parse date: ${cleanDateStr}`);
      return new Date();
    } catch (error) {
      this.logger.error("Error parsing date:", `${dateStr} - ${error}`);
      return new Date();
    }
  }

  private isValidDate(day: number, month: number, year: number): boolean {
    return (
      day >= 1 &&
      day <= 31 &&
      month >= 1 &&
      month <= 12 &&
      year >= VALIDATION_RULES.DATE_RANGE.MIN_YEAR &&
      year <= VALIDATION_RULES.DATE_RANGE.MAX_YEAR
    );
  }

  private isDateValid(
    date: Date,
    expectedDay: number,
    expectedMonth: number,
    expectedYear: number,
  ): boolean {
    return (
      date.getDate() === expectedDay &&
      date.getMonth() === expectedMonth &&
      date.getFullYear() === expectedYear
    );
  }

  formatDateToIndonesian(date: Date): string {
    try {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch (error) {
      this.logger.error("Error formatting date:", error);
      return "Invalid Date";
    }
  }

  // Parsing methods for different data types
  parseAnnouncement(row: string[]): AnnouncementData {
    return {
      id: row[0] || "",
      title: row[1] || "",
      content: row[2] || "",
      category: (row[3] as "urgent" | "info" | "event") || "info",
      startDate: row[4] || "",
      endDate: row[5] || "",
      isActive: String(row[6]).toLowerCase() === "true",
      buttonText: row[7] || "",
      buttonLink: row[8] || "",
    };
  }

  parseGallery(row: string[]): GalleryData {
    return {
      id: row[0] || "",
      title: row[1] || "",
      imageUrl: row[2] || "",
      description: row[3] || "",
      category: row[4] || "",
      date: row[5] || "",
      isActive: String(row[6]).toLowerCase() === "true",
    };
  }

  parseActivity(row: string[]): ActivityData {
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

  parseArticle(row: string[]): ArticleData {
    return {
      id: row[0] || "",
      title: row[1] || "",
      author: row[2] || "",
      date: row[3] || "",
      category: row[4] || "",
      content: row[5] || "",
      imageUrl: row[6] || "",
      isActive: row[7]?.toLowerCase() === "true",
    };
  }

  parseAnnouncementDetail(row: string[]): AnnouncementDetailData {
    return {
      id: row[0] || "",
      title: row[1] || "",
      description: row[2] || "",
      speaker: row[3] || "",
      staff: row[4] || "",
      datetime: row[5] || "",
      location: row[6] || "",
      participants: row[7] || "",
      isActive: row[8]?.toLowerCase() === "true",
    };
  }

  parseFinance(row: string[], index: number): FinanceData {
    const income = this.parseCurrency(row[2] || "0");
    const expense = this.parseCurrency(row[3] || "0");
    const originalDate = row[0] || "";
    const parsedDate = this.parseDate(originalDate);
    const formattedDate = this.formatDateToIndonesian(parsedDate);

    return {
      id: (index + 1).toString(),
      date: formattedDate,
      description: row[1] || "",
      income,
      expense,
      fund: (row[4] as "Ummat" | "Kas") || "Ummat",
      formattedIncome: this.formatCurrency(income),
      formattedExpense: this.formatCurrency(expense),
    };
  }
}

class ApiClient {
  private logger: Logger;
  private cache: Map<string, { data: unknown; timestamp: number }>;
  private pendingRequests: Map<string, Promise<unknown>>;
  private CACHE_DURATION = 10000; // 10 seconds client-side cache

  constructor(logger: Logger) {
    this.logger = logger;
    this.cache = new Map();
    this.pendingRequests = new Map();
  }

  async fetchFromApi<T>(type: string): Promise<T[]> {
    // 1. Deduplicate concurrent requests
    if (this.pendingRequests.has(type)) {
      this.logger.log(`Reusing pending request for type: ${type}`);
      return this.pendingRequests.get(type) as Promise<T[]>;
    }

    // 2. Check cache
    const cached = this.cache.get(type);
    const now = Date.now();
    if (cached && now - cached.timestamp < this.CACHE_DURATION) {
      this.logger.log(`Using cached data for type: ${type}`);
      return cached.data as T[];
    }

    const fetchPromise = (async () => {
      try {
        const res = await fetch(`/api/sheet?type=${type}`);
        if (!res.ok) {
          this.logger.error(`Failed to fetch ${type} from API`, await res.text());
          return [];
        }
        const data = await res.json();
        const values = (data.values as T[]) || [];

        // Save to cache
        this.cache.set(type, { data: values, timestamp: Date.now() });
        return values;
      } catch (error) {
        this.logger.error(`Error fetching ${type} from API`, error);
        return [];
      } finally {
        // Remove from pending list when done
        this.pendingRequests.delete(type);
      }
    })();

    this.pendingRequests.set(type, fetchPromise);
    return fetchPromise;
  }

  async submitForm<T = unknown>(
    type: string,
    data: Record<string, unknown>,
  ): Promise<{ success: boolean; message: string; data?: T }> {
    // Form submissions modify data, so clear the cache for safety
    this.cache.clear();

    const response = await fetch(`/api/sheet?type=${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to submit ${type}`);
    }

    return await response.json();
  }
}

/**
 * Handles finance-specific calculations and operations
 */
class FinanceCalculator {
  private dataParser: DataParser;
  private logger: Logger;

  constructor(dataParser: DataParser, logger: Logger) {
    this.dataParser = dataParser;
    this.logger = logger;
  }

  calculateSummary(financeData: FinanceData[]): FinanceSummary {
    const totalIncome = financeData.reduce((sum, item) => sum + item.income, 0);
    const totalExpense = financeData.reduce(
      (sum, item) => sum + item.expense,
      0,
    );
    const balance = totalIncome - totalExpense;

    const summary: FinanceSummary = {
      totalIncome,
      totalExpense,
      balance,
      formattedTotalIncome: this.dataParser.formatCurrency(totalIncome),
      formattedTotalExpense: this.dataParser.formatCurrency(totalExpense),
      formattedBalance: this.dataParser.formatCurrency(balance),
      transactionCount: financeData.length,
      lastUpdated: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };

    this.logger.log("Finance summary calculated:", summary);
    return summary;
  }

  filterByPeriod(
    data: FinanceData[],
    period: "week" | "month" | "year" | "all",
  ): FinanceData[] {
    if (period === "all") return data;

    const now = new Date();
    const startDate = new Date();

    switch (period) {
      case "week":
        startDate.setDate(now.getDate() - 7);
        break;
      case "month":
        startDate.setMonth(now.getMonth() - 1);
        startDate.setHours(0, 0, 0, 0);
        break;
      case "year":
        startDate.setFullYear(now.getFullYear() - 1);
        startDate.setHours(0, 0, 0, 0);
        break;
    }

    return data.filter((item) => {
      const itemDate = this.dataParser.parseDate(item.date);
      return itemDate >= startDate;
    });
  }

  sortData(
    data: FinanceData[],
    field: "date" | "description" | "income" | "expense",
    direction: "asc" | "desc",
  ): FinanceData[] {
    return [...data].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (field) {
        case "date":
          aValue = this.dataParser.parseDate(a.date).getTime();
          bValue = this.dataParser.parseDate(b.date).getTime();
          break;
        case "description":
          aValue = a.description.toLowerCase();
          bValue = b.description.toLowerCase();
          break;
        case "income":
          aValue = a.income;
          bValue = b.income;
          break;
        case "expense":
          aValue = a.expense;
          bValue = b.expense;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) {
        return direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }

  paginateData<T>(
    data: T[],
    page: number,
    itemsPerPage: number,
  ): PaginatedFinanceData {
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    return {
      data: paginatedData as FinanceData[],
      totalItems,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
  }
}

/**
 * Handles form validation and submission
 */
class FormValidator {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  validateContactForm(data: Omit<ContactData, "tanggal">): void {
    if (!data.nama || !data.email || !data.subjek || !data.pesan) {
      throw new Error(ERROR_MESSAGES.REQUIRED_FIELD);
    }
    if (!VALIDATION_RULES.EMAIL_REGEX.test(data.email)) {
      throw new Error(ERROR_MESSAGES.INVALID_EMAIL);
    }
  }

  validateDkmRegistration(data: Omit<DkmMemberData, "tanggal">): void {
    if (!data.nama || !data.nim || !data.email || !data.whatsapp) {
      throw new Error(ERROR_MESSAGES.REQUIRED_FIELD);
    }
    if (!VALIDATION_RULES.EMAIL_REGEX.test(data.email)) {
      throw new Error(ERROR_MESSAGES.INVALID_EMAIL);
    }
  }

  validateVolunteerRegistration(
    data: Omit<VolunteerRegistrationData, "tanggal">,
  ): void {
    if (!data.nama || !data.email || !data.whatsapp || !data.programDipilih) {
      throw new Error(ERROR_MESSAGES.REQUIRED_FIELD);
    }
    if (!VALIDATION_RULES.EMAIL_REGEX.test(data.email)) {
      throw new Error(ERROR_MESSAGES.INVALID_EMAIL);
    }
  }

  getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      if (
        error.message.includes(ERROR_MESSAGES.REQUIRED_FIELD) ||
        error.message.includes(ERROR_MESSAGES.INVALID_EMAIL)
      ) {
        return error.message;
      }
      if (error.name === "TypeError") {
        return ERROR_MESSAGES.CONNECTION_ERROR;
      }
    }
    return ERROR_MESSAGES.SUBMISSION_ERROR;
  }
}

class GoogleSheetsService {
  private static instance: GoogleSheetsService;
  private logger: Logger;
  private dataParser: DataParser;
  private apiClient: ApiClient;
  private financeCalculator: FinanceCalculator;
  private formValidator: FormValidator;

  private constructor() {
    this.logger = new Logger();
    this.dataParser = new DataParser(this.logger);
    this.apiClient = new ApiClient(this.logger);
    this.financeCalculator = new FinanceCalculator(
      this.dataParser,
      this.logger,
    );
    this.formValidator = new FormValidator(this.logger);
  }

  static getInstance(): GoogleSheetsService {
    if (!GoogleSheetsService.instance) {
      GoogleSheetsService.instance = new GoogleSheetsService();
    }
    return GoogleSheetsService.instance;
  }

  // Data fetching methods (keeping same public API)
  async getAnnouncements(): Promise<AnnouncementData[]> {
    const announcements =
      await this.apiClient.fetchFromApi<AnnouncementData>("announcement");
    return announcements.filter((announcement) => {
      if (!announcement.isActive) return false;
      if (!announcement.endDate) return true;
      try {
        const now = new Date();
        const endDate = new Date(announcement.endDate);
        endDate.setHours(23, 59, 59, 999);
        return now <= endDate;
      } catch {
        return true;
      }
    });
  }

  async getGalleryItems(): Promise<GalleryData[]> {
    const items = await this.apiClient.fetchFromApi<GalleryData>("gallery");
    return items.filter((item) => item.isActive);
  }

  async getActivities(): Promise<ActivityData[]> {
    const rows = await this.apiClient.fetchFromApi<ActivityData>("activity");
    return rows.filter((activity) => activity.isActive);
  }

  async getActivityById(id: string): Promise<ActivityData | null> {
    const activities = await this.getActivities();
    return activities.find((activity) => activity.id === id) || null;
  }

  async getArticles(): Promise<ArticleData[]> {
    const rows = await this.apiClient.fetchFromApi<ArticleData>("article");
    return rows.filter((article) => article.isActive);
  }

  async getArticleById(id: string): Promise<ArticleData | null> {
    const articles = await this.getArticles();
    return articles.find((article) => article.id === id) || null;
  }

  async getVolunteers(): Promise<VolunteerData[]> {
    const rows = await this.apiClient.fetchFromApi<VolunteerData>("volunteer");
    return rows.filter((volunteer) => volunteer.isActive);
  }

  async getMadingItems(): Promise<MadingData[]> {
    const rows = await this.apiClient.fetchFromApi<MadingData>("mading");
    return rows.filter((mading) => mading.isActive);
  }

  async getAnnouncementDetailById(
    id: string,
  ): Promise<AnnouncementDetailData | null> {
    const rows = await this.apiClient.fetchFromApi<AnnouncementDetailData>(
      "announcement-detail",
    );
    const announcement = rows.find((row) => row.id === id) || null;
    return announcement;
  }

  async getFinanceData(): Promise<FinanceData[]> {
    const items = await this.apiClient.fetchFromApi<FinanceData>("finance");
    return items
      .filter((finance) => finance.fund === "Ummat")
      .sort((a, b) => {
        const dateA = this.dataParser.parseDate(a.date);
        const dateB = this.dataParser.parseDate(b.date);
        return dateB.getTime() - dateA.getTime();
      });
  }

  async getFinanceSummary(): Promise<FinanceSummary> {
    const financeData = await this.getFinanceData();
    return this.financeCalculator.calculateSummary(financeData);
  }

  async getFinanceDataPaginated(
    filter: FinanceFilter,
  ): Promise<PaginatedFinanceData> {
    const allData = await this.getFinanceData();
    const filteredData = this.financeCalculator.filterByPeriod(
      allData,
      filter.period,
    );
    const sortedData = this.financeCalculator.sortData(
      filteredData,
      filter.sortField,
      filter.sortDirection,
    );
    const paginatedResult = this.financeCalculator.paginateData(
      sortedData,
      filter.page,
      filter.itemsPerPage,
    );

    this.logger.log(
      `Finance data: ${filteredData.length} items → sorted by ${filter.sortField} (${filter.sortDirection}) → page ${filter.page}/${paginatedResult.totalPages}`,
    );
    return paginatedResult;
  }

  async getFinanceSummaryByPeriod(
    period: "week" | "month" | "year" | "all",
  ): Promise<FinanceSummary> {
    const allData = await this.getFinanceData();
    const filteredData = this.financeCalculator.filterByPeriod(allData, period);
    const summary = this.financeCalculator.calculateSummary(filteredData);

    const periodLabels = {
      week: "Seminggu Terakhir",
      month: "Sebulan Terakhir",
      year: "Setahun Terakhir",
      all: "Semua Periode",
    };

    summary.lastUpdated = `${periodLabels[period]} - ${new Date().toLocaleDateString(
      "id-ID",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      },
    )}`;

    this.logger.log(`Finance summary calculated for ${period}:`, summary);
    return summary;
  }

  private getCurrentDateTimeString(): string {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    const formatter = new Intl.DateTimeFormat("id-ID", options);
    const parts = formatter.formatToParts(now);
    const day = parts.find((part) => part.type === "day")?.value;
    const month = parts.find((part) => part.type === "month")?.value;
    const year = parts.find((part) => part.type === "year")?.value;
    const hour = parts.find((part) => part.type === "hour")?.value;
    const minute = parts.find((part) => part.type === "minute")?.value;
    const second = parts.find((part) => part.type === "second")?.value;
    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  }

  async submitContactForm(
    contactData: Omit<ContactData, "tanggal">,
  ): Promise<ContactSubmissionResponse> {
    try {
      this.formValidator.validateContactForm(contactData);
      const result = await this.apiClient.submitForm<ContactData>(
        "contact",
        contactData,
      );
      return result;
    } catch (error) {
      const errorMessage = this.formValidator.getErrorMessage(error);
      return {
        success: false,
        message: errorMessage + " Atau hubungi kami langsung via WhatsApp.",
      };
    }
  }

  async submitDkmRegistration(
    memberData: Omit<DkmMemberData, "tanggal">,
  ): Promise<DkmSubmissionResponse> {
    try {
      this.formValidator.validateDkmRegistration(memberData);
      const result = await this.apiClient.submitForm<DkmMemberData>(
        "dkm-registration",
        memberData,
      );
      return result;
    } catch (error) {
      const errorMessage = this.formValidator.getErrorMessage(error);
      return {
        success: false,
        message: errorMessage + " Silakan coba lagi atau hubungi admin.",
      };
    }
  }

  async submitVolunteerRegistration(
    volunteerData: Omit<VolunteerRegistrationData, "tanggal">,
  ): Promise<VolunteerSubmissionResponse> {
    try {
      this.formValidator.validateVolunteerRegistration(volunteerData);
      const result = await this.apiClient.submitForm<VolunteerRegistrationData>(
        "volunteer-registration",
        volunteerData,
      );
      return result;
    } catch (error) {
      const errorMessage = this.formValidator.getErrorMessage(error);
      return {
        success: false,
        message: errorMessage + " Silakan coba lagi atau hubungi admin.",
      };
    }
  }
}

export const googleSheetsService = GoogleSheetsService.getInstance();

// Re-export types for convenience
export type {
  FinanceSummary,
  PaginatedFinanceData,
  FinanceFilter,
  FinanceData,
} from "@/app/api/sheet/type";
