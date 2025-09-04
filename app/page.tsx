"use client";

import HeroSection from "@/app/components/HeroSection";
import PrayerTimesSection from "@/app/components/PrayerTimeSection";
import AboutSection from "@/app/components/AboutSection";
import FacilitiesSection from "@/app/components/FacilitiesSection";
import OrganizationSection from "@/app/components/OrganizationSection";
import FinanceSection from "@/app/components/FinanceSection";
import { useFinanceData } from "@/app/hooks/useFinanceData";
import { useEffect, useCallback, useMemo } from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { ReactElement } from "react";

export default function Home() {
  const {
    financeSummary,
    loadingFinance,
    financeFilter,
    paginatedFinanceData,
    fetchFinanceDataPaginated,
    handlePeriodChange,
    handlePageChange,
    handleSort,
    handleRefreshFinance,
  } = useFinanceData();

  // Load initial data only once on mount
  useEffect(() => {
    // console.log("🏁 Initial data load triggered");
    fetchFinanceDataPaginated(financeFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run once on mount

  // Update data when filter changes
  useEffect(() => {
    // console.log("🔄 Filter changed, fetching new data:", financeFilter);
    fetchFinanceDataPaginated(financeFilter);
  }, [financeFilter, fetchFinanceDataPaginated]);

  // Sort icon generator - memoized to prevent unnecessary re-renders
  const getSortIcon = useCallback(
    (field: "date" | "description" | "income" | "expense"): ReactElement => {
      if (financeFilter.sortField !== field) {
        return <ArrowUpwardIcon className="text-gray-400" />;
      }
      return financeFilter.sortDirection === "asc"
        ? <ArrowUpwardIcon className="text-green-600" />
        : <ArrowDownwardIcon className="text-green-600" />;
    },
    [financeFilter.sortField, financeFilter.sortDirection] // Only re-create when sort state changes
  );

  // Memoize the FinanceSection to prevent unnecessary re-renders
  const memoizedFinanceSection = useMemo(() => (
    <FinanceSection
      loadingFinance={loadingFinance}
      financeSummary={financeSummary}
      paginatedFinanceData={paginatedFinanceData}
      financeFilter={financeFilter}
      onPeriodChange={handlePeriodChange}
      onPageChange={handlePageChange}
      onSort={handleSort}
      onRefresh={handleRefreshFinance}
      getSortIcon={getSortIcon}
    />
  ), [
    loadingFinance,
    financeSummary,
    paginatedFinanceData,
    financeFilter,
    handlePeriodChange,
    handlePageChange,
    handleSort,
    handleRefreshFinance,
    getSortIcon
  ]);

  return (
    <main className="min-h-screen">
      <HeroSection />
      <PrayerTimesSection />
      <AboutSection />
      <FacilitiesSection />
      <OrganizationSection />
      {memoizedFinanceSection}
      {/* Additional sections can be added here */}
    </main>
  );
}
