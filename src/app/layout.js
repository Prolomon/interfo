import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider/ThemeProvider";

export const metadata = {
  title: "Interfo Wifi Cracker",
  description: "Crack them down",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
