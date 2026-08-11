import { renderOGImage } from "@/app/og";

export const alt = "Kanha Jatthap — Frontend & WordPress Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return renderOGImage();
}