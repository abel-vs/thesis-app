import { Table } from 'flowbite-react';
import { NextPage } from 'next';
import Button from '../components/Button';
import TitleBlock from '../components/Title';
import AppContext from '../context/AppContext';
import { useContext } from 'react';
import Link from 'next/link';
import { saveAs } from 'file-saver';

const TableTitle = ({ text }) => {
  return <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{text}</Table.Cell>;
};

const ResultsPage: NextPage = () => {
  const context = useContext(AppContext);

  const before = context.originalResults;
  const after = context.compressedResults;

  const nf = Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

  return (
    <>
      <TitleBlock title="Results" subtitle="Compression is complete." />
      <div className="w-full my-10">
        <Table className="border-spacing-2">
          <Table.Head>
            <Table.HeadCell></Table.HeadCell>
            <Table.HeadCell>Original Model</Table.HeadCell>
            <Table.HeadCell>Compressed Model</Table.HeadCell>
            <Table.HeadCell>Absolute Reduction</Table.HeadCell>
            <Table.HeadCell>Relative Reduction</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableTitle text="Accuracy" />
              <Table.Cell>{(before.score).toFixed(2)} %</Table.Cell>
              <Table.Cell>{(after.score).toFixed(2)} %</Table.Cell>
              <Table.Cell>{(before.score - after.score).toFixed(2)} %</Table.Cell>
              <Table.Cell>{((1 - after.score / before.score) * 100).toFixed(2)} %</Table.Cell>
            </Table.Row>

            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableTitle text="Model size" />
              <Table.Cell>{before.model_size.toFixed(2)} MB</Table.Cell>
              <Table.Cell>{after.model_size.toFixed(2)} MB</Table.Cell>
              <Table.Cell>{(before.model_size - after.model_size).toFixed(2)} MB</Table.Cell>
              <Table.Cell>{((1 - after.model_size / before.model_size) * 100).toFixed(2)} %</Table.Cell>
            </Table.Row>

            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableTitle text="Number of parameters" />
              <Table.Cell>{nf.format(before.params)}</Table.Cell>
              <Table.Cell>{nf.format(after.params)}</Table.Cell>
              <Table.Cell>{nf.format(before.params - after.params)}</Table.Cell>
              <Table.Cell>{((1 - after.params / before.params) * 100).toFixed(2)} %</Table.Cell>
            </Table.Row>

            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableTitle text="Number of MACs" />
              <Table.Cell>{nf.format(before.macs)}</Table.Cell>
              <Table.Cell>{nf.format(after.macs)}</Table.Cell>
              <Table.Cell>{nf.format(before.macs - after.macs)}</Table.Cell>
              <Table.Cell>{((1 - after.macs / before.macs) * 100).toFixed(2)} %</Table.Cell>
            </Table.Row>

            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableTitle text="Inference time (per batch)" />
              <Table.Cell>{before.batch_duration.toFixed(2)} ms</Table.Cell>
              <Table.Cell>{after.batch_duration.toFixed(2)} ms</Table.Cell>
              <Table.Cell>{(before.batch_duration - after.batch_duration).toFixed(2)} ms</Table.Cell>
              <Table.Cell>{((1 - after.batch_duration / before.batch_duration) * 100).toFixed(2)} %</Table.Cell>
            </Table.Row>

            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableTitle text="Inference time (per data point)" />
              <Table.Cell>{before.data_duration.toFixed(4)} ms</Table.Cell>
              <Table.Cell>{after.data_duration.toFixed(4)} ms</Table.Cell>
              <Table.Cell>{(before.data_duration - after.data_duration).toFixed(4)} ms</Table.Cell>
              <Table.Cell>{((1 - after.data_duration / before.data_duration) * 100).toFixed(2)} %</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
      <div className="w-full flex flex-row">
        <Link href="/compression" className="flex-none w-10 mr-2">
          <Button text="&larr;" />
        </Link>

        <Button
          text="Download"
          onClick={() => {
            saveAs(context.compressedFile.name, 'compressed_model.pth');
          }}
        />
      </div>
      {/* <a href={context.compressedFile.name} download>
        Click to download
      </a> */}
    </>
  );
};

export default ResultsPage;
