import { useContext, useState } from 'react';
import TitleBlock from '../components/Title';
import AppContext from '../context/AppContext';
import { CheckIcon, LightningBoltIcon, ClockIcon, DatabaseIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import Button from '../components/Button';
import Tabs from '../components/Tabs';
import { RangeSlider, RangeSliderProps } from 'flowbite-react';
import { Slider } from '@mui/joy';
// import { Tabs } from 'flowbite-react';

export default function Goal() {
  const context = useContext(AppContext);

  const [performanceTarget, setPerformanceTarget] = useState(95);

  return (
    <>
      <TitleBlock title="Goal" subtitle="Select a compression and performance goal." />
      <div className="w-full my-6 rounded-xl border p-6 text-left">
        <h3 className="text-2xl font-bold">Compression Goal</h3>
        <p className="my-4">Select the compression goal you want to achieve.</p>
        <Tabs />
      </div>
      <div className=" w-full rounded-xl border p-6 text-left">
        <h3 className="text-2xl font-bold">Performance Goal</h3>
        <p className="my-4">Choose the maximal performance decrease. </p>
        <label className="block mt-4 font-bold text-gray-900 dark:text-white">
          Target performance: {performanceTarget}%
        </label>
        <Slider color="success" value={performanceTarget} onChange={(e) => setPerformanceTarget(e.target.value)} />
      </div>

      <div className="flex flex-row w-full m-8">
        <Link href="/data" className="flex-none w-10 mr-2">
          <Button text="&larr;" />
        </Link>
        <Link href="/compression" className="w-full">
          <Button text="Analyze" />
        </Link>
      </div>
    </>
  );
}
