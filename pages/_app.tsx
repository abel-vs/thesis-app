import '../styles/globals.css';
import type { AppProps } from 'next/app';
import AppContext from '../context/AppContext';
import { useState } from 'react';
import Footer from '../components/Footer';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  const [modelStateFile, setModelState] = useState(null);
  const [modelArchitectureFile, setModelArchitecture] = useState(null);

  return (
    <AppContext.Provider value={{ modelStateFile, setModelState, modelArchitectureFile, setModelArchitecture }}>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Head>
          <title>Thesis</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex w-full flex-1 flex-col items-center justify-center px-20 pt-10 text-center">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default MyApp;
