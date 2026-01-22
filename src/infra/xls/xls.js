const XLSX = require('xlsx');

function parseExcelDate(value) {
  // Excel serial date (number)
  if (typeof value === 'number') {
    const parsed = XLSX.SSF.parse_date_code(value);

    if (!parsed) {
      throw new Error(`Invalid Excel date number: ${value}`);
    }

    return new Date(parsed.y, parsed.m - 1, parsed.d);
  }

  // ISO string date (YYYY-MM-DD)
  if (typeof value === 'string') {
    const date = new Date(`${value}T00:00:00`);

    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date string: ${value}`);
    }

    return date;
  }

  throw new Error(`Unsupported date format: ${value}`);
}

module.exports = parseExcelDate;
