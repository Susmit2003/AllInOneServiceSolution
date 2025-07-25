"use client";

import { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface FormattedDateProps {
  date: string | Date | undefined | null;
}

/**
 * A client-side component to safely render dates and avoid hydration errors.
 * It renders a placeholder on the server and initial client render, then the formatted date.
 */
export function FormattedDate({ date }: FormattedDateProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !date) {
    // Render a placeholder skeleton to prevent layout shifts and match text height
    return <span className="inline-block w-20 h-4 bg-muted rounded animate-pulse" />;
  }

  try {
    // 'P' is a localized date format from date-fns, e.g., 07/25/2025
    return <>{format(new Date(date), 'P')}</>;
  } catch (error) {
    // Fallback for invalid date strings
    console.error("Invalid date provided to FormattedDate:", date);
    return <span className="text-destructive">Invalid Date</span>;
  }
}
