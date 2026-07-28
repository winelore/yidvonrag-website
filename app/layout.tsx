import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ToasterProvider } from "@/app/components/ToasterProvider";
import { CartProvider } from "@/lib/CartContext";
import Header from "@/app/components/Header";
import AgeGate from "@/app/components/AgeGate";
import PaymentNotification from "@/app/components/PaymentNotification";

const montserrat = Montserrat({
    subsets: ["latin", "cyrillic"],
    variable: "--font-montserrat",
    weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "Винна мануфактура Штифко",
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
            className={`${montserrat.variable} font-sans antialiased`}
        >
        <CartProvider>
            <AgeGate />
            <Header />
            <PaymentNotification />
            {children}
            <ToasterProvider />
        </CartProvider>
        </body>
        </html>
    );
}
