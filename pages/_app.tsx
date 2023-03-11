import '../styles/globals.css';
import type { AppProps } from 'next/app';
import AppContext from '../context/AppContext';
import { useState } from 'react';
import Footer from '../components/Footer';
import Head from 'next/head';
import { Button, CssVarsProvider, Slider } from '@mui/joy';
import ErrorBoundary from '../components/ErrorBoundary';

function MyApp({ Component, pageProps }: AppProps) {
  const [modelStateFile, setModelState] = useState(null);
  const [modelArchitectureFile, setModelArchitecture] = useState(null);
  const [dataset, setDataset] = useState("");
  const [compressionType, setCompressionType] = useState('Model Size');
  const [compressionTarget, setCompressionTarget] = useState(50);
  const [performanceTarget, setPerformanceTarget] = useState(95);
  const [compressionActions, setCompressionActions] = useState([]);
  const [originalResults, setOriginalResults] = useState([]);
  const [compressedResults, setCompressedResults] = useState([]);
  const [compressedFile, setCompressedFile] = useState(null);

  return (
    <AppContext.Provider
      value={{
        modelStateFile,
        setModelState,
        modelArchitectureFile,
        setModelArchitecture,
        dataset,
        setDataset,
        compressionType,
        setCompressionType,
        compressionTarget,
        setCompressionTarget,
        performanceTarget,
        setPerformanceTarget,
        compressionActions,
        setCompressionActions,
        originalResults,
        setOriginalResults,
        compressedResults,
        setCompressedResults,
        compressedFile,
        setCompressedFile,
      }}
    >
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Head>
          <title>Thesis</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <CssVarsProvider>
          {/* <ErrorBoundary> */}
          <main className="flex max-w-4xl sm:w-full flex-1 flex-col items-center justify-center text-center p-10">
            <Component {...pageProps} />
          </main>
          <Footer />
          {/* </ErrorBoundary> */}
        </CssVarsProvider>
      </div>
    </AppContext.Provider>
  );
}

export default MyApp;
