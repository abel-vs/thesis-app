import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import DropZone from '../components/DropZone';
import Title from '../components/Title';
import Link from 'next/link';
import Footer from '../components/Footer';
import Button from '../components/Button';

const ModelPage: NextPage = () => {
  const [modelStateFile, setModelState] = useState(null);
  const [modelArchitectureFile, setModelArchitecture] = useState(null);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Thesis</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 pt-10 text-center">
        <Title />
        <div className="my-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <a className="mt-6 w-96 rounded-xl border p-6 text-left">
            <h3 className="text-2xl font-bold">Model State</h3>
            <p className="mt-4">
              This file contains your trained model. It should be a
              <code className="rounded-md bg-gray-100 p-1 m-1 font-mono">.pt</code> or{' '}
              <code className="rounded-md bg-gray-100 p-1 m-1 font-mono">.pth</code> file.
            </p>
            <DropZone
              file={modelStateFile}
              setFile={setModelState}
              acceptedTypes={{ 'text/x-python': ['.pt', '.pth'] }}
            />
          </a>
          <a className="mt-6 w-96 rounded-xl border p-6 text-left">
            <h3 className="text-2xl font-bold">Model Architecture</h3>
            <p className="mt-4">
              This file contains the architecture of your model. It should be a
              <code className="rounded-md bg-gray-100 p-1 m-1 font-mono">.py</code> file.
            </p>
            <DropZone
              file={modelArchitectureFile}
              setFile={setModelArchitecture}
              acceptedTypes={{ 'text/x-python': ['.py'] }}
            />
          </a>

          <div className="flex flex-row w-full m-8">
            <Link href="/" className="flex-none w-10 mr-2">
              <Button text="&larr;" />
            </Link>

            <Link href="/configure" className="w-full">
              <Button text="Next" disabled={modelStateFile === null || modelArchitectureFile === null} />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ModelPage;
