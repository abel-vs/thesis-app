import { Table } from 'flowbite-react';
import { NextPage } from 'next';
import Button from '../components/Button';
import Code from '../components/Code';
import TitleBlock from '../components/Title';

const TableTitle = ({ text }) => {
  return <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{text}</Table.Cell>;
};

const ResultsPage: NextPage = () => {
  return (
    <>
      <TitleBlock title="Results" subtitle="Compression is complete." />
      <div className="w-full my-10">
        <Table>
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
              <Table.Cell>98%</Table.Cell>
              <Table.Cell>96%</Table.Cell>
              <Table.Cell>2%</Table.Cell>
              <Table.Cell>-2%</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableTitle text="Model size" />
              <Table.Cell>24 MB</Table.Cell>
              <Table.Cell>4 MB</Table.Cell>
              <Table.Cell>20 MB</Table.Cell>
              <Table.Cell>-28%</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableTitle text="Number of parameters" />
              <Table.Cell>20890</Table.Cell>
              <Table.Cell>10020</Table.Cell>
              <Table.Cell>10670</Table.Cell>
              <Table.Cell>-52%</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableTitle text="Inference time" />
              <Table.Cell>20 ms</Table.Cell>
              <Table.Cell>15 ms</Table.Cell>
              <Table.Cell>5 ms</Table.Cell>
              <Table.Cell>-25%</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
      <div className="w-full">
        <Button text="Download Files" />
      </div>
    </>
  );
};

export default ResultsPage;
