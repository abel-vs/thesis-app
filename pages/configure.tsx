import { Tabs } from 'flowbite-react';
import { useContext } from 'react';
import Code from '../components/Code';
import TitleBlock from '../components/Title';
import AppContext from '../context/AppContext';

export default function Configure() {
  const context = useContext(AppContext);

  return (
    <>
      <TitleBlock title="Configure" subtitle="Select a compression and performance goal." />
      <a className="mt-6 w-shrink rounded-xl border p-6 text-left">
        <h3 className="text-2xl font-bold">Compression Goal</h3>
        <p className="mt-4">
          This file contains the architecture of your model. It should be a <Code text=".py" /> file.
        </p>
        <div className="bg-gray-100 mt-10"></div>
      </a>
      <p>{context.modelArchitectureFile !== null ? context.modelArchitectureFile.name : 'No File'}</p>
    </>
  );
}
