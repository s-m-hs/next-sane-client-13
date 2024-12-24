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
import Script from 'next/script';

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

      </Head>
      
      <body className={inter.className}>

        <MainProvider>
        <Header />
        <AOSInit />
        <ErrorBoundary fallback={<Error/>}>
        {/* <CrispChat /> */}
        {children}
        
        <Script
        id="goftino-widget"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(){
              var i="rwHt9b",a=window,d=document;
              function g(){
                var g=d.createElement("script"),
                s="https://www.goftino.com/widget/"+i,
                l=localStorage.getItem("goftino_"+i);
                g.async=!0;
                g.src=l?s+"?o="+l:s;
                d.getElementsByTagName("head")[0].appendChild(g);
              }
              "complete"===d.readyState?g():a.attachEvent?a.attachEvent("onload",g):a.addEventListener("load",g,!1);
            }();
          `,
        }}
      />
        </ErrorBoundary>
        <ScrollToTopt/>
        <Footer/>
        </MainProvider>
       
      
     
      
      </body>
    </html>
  );
}
