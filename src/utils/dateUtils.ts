export function parseDate(dateStr: string): Date {
  if (!dateStr || dateStr.trim().toUpperCase() === "NULL") {
    return new Date(); // treat NULL as today
  }

  const str = dateStr.trim();

  // Try ISO / standard parse first
  const iso = Date.parse(str);
  if (!isNaN(iso)) return new Date(iso);

  // Try DD/MM/YYYY or D/M/YYYY
  const dmMatch = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (dmMatch) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, day, month, year] = dmMatch;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  // Try DD.MM.YYYY or D.M.YYYY
  const dotMatch = str.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  if (dotMatch) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, day, month, year] = dotMatch;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  // Try Month D, YYYY (text month)
  const textMonthMatch = str.match(/^([a-zA-Z]+) (\d{1,2}), (\d{4})$/);
  if (textMonthMatch) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, monthName, day, year] = textMonthMatch;
    const monthIndex = new Date(`${monthName} 1, 2000`).getMonth(); // convert text to month index
    return new Date(Number(year), monthIndex, Number(day));
  }

  throw new Error(`Unrecognized date format: "${dateStr}"`);
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
