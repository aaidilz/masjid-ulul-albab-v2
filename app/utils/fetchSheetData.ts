// utils/fetchSheetData.ts
// Simple utility to fetch all data from the /api/sheet endpoint by type

export async function fetchSheetData(type: string) {
  const res = await fetch(`/api/sheet?type=${type}`);
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();
  return data.values;
}
