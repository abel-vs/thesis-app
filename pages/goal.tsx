import { Slider } from '@mui/joy';
import { Alert, Card, Table } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import Button from '../components/Button';
import Tabs from '../components/Tabs';
import TitleBlock from '../components/Title';
import { analyzeModel } from '../logic/api';
import { AppContext } from '../interfaces/AppContext';
import Action from '../interfaces/Action';

interface TableTitleProps {
  text: string;
}

const TableTitle = ({ text }: TableTitleProps) => {
  return <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{text}</Table.Cell>;
};

export default function Goal() {
  const context = useContext(AppContext);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const results = context.originalResults;
  const nf = Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

  return (
    <>
      <TitleBlock title="Goal" subtitle="Select a compression and performance goal." />

      <Card className="w-full mt-10 text-left">
        <h3 className="text-2xl font-bold">Current Performance</h3>

        {results ? (
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
                  {context.compressionType.code === 'size'
                    ? (results.model_size * (1 - context.compressionTarget / 100)).toFixed(2) + ' MB'
                    : '-'}
                </Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableTitle text="Number of parameters" />
                <Table.Cell>{nf.format(results.params)}</Table.Cell>
                <Table.Cell>
                  {context.compressionType.code === 'size'
                    ? nf.format(results.params * (1 - context.compressionTarget / 100))
                    : '-'}
                </Table.Cell>
              </Table.Row>

              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableTitle text="Number of MACs" />
                <Table.Cell>{nf.format(results.macs)}</Table.Cell>
                <Table.Cell>
                  {context.compressionType.code === 'flops'
                    ? nf.format(results.macs * (1 - context.compressionTarget / 100))
                    : '-'}
                </Table.Cell>
              </Table.Row>

              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableTitle text="Inference time (per batch)" />
                <Table.Cell>{results.batch_duration.toFixed(2)} ms</Table.Cell>
                <Table.Cell>
                  {context.compressionType.code === 'time'
                    ? (results.batch_duration * (1 - context.compressionTarget / 100)).toFixed(2) + ' ms'
                    : '-'}
                </Table.Cell>
              </Table.Row>

              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableTitle text="Inference time (per data point)" />
                <Table.Cell>{results.data_duration.toFixed(4)} ms</Table.Cell>
                <Table.Cell>
                  {context.compressionType.code === 'time'
                    ? (results.data_duration * (1 - context.compressionTarget / 100)).toFixed(2) + ' ms'
                    : '-'}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        ) : (
          <Alert color="warning">No results available. Please run an analysis first.</Alert>
        )}
      </Card>

      <Card className="w-full my-6 text-left">
        <h3 className="text-2xl font-bold">Compression Goal</h3>
        <p className="my-4">Select the compression goal you want to achieve.</p>
        <Tabs />
        <label className="block mt-4 font-bold text-gray-900 dark:text-white">
          Target {context.compressionType.name.toLowerCase()} reduction: {context.compressionTarget}%
        </label>
        <Slider
          color="success"
          value={context.compressionTarget}
          onChange={(e) => e.target && context.setCompressionTarget(e.target.value)}
        />
      </Card>

      <Card className=" w-full text-left">
        <h3 className="text-2xl font-bold">Performance Threshold</h3>
        <p className="my-4">
          Choose the maximal performance decrease. The model won`&apos;`t be further compressed if this would decrease
          the performance below this threshold.
        </p>
        {context.dataset ? (
          <>
            <p>
              The <b>{context.dataset.name}</b> dataset uses <b>{context.dataset.metric.name}</b> as performance metric.
            </p>
            <label className="block mt-4 font-bold text-gray-900 dark:text-white">
              {context.dataset.metric.name} threshold : {context.performanceTarget}%
            </label>
            <Slider
              color="success"
              value={context.performanceTarget}
              max={results?.score.toFixed(2)}
              onChange={(e) => e.target && context.setPerformanceTarget(e.target.value)}
            />
          </>
        ) : (
          <Alert color="warning">No dataset available. Please select one first.</Alert>
        )}
      </Card>

      <div className="flex flex-row w-full m-8">
        <Link href="/data" className="flex-none w-10 mr-2">
          <Button text="&larr;" />
        </Link>

        <Button
          text="Analyze"
          className="w-full"
          loading={loading}
          disabled={context.modelStateFile && context.modelArchitectureFile ? false : true}
          onClick={async () => {
            setLoading(true);
            const compression_actions: Action[] =
              context.modelStateFile &&
              context.modelArchitectureFile &&
              context.modelDefinition &&
              context.dataset &&
              (await analyzeModel(context.modelStateFile, context.modelArchitectureFile, context.modelDefinition, {
                compression_goal: context.compressionType.code,
                compression_target: context.compressionTarget,
                performance_metric: context.dataset.metric.name,
                performance_target: context.performanceTarget,
                dataset: context.dataset.name,
              }));
            if (compression_actions === undefined) {
              setLoading(false);
              setErrorMessage('An error occured while analyzing the model.');
            } else {
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
