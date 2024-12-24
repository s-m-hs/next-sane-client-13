import 'primereact/resources/themes/saga-blue/theme.css';  // Theme
import 'primereact/resources/primereact.min.css';          // Core CSS
import 'primeicons/primeicons.css';                        // PrimeIcons
import { Inter } from "next/font/google";
import Header from "@/components/madules/Header/Header";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import AOSInit from "@/utils/Aos/aos";
import Footer from "@/components/templatess/Footer/Footer";
import ScrollToTopt from "@/utils/ScrollToTop/ScrollToTop";
import Loading from "./loading";
import { MainProvider } from "@/context/MainContext";
import Error from "@/components/madules/Error/Error";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: " فروشگاه اینترنتی صانع",
  description: " Sane Anformatic Collection",
  icons: {
    icon: "../../images/photo_2024-05-30_19-08-29.jpg",
  },
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="fa" dir="rtl">
            <head>
        <meta name="enamad" content="25577088" />
      </head>
      <body className={inter.className}>

        <MainProvider>
        <Header />
        <AOSInit />
        <ErrorBoundary fallback={<Error/>}>
        {children}
        </ErrorBoundary>
        <ScrollToTopt/>
        <Footer/>
        </MainProvider>
       
      
     
      
      </body>
    </html>
  );
}
