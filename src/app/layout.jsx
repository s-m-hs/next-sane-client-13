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
import Head from 'next/head';
import CrispChat from '@/components/CrispChat/CrispChat';

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
            <Head>
        <meta name="enamad" content="25577088" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.$crisp = [];
              window.CRISP_WEBSITE_ID = "927dcc87-4843-4780-b81c-2c7df0778d64";
              (function() {
                var d = document;
                var s = d.createElement("script");
                s.src = "https://client.crisp.chat/l.js";
                s.async = 1;
                d.getElementsByTagName("head")[0].appendChild(s);
              })();
            `,
          }}
        ></script>
      </Head>
      <body className={inter.className}>

        <MainProvider>
        <Header />
        <AOSInit />
        <ErrorBoundary fallback={<Error/>}>
        <CrispChat /> {/* افزودن چت Crisp */}
        {children}
        </ErrorBoundary>
        <ScrollToTopt/>
        <Footer/>
        </MainProvider>
       
      
     
      
      </body>
    </html>
  );
}
