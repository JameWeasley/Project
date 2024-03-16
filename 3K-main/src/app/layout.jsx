import { Prompt } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Prompt({ subsets: ["latin"], weight: '400' });
import { AuthProvider, useAuth } from '/middleware/frontend'

export const metadata = {
  title: "3Kingdoms",
  description: "3Kingdoms",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='dark'>
      <link rel="icon" href="/logo_icon.png" sizes="any" />
      <body className={inter.className}>
        <div className="bg-fixed bg">
          <AuthProvider>
            <Providers>
              {children}
            </Providers>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
