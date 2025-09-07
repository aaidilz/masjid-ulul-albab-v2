"use client";

import AutorenewIcon from '@mui/icons-material/Autorenew';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import InfoIcon from '@mui/icons-material/Info';
import MoneyIcon from '@mui/icons-material/Money';
import SchoolIcon from '@mui/icons-material/School';
import QrCodeIcon from '@mui/icons-material/QrCode';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
    field: "date" | "description" | "income" | "expense"
  ) => ReactElement; // Fix JSX.Element to ReactElement
}

export default function FinanceSection({
  loadingFinance,
  financeSummary,
  paginatedFinanceData,
  financeFilter,
  onPeriodChange,
  onPageChange,
  onSort,
  onRefresh,
  getSortIcon,
}: FinanceSectionProps) {
  return (
    <section id="finance" className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors">
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
              <AutorenewIcon
                className="animate-spin text-3xl mb-4 text-gray-400 dark:text-gray-500"
              />
              <p className="text-gray-600 dark:text-gray-400">Memuat data keuangan...</p>
            </div>
          ) : financeSummary ? (
            <>
              {/* Summary Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">Total Pemasukan</CardTitle>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      <ArrowUpwardIcon className="mr-1 text-xs" />
                      Dana Ummat
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{financeSummary.formattedTotalIncome}</div>
                    <p className="text-xs text-muted-foreground dark:text-gray-400">
                      {financeSummary.transactionCount} transaksi
                    </p>
                  </CardContent>
                </Card>

                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">Total Pengeluaran</CardTitle>
                    <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                      <ArrowUpwardIcon className="mr-1 rotate-180 text-xs" />
                      Dana Ummat
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">{financeSummary.formattedTotalExpense}</div>
                    <p className="text-xs text-muted-foreground dark:text-gray-400">
                      Update: {financeSummary.lastUpdated}
                    </p>
                  </CardContent>
                </Card>

                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">Saldo Dana Ummat</CardTitle>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      <InfoIcon className="mr-1 text-xs" />
                      Real-time
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${financeSummary.balance >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                      {financeSummary.formattedBalance}
                    </div>
                    <p className="text-xs text-muted-foreground dark:text-gray-400">
                      Per {financeSummary.lastUpdated}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Transactions dengan Filter dan Pagination */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-100 dark:border-gray-700">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-4 md:mb-0">
                    Transaksi (Dana Ummat)
                  </h3>
                  <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
                    {/* Period Filter */}
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Periode:</span>
                      <Select
                        value={financeFilter.period}
                        onValueChange={(value) =>
                          onPeriodChange(value as "week" | "month" | "year" | "all")
                        }
                      >
                        <SelectTrigger className="w-[180px] dark:bg-gray-700 dark:border-gray-600">
                          <SelectValue placeholder="Pilih periode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="week">Seminggu Terakhir</SelectItem>
                          <SelectItem value="month">Sebulan Terakhir</SelectItem>
                          <SelectItem value="year">Setahun Terakhir</SelectItem>
                          <SelectItem value="all">Semua Periode</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Refresh Button */}
                    <Button
                      onClick={onRefresh}
                      disabled={loadingFinance}
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                      {loadingFinance ? (
                        <AutorenewIcon className="animate-spin text-sm" />
                      ) : (
                        <AutorenewIcon className="text-sm" />
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
                            <InfoIcon className="mr-1 inline" />
                            Diurutkan berdasarkan:
                            <span className="font-semibold ml-1 text-gray-900 dark:text-gray-100">
                              {financeFilter.sortField === "date" && "Tanggal"}
                              {financeFilter.sortField === "description" &&
                                "Deskripsi"}
                              {financeFilter.sortField === "income" &&
                                "Pemasukan"}
                              {financeFilter.sortField === "expense" &&
                                "Pengeluaran"}
                            </span>
                            <span className="ml-1">
                              (
                              {financeFilter.sortDirection === "desc"
                                ? "Terbesar → Terkecil"
                                : "Terkecil → Terbesar"}
                              )
                            </span>
                          </div>

                        {/* Quick Sort Buttons */}
                        <div className="flex items-center space-x-2">
                          <Button
                            variant={financeFilter.sortField === "date" ? "default" : "outline"}
                            size="sm"
                            onClick={() => onSort("date")}
                            className="text-xs dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
                          >
                            Tanggal
                          </Button>
                          <Button
                            variant={financeFilter.sortField === "income" ? "default" : "outline"}
                            size="sm"
                            onClick={() => onSort("income")}
                            className="text-xs dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
                          >
                            Pemasukan
                          </Button>
                          <Button
                            variant={financeFilter.sortField === "expense" ? "default" : "outline"}
                            size="sm"
                            onClick={() => onSort("expense")}
                            className="text-xs dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
                          >
                            Pengeluaran
                          </Button>
                        </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                {/* Mobile: Scrollable indicator */}
                <div className="block md:hidden mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-center">
                    <ArrowUpwardIcon className="mr-1 rotate-90 text-xs" />
                    Geser tabel ke kiri/kanan untuk melihat semua kolom
                    <ArrowUpwardIcon className="ml-1 -rotate-90 text-xs" />
                  </p>
                </div>

                {/* Transactions Table */}
                <div className="rounded-md border border-gray-200 dark:border-gray-700">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-200 dark:border-gray-700">
                        <TableHead className="whitespace-nowrap text-gray-900 dark:text-gray-100">
                          <Button
                            variant="ghost"
                            onClick={() => onSort("date")}
                            className="flex items-center hover:text-green-600 dark:hover:text-green-400 transition group h-auto p-0 font-medium text-gray-900 dark:text-gray-100"
                          >
                            <span>Tanggal</span>
                            {getSortIcon("date")}
                          </Button>
                        </TableHead>
                        <TableHead className="text-gray-900 dark:text-gray-100">
                          <Button
                            variant="ghost"
                            onClick={() => onSort("description")}
                            className="flex items-center hover:text-green-600 dark:hover:text-green-400 transition group h-auto p-0 font-medium text-gray-900 dark:text-gray-100"
                          >
                            <span>Deskripsi</span>
                            {getSortIcon("description")}
                          </Button>
                        </TableHead>
                        <TableHead className="whitespace-nowrap text-gray-900 dark:text-gray-100">
                          <Button
                            variant="ghost"
                            onClick={() => onSort("income")}
                            className="flex items-center hover:text-green-600 dark:hover:text-green-400 transition group h-auto p-0 font-medium text-gray-900 dark:text-gray-100"
                          >
                            <span>Pemasukan</span>
                            {getSortIcon("income")}
                          </Button>
                        </TableHead>
                        <TableHead className="whitespace-nowrap text-gray-900 dark:text-gray-100">
                          <Button
                            variant="ghost"
                            onClick={() => onSort("expense")}
                            className="flex items-center hover:text-green-600 dark:hover:text-green-400 transition group h-auto p-0 font-medium text-gray-900 dark:text-gray-100"
                          >
                            <span>Pengeluaran</span>
                            {getSortIcon("expense")}
                          </Button>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedFinanceData &&
                        paginatedFinanceData.data.length > 0 ? (
                        paginatedFinanceData.data.map(
                          (transaction: FinanceData) => (
                            <TableRow key={transaction.id} className="hover:bg-muted/50 dark:hover:bg-gray-700/50 border-gray-200 dark:border-gray-700">
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
                                            .join("-")
                                        );
                                        return date.toLocaleDateString(
                                          "id-ID",
                                          { weekday: "short" }
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
                                    <ArrowUpwardIcon className="mr-1 text-xs" />
                                    {transaction.formattedIncome}
                                  </div>
                                ) : (
                                  <span className="text-muted-foreground dark:text-gray-500">-</span>
                                )}
                              </TableCell>
                              <TableCell>
                                {transaction.expense > 0 ? (
                                  <div className="flex items-center text-red-600 dark:text-red-400 font-semibold">
                                    <ArrowUpwardIcon className="mr-1 text-xs rotate-180" />
                                    {transaction.formattedExpense}
                                  </div>
                                ) : (
                                  <span className="text-muted-foreground dark:text-gray-500">-</span>
                                )}
                              </TableCell>
                            </TableRow>
                          )
                        )
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-8 text-muted-foreground dark:text-gray-400">
                            {loadingFinance ? (
                              <div className="flex items-center justify-center">
                                <AutorenewIcon className="animate-spin mr-2" />
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
                          {paginatedFinanceData.totalItems} transaksi
                        </span>
                        <span>
                          Halaman {paginatedFinanceData.currentPage} dari{" "}
                          {paginatedFinanceData.totalPages}
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
                              {(paginatedFinanceData.currentPage - 1) *
                                financeFilter.itemsPerPage +
                                1}
                            </span>{" "}
                            -{" "}
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {Math.min(
                                paginatedFinanceData.currentPage *
                                financeFilter.itemsPerPage,
                                paginatedFinanceData.totalItems
                              )}
                            </span>{" "}
                            dari{" "}
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {paginatedFinanceData.totalItems}
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
                          onClick={() => onPageChange(paginatedFinanceData.currentPage - 1)}
                          disabled={!paginatedFinanceData.hasPrevPage || loadingFinance}
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
                        >
                          Sebelumnya
                        </Button>

                        {/* Page Numbers */}
                        <div className="flex">
                          {Array.from(
                            {
                              length: Math.min(
                                5,
                                paginatedFinanceData.totalPages
                              ),
                            },
                            (_, i) => {
                              let pageNum;
                              if (paginatedFinanceData.totalPages <= 5) {
                                pageNum = i + 1;
                              } else if (
                                paginatedFinanceData.currentPage <= 3
                              ) {
                                pageNum = i + 1;
                              } else if (
                                paginatedFinanceData.currentPage >=
                                paginatedFinanceData.totalPages - 2
                              ) {
                                pageNum =
                                  paginatedFinanceData.totalPages - 4 + i;
                              } else {
                                pageNum =
                                  paginatedFinanceData.currentPage - 2 + i;
                              }

                              return (
                                <Button
                                  key={pageNum}
                                  variant={pageNum === paginatedFinanceData.currentPage ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => onPageChange(pageNum)}
                                  disabled={loadingFinance}
                                  className={`w-10 ${pageNum === paginatedFinanceData.currentPage ? "dark:bg-green-600 dark:text-white" : "dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"}`}
                                >
                                  {pageNum}
                                </Button>
                              );
                            }
                          )}
                        </div>

                        {/* Next Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onPageChange(paginatedFinanceData.currentPage + 1)}
                          disabled={!paginatedFinanceData.hasNextPage || loadingFinance}
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
                      <span className="text-sm text-muted-foreground dark:text-gray-400">Ke halaman:</span>
                      <Input
                        type="number"
                        min="1"
                        max={paginatedFinanceData.totalPages}
                        value={paginatedFinanceData.currentPage}
                        onChange={(e) => {
                          const page = parseInt(e.target.value);
                          if (
                            page >= 1 &&
                            page <= paginatedFinanceData.totalPages
                          ) {
                            onPageChange(page);
                          }
                        }}
                        className="w-16 text-center dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                      />
                      <span className="text-sm text-muted-foreground dark:text-gray-400">
                        dari {paginatedFinanceData.totalPages}
                      </span>
                    </div>
                  )}
              </div>
            </>
          ) : (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-100 dark:border-gray-700 text-center">
              <p className="text-gray-600 dark:text-gray-400">Data keuangan tidak tersedia</p>
            </div>
          )}
        </div>

        <Separator className="my-8 dark:bg-gray-700" />

        {/* Cara Berdonasi Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-6 text-green-700 dark:text-green-400">
            Cara Berdonasi
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="text-green-600 dark:text-green-400 text-3xl mb-4">
                  <MoneyIcon />
                </div>
                <CardTitle className="text-gray-900 dark:text-gray-100">Tunai</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground dark:text-gray-300 mb-3">
                  Anda dapat menitipkan donasi di kotak infaq masjid atau langsung
                  ke bendahara masjid.
                </p>
                <p className="text-sm text-muted-foreground dark:text-gray-400">Setiap Jumat & Ahad pagi</p>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="text-green-600 dark:text-green-400 text-3xl mb-4">
                  <SchoolIcon />
                </div>
                <CardTitle className="text-gray-900 dark:text-gray-100">Transfer Bank</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground dark:text-gray-300 mb-1">SeaBank</p>
                <p className="font-mono font-bold mb-3 text-gray-900 dark:text-gray-100">9013 7458 0025</p>
                <p className="text-sm text-muted-foreground dark:text-gray-400 mb-1">a.n. Azhar Muttaqien</p>
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
                  <QrCodeIcon />
                </div>
                <CardTitle className="text-gray-900 dark:text-gray-100">QRIS</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground dark:text-gray-300 mb-3">
                  Untuk donasi melalui QRIS, silakan hubungi admin untuk
                  mendapatkan kode QRIS terbaru.
                </p>
                <div className="bg-muted dark:bg-gray-700 p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground dark:text-gray-400 mb-2">
                    QRIS akan tersedia segera
                  </p>
                  <Button variant="outline" size="sm" className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600">
                    Hubungi Admin
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground dark:text-gray-500 mt-2">
                  *QRIS harus disetup melalui aplikasi SeaBank resmi
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-8 dark:bg-gray-700" />

        {/* Arsip Laporan Keuangan */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold mb-4 text-green-700 dark:text-green-400">
            Arsip Laporan Keuangan
          </h3>

          {/* Mobile: Scrollable table dengan indikator */}
          <div className="block md:hidden mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-center">
              <ArrowUpwardIcon className="mr-1 rotate-90" />
              Geser tabel ke kiri/kanan untuk melihat semua kolom
              <ArrowUpwardIcon className="ml-1 -rotate-90" />
            </p>
          </div>

          <div className="rounded-md border border-gray-200 dark:border-gray-700">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200 dark:border-gray-700">
                  <TableHead className="whitespace-nowrap text-gray-900 dark:text-gray-100">Periode</TableHead>
                  <TableHead className="whitespace-nowrap text-gray-900 dark:text-gray-100">Pemasukan</TableHead>
                  <TableHead className="whitespace-nowrap text-gray-900 dark:text-gray-100">Pengeluaran</TableHead>
                  <TableHead className="whitespace-nowrap text-gray-900 dark:text-gray-100">Dana Ummat</TableHead>
                  <TableHead className="whitespace-nowrap text-gray-900 dark:text-gray-100">Unduh</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-gray-200 dark:border-gray-700">
                  <TableCell className="font-medium text-gray-900 dark:text-gray-100">2024/2025</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100">Rp 22.076.500</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100">Rp 13.927.300</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400 font-medium">Rp 8.139.300</TableCell>
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
                <InfoIcon className="text-blue-600 dark:text-blue-400 mr-2" />
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
