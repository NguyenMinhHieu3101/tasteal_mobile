import { LunarDate } from "@nghiavuive/lunar_date_vi";

export function convertLunarToSolarDate(lunarDate: Date) {
  const lunarDate_Real = new LunarDate({
    year: lunarDate.getFullYear(),
    month: lunarDate.getMonth() + 1,
    day: lunarDate.getDate(),
  });
  lunarDate_Real.init();

  return new Date(lunarDate_Real.toSolarDate().toDate());
}

export function convertToSnakeCase(text: string): string {
  return text
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/\s+/g, "_")
    .toLowerCase();
}

export const transparentColor = (hex, alpha) => {
  // Chuyển đổi mã màu hex thành giá trị RGB
  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.substring(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return hexToRgb(hex);
};
