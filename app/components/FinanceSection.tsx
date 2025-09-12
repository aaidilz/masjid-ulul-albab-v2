"use client";

import { useCallback, useMemo, memo } from "react";
import {
  Loader,
  ArrowUp,
  ArrowDown,
  Info,
  HandCoins,
  School,
  QrCode,
  Calendar,
} from "lucide-react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

import {
  FinanceSummary,
  PaginatedFinanceData,
  FinanceFilter,
  FinanceData,
} from "@/app/services/GoogleSheetsService";
import { ReactElement } from "react"; // Add this import

interface FinanceSectionProps {
  loadingFinance: boolean;
  financeSummary: FinanceSummary | null;
  paginatedFinanceData: PaginatedFinanceData | null;
  financeFilter: FinanceFilter;
  onPeriodChange: (period: "week" | "month" | "year" | "all") => void;
  onPageChange: (page: number) => void;
  onSort: (field: "date" | "description" | "income" | "expense") => void;
  onRefresh: () => void;
  getSortIcon: (
    field: "date" | "description" | "income" | "expense",
  ) => ReactElement; // Fix JSX.Element to ReactElement
}

function FinanceSection({
  loadingFinance,
  financeSummary,
  paginatedFinanceData,
  financeFilter,
  onPeriodChange,
  onPageChange,
  onSort,
  onRefresh,
}: FinanceSectionProps) {
  // Memoize computed values to prevent unnecessary recalculations
  const sortFieldDisplayText = useMemo(() => {
    switch (financeFilter.sortField) {
      case "date":
        return "Tanggal";
      case "description":
        return "Deskripsi";
      case "income":
        return "Pemasukan";
      case "expense":
        return "Pengeluaran";
      default:
        return "Tanggal";
    }
  }, [financeFilter.sortField]);

  const sortDirectionText = useMemo(() => {
    return financeFilter.sortDirection === "desc"
      ? "Terbesar → Terkecil"
      : "Terkecil → Terbesar";
  }, [financeFilter.sortDirection]);

  // Memoize pagination calculations
  const paginationInfo = useMemo(() => {
    if (!paginatedFinanceData) return null;

    const startItem =
      (paginatedFinanceData.currentPage - 1) * financeFilter.itemsPerPage + 1;
    const endItem = Math.min(
      paginatedFinanceData.currentPage * financeFilter.itemsPerPage,
      paginatedFinanceData.totalItems,
    );

    return {
      startItem,
      endItem,
      totalItems: paginatedFinanceData.totalItems,
      currentPage: paginatedFinanceData.currentPage,
      totalPages: paginatedFinanceData.totalPages,
      hasPrevPage: paginatedFinanceData.hasPrevPage,
      hasNextPage: paginatedFinanceData.hasNextPage,
    };
  }, [paginatedFinanceData, financeFilter.itemsPerPage]);

  // Memoize page numbers for pagination
  const pageNumbers = useMemo(() => {
    if (!paginatedFinanceData || paginatedFinanceData.totalPages <= 1)
      return [];

    const pages = [];
    const totalPages = paginatedFinanceData.totalPages;
    const currentPage = paginatedFinanceData.currentPage;

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
    } else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pages.push(i);
      }
    }

    return pages;
  }, [paginatedFinanceData]);

  // Memoize event handlers
  const handlePeriodChange = useCallback(
    (value: string) => {
      onPeriodChange(value as "week" | "month" | "year" | "all");
    },
    [onPeriodChange],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      onPageChange(page);
    },
    [onPageChange],
  );

  const handleSort = useCallback(
    (field: "date" | "description" | "income" | "expense") => {
      onSort(field);
    },
    [onSort],
  );

  const handleRefreshClick = useCallback(() => {
    onRefresh();
  }, [onRefresh]);

  // Memoize the summary cards section
  const summaryCardsSection = useMemo(() => {
    if (!financeSummary) return null;

    return (
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Total Pemasukan
            </CardTitle>
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            >
              <ArrowDown className="mr-1 text-xs" />
              Dana Ummat
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {financeSummary.formattedTotalIncome}
            </div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">
              {financeSummary.transactionCount} transaksi
            </p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Total Pengeluaran
            </CardTitle>
            <Badge
              variant="secondary"
              className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            >
              <ArrowUp className="mr-1 text-xs" />
              Dana Ummat
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {financeSummary.formattedTotalExpense}
            </div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">
              Update: {financeSummary.lastUpdated}
            </p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Saldo Dana Ummat
            </CardTitle>
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            >
              <Info className="mr-1 text-xs" />
              Real-time
            </Badge>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${financeSummary.balance >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
            >
              {financeSummary.formattedBalance}
            </div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">
              Per {financeSummary.lastUpdated}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }, [financeSummary]);

  // Memoize the donation methods section (static content)
  const donationMethodsSection = useMemo(
    () => (
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="text-green-600 dark:text-green-400 text-3xl mb-4">
              <HandCoins />
            </div>
            <CardTitle className="text-gray-900 dark:text-gray-100">
              Tunai
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground dark:text-gray-300 mb-3">
              Anda dapat menitipkan donasi di kotak infaq masjid atau langsung
              ke bendahara masjid.
            </p>
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              Setiap Jumat & Ahad pagi
            </p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="text-green-600 dark:text-green-400 text-3xl mb-4">
              <School />
            </div>
            <CardTitle className="text-gray-900 dark:text-gray-100">
              Transfer Bank
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground dark:text-gray-300 mb-1">
              SeaBank
            </p>
            <p className="font-mono font-bold mb-3 text-gray-900 dark:text-gray-100">
              9013 7458 0025
            </p>
            <p className="text-sm text-muted-foreground dark:text-gray-400 mb-1">
              a.n. Azhar Muttaqien
            </p>
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              (Bendahara Periode 2025/2026)
            </p>
            <p className="text-sm text-muted-foreground dark:text-gray-400 mt-2">
              Konfirmasi via WA: 0818-0352-8486
            </p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="text-green-600 dark:text-green-400 text-3xl mb-4">
              <QrCode />
            </div>
            <CardTitle className="text-gray-900 dark:text-gray-100">
              QRIS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground dark:text-gray-300 mb-3">
              Untuk donasi melalui QRIS, silakan hubungi admin untuk mendapatkan
              kode QRIS terbaru.
            </p>
            <div className="bg-muted dark:bg-gray-700 p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground dark:text-gray-400 mb-2">
                QRIS akan tersedia segera
              </p>
              <Button
                variant="outline"
                size="sm"
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                Hubungi Admin
              </Button>
            </div>
            <p className="text-xs text-muted-foreground dark:text-gray-500 mt-2">
              *QRIS harus disetup melalui aplikasi SeaBank resmi
            </p>
          </CardContent>
        </Card>
      </div>
    ),
    [],
  );

  return (
    <section
      id="finance"
      className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center section-title text-gray-900 dark:text-white">
          Laporan Keuangan
        </h2>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-green-700 dark:text-green-400">
            Transparansi Keuangan
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Masjid Ulul Albaab berkomitmen untuk transparan dalam pengelolaan
            keuangan. Berikut adalah laporan keuangan terbaru dari dana ummat:
          </p>

          {loadingFinance ? (
            <div className="text-center py-8">
              <Loader className="animate-spin text-3xl mb-4 text-gray-400 dark:text-gray-500" />
              <p className="text-gray-600 dark:text-gray-400">
                Memuat data keuangan...
              </p>
            </div>
          ) : financeSummary ? (
            <>
              {/* Summary Cards */}
              {summaryCardsSection}

              {/* Recent Transactions dengan Filter dan Pagination */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-100 dark:border-gray-700">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-4 md:mb-0">
                    Transaksi (Dana Ummat)
                  </h3>
                  <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
                    {/* Period Filter */}
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Periode:
                      </span>
                      <Select
                        value={financeFilter.period}
                        onValueChange={handlePeriodChange}
                      >
                        <SelectTrigger className="w-[180px] dark:bg-gray-700 dark:border-gray-600">
                          <SelectValue placeholder="Pilih periode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="week">
                            Seminggu Terakhir
                          </SelectItem>
                          <SelectItem value="month">
                            Sebulan Terakhir
                          </SelectItem>
                          <SelectItem value="year">Setahun Terakhir</SelectItem>
                          <SelectItem value="all">Semua Periode</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Refresh Button */}
                    <Button
                      onClick={handleRefreshClick}
                      disabled={loadingFinance}
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                      {loadingFinance ? (
                        <Loader className="animate-spin text-sm" />
                      ) : (
                        <Loader className="text-sm" />
                      )}
                      <span className="hidden sm:inline">Refresh</span>
                    </Button>
                  </div>
                </div>

                {paginatedFinanceData &&
                  paginatedFinanceData.data.length > 0 && (
                    <Card className="dark:bg-gray-800 dark:border-gray-700">
                      <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-sm text-gray-700 dark:text-gray-300">
                          <div className="mb-2 md:mb-0">
                            <Info className="mr-1 inline" />
                            Diurutkan berdasarkan:
                            <span className="font-semibold ml-1 text-gray-900 dark:text-gray-100">
                              {sortFieldDisplayText}
                            </span>
                            <span className="ml-1">({sortDirectionText})</span>
                          </div>

                          {/* Quick Sort Buttons */}
                          <div className="flex items-center space-x-2">
                            <Button
                              variant={
                                financeFilter.sortField === "date"
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() => handleSort("date")}
                              className="text-xs dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
                            >
                              Tanggal
                            </Button>
                            <Button
                              variant={
                                financeFilter.sortField === "income"
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() => handleSort("income")}
                              className="text-xs dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
                            >
                              Pemasukan
                            </Button>
                            <Button
                              variant={
                                financeFilter.sortField === "expense"
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() => handleSort("expense")}
                              className="text-xs dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
                            >
                              Pengeluaran
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                {/* Transactions Table */}
                <div className="rounded-md border border-gray-200 dark:border-gray-700">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-200 dark:border-gray-700">
                        <TableHead className="whitespace-nowrap text-gray-900 dark:text-gray-100">
                          <Button
                            variant="ghost"
                            onClick={() => handleSort("date")}
                            className="flex items-center hover:text-green-600 dark:hover:text-green-400 transition group h-auto p-0 font-medium text-gray-900 dark:text-gray-100"
                          >
                            <span>Tanggal</span>
                            <Calendar className="ml-1 text-xs" />
                          </Button>
                        </TableHead>
                        <TableHead className="text-gray-900 dark:text-gray-100">
                          <Button
                            variant="ghost"
                            onClick={() => handleSort("description")}
                            className="flex items-center hover:text-green-600 dark:hover:text-green-400 transition group h-auto p-0 font-medium text-gray-900 dark:text-gray-100"
                          >
                            <span>Deskripsi</span>
                            <Info className="ml-1 text-xs" />
                          </Button>
                        </TableHead>
                        <TableHead className="whitespace-nowrap text-gray-900 dark:text-gray-100">
                          <Button
                            variant="ghost"
                            onClick={() => handleSort("income")}
                            className="flex items-center hover:text-green-600 dark:hover:text-green-400 transition group h-auto p-0 font-medium text-gray-900 dark:text-gray-100"
                          >
                            <span>Pemasukan</span>
                            <ArrowDown className="ml-1 text-xs text-green-600" />
                          </Button>
                        </TableHead>
                        <TableHead className="whitespace-nowrap text-gray-900 dark:text-gray-100">
                          <Button
                            variant="ghost"
                            onClick={() => handleSort("expense")}
                            className="flex items-center hover:text-green-600 dark:hover:text-green-400 transition group h-auto p-0 font-medium text-gray-900 dark:text-gray-100"
                          >
                            <span>Pengeluaran</span>
                            <ArrowUp className="ml-1 text-xs text-red-600" />
                          </Button>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedFinanceData &&
                      paginatedFinanceData.data.length > 0 ? (
                        paginatedFinanceData.data.map(
                          (transaction: FinanceData) => (
                            <TableRow
                              key={transaction.id}
                              className="hover:bg-muted/50 dark:hover:bg-gray-700/50 border-gray-200 dark:border-gray-700"
                            >
                              <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                                <div className="flex flex-col">
                                  <span>{transaction.date}</span>
                                  <span className="text-xs text-muted-foreground dark:text-gray-400">
                                    {(() => {
                                      try {
                                        const date = new Date(
                                          transaction.date
                                            .split("/")
                                            .reverse()
                                            .join("-"),
                                        );
                                        return date.toLocaleDateString(
                                          "id-ID",
                                          { weekday: "short" },
                                        );
                                      } catch {
                                        return "";
                                      }
                                    })()}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="text-gray-900 dark:text-gray-100">
                                <div className="max-w-xs md:max-w-sm">
                                  <div
                                    className="truncate group-hover:overflow-visible group-hover:whitespace-normal group-hover:max-w-none"
                                    title={transaction.description}
                                  >
                                    {transaction.description}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                {transaction.income > 0 ? (
                                  <div className="flex items-center text-green-600 dark:text-green-400 font-semibold">
                                    <ArrowDown className="mr-1 text-xs" />
                                    {transaction.formattedIncome}
                                  </div>
                                ) : (
                                  <span className="text-muted-foreground dark:text-gray-500">
                                    -
                                  </span>
                                )}
                              </TableCell>
                              <TableCell>
                                {transaction.expense > 0 ? (
                                  <div className="flex items-center text-red-600 dark:text-red-400 font-semibold">
                                    <ArrowUp className="mr-1 text-xs" />
                                    {transaction.formattedExpense}
                                  </div>
                                ) : (
                                  <span className="text-muted-foreground dark:text-gray-500">
                                    -
                                  </span>
                                )}
                              </TableCell>
                            </TableRow>
                          ),
                        )
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={4}
                            className="text-center py-8 text-muted-foreground dark:text-gray-400"
                          >
                            {loadingFinance ? (
                              <div className="flex items-center justify-center">
                                <Loader className="animate-spin mr-2" />
                                Memuat data...
                              </div>
                            ) : (
                              "Tidak ada transaksi untuk periode ini"
                            )}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Data Info */}
                {paginatedFinanceData && (
                  <Card className="mb-4 dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-sm text-gray-700 dark:text-gray-300">
                        <span>
                          Menampilkan {paginatedFinanceData.data.length} dari{" "}
                          {paginationInfo?.totalItems} transaksi
                        </span>
                        <span>
                          Halaman {paginationInfo?.currentPage} dari{" "}
                          {paginationInfo?.totalPages}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Sorting Info */}

                {/* Pagination */}
                {paginatedFinanceData &&
                  paginatedFinanceData.totalPages > 1 && (
                    <div className="mt-6 flex flex-col md:flex-row items-center justify-between">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
                        {paginatedFinanceData.totalItems > 0 && (
                          <>
                            Menampilkan{" "}
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {paginationInfo?.startItem}
                            </span>{" "}
                            -{" "}
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {paginationInfo?.endItem}
                            </span>{" "}
                            dari{" "}
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {paginationInfo?.totalItems}
                            </span>{" "}
                            transaksi
                          </>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        {/* Previous Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handlePageChange(paginationInfo!.currentPage - 1)
                          }
                          disabled={
                            !paginationInfo?.hasPrevPage || loadingFinance
                          }
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
                        >
                          Sebelumnya
                        </Button>

                        {/* Page Numbers */}
                        <div className="flex">
                          {pageNumbers
                            .filter((pageNum) => {
                              if (paginationInfo!.currentPage === 1) {
                                // kalau di page 1, tampilkan 1 dan 2
                                return pageNum === 1 || pageNum === 2;
                              } else if (
                                paginationInfo!.currentPage ===
                                paginationInfo!.totalPages
                              ) {
                                // kalau di page terakhir, tampilkan current dan sebelumnya
                                return (
                                  pageNum === paginationInfo!.totalPages ||
                                  pageNum === paginationInfo!.totalPages - 1
                                );
                              } else {
                                // selain itu, tampilkan current dan next
                                return (
                                  pageNum === paginationInfo!.currentPage ||
                                  pageNum === paginationInfo!.currentPage + 1
                                );
                              }
                            })
                            .map((pageNum) => (
                              <Button
                                key={pageNum}
                                variant={
                                  pageNum === paginationInfo?.currentPage
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() => handlePageChange(pageNum)}
                                disabled={loadingFinance}
                                className={`w-10 ${
                                  pageNum === paginationInfo?.currentPage
                                    ? "dark:bg-green-600 dark:text-white"
                                    : "dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
                                }`}
                              >
                                {pageNum}
                              </Button>
                            ))}
                        </div>

                        {/* Next Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handlePageChange(paginationInfo!.currentPage + 1)
                          }
                          disabled={
                            !paginationInfo?.hasNextPage || loadingFinance
                          }
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
                        >
                          Selanjutnya
                        </Button>
                      </div>
                    </div>
                  )}

                {/* Quick Jump to Page */}
                {paginatedFinanceData &&
                  paginatedFinanceData.totalPages > 5 && (
                    <div className="mt-4 flex items-center justify-center space-x-2">
                      <span className="text-sm text-muted-foreground dark:text-gray-400">
                        Ke halaman:
                      </span>
                      <Input
                        type="number"
                        min="1"
                        max={paginationInfo?.totalPages}
                        value={paginationInfo?.currentPage}
                        onChange={(e) => {
                          const page = parseInt(e.target.value);
                          if (
                            page >= 1 &&
                            page <= (paginationInfo?.totalPages || 1)
                          ) {
                            handlePageChange(page);
                          }
                        }}
                        className="w-16 text-center dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                      />
                      <span className="text-sm text-muted-foreground dark:text-gray-400">
                        dari {paginationInfo?.totalPages}
                      </span>
                    </div>
                  )}
              </div>
            </>
          ) : (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-100 dark:border-gray-700 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Data keuangan tidak tersedia
              </p>
            </div>
          )}
        </div>

        <Separator className="my-8 dark:bg-gray-700" />

        {/* Cara Berdonasi Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-6 text-green-700 dark:text-green-400">
            Cara Berdonasi
          </h3>
          {donationMethodsSection}
        </div>

        <Separator className="my-8 dark:bg-gray-700" />

        {/* Arsip Laporan Keuangan */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold mb-4 text-green-700 dark:text-green-400">
            Arsip Laporan Keuangan
          </h3>

          <div className="rounded-md border border-gray-200 dark:border-gray-700">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200 dark:border-gray-700">
                  <TableHead className="whitespace-nowrap text-gray-900 dark:text-gray-100">
                    Periode
                  </TableHead>
                  <TableHead className="whitespace-nowrap text-gray-900 dark:text-gray-100">
                    Pemasukan
                  </TableHead>
                  <TableHead className="whitespace-nowrap text-gray-900 dark:text-gray-100">
                    Pengeluaran
                  </TableHead>
                  <TableHead className="whitespace-nowrap text-gray-900 dark:text-gray-100">
                    Dana Ummat
                  </TableHead>
                  <TableHead className="whitespace-nowrap text-gray-900 dark:text-gray-100">
                    Unduh
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-gray-200 dark:border-gray-700">
                  <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                    2024/2025
                  </TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100">
                    Rp 22.076.500
                  </TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100">
                    Rp 13.927.300
                  </TableCell>
                  <TableCell className="text-green-600 dark:text-green-400 font-medium">
                    Rp 8.139.300
                  </TableCell>
                  <TableCell>
                    <a
                      href="https://docs.google.com/spreadsheets/d/1JV85DIR7HSwfeDLDvkAe2SmT7E5BwwyMePFKORzFQqM/edit?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition"
                    >
                      <PictureAsPdfIcon className="mr-1" />
                      <span className="hidden sm:inline">Sheet</span>
                      <span className="sm:hidden">📊</span>
                    </a>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Mobile: Card alternative (optional) */}
          <div className="block md:hidden mt-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Info className="text-blue-600 dark:text-blue-400 mr-2" />
                <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                  Info Mobile
                </span>
              </div>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                Untuk pengalaman terbaik melihat laporan keuangan di mobile,
                <a
                  href="https://docs.google.com/spreadsheets/d/1JV85DIR7HSwfeDLDvkAe2SmT7E5BwwyMePFKORzFQqM/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-medium ml-1 text-blue-800 dark:text-blue-300"
                >
                  buka langsung di Google Sheets
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(FinanceSection);
