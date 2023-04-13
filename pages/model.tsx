import React, { useContext, useState } from 'react';
import type { NextPage } from 'next';
import DropZone from '../components/DropZone';
import Link from 'next/link';
import Button from '../components/Button';
import { AppContext } from '../interfaces/AppContext';
import Code from '../components/Code';
import TitleBlock from '../components/Title';
import { Card, Checkbox, Label, Radio, Select } from 'flowbite-react';
import InfoLink from '../components/InfoLink';
import { getModulesMethods } from '../logic/api';
import ErrorAlert from '../components/ErrorAlert';
import ButtonGroup, { ButtonOption } from '../components/ButtonGroup';
import { CodeIcon, CogIcon } from '@heroicons/react/solid';

const ModelPage: NextPage = () => {
  const context = useContext(AppContext);
  const [modules, setModules] = useState<string[]>([]);
  const [methods, setMethods] = useState<string[]>([]);

  const modelTypeOptions: ButtonOption[] = [
    {
      name: 'Module',
      icon: <CogIcon />,
    },
    { name: 'Method', icon: <CodeIcon /> },
  ];
  const [modelType, setModelType] = useState<ButtonOption>(modelTypeOptions[0]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <>
      <TitleBlock title="Model" subtitle="Provide the model that you want optimize." />
      <br />
      <div className="flex flex-wrap items-center justify-around gap-4 my-4">
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
            setFile={async (file: File | null) => {
              context.setModelArchitecture(file);
              if (file !== null) {
                const res = await getModulesMethods(file);
                if (res) {
                  if (res.modules) {
                    setModules(res.modules);
                    context.setModelDefinition({ name: res.modules[res.modules.length - 1], type: 'module' });
                  } else {
                    setModules([]);
                    setMethods([]);
                    context.setModelDefinition(null);
                    setErrorMessage('No modules found in file.');
                  }
                  if (res.methods) {
                    setMethods(res.methods);
                  }
                } else {
                  setErrorMessage('Error analyzing file.');
                }
              } else {
                setModules([]);
                setMethods([]);
                context.setModelDefinition(null);
              }
            }}
            acceptedTypes={{ 'text/x-python': ['.py'] }}
          />
          <InfoLink text="Why do I need a model architecture file?" info="Lorem Ipsum" />
        </Card>
      </div>
      {modules.length > 0 && (
        <Card className="text-left w-full">
          <h3 className="text-2xl font-bold">Model Class</h3>
          <p>
            {modules.length > 0 && methods.length > 0
              ? "Please select the module or method that defines your model's architecture."
              : modules.length > 0
              ? "Please select the module that defines your model's architecture."
              : "Please select the method that defines your model's architecture."}
          </p>
          {methods.length > 0 && (
            <ButtonGroup
              options={modelTypeOptions}
              defaultSelected={modelTypeOptions[0]}
              onChange={(tab) => {
                setModelType(tab);
                context.setModelDefinition({
                  name: tab.name === 'Module' ? modules[modules.length - 1] : methods[0],
                  type: tab.name,
                });
              }}
            />
          )}
          {methods.length === 0 || modelType.name === 'Module' ? (
            <Select
              id="modules"
              required={true}
              value={context.modelDefinition?.name}
              onChange={(event) => context.setModelDefinition({ name: event.target.value, type: 'Module' })}
            >
              {modules.map((module) => (
                <option key={module}>{module}</option>
              ))}
            </Select>
          ) : (
            methods.length > 0 &&
            modelType.name === 'Method' && (
              <Select
                id="methods"
                required={true}
                value={context.modelDefinition?.name}
                onChange={(event) => context.setModelDefinition({ name: event.target.value, type: 'Method' })}
              >
                {methods.map((method) => (
                  <option key={method}>{method}</option>
                ))}
              </Select>
            )
          )}
          <InfoLink text="What do I need to select?" info="Lorem Ipsum" />
        </Card>
      )}
      <br />
      <div className="flex flex-row w-full">
        <Link href="/" className="flex-none w-10 mr-2">
          <Button text="&larr;" />
        </Link>

        <Link href="/data" className="w-full">
          <Button
            text="Next"
            disabled={!context.modelStateFile || !context.modelArchitectureFile || !context.modelDefinition}
          />
        </Link>
      </div>
      <ErrorAlert errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    </>
  );
};

export default ModelPage;
