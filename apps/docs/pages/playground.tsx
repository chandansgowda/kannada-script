import Head from "next/head";

import Navbar from "../components/Navbar";
import Playground from "../components/Playground";

export default function PlaygroundPage() {
  return (
    <>
      <Head>
        <title>Playground — Kannada Script</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta
          name="description"
          content="Write and run Kannada Script code in your browser. Examples, share links and ಕನ್ನಡ ಲಿಪಿ keywords."
        />
        <meta property="og:title" content="Kannada Script Playground" key="title" />
        <meta property="og:url" content="https://kannadascript.netlify.app/playground" key="url" />
        <link rel="canonical" href="https://kannadascript.netlify.app/playground" />
      </Head>
      {/* app-like page: fills the screen, panes scroll on their own */}
      <div className="app-height flex flex-col">
        <Navbar solid />
        <main className="flex min-h-0 flex-1 flex-col">
          <h1 className="sr-only">Kannada Script Playground</h1>
          <Playground />
        </main>
      </div>
    </>
  );
}
