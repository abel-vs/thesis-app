import React, { useContext } from 'react';
import type { NextPage } from 'next';
import DropZone from '../components/DropZone';
import Title from '../components/Title';
import Link from 'next/link';
import Button from '../components/Button';
import AppContext from '../context/AppContext';

const ModelPage: NextPage = () => {
  const context = useContext(AppContext);

  return (
    <>
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
            file={context.modelStateFile}
            setFile={context.setModelState}
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
            file={context.modelArchitectureFile}
            setFile={context.setModelArchitecture}
            acceptedTypes={{ 'text/x-python': ['.py'] }}
          />
        </a>

        <div className="flex flex-row w-full m-8">
          <Link href="/" className="flex-none w-10 mr-2">
            <Button text="&larr;" />
          </Link>

          <Link href="/configure" className="w-full">
            <Button text="Next" disabled={context.modelStateFile === null || context.modelArchitectureFile === null} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default ModelPage;
