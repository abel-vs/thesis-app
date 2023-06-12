import { LightningBoltIcon, ClockIcon, DatabaseIcon } from '@heroicons/react/solid';
import { useState, useContext } from 'react';
import { AppContext } from '../interfaces/AppContext';
import ButtonGroup from './ButtonGroup';

interface Tab {
  name: string;
  code: string;
  icon: JSX.Element;
  description: string;
}

const tabs: Tab[] = [
  {
    name: 'Model Size',
    code: 'size',
    icon: <DatabaseIcon />,
    description:
      'This goal aims to reduce the size of the model. It is achieved by reducing the number of parameters and the size of the parameters.',
  },
  {
    name: 'Inference Time',
    code: 'time',
    icon: <ClockIcon />,
    description:
      'This goal aims to reduce the inference time of the model. It is achieved by reducing the number of operations and optimizing the model for more time-efficient hardware.',
  },
  {
    name: 'Energy Usage',
    code: 'energy',
    icon: <LightningBoltIcon />,
    description:
      'This goal aims to reduce the energy consumption of the model. It is achieved by reducing the number of operations and optimizing the model for more energy-efficient hardware.',
  },
];

export default function Tabs() {
  const context = useContext(AppContext);
  const [selected, setSelected] = useState<Tab>(tabs.find((x) => x.name === context.compressionType.name) ?? tabs[0]);

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
          onChange={(e) => {
            setSelected(tabs.find((x) => x.name === e.target.value) ?? tabs[0]);
            context.setCompressionType({ name: selected.name, code: selected.code });
          }}
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
          onChange={(tab) => context.setCompressionType({ name: tab.name, code: tab.code })}
        />
      </div>
      {/* Content */}
      <div className="mt-4">{selected !== null ? selected.description : null}</div>
    </div>
  );
}
