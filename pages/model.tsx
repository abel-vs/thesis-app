import React, { useContext, useState } from 'react';
import type { NextPage } from 'next';
import DropZone from '../components/DropZone';
import Link from 'next/link';
import Button from '../components/Button';
import AppContext from '../context/AppContext';
import Code from '../components/Code';
import TitleBlock from '../components/Title';
import { Card, Select } from 'flowbite-react';
import InfoLink from '../components/InfoLink';
import axios from 'axios';
import { getClasses } from '../logic/api';

const ModelPage: NextPage = () => {
  const context = useContext(AppContext);
  const [classes, setClasses] = useState([]);

  return (
    <>
      <TitleBlock title="Model" subtitle="Provide the model that you want optimize." />
      <br />
      <div className="flex flex-wrap items-center justify-around space-x-4">
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
            setFile={async (file: File) => {
              context.setModelArchitecture(file);
              if (file !== null) {
                const res = await getClasses(file);
                setClasses(res.classes);
              } else {
                setClasses([]);
              }
            }}
            acceptedTypes={{ 'text/x-python': ['.py'] }}
          />
          {classes.length === 1 && (
            <p>
              Class found: <Code>{classes[0]}</Code>
            </p>
          )}
          {classes.length > 1 && (
            <div>
              <p>Select your model class: </p>
              <Select id="classes" required={true}>
                {classes.map((model_class) => (
                  <option>{model_class.name}</option>
                ))}
              </Select>
            </div>
          )}
          <InfoLink text="Why do I need a model architecture file?" info="Lorem Ipsum" />
        </Card>
      </div>
      <br />
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
