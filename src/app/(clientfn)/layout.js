import Navbar from "@/components/navsidefoot/Navbar";
import { Inter } from "next/font/google";
import Sidebar from "@/components/navsidefoot/Sidebar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="flex h-full">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
