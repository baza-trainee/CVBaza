import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-open-sans",
});
type LayoutProps = {
  children: React.ReactNode;
};
export default async function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="ua">
      <body className={`${openSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
