import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/lib/CartContext";
import Header from "@/app/components/Header";
import AgeGate from "@/app/components/AgeGate";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Yidvonrag | Ексклюзивна колекція вин",
    description: "Відкрийте для себе найкращі смаки з усього світу.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="uk">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <CartProvider>
            <AgeGate />

            <Header />
            {children}
        </CartProvider>
        </body>
        </html>
    );
}