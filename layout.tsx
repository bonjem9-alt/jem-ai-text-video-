import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Jem AI Video Studio", description: "Create cinematic AI videos from text and photos." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="am"><body>{children}</body></html>;
}
