import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar, TopMenu } from "./components";
import AuthProvider from "./auth/components/AuthProvider";
import { Providers } from "./store/Providers";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { REDIRECT_URL } from "@/utils/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Productos Prestalana",
  description: "Tech Assessment for Prestalana",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (session === null) {
    redirect(REDIRECT_URL);
  }
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          {
            <>
              <Sidebar />
              <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">
                <TopMenu />
                <div className="px-6 pt-6 bg-white p-2 m-2 pb-5 rounded">
                  <Providers>{children}</Providers>
                </div>
              </div>
            </>
          }
        </body>
      </html>
    </AuthProvider>
  );
}
