import { Card, Radio } from 'flowbite-react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useContext } from 'react';
import Button from '../components/Button';
import Code from '../components/Code';
import TitleBlock from '../components/Title';
import AppContext from '../context/AppContext';
import Badge from '../components/Badge';

const DataPage: NextPage = () => {
  const context = useContext(AppContext);

  const options = [
    { name: 'MNIST', type: 'Image Classification' },
    { name: 'GLUE', type: 'Text Classification' },
    { name: 'WikiText', type: 'Text Generation' },
  ];

  return (
    <>
      <TitleBlock title="Data" subtitle="Select the dataset your model is trained on or provide a custom one." />

      <div className="w-full my-6">
        <Card className="text-left">
          <h5 className="text-base font-semibold text-gray-900 dark:text-white text-3xl">Dataset</h5>
          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Choose an existing dataset or provide a custom one.{' '}
          </p>
          <ul className="my-2 space-y-3">
            {options.map((option) => (
              <li key={option.name}>
                <a
                  onClick={() => {
                    document.getElementById(option.name)?.click();
                    // context.setDataSet('customDataset');
                  }}
                  className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                >
                  <Radio id={option.name} name="dataset" value={option.name} defaultChecked={false} />
                  <a className="ml-3 flex-1 whitespace-nowrap">{option.name}</a>
                  <Badge>{option.type}</Badge>
                </a>
              </li>
            ))}
            <li key="custom">
              <a className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500">
                <a className="ml-3 flex-1 whitespace-nowrap text-gray-400">Custom Dataset</a>
                <Badge>Coming Soon</Badge>
              </a>
            </li>
          </ul>
          <div>
            <a
              href="#"
              className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
            >
              Why do I need to select a dataset?
            </a>
          </div>
        </Card>
      </div>

      <div className="flex flex-row w-full">
        <Link href="/model" className="flex-none w-10 mr-2">
          <Button text="&larr;" />
        </Link>

        <Link href="/goal" className="w-full">
          <Button text="Next" />
        </Link>
      </div>
    </>
  );
};

export default DataPage;
