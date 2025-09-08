"use client";

import { useEffect, useCallback, useMemo, useState, useRef } from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { ReactElement } from "react";

import HeroSection from "@/app/components/HeroSection";
import PrayerTimesSection from "@/app/components/PrayerTimeSection";
import AboutSection from "@/app/components/AboutSection";
import FacilitiesSection from "@/app/components/FacilitiesSection";
import OrganizationSection from "@/app/components/OrganizationSection";
import FinanceSection from "@/app/components/FinanceSection";
import { useFinanceData } from "@/app/hooks/useFinanceData";
import ContactSection from "@/app/components/ContactSection";
import MapSection from "@/app/components/MapSection";

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

  // Contact form state
  const [contactLoading, setContactLoading] = useState(false);
  const [contactMessage, setContactMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const namaRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const subjekRef = useRef<HTMLInputElement>(null);
  const pesanRef = useRef<HTMLTextAreaElement>(null);

  // Contact form handlers
  const handleContactSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    setContactMessage(null);

    try {
      // Here you would typically send the form data to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call

      setContactMessage({
        type: "success",
        text: "Pesan Anda telah berhasil dikirim! Tim kami akan merespons dalam 1x24 jam."
      });

      // Clear form
      if (namaRef.current) namaRef.current.value = "";
      if (emailRef.current) emailRef.current.value = "";
      if (subjekRef.current) subjekRef.current.value = "";
      if (pesanRef.current) pesanRef.current.value = "";

    } catch {
      setContactMessage({
        type: "error",
        text: "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi."
      });
    } finally {
      setContactLoading(false);
    }
  }, []);

  const handleClearMessage = useCallback(() => {
    setContactMessage(null);
  }, []);

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
      <ContactSection
        contactLoading={contactLoading}
        contactMessage={contactMessage}
        namaRef={namaRef}
        emailRef={emailRef}
        subjekRef={subjekRef}
        pesanRef={pesanRef}
        onSubmit={handleContactSubmit}
        onClearMessage={handleClearMessage}
      />
      <MapSection />
      {/* Additional sections can be added here */}
    </main>
  );
}
