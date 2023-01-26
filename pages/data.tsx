import { NextPage } from 'next';
import Link from 'next/link';
import { useContext } from 'react';
import Button from '../components/Button';
import TitleBlock from '../components/Title';
import AppContext from '../context/AppContext';

const DataPage: NextPage = () => {
  const context = useContext(AppContext);

  return (
    <>
      <TitleBlock title="Data" subtitle="Select the dataset your model is trained on or provide a custom one." />
      <div className="flex flex-row w-full m-8">
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
