export interface AnnouncementData {
  id: string;
  title: string;
  content: string;
  category: "urgent" | "info" | "event";
  startDate: string;
  endDate: string;
  isActive: boolean;
  buttonText?: string;
  buttonLink?: string;
}

export interface GalleryData {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  category: string;
  date: string;
  isActive: boolean;
}

export interface ActivityData {
  id: string;
  title: string;
  description: string;
  category: "rutin" | "khusus" | "jadwal";
  imageUrl: string;
  schedule: string;
  location: string;
  participants: string;
  instructor: string;
  isActive: boolean;
}

export interface FinanceData {
  id: string;
  date: string;
  description: string;
  income: number;
  expense: number;
  fund: "Ummat" | "Kas";
  formattedIncome: string;
  formattedExpense: string;
}

export interface FinanceSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  formattedTotalIncome: string;
  formattedTotalExpense: string;
  formattedBalance: string;
  transactionCount: number;
  lastUpdated: string;
}

export interface FinanceFilter {
  period: "week" | "month" | "year" | "all";
  page: number;
  itemsPerPage: number;
  sortField: "date" | "description" | "income" | "expense";
  sortDirection: "asc" | "desc";
}

export interface PaginatedFinanceData {
  data: FinanceData[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ContactData {
  nama: string;
  email: string;
  subjek: string;
  pesan: string;
  tanggal: string; // Auto-generated
}

export interface ContactSubmissionResponse {
  success: boolean;
  message: string;
  data?: ContactData;
}

export interface AnnouncementDetailData {
  id: string;
  title: string;
  description: string;
  speaker: string;
  staff: string;
  datetime: string;
  location: string;
  participants: string;
  isActive: boolean;
}

export interface ArticleData {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  content: string;
  imageUrl: string;
  isActive: boolean;
}