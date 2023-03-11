import { useContext, useState } from 'react';
import TitleBlock from '../components/Title';
import AppContext from '../context/AppContext';
import { CheckIcon, LightningBoltIcon, ClockIcon, DatabaseIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import Button from '../components/Button';
import Tabs from '../components/Tabs';
import { RangeSlider, RangeSliderProps, Alert } from 'flowbite-react';
import { Slider } from '@mui/joy';
import { analyzeModel } from '../logic/api';
import router from 'next/router';
import CompressionPage from './compression';
import { getPerformanceMetric } from '../logic/datasets';
import Code from '../components/Code';
// import { Tabs } from 'flowbite-react';

export default function Goal() {
  const context = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  return (
    <>
      <TitleBlock title="Goal" subtitle="Select a compression and performance goal." />
      <div className="w-full my-6 rounded-xl border p-6 text-left">
        <h3 className="text-2xl font-bold">Compression Goal</h3>
        <p className="my-4">Select the compression goal you want to achieve.</p>
        <Tabs />
      </div>
      <div className=" w-full rounded-xl border p-6 text-left">
        <h3 className="text-2xl font-bold">Performance Threshold</h3>
        <p className="my-4">
          Choose the maximal performance decrease. The model won't be further compressed if this would decrease the
          performance below this threshold.
        </p>
        <p>
          The <b>{context.dataset}</b> dataset uses <b>{getPerformanceMetric(context.dataset)}</b> as performance metric.

        </p>
        <label className="block mt-4 font-bold text-gray-900 dark:text-white">
          Target {getPerformanceMetric(context.dataset)}: {context.performanceTarget}%
        </label>
        <Slider
          color="success"
          value={context.performanceTarget}
          onChange={(e) => context.setPerformanceTarget(e.target.value)}
        />
      </div>

      <div className="flex flex-row w-full m-8">
        <Link href="/data" className="flex-none w-10 mr-2">
          <Button text="&larr;" />
        </Link>

        <Button
          text="Analyze"
          className="w-full"
          loading={loading}
          onClick={async () => {
            setLoading(true);
            const compression_actions: [] = await analyzeModel(context.modelStateFile, context.modelArchitectureFile, {
              compression_goal: context.compressionType,
              compression_target: context.compressionTarget,
              performance_metric: getPerformanceMetric(context.dataset),
              performance_target: context.performanceTarget,
            });
            if (compression_actions === undefined) {
              setLoading(false);
              setErrorMessage('An error occured while analyzing the model.');
            } else {
              compression_actions.forEach((action) => {
                action.selected = true;
              });
              console.log(compression_actions);
              context.setCompressionActions(compression_actions);
              setLoading(false);
              router.push('/compression');
            }
          }}
        />
      </div>
      {errorMessage && (
        <>
          <Alert color="failure" onDismiss={() => setErrorMessage(null)}>
            {errorMessage}
          </Alert>
        </>
      )}
    </>
  );
}
