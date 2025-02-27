import { useEffect } from "react";

import { AppProps } from "next/app";
import { useRouter } from "next/router";

import { pageView } from "../helpers";

import "../styles/global.css";


const ANALYTICS_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID;

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (!ANALYTICS_ID) return;
    const handleRouteChange = (url: string) => pageView(url);
      router.events.on('routeChangeComplete', handleRouteChange);

      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return(
    <>
      <Component {...pageProps} />
  </>
  )
}
