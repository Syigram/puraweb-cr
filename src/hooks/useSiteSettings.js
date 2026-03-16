import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";

const STALE_TIME = 1000 * 60 * 30; // 30 minutes - avoids refetch on every component mount

export function useSiteSettings(section = null) {
  return useQuery({
    queryKey: ["siteSettings", section],
    queryFn: async () => {
      const all = await base44.entities.SiteSettings.list();
      if (section) return all.find(r => r.section === section) ?? null;
      // Return as a map: { contact: {...}, general: {...}, social: {...} }
      return all.reduce((acc, r) => { acc[r.section] = r; return acc; }, {});
    },
    staleTime: STALE_TIME,
    gcTime: STALE_TIME * 2,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}