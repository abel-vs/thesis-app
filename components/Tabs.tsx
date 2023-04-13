import { LightningBoltIcon, ClockIcon, DatabaseIcon } from '@heroicons/react/solid';
import { useState, useContext } from 'react';
import { Slider } from '@mui/joy';
import { AppContext } from '../interfaces/AppContext';
import ButtonGroup from './ButtonGroup';

interface Tab {
  name: string;
  icon: JSX.Element;
  description: string;
}

const tabs: Tab[] = [
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

export default function Tabs() {
  const context = useContext(AppContext);
  const [selected, setSelected] = useState<Tab>(tabs.find((x) => x.name === context.compressionType) ?? tabs[0]);

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
          onChange={(e) => context.setCompressionType(e.target.value)}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      {/* For large screens */}

      <div className="hidden sm:block ">
        <ButtonGroup
          options={tabs}
          defaultSelected={tabs[0]}
          onChange={(tab) => context.setCompressionType(tab.name)}
        />
      </div>
      {/* Content */}
      <div className="mt-4">{selected !== null ? selected.description : null}</div>
    </div>
  );
}
