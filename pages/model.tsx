import React, { useContext } from 'react';
import type { NextPage } from 'next';
import DropZone from '../components/DropZone';
import Link from 'next/link';
import Button from '../components/Button';
import AppContext from '../context/AppContext';
import Code from '../components/Code';
import TitleBlock from '../components/Title';
import { Card } from 'flowbite-react';
import InfoLink from '../components/InfoLink';

const ModelPage: NextPage = () => {
  const context = useContext(AppContext);

  return (
    <>
      <TitleBlock title="Model" subtitle="Provide the model that you want optimize." />
      <div className="my-8 flex flex-wrap items-center justify-around space-x-4">
        <Card className="flex-1 text-left">
          <h2 className="text-2xl font-bold">Model State</h2>
          <p>
            This file contains your trained model. It should be a <Code>.pt</Code> or <Code>.pth</Code> file.
          </p>
          <DropZone
            file={context.modelStateFile}
            setFile={context.setModelState}
            acceptedTypes={{ 'text/x-python': ['.pt', '.pth'] }}
          />
          <InfoLink text="Why do I need a model state file?" info="Lorem Ipsum" />
        </Card>
        <Card className="flex-1 text-left">
          <h3 className="text-2xl font-bold">Model Architecture</h3>
          <p>
            This file contains the architecture of your model. It should be a <Code>.py</Code> file.
          </p>
          <DropZone
            file={context.modelArchitectureFile}
            setFile={context.setModelArchitecture}
            acceptedTypes={{ 'text/x-python': ['.py'] }}
          />
          <InfoLink text="Why do I need a model architecture file?" info="Lorem Ipsum" />
        </Card>
      </div>
      <div className="flex flex-row w-full">
          <Link href="/" className="flex-none w-10 mr-2">
            <Button text="&larr;" />
          </Link>

          <Link href="/data" className="w-full">
            <Button text="Next" disabled={context.modelStateFile === null || context.modelArchitectureFile === null} />
          </Link>
        </div>
    </>
  );
};

export default ModelPage;
