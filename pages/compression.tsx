import React, { useContext } from 'react';
import type { NextPage } from 'next';
import DropZone from '../components/DropZone';
import Link from 'next/link';
import Button from '../components/Button';
import AppContext from '../context/AppContext';
import Code from '../components/Code';
import TitleBlock from '../components/Title';
import { BeakerIcon, ChipIcon, ScissorsIcon } from '@heroicons/react/solid';

const CompressionPage: NextPage = () => {
  const context = useContext(AppContext);

  return (
    <>
      <TitleBlock
        title="Compression"
        subtitle="We analyzed your model and suggest the following compression actions."
      />
      <div className="my-6 flex flex-wrap items-center justify-around">
        <a className="mt-6 w-96 rounded-xl border p-6 text-left">
          <h3 className="text-2xl font-bold flex flex-row items-center">
            <ScissorsIcon className="h-10 mr-2" />
            Pruning
          </h3>
          <p className="mt-4">
            This file contains your trained model. It should be a <Code text=".pt" /> or <Code text=".pth" /> file.
          </p>
        </a>
        <a className="mt-6 w-96 rounded-xl border p-6 text-left">
          <h3 className="text-2xl font-bold flex flex-row items-center">
            <ChipIcon className="h-10 mr-2" />
            Quantization
          </h3>
          <p className="mt-4">
            This file contains the architecture of your model. It should be a <Code text=".py" /> file.
          </p>
        </a>
        <a className="mt-6 w-96 rounded-xl border p-6 text-left">
          <h3 className="text-2xl font-bold flex flex-row items-center">
            <BeakerIcon className="h-10 mr-2" />
            Distillation
          </h3>
          <p className="mt-4">
            This file contains the architecture of your model. It should be a <Code text=".py" /> file.
          </p>
        </a>

        <div className="flex flex-row w-full m-8">
          <Link href="/goal" className="flex-none w-10 mr-2">
            <Button text="&larr;" />
          </Link>

          <Link href="/results" className="w-full">
            <Button text="Compress" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default CompressionPage;
