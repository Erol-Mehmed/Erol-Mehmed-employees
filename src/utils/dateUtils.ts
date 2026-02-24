export function parseDate(dateStr: string): Date {
  if (!dateStr || dateStr.trim().toUpperCase() === "NULL") {
    return new Date(); // treat NULL as today
  }

  return new Date(dateStr);
}

export function calculateOverlapDays(
  start1: Date,
  end1: Date,
  start2: Date,
  end2: Date
): number {
  const overlapStart = new Date(Math.max(start1.getTime(), start2.getTime()));
  const overlapEnd = new Date(Math.min(end1.getTime(), end2.getTime()));

  const diff = overlapEnd.getTime() - overlapStart.getTime();

  if (diff <= 0) return 0;

  return Math.floor(diff / (1000 * 60 * 60 * 24));
}
