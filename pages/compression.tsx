import React, { useContext, useState } from 'react';
import type { NextPage } from 'next';
import DropZone from '../components/DropZone';
import Link from 'next/link';
import Button from '../components/Button';
import AppContext from '../context/AppContext';
import Code from '../components/Code';
import TitleBlock from '../components/Title';
import { BeakerIcon, CheckCircleIcon, ChipIcon, ScissorsIcon } from '@heroicons/react/solid';
import { Card } from 'flowbite-react';

const SelectableCard = ({ children, className, onClick = () => {} }) => {
  const [selected, setSelected] = useState(true);
  return (
    <Card
      className={`${className} text-left relative outline outline-offset-0 outline-none hover:outline-4  hover:bg-gray-100 ${
        selected ? 'outline-4 outline-green-500' : ''
      }`}
      onClick={() => {
        setSelected(!selected);
        onClick();
      }}
    >
      {selected ? <CheckCircleIcon className="absolute top-4 right-4 w-10" color="green" /> : null}
      {children}
    </Card>
  );
};

const CompressionPage: NextPage = () => {
  const context = useContext(AppContext);

  return (
    <>
      <TitleBlock
        title="Compression"
        subtitle="We analyzed your model and suggest the following compression actions."
      />
      <div className="my-6 flex flex-wrap items-center justify-around">
        <SelectableCard className="w-80 m-6">
          <h3 className="text-2xl font-bold flex flex-row items-center">
            <ScissorsIcon className="h-10 mr-2" />
            Pruning
          </h3>
          <p className="mt-4">
            Suggested method: <Code text="L1" />
          </p>
        </SelectableCard>
        <SelectableCard className="w-80 m-6">
          <h3 className="text-2xl font-bold flex flex-row items-center">
            <ChipIcon className="h-10 mr-2" />
            Quantization
          </h3>
          <p className="mt-4">
            Suggested method: <Code text="INT-8" />
          </p>
        </SelectableCard>
        <SelectableCard className="w-80 m-6">
          <h3 className="text-2xl font-bold flex flex-row items-center">
            <BeakerIcon className="h-10 mr-2" />
            Distillation
          </h3>
          <p className="mt-4">
            Suggested method: <Code text="" />
          </p>
        </SelectableCard>

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
