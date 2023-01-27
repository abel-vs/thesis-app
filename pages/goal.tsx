import { useContext } from 'react';
import TitleBlock from '../components/Title';
import AppContext from '../context/AppContext';
import { CheckIcon, LightningBoltIcon, ClockIcon, DatabaseIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import Button from '../components/Button';
import Tabs from '../components/Tabs';
// import { Tabs } from 'flowbite-react';

export default function Goal() {
  const context = useContext(AppContext);

  return (
    <>
      <TitleBlock title="Goal" subtitle="Select a compression and performance goal." />
      <div className="w-full my-6 rounded-xl border p-6 text-left">
        <h3 className="text-2xl font-bold">Compression Goal</h3>
        <p className="my-4">Select the compression goal you want to achieve.</p>
        <Tabs />
        {/* <Tabs.Group aria-label="Data options" style="underline" className="w-full" color="succes">
            <Tabs.Item title="Model Size" icon={DatabaseIcon} className="">
              This goal aims to reduce the size of the model. It is achieved by reducing the number of parameters and
              the size of the parameters.
            </Tabs.Item>
            <Tabs.Item active={true} title="Inference Time" icon={ClockIcon}>
              This goal aims to reduce the inference time of the model. It is achieved by reducing the number of
              operations and optimizing the model for more time-efficient hardware.
            </Tabs.Item>
            <Tabs.Item active={true} title="Energy Cost" icon={LightningBoltIcon}>
              This goal aims to reduce the energy consumption of the model. It is achieved by reducing the number of
              operations and optimizing the model for more energy-efficient hardware.
            </Tabs.Item>
          </Tabs.Group> */}
      </div>
      <div className=" w-full rounded-xl border p-6 text-left">
        <h3 className="text-2xl font-bold">Performance Goal</h3>
        <p className="my-4">Choose the maximal performance decrease. </p>
        <div className="bg-gray-100 h-40 rounded-xl"></div>
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
