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
  VolunteerSubmissionResponse
} from "@/app/api/sheet/type";

class GoogleSheetsService {
  private static instance: GoogleSheetsService;
  private isDev = process.env.NODE_ENV === "development";

  static getInstance(): GoogleSheetsService {
    if (!GoogleSheetsService.instance) {
      GoogleSheetsService.instance = new GoogleSheetsService();
    }
    return GoogleSheetsService.instance;
  }

  private log(message: string, data?: unknown) {
    if (
      this.isDev &&
      (message.includes("error") || message.includes("failed"))
    ) {
      console.log(`[GoogleSheets] ${message}`, data || "");
    }
  }

  private error(message: string, error?: unknown) {
    if (this.isDev) {
      console.error(`[GoogleSheets] ${message}`, error || "");
    } else {
      // In production, just log to error tracking service if available
      // console.error(`Contact form error: ${message}`);
    }
  }

  private parseCurrency(value: string): number {
    if (!value || value.trim() === "" || value === "0") return 0;
    const cleanValue = value
      .replace(/Rp\s*/g, "")
      .replace(/\./g, "")
      .replace(/,/g, "")
      .trim();
    return parseInt(cleanValue) || 0;
  }

  private formatCurrency(amount: number): string {
    if (amount === 0) return "Rp 0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  private parseDate(dateStr: string): Date {
    if (!dateStr || dateStr.trim() === "") {
      return new Date();
    }
    try {
      const cleanDateStr = dateStr.trim();
      const ddmmyyyyPattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
      const ddmmyyyyMatch = cleanDateStr.match(ddmmyyyyPattern);
      if (ddmmyyyyMatch) {
        const day = parseInt(ddmmyyyyMatch[1]);
        const month = parseInt(ddmmyyyyMatch[2]);
        const year = parseInt(ddmmyyyyMatch[3]);
        if (
          day >= 1 &&
          day <= 31 &&
          month >= 1 &&
          month <= 12 &&
          year >= 1900 &&
          year <= 2100
        ) {
          const date = new Date(year, month - 1, day);
          if (
            date.getDate() === day &&
            date.getMonth() === month - 1 &&
            date.getFullYear() === year
          ) {
            this.log(`Parsed date: ${cleanDateStr} → ${date.toISOString()}`);
            return date;
          }
        }
      }
      const mmddyyyyPattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
      const mmddyyyyMatch = cleanDateStr.match(mmddyyyyPattern);
      if (mmddyyyyMatch) {
        const month = parseInt(mmddyyyyMatch[1]);
        const day = parseInt(mmddyyyyMatch[2]);
        const year = parseInt(mmddyyyyMatch[3]);
        if (
          day > 12 &&
          month >= 1 &&
          month <= 12 &&
          year >= 1900 &&
          year <= 2100
        ) {
          const date = new Date(year, month - 1, day);
          if (
            date.getDate() === day &&
            date.getMonth() === month - 1 &&
            date.getFullYear() === year
          ) {
            this.log(
              `Parsed date (MM/DD): ${cleanDateStr} → ${date.toISOString()}`
            );
            return date;
          }
        }
      }
      const isoPattern = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
      const isoMatch = cleanDateStr.match(isoPattern);
      if (isoMatch) {
        const year = parseInt(isoMatch[1]);
        const month = parseInt(isoMatch[2]);
        const day = parseInt(isoMatch[3]);
        if (
          day >= 1 &&
          day <= 31 &&
          month >= 1 &&
          month <= 12 &&
          year >= 1900 &&
          year <= 2100
        ) {
          const date = new Date(year, month - 1, day);
          if (
            date.getDate() === day &&
            date.getMonth() === month - 1 &&
            date.getFullYear() === year
          ) {
            this.log(
              `Parsed date (ISO): ${cleanDateStr} → ${date.toISOString()}`
            );
            return date;
          }
        }
      }
      const fallbackDate = new Date(cleanDateStr);
      if (!isNaN(fallbackDate.getTime())) {
        this.log(
          `Parsed date (fallback): ${cleanDateStr} → ${fallbackDate.toISOString()}`
        );
        return fallbackDate;
      }
      this.error(`Unable to parse date: ${cleanDateStr}`);
      return new Date();
    } catch (error) {
      this.error("Error parsing date:", `${dateStr} - ${error}`);
      return new Date();
    }
  }

