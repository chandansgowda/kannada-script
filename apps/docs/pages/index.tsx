import Head from "next/head";

import Code from "../components/Code";
import Documentation from "../components/Documentation";
import Footer from "../components/Footer";


export default function Docs() {
  return (
    <div className="bg-background">
      <Head>
        <title>Kannada Script</title>
        <meta property="og:title" content="kannadascript - A toy programming language based on an inside joke" key="title" />
        <meta property="og:type" content="website" key="type" />
        <meta property="og:url" content="https://kannadascript.js.org" key="url" />
        <meta property="og:description" content="kannadascript is dynamically typed toy programming language, based on an inside joke, written in Typescript. (Forked from BhaiLang)" key="description" />
        <meta name="description" content="kannadascript is dynamically typed toy programming language, based on an inside joke, written in Typescript. (Forked from BhaiLang)" />
        <meta property="og:site_name" content="kannadascript Documentation" key="siteName" />
      </Head>
      <Code />
      <Documentation />
      <Footer />
    </div>
  );
}

