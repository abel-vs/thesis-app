import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AppContext } from '../context/AppContext';
import { useState } from 'react';
import Head from 'next/head';
import { CssVarsProvider } from '@mui/joy';

function MyApp({ Component, pageProps }: AppProps) {
  const [modelStateFile, setModelState] = useState<File | null>(null);
  const [modelArchitectureFile, setModelArchitecture] = useState<File | null>(null);
  const [dataset, setDataset] = useState<string | null>(null);
  const [compressionType, setCompressionType] = useState<string | null>('Model Size');
  const [compressionTarget, setCompressionTarget] = useState<number>(50);
  const [performanceTarget, setPerformanceTarget] = useState<number>(95);
  const [compressionActions, setCompressionActions] = useState([]);
  const [originalResults, setOriginalResults] = useState([]);
  const [compressedResults, setCompressedResults] = useState([]);
  const [compressedFile, setCompressedFile] = useState(null);
  const [compressedArchitecture, setCompressedArchitecture] = useState('');

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
        compressedArchitecture,
        setCompressedArchitecture,
      }}
    >
      <Head>
        <title>Thesis</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssVarsProvider>
        <main className="mx-auto flex flex-col items-center justify-center max-w-4xl sm:w-full text-center min-h-screen p-8">
          <Component {...pageProps} />
        </main>
      </CssVarsProvider>
    </AppContext.Provider>
  );
}

export default MyApp;
