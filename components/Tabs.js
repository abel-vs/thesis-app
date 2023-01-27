import { CheckIcon, LightningBoltIcon, ClockIcon, DatabaseIcon } from '@heroicons/react/solid';
import { RangeSlider } from 'flowbite-react';
import { useState } from 'react';

const tabs = [
  {
    name: 'Model Size',
    icon: <DatabaseIcon />,
    description:
      'This goal aims to reduce the size of the model. It is achieved by reducing the number of parameters and the size of the parameters.',
  },
  {
    name: 'Inference Time',
    icon: <ClockIcon />,
    description:
      'This goal aims to reduce the inference time of the model. It is achieved by reducing the number of operations and optimizing the model for more time-efficient hardware.',
  },
  {
    name: 'Energy Usage',
    icon: <LightningBoltIcon />,
    description:
      'This goal aims to reduce the energy consumption of the model. It is achieved by reducing the number of operations and optimizing the model for more energy-efficient hardware.',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Tabs() {
  const [selected, setSelected] = useState(tabs[0]);
  const [target, setTarget] = useState(95);

  return (
    <div>
      {/* For small screens */}
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
          defaultValue={selected.name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      {/* For large screens */}
      <div className="hidden sm:block ">
        <nav className="flex space-x-4 bg-gray-100 rounded-lg" aria-label="Tabs">
          {tabs.map((tab) => (
            <a
              key={tab.name}
              className={classNames(
                tab === selected ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:text-gray-700',
                'px-3 py-2 font-medium text-sm rounded-lg flex-1 text-center'
              )}
              aria-current={tab.index ? 'page' : undefined}
              onClick={() => {
                setSelected(tab);
              }}
            >
              <div className="flex flex-row justify-center">
                <div
                  className={classNames(tab === selected ? 'text-green-500' : 'text-gray-500', 'w-5 h-5 mr-2 ')}
                  aria-hidden="true"
                >
                  {tab.icon}
                </div>
                {/* {tab === selected && <CheckCircleIcon className="w-5 h-5 mr-2 text-green-500" aria-hidden="true" />} */}
                {tab.name}
              </div>
            </a>
          ))}
        </nav>
      </div>
      {/* Content */}
      <div className="mt-4">
        {selected !== null ? selected.description : null}

        <label className="block mt-4 font-bold text-gray-900 dark:text-white">Target compression: {target}%</label>
        <input
          type="range"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-red-500"
        />

        {/* <RangeSlider className="text-green-500" value={target} /> */}
      </div>
    </div>
  );
}
