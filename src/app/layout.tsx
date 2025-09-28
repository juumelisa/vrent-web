// app/layout.tsx
import { ThemeProvider } from "./theme-provider";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="w-full h-screen">
        <ThemeProvider>
          <div className="w-full h-full bg-gray-50 dark:bg-[#202020] dark:text-gray-200">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
