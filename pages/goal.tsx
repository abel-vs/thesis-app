import { useContext, useState } from 'react';
import TitleBlock from '../components/Title';
import AppContext from '../context/AppContext';
import { CheckIcon, LightningBoltIcon, ClockIcon, DatabaseIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import Button from '../components/Button';
import Tabs from '../components/Tabs';
import { RangeSlider, RangeSliderProps, Alert, Table, Card } from 'flowbite-react';
import { Slider } from '@mui/joy';
import { analyzeModel } from '../logic/api';
import router from 'next/router';
import CompressionPage from './compression';
import { getPerformanceMetric } from '../logic/datasets';
import Code from '../components/Code';

const TableTitle = ({ text }) => {
  return <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{text}</Table.Cell>;
};

export default function Goal() {
  const context = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const results = context.originalResults;
  const nf = Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

  return (
    <>
      <TitleBlock title="Goal" subtitle="Select a compression and performance goal." />

      <Card className="w-full mt-10 text-left">
        <h3 className="text-2xl font-bold">Current Performance</h3>
        <Table className="border-spacing-2">
          <Table.Head>
            <Table.HeadCell>Metric</Table.HeadCell>
            <Table.HeadCell>Current</Table.HeadCell>
            <Table.HeadCell>Goal</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableTitle text="Accuracy" />
              <Table.Cell>{results.score.toFixed(2)} %</Table.Cell>
              <Table.Cell>{context.performanceTarget.toFixed(2)} %</Table.Cell>
            </Table.Row>

            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableTitle text="Model size" />
              <Table.Cell>{results.model_size.toFixed(2)} MB</Table.Cell>
              <Table.Cell>
                {context.compressionType === 'Model Size'
                  ? (results.model_size * (1 - context.compressionTarget / 100)).toFixed(2) + ' MB'
                  : '-'}
              </Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableTitle text="Number of parameters" />
              <Table.Cell>{nf.format(results.params)}</Table.Cell>
              <Table.Cell>
                {context.compressionType === 'Model Size'
                  ? nf.format(results.params * (1 - context.compressionTarget / 100))
                  : '-'}
              </Table.Cell>
            </Table.Row>

            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableTitle text="Number of MACs" />
              <Table.Cell>{nf.format(results.macs)}</Table.Cell>
              <Table.Cell>
                {context.compressionType === 'Energy Usage'
                  ? nf.format(results.macs * (1 - context.compressionTarget / 100))
                  : '-'}
              </Table.Cell>
            </Table.Row>

            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableTitle text="Inference time (per batch)" />
              <Table.Cell>{results.batch_duration.toFixed(2)} ms</Table.Cell>
              <Table.Cell>
                {context.compressionType === 'Inference Time'
                  ? (results.batch_duration * (1 - context.compressionTarget / 100)).toFixed(2) + ' ms'
                  : '-'}
              </Table.Cell>
            </Table.Row>

            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableTitle text="Inference time (per data point)" />
              <Table.Cell>{results.data_duration.toFixed(4)} ms</Table.Cell>
              <Table.Cell>
                {context.compressionType === 'Inference Time'
                  ? (results.data_duration * (1 - context.compressionTarget / 100)).toFixed(2) + ' ms'
                  : '-'}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Card>

      <Card className="w-full my-6 text-left">
        <h3 className="text-2xl font-bold">Compression Goal</h3>
        <p className="my-4">Select the compression goal you want to achieve.</p>
        <Tabs />
      </Card>

      <Card className=" w-full text-left">
        <h3 className="text-2xl font-bold">Performance Threshold</h3>
        <p className="my-4">
          Choose the maximal performance decrease. The model won't be further compressed if this would decrease the
          performance below this threshold.
        </p>
        <p>
          The <b>{context.dataset}</b> dataset uses <b>{getPerformanceMetric(context.dataset)}</b> as performance
          metric.
        </p>
        <label className="block mt-4 font-bold text-gray-900 dark:text-white">
          {getPerformanceMetric(context.dataset)} threshold : {context.performanceTarget}%
        </label>
        <Slider
          color="success"
          value={context.performanceTarget}
          max={results.score.toFixed(2)}
          onChange={(e) => context.setPerformanceTarget(e.target.value)}
        />
      </Card>

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
