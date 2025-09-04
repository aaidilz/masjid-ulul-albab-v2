"use client";

import AutorenewIcon from '@mui/icons-material/Autorenew';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import InfoIcon from '@mui/icons-material/Info';
import MoneyIcon from '@mui/icons-material/Money';
import SchoolIcon from '@mui/icons-material/School';
import QrCodeIcon from '@mui/icons-material/QrCode';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

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
    <section id="finance" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center section-title">
          Laporan Keuangan
        </h2>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-green-700">
            Transparansi Keuangan
          </h3>
          <p className="text-gray-700 mb-6">
            Masjid Ulul Albaab berkomitmen untuk transparan dalam pengelolaan
            keuangan. Berikut adalah laporan keuangan terbaru dari dana ummat:
          </p>

          {loadingFinance ? (
            <div className="text-center py-8">
              <AutorenewIcon
                className="animate-spin text-3xl mb-4 text-gray-400"
              />
              <p className="text-gray-600">Memuat data keuangan...</p>
            </div>
          ) : financeSummary ? (
            <>
              {/* Summary Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="finance-card bg-white p-6 rounded-lg shadow">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-lg">Total Pemasukan</h4>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      <ArrowUpwardIcon className="mr-1 text-xs" />
                      Dana Ummat
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-green-600 mb-2">
                    {financeSummary.formattedTotalIncome}
                  </p>
                  <p className="text-sm text-gray-600">
                    {financeSummary.transactionCount} transaksi
                  </p>
                </div>

                <div className="finance-card bg-white p-6 rounded-lg shadow">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-lg">Total Pengeluaran</h4>
                    <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      <ArrowUpwardIcon className="mr-1 rotate-180 text-xs" />
                      Dana Ummat
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-red-600 mb-2">
                    {financeSummary.formattedTotalExpense}
                  </p>
                  <p className="text-sm text-gray-600">
                    Update: {financeSummary.lastUpdated}
                  </p>
                </div>

                <div className="finance-card bg-white p-6 rounded-lg shadow">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-lg">Saldo Dana Ummat</h4>
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      <InfoIcon className="mr-1 text-xs" />
                      Real-time
                    </div>
                  </div>
                  <p
                    className={`text-3xl font-bold mb-2 ${financeSummary.balance >= 0
                        ? "text-green-600"
                        : "text-red-600"
                      }`}
                  >
                    {financeSummary.formattedBalance}
                  </p>
                  <p className="text-sm text-gray-600">
                    Per {financeSummary.lastUpdated}
                  </p>
                </div>
              </div>

              {/* Recent Transactions dengan Filter dan Pagination */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <h3 className="text-xl font-bold text-green-700 mb-4 md:mb-0">
                    Transaksi (Dana Ummat)
                  </h3>
                  <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
                    {/* Period Filter */}
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Periode:</span>
                      <select
                        value={financeFilter.period}
                        onChange={(e) =>
                          onPeriodChange(
                            // Fix: use onPeriodChange instead of handlePeriodChange
                            e.target.value as "week" | "month" | "year" | "all"
                          )
                        }
                        className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-green-600 focus:border-green-600"
                      >
                        <option value="week">Seminggu Terakhir</option>
                        <option value="month">Sebulan Terakhir</option>
                        <option value="year">Setahun Terakhir</option>
                        <option value="all">Semua Periode</option>
                      </select>
                    </div>

                    {/* Refresh Button */}
                    <button
                      onClick={onRefresh}
                      disabled={loadingFinance}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50 flex items-center space-x-1"
                      title="Refresh data transaksi"
                    >
                      {loadingFinance ? (
                        <AutorenewIcon className="animate-spin text-sm" />
                      ) : (
                        <AutorenewIcon className="text-sm" />
                      )}
                      <span className="hidden sm:inline">Refresh</span>
                    </button>
                  </div>
                </div>

                {/* Data Info */}
                {paginatedFinanceData && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-sm text-blue-700">
                      <span>
                        Menampilkan {paginatedFinanceData.data.length} dari{" "}
                        {paginatedFinanceData.totalItems} transaksi
                      </span>
                      <span>
                        Halaman {paginatedFinanceData.currentPage} dari{" "}
                        {paginatedFinanceData.totalPages}
                      </span>
                    </div>
                  </div>
                )}

                {/* Mobile: Scrollable indicator */}
                <div className="block md:hidden mb-4">
                  <p className="text-sm text-gray-600 mb-2 flex items-center">
                    <ArrowUpwardIcon className="mr-1 rotate-90 text-xs" />
                    Geser tabel ke kiri/kanan untuk melihat semua kolom
                    <ArrowUpwardIcon className="ml-1 -rotate-90 text-xs" />
                  </p>
                </div>

                {/* Transactions Table */}
                <div className="overflow-x-auto">
                  <div className="min-w-full">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {/* Sortable Tanggal */}
                          <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                            <button
                              onClick={() => onSort("date")} // Fix: use onSort instead of handleSort
                              className="flex items-center hover:text-green-600 transition group"
                              title="Klik untuk mengurutkan berdasarkan tanggal"
                            >
                              <span>Tanggal</span>
                              {getSortIcon("date")}
                            </button>
                          </th>

                          {/* Sortable Deskripsi */}
                          <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <button
                              onClick={() => onSort("description")} // Fix: use onSort instead of handleSort
                              className="flex items-center hover:text-green-600 transition group"
                              title="Klik untuk mengurutkan berdasarkan deskripsi"
                            >
                              <span>Deskripsi</span>
                              {getSortIcon("description")}
                            </button>
                          </th>

                          {/* Sortable Pemasukan */}
                          <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                            <button
                              onClick={() => onSort("income")} // Fix: use onSort instead of handleSort
                              className="flex items-center hover:text-green-600 transition group"
                              title="Klik untuk mengurutkan berdasarkan pemasukan"
                            >
                              <span>Pemasukan</span>
                              {getSortIcon("income")}
                            </button>
                          </th>

                          {/* Sortable Pengeluaran */}
                          <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                            <button
                              onClick={() => onSort("expense")} // Fix: use onSort instead of handleSort
                              className="flex items-center hover:text-green-600 transition group"
                              title="Klik untuk mengurutkan berdasarkan pengeluaran"
                            >
                              <span>Pengeluaran</span>
                              {getSortIcon("expense")}
                            </button>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedFinanceData &&
                          paginatedFinanceData.data.length > 0 ? (
                          paginatedFinanceData.data.map(
                            (transaction: FinanceData) => (
                              <tr
                                key={transaction.id}
                                className="hover:bg-gray-50 group"
                              >
                                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                  <div className="flex flex-col">
                                    <span>{transaction.date}</span>
                                    {/* Show day name for better UX */}
                                    <span className="text-xs text-gray-500">
                                      {(() => {
                                        try {
                                          const date = new Date(
                                            transaction.date
                                              .split("/")
                                              .reverse()
                                              .join("-")
                                          ); // Convert DD/MM/YYYY to YYYY-MM-DD
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
                                </td>
                                <td className="px-4 md:px-6 py-4 text-sm text-gray-900">
                                  <div className="max-w-xs md:max-w-sm">
                                    <div
                                      className="truncate group-hover:overflow-visible group-hover:whitespace-normal group-hover:max-w-none"
                                      title={transaction.description}
                                    >
                                      {transaction.description}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  {transaction.income > 0 ? (
                                    <span className="text-green-600 font-semibold flex items-center">
                                      <ArrowUpwardIcon className="mr-1 text-xs" />
                                      {transaction.formattedIncome}
                                    </span>
                                  ) : (
                                    <span className="text-gray-400">-</span>
                                  )}
                                </td>
                                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  {transaction.expense > 0 ? (
                                    <span className="text-red-600 font-semibold flex items-center">
                                      <ArrowUpwardIcon className="mr-1 text-xs rotate-180" />
                                      {transaction.formattedExpense}
                                    </span>
                                  ) : (
                                    <span className="text-gray-400">-</span>
                                  )}
                                </td>
                              </tr>
                            )
                          )
                        ) : (
                          <tr>
                            <td
                              colSpan={4}
                              className="px-6 py-8 text-center text-gray-500"
                            >
                              {loadingFinance ? (
                                <div className="flex items-center justify-center">
                                  <AutorenewIcon className="animate-spin mr-2" />
                                  Memuat data...
                                </div>
                              ) : (
                                "Tidak ada transaksi untuk periode ini"
                              )}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Sorting Info */}
                {paginatedFinanceData &&
                  paginatedFinanceData.data.length > 0 && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-sm">
                        <div className="text-green-700 mb-2 md:mb-0">
                          <InfoIcon className="mr-1" />
                          Diurutkan berdasarkan:
                          <span className="font-semibold ml-1">
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
                          <span className="text-green-600 text-xs">
                            Quick Sort:
                          </span>
                          <button
                            onClick={() => onSort("date")} // Fix: use onSort instead of handleSort
                            className={`px-2 py-1 text-xs rounded ${financeFilter.sortField === "date"
                                ? "bg-green-600 text-white"
                                : "bg-white text-green-600 border border-green-600"
                              } hover:bg-green-700 hover:text-white transition`}
                          >
                            Tanggal
                          </button>
                          <button
                            onClick={() => onSort("income")} // Fix: use onSort instead of handleSort
                            className={`px-2 py-1 text-xs rounded ${financeFilter.sortField === "income"
                                ? "bg-green-600 text-white"
                                : "bg-white text-green-600 border border-green-600"
                              } hover:bg-green-700 hover:text-white transition`}
                          >
                            Pemasukan
                          </button>
                          <button
                            onClick={() => onSort("expense")} // Fix: use onSort instead of handleSort
                            className={`px-2 py-1 text-xs rounded ${financeFilter.sortField === "expense"
                                ? "bg-green-600 text-white"
                                : "bg-white text-green-600 border border-green-600"
                              } hover:bg-green-700 hover:text-white transition`}
                          >
                            Pengeluaran
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                {/* Pagination */}
                {paginatedFinanceData &&
                  paginatedFinanceData.totalPages > 1 && (
                    <div className="mt-6 flex flex-col md:flex-row items-center justify-between">
                      <div className="text-sm text-gray-600 mb-4 md:mb-0">
                        {paginatedFinanceData.totalItems > 0 && (
                          <>
                            Menampilkan{" "}
                            <span className="font-medium">
                              {(paginatedFinanceData.currentPage - 1) *
                                financeFilter.itemsPerPage +
                                1}
                            </span>{" "}
                            -{" "}
                            <span className="font-medium">
                              {Math.min(
                                paginatedFinanceData.currentPage *
                                financeFilter.itemsPerPage,
                                paginatedFinanceData.totalItems
                              )}
                            </span>{" "}
                            dari{" "}
                            <span className="font-medium">
                              {paginatedFinanceData.totalItems}
                            </span>{" "}
                            transaksi
                          </>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        {/* Previous Button */}
                        <button
                          onClick={() =>
                            onPageChange(
                              // Fix: use onPageChange instead of handlePageChange
                              paginatedFinanceData.currentPage - 1
                            )
                          }
                          disabled={
                            !paginatedFinanceData.hasPrevPage || loadingFinance
                          }
                          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Sebelumnya
                        </button>

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
                                <button
                                  key={pageNum}
                                  onClick={() => onPageChange(pageNum)} // Fix: use onPageChange instead of handlePageChange
                                  disabled={loadingFinance}
                                  className={`px-3 py-2 text-sm font-medium border-t border-b border-r ${pageNum === paginatedFinanceData.currentPage
                                      ? "bg-green-600 text-white border-green-600"
                                      : "bg-white text-gray-500 border-gray-300 hover:bg-gray-50"
                                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                  {pageNum}
                                </button>
                              );
                            }
                          )}
                        </div>

                        {/* Next Button */}
                        <button
                          onClick={() =>
                            onPageChange(
                              // Fix: use onPageChange instead of handlePageChange
                              paginatedFinanceData.currentPage + 1
                            )
                          }
                          disabled={
                            !paginatedFinanceData.hasNextPage || loadingFinance
                          }
                          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Selanjutnya
                        </button>
                      </div>
                    </div>
                  )}

                {/* Quick Jump to Page */}
                {paginatedFinanceData &&
                  paginatedFinanceData.totalPages > 5 && (
                    <div className="mt-4 flex items-center justify-center space-x-2">
                      <span className="text-sm text-gray-600">Ke halaman:</span>
                      <input
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
                            onPageChange(page); // Fix: use onPageChange instead of handlePageChange
                          }
                        }}
                        className="w-16 px-2 py-1 text-sm border border-gray-300 rounded text-center focus:ring-green-600 focus:border-green-600"
                      />
                      <span className="text-sm text-gray-600">
                        dari {paginatedFinanceData.totalPages}
                      </span>
                    </div>
                  )}
              </div>
            </>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-gray-600">Data keuangan tidak tersedia</p>
            </div>
          )}
        </div>

        {/* Cara Berdonasi Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-6 text-green-700">
            Cara Berdonasi
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="finance-card bg-white p-6 rounded-lg shadow">
              <div className="text-green-600 text-3xl mb-4">
                <MoneyIcon />
              </div>
              <h4 className="font-bold mb-2">Tunai</h4>
              <p className="text-gray-700 mb-3">
                Anda dapat menitipkan donasi di kotak infaq masjid atau langsung
                ke bendahara masjid.
              </p>
              <p className="text-sm text-gray-500">Setiap Jumat & Ahad pagi</p>
            </div>

            <div className="finance-card bg-white p-6 rounded-lg shadow">
              <div className="text-green-600 text-3xl mb-4">
                <SchoolIcon />
              </div>
              <h4 className="font-bold mb-2">Transfer Bank</h4>
              <p className="text-gray-700 mb-1">SeaBank</p>
              <p className="font-mono font-bold mb-3">9013 7458 0025</p>
              <p className="text-sm text-gray-500 mb-1">a.n. Azhar Muttaqien</p>
              <p className="text-sm text-gray-500">
                (Bendahara Periode 2025/2026)
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Konfirmasi via WA: 0818-0352-8486
              </p>
            </div>

            <div className="finance-card bg-white p-6 rounded-lg shadow">
              <div className="text-green-600 text-3xl mb-4">
                <QrCodeIcon />
              </div>
              <h4 className="font-bold mb-2">QRIS</h4>
              <p className="text-gray-700 mb-3">
                Untuk donasi melalui QRIS, silakan hubungi admin untuk
                mendapatkan kode QRIS terbaru.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-2">
                  QRIS akan tersedia segera
                </p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                  Hubungi Admin
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                *QRIS harus disetup melalui aplikasi SeaBank resmi
              </p>
            </div>
          </div>
        </div>

        {/* Arsip Laporan Keuangan */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4 text-green-700">
            Arsip Laporan Keuangan
          </h3>

          {/* Mobile: Scrollable table dengan indikator */}
          <div className="block md:hidden mb-4">
            <p className="text-sm text-gray-600 mb-2 flex items-center">
              <ArrowUpwardIcon className="mr-1 rotate-90" />
              Geser tabel ke kiri/kanan untuk melihat semua kolom
              <ArrowUpwardIcon className="ml-1 -rotate-90" />
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-full">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Periode
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Pemasukan
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Pengeluaran
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Dana Ummat
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Unduh
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      2024/2025
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Rp 22.076.500
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Rp 13.927.300
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                      Rp 8.139.300
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex flex-col space-y-1">
                        <a
                          href="https://docs.google.com/spreadsheets/d/1JV85DIR7HSwfeDLDvkAe2SmT7E5BwwyMePFKORzFQqM/edit?usp=sharing"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-green-600 hover:text-green-800 transition"
                        >
                          <PictureAsPdfIcon className="mr-1" />
                          <span className="hidden sm:inline">Sheet</span>
                          <span className="sm:hidden">📊</span>
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile: Card alternative (optional) */}
          <div className="block md:hidden mt-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <InfoIcon className="text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-800">
                  Info Mobile
                </span>
              </div>
              <p className="text-xs text-blue-700">
                Untuk pengalaman terbaik melihat laporan keuangan di mobile,
                <a
                  href="https://docs.google.com/spreadsheets/d/1JV85DIR7HSwfeDLDvkAe2SmT7E5BwwyMePFKORzFQqM/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-medium ml-1"
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
