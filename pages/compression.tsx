import React, { useContext, useState } from 'react';
import router from 'next/router';
import type { NextPage } from 'next';
import Link from 'next/link';
import Button from '../components/Button';
import AppContext from '../context/AppContext';
import Code from '../components/Code';
import TitleBlock from '../components/Title';
import { BeakerIcon, CheckCircleIcon, ChipIcon, ScissorsIcon, QuestionMarkCircleIcon } from '@heroicons/react/solid';
import { Alert, Card } from 'flowbite-react';
import { compressModel } from '../logic/api';
import { getPerformanceMetric } from '../logic/datasets';

const CompressionIcon = ({ type }) => {
  if (type === 'pruning') {
    return <ScissorsIcon className="h-10 mr-2" />;
  } else if (type === 'quantization') {
    return <ChipIcon className="h-10 mr-2" />;
  } else if (type === 'distillation') {
    return <BeakerIcon className="h-10 mr-2" />;
  } else {
    return <QuestionMarkCircleIcon className="h-10 mr-2" />;
  }
};

const SelectableCard = ({ children, className, onClick }) => {
  const [selected, setSelected] = useState(true);
  return (
    <Card
      className={`${className} text-left relative outline outline-offset-0 outline-none rounded-md hover:bg-gray-100 ${
        selected ? 'outline-4 outline-green-500 shadow-lg' : ''
      }`}
      onClick={() => {
        setSelected(!selected);
        onClick(!selected);
      }}
    >
      {selected ? <CheckCircleIcon className="absolute top-3 right-3 w-8" color="green" /> : null}
      {children}
    </Card>
  );
};

const ActionCard = ({ action, onClick }) => {
  return (
    <SelectableCard
      className="m-6"
      key={action.name}
      onClick={onClick}
    >
      <h3 className="text-2xl font-bold flex flex-row items-center capitalize">
        <CompressionIcon type={action.type} />
        {action.type}
      </h3>
      <p className="mt-4">
        Suggested method: <Code>{action.name}</Code>
      </p>
      Settings: {<Code>{JSON.stringify(action.settings)}</Code>}
    </SelectableCard>
  );
};




const CompressionPage: NextPage = () => {
  const context = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  if (context.compressionActions === undefined) {
    router.push('/');
    return;
  } 

  const [selectedActions, setSelectedActions] = useState(context.compressionActions as Object[]) ;

  const removeAction = (value: Object) => {
    setSelectedActions(actions => actions.filter(element => element !== value));
  };

  const addAction = (action: Object) => {
    setSelectedActions(actions => [...actions, action]);
  };
  


  return (
    <>
      <TitleBlock
        title="Compression"
        subtitle="We analyzed your model and suggest the following compression actions."
      />
      {/* <p>{context.compressionActions[0.name]}</p> */}
      <div className="my-6 flex flex-wrap items-center justify-around">
        {context.compressionActions === null
          ? 'No actions suggested'
          : context.compressionActions.map((x) => <ActionCard action={x} onClick={
            (selected: boolean) => {
              if(selected){
                addAction(x)
              } else{
                removeAction(x)
              }
            }
          }/>)}

        <div className="flex flex-row w-full m-8">
          <Link href="/goal" className="flex-none w-10 mr-2">
            <Button text="&larr;" />
          </Link>

          <Button
            text="Compress"
            loading={loading}
            disabled={selectedActions.length === 0}
            onClick={async () => {
              setLoading(true);
              const res = await compressModel(context.modelStateFile, context.modelArchitectureFile, {
                actions: selectedActions,
                // actions: context.compressionActions.filter((action) => action.selected),
                dataset: context.dataset,
                performance_target: context.performanceTarget,
                compression_type: context.compressionType,
                compression_target: context.compressionTarget,
              });
              if (res == undefined) {
                setLoading(false);
                setErrorMessage('Something went wrong on the server. Please try again later. ');
              } else if (!res.ok) {
                setLoading(false);
                setErrorMessage('Error: ' + res.statusText);
                console.log(res);
                console.log(await res.json());
              } else {
                const data = await res.json();
                context.setOriginalResults(data.original_results);
                context.setCompressedResults(data.compressed_results);
                context.setCompressedFile(data.compressed_model);
                context.setCompressedArchitecture(data.compressed_architecture);
                setLoading(false);
                router.push('/results');
              }
            }}
          />
        </div>
        {errorMessage && (
          <Alert color="failure" onDismiss={() => setErrorMessage(null)}>
            {errorMessage}
          </Alert>
        )}
      </div>
    </>
  );
};

export default CompressionPage;
