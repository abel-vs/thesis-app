import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AppContext } from '../interfaces/AppContext';
import { useState } from 'react';
import Head from 'next/head';
import { CssVarsProvider } from '@mui/joy';
import Dataset from '../interfaces/Dataset';
import Action from '../interfaces/Action';
import Results from '../interfaces/Results';
import ModelDefinition from '../interfaces/ModelDefinition';
import CompressionObjective from '../interfaces/CompressionObjective';

function MyApp({ Component, pageProps }: AppProps) {
  const [modelStateFile, setModelState] = useState<File | null>(null);
  const [modelArchitectureFile, setModelArchitecture] = useState<File | null>(null);
  const [modelDefinition, setModelDefinition] = useState<ModelDefinition | null>(null);
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [compressionType, setCompressionType] = useState<CompressionObjective>({ name: 'Model Size', code: 'size' });
  const [compressionTarget, setCompressionTarget] = useState<number>(50);
  const [performanceTarget, setPerformanceTarget] = useState<number>(95);
  const [compressionActions, setCompressionActions] = useState<Action[]>([]);
  const [originalResults, setOriginalResults] = useState<Results | null>(null);
  const [compressedResults, setCompressedResults] = useState<Results | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [compressedArchitecture, setCompressedArchitecture] = useState('');

  return (
    <AppContext.Provider
      value={{
        modelStateFile,
        setModelState,
        modelArchitectureFile,
        setModelArchitecture,
        modelDefinition: modelDefinition,
        setModelDefinition: setModelDefinition,
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
