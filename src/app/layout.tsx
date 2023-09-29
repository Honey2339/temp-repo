import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { RecoilRoot } from "recoil";
import RecoilContextProvider from "./recoilStates";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book Finder",
  description: "By Prasoon Kumar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <div
          className="fixed inset-0 opacity-20 z-[-1]"
          style={{
            backgroundImage: `url(${assets.square})`,
            backgroundSize: "30px",
            backgroundColor: "#111",
          }}
        /> */}
        <RecoilContextProvider>{children}</RecoilContextProvider>
      </body>
    </html>
  );
}
