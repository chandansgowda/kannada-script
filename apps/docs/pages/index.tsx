import { useEffect } from "react";

import Head from "next/head";

import Documentation from "../components/Documentation";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Install from "../components/Install";
import Navbar from "../components/Navbar";
import BottomNav from "../components/Navbar/BottomNav";

const SITE_URL = "https://kannadascript.netlify.app";
const DESCRIPTION =
  "Kannada Script is a beginner friendly programming language with Kannada keywords. Write code in English letters or ಕನ್ನಡ ಲಿಪಿ and run it in your browser.";

export default function Home() {
  // the playground used to live at /#playground, keep old links working
  useEffect(() => {
    const { hash, search } = window.location;
    if (hash === "#playground" || new URLSearchParams(search).has("code"))
      window.location.replace(`/playground${search}`);
  }, []);

  return (
    <>
      <Head>
        <title>Kannada Script — Learn programming in Kannada</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content="Kannada Script — Learn programming in Kannada" key="title" />
        <meta property="og:type" content="website" key="type" />
        <meta property="og:url" content={SITE_URL} key="url" />
        <meta property="og:description" content={DESCRIPTION} key="description" />
        <meta property="og:site_name" content="Kannada Script" key="siteName" />
        <meta property="og:image" content={`${SITE_URL}/icon-512.png`} />
        <meta name="twitter:card" content="summary" />
        <link rel="canonical" href={SITE_URL} />
      </Head>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Documentation />
        <Install />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