  private formatDateToIndonesian(date: Date): string {
    try {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch (error) {
      this.error("Error formatting date:", error);
      return "Invalid Date";
    }
  }

  private async fetchFromApi<T>(type: string): Promise<T[]> {
    try {
      const res = await fetch(`/api/sheet?type=${type}`);
      if (!res.ok) {
        this.error(`Failed to fetch ${type} from API`, await res.text());
        return [];
      }
      const data = await res.json();
      return (data.values as T[]) || [];
    } catch (error) {
      this.error(`Error fetching ${type} from API`, error);
      return [];
    }
  }

  async getAnnouncements(): Promise<AnnouncementData[]> {
    const announcements = await this.fetchFromApi<AnnouncementData>("announcement");
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
    const items = await this.fetchFromApi<GalleryData>("gallery");
    return items.filter((item) => item.isActive);
  }

  async getActivities(): Promise<ActivityData[]> {
    const rows = await this.fetchFromApi<ActivityData>("activity");
    return rows.filter((activity) => activity.isActive);
  }

  async getActivityById(id: string): Promise<ActivityData | null> {
    const activities = await this.getActivities();
    return activities.find((activity) => activity.id === id) || null;
  }

  async getArticles(): Promise<ArticleData[]> {
    const rows = await this.fetchFromApi<ArticleData>("article");
    return rows.filter((article) => article.isActive);
  }

  async getArticleById(id: string): Promise<ArticleData | null> {
    const articles = await this.getArticles();
    return articles.find((article) => article.id === id) || null;
  }

  async getVolunteers(): Promise<VolunteerData[]> {
    const rows = await this.fetchFromApi<VolunteerData>("volunteer");
    return rows.filter((volunteer) => volunteer.isActive);
  }

  async getMadingItems(): Promise<MadingData[]> {
    const rows = await this.fetchFromApi<MadingData>("mading");
    return rows.filter((mading) => mading.isActive);
  }

  async getAnnouncementDetailById(
    id: string
  ): Promise<AnnouncementDetailData | null> {
    const rows = await this.fetchFromApi<AnnouncementDetailData>("announcement-detail");
    const announcement = rows.find((row) => row.id === id) || null;
    return announcement;
  }

  async getFinanceData(): Promise<FinanceData[]> {
    const items = await this.fetchFromApi<FinanceData>("finance");
    return items
      .filter((finance) => finance.fund === "Ummat")
      .sort((a, b) => {
        const dateA = this.parseDate(a.date);
        const dateB = this.parseDate(b.date);
        return dateB.getTime() - dateA.getTime();
      });
  }

  private parseRowToAnnouncement(row: string[]): AnnouncementData {
    return {
      id: row[0] || "",
      title: row[1] || "",
      content: row[2] || "",
      category: (row[3] as "urgent" | "info" | "event") || "info",
      startDate: row[4] || "",
      endDate: row[5] || "",
      // isActive: row[6]?.toLowerCase() === "true",
      isActive: String(row[6]).toLowerCase() === "true",
      buttonText: row[7] || "",
      buttonLink: row[8] || "",
    };
  }

  private parseRowToGallery(row: string[]): GalleryData {
    return {
      id: row[0] || "",
      title: row[1] || "",
      imageUrl: row[2] || "",
      description: row[3] || "",
      category: row[4] || "",
      date: row[5] || "",
      // isActive: row[6]?.toLowerCase() === "true",
      isActive: String(row[6]).toLowerCase() === "true",
    };
  }

  private parseRowToActivity(row: string[]): ActivityData {
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

  private parseRowToArticle(row: string[]): ArticleData {
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

  private parseRowToAnnouncementDetail(row: string[]): AnnouncementDetailData {
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

  private parseRowToFinance(row: string[], index: number): FinanceData {
    const income = this.parseCurrency(row[2] || "0");
    const expense = this.parseCurrency(row[3] || "0");
    const originalDate = row[0] || "";
    const parsedDate = this.parseDate(originalDate);
    const formattedDate = this.formatDateToIndonesian(parsedDate);
    return {
      id: (index + 1).toString(),
      date: formattedDate,
      description: row[1] || "",
      income: income,
      expense: expense,
      fund: (row[4] as "Ummat" | "Kas") || "Ummat",
      formattedIncome: this.formatCurrency(income),
      formattedExpense: this.formatCurrency(expense),
    };
  }

  async getFinanceSummary(): Promise<FinanceSummary> {
    const financeData = await this.getFinanceData();
    const totalIncome = financeData.reduce((sum, item) => sum + item.income, 0);
    const totalExpense = financeData.reduce(
      (sum, item) => sum + item.expense,
      0
    );
    const balance = totalIncome - totalExpense;
    const summary: FinanceSummary = {
      totalIncome,
      totalExpense,
      balance,
      formattedTotalIncome: this.formatCurrency(totalIncome),
      formattedTotalExpense: this.formatCurrency(totalExpense),
      formattedBalance: this.formatCurrency(balance),
      transactionCount: financeData.length,
      lastUpdated: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };
    this.log("Finance summary calculated:", summary);
    return summary;
  }

  private filterByPeriod(
    data: FinanceData[],
    period: "week" | "month" | "year" | "all"
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
      const itemDate = this.parseDate(item.date);
      return itemDate >= startDate;
    });
  }

  private paginateData<T>(
    data: T[],
    page: number,
    itemsPerPage: number
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

  private sortData(
    data: FinanceData[],
    field: "date" | "description" | "income" | "expense",
    direction: "asc" | "desc"
  ): FinanceData[] {
    return [...data].sort((a, b) => {
  let aValue: string | number;
  let bValue: string | number;
      switch (field) {
        case "date":
          aValue = this.parseDate(a.date).getTime();
          bValue = this.parseDate(b.date).getTime();
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

  async getFinanceDataPaginated(
    filter: FinanceFilter
  ): Promise<PaginatedFinanceData> {
    const allData = await this.getFinanceData();
    const filteredData = this.filterByPeriod(allData, filter.period);
    const sortedData = this.sortData(
      filteredData,
      filter.sortField,
      filter.sortDirection
    );
    const paginatedResult = this.paginateData(
      sortedData,
      filter.page,
      filter.itemsPerPage
    );
    this.log(
      `Finance data: ${filteredData.length} items → sorted by ${filter.sortField} (${filter.sortDirection}) → page ${filter.page}/${paginatedResult.totalPages}`
    );
    return paginatedResult;
  }

  async getFinanceSummaryByPeriod(
    period: "week" | "month" | "year" | "all"
  ): Promise<FinanceSummary> {
    const allData = await this.getFinanceData();
    const filteredData = this.filterByPeriod(allData, period);
    const totalIncome = filteredData.reduce(
      (sum, item) => sum + item.income,
      0
    );
    const totalExpense = filteredData.reduce(
      (sum, item) => sum + item.expense,
      0
    );
    const balance = totalIncome - totalExpense;
    const periodLabels = {
      week: "Seminggu Terakhir",
      month: "Sebulan Terakhir",
      year: "Setahun Terakhir",
      all: "Semua Periode",
    };
    const summary: FinanceSummary = {
      totalIncome,
      totalExpense,
      balance,
      formattedTotalIncome: this.formatCurrency(totalIncome),
      formattedTotalExpense: this.formatCurrency(totalExpense),
      formattedBalance: this.formatCurrency(balance),
      transactionCount: filteredData.length,
      lastUpdated: `${periodLabels[period]} - ${new Date().toLocaleDateString(
        "id-ID",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      )}`,
    };
    this.log(`Finance summary calculated for ${period}:`, summary);
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
    contactData: Omit<ContactData, "tanggal">
  ): Promise<ContactSubmissionResponse> {
    try {
      if (
        !contactData.nama ||
        !contactData.email ||
        !contactData.subjek ||
        !contactData.pesan
      ) {
        throw new Error("Semua field harus diisi");
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactData.email)) {
        throw new Error("Format email tidak valid");
      }
      const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;
      if (!APPS_SCRIPT_URL) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return {
          success: true,
          message: "Pesan Anda telah diterima! (Mode demo)",
          data: { ...contactData, tanggal: this.getCurrentDateTimeString() },
        };
      }
      const response = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
        mode: "no-cors",
      });
      if (response.type === "opaque") {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        return {
          success: true,
          message:
            "Pesan Anda telah terkirim! Tim kami akan segera menghubungi Anda.",
          data: { ...contactData, tanggal: this.getCurrentDateTimeString() },
        };
      }
      throw new Error("Gagal mengirim pesan. Silakan coba lagi.");
    } catch (error) {
      let errorMessage = "Terjadi kesalahan saat mengirim pesan.";
      if (error instanceof Error) {
        if (
          error.message.includes("field harus diisi") ||
          error.message.includes("email tidak valid")
        ) {
          errorMessage = error.message;
        } else if (error.name === "TypeError") {
          errorMessage =
            "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.";
        }
      }
      return {
        success: false,
        message: errorMessage + " Atau hubungi kami langsung via WhatsApp.",
      };
    }
  }

  async submitDkmRegistration(
    memberData: Omit<DkmMemberData, "tanggal">
  ): Promise<DkmSubmissionResponse> {
    try {
      if (
        !memberData.nama ||
        !memberData.nim ||
        !memberData.email ||
        !memberData.whatsapp
      ) {
        throw new Error("Field wajib harus diisi");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(memberData.email)) {
        throw new Error("Format email tidak valid");
      }

      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 1500));

      return {
        success: true,
        message: "Pendaftaran DKM berhasil dikirim! Tim akan menghubungi Anda segera.",
        data: { ...memberData, tanggal: this.getCurrentDateTimeString() },
      };
    } catch (error) {
      let errorMessage = "Terjadi kesalahan saat mengirim pendaftaran.";
      if (error instanceof Error) {
        if (
          error.message.includes("wajib harus diisi") ||
          error.message.includes("email tidak valid")
        ) {
          errorMessage = error.message;
        }
      }
      return {
        success: false,
        message: errorMessage + " Silakan coba lagi atau hubungi admin.",
      };
    }
  }

  async submitVolunteerRegistration(
    volunteerData: Omit<VolunteerRegistrationData, "tanggal">
  ): Promise<VolunteerSubmissionResponse> {
    try {
      if (
        !volunteerData.nama ||
        !volunteerData.email ||
        !volunteerData.whatsapp ||
        !volunteerData.programDipilih
      ) {
        throw new Error("Field wajib harus diisi");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(volunteerData.email)) {
        throw new Error("Format email tidak valid");
      }

      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 1500));

      return {
        success: true,
        message: "Pendaftaran volunteer berhasil dikirim! Tim akan menghubungi Anda segera.",
        data: { ...volunteerData, tanggal: this.getCurrentDateTimeString() },
      };
    } catch (error) {
      let errorMessage = "Terjadi kesalahan saat mengirim pendaftaran.";
      if (error instanceof Error) {
        if (
          error.message.includes("wajib harus diisi") ||
          error.message.includes("email tidak valid")
        ) {
          errorMessage = error.message;
        }
      }
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
