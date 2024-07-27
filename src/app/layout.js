import { Inter } from "next/font/google";
import Header from "@/components/madules/Header/Header";
import 'bootstrap/dist/css/bootstrap.css'
import './globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: " فروشگاه اینترنتی صانع",
  description: " Sane Anformatic Collection",
  icons:{
    icon: '../../images/photo_2024-05-30_19-08-29.jpg'
  } 
};




export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" >
      <body className={inter.className} >
        <Header/>
        {children}</body>
    </html>
  );
}
