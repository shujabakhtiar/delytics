"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useTransition, useMemo } from "react";

export function useTableFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const filters = useMemo(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  const createQueryString = useCallback(
    (params: Record<string, string | null | undefined>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      });

      return newSearchParams.toString();
    },
    [searchParams]
  );

  const updateFilter = useCallback(
    (key: string, value: string | null | number | boolean) => {
      startTransition(() => {
        const queryString = createQueryString({ [key]: value !== null ? String(value) : null });
        router.push(`${pathname}?${queryString}`, { scroll: false });
      });
    },
    [createQueryString, pathname, router]
  );

  const setFilters = useCallback(
    (newFilters: Record<string, string | null | number | boolean>) => {
      startTransition(() => {
        const stringFilters: Record<string, string | null> = {};
        Object.entries(newFilters).forEach(([k, v]) => {
          stringFilters[k] = v !== null && v !== undefined ? String(v) : null;
        });

        const queryString = createQueryString(stringFilters);
        router.push(`${pathname}?${queryString}`, { scroll: false });
      });
    },
    [createQueryString, pathname, router]
  );

  const resetFilters = useCallback(() => {
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  }, [pathname, router]);

  return {
    filters,
    searchParams,
    isPending,
    updateFilter,
    setFilters,
    resetFilters,
  };
}
