import { CheckIcon, LightningBoltIcon, ClockIcon, DatabaseIcon } from '@heroicons/react/solid';
import { useState, useContext } from 'react';
import { Slider } from '@mui/joy';
import AppContext from '../context/AppContext';
import ButtonGroup from './ButtonGroup';


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


export default function Tabs() {
  const context = useContext(AppContext);
  const [selected, setSelected] = useState(tabs.find(x => x.name === context.compressionType));

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
          onChange={(e) => context.setCompressionType(e.target.value)
          }
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
          onTabChange={(tab) => context.setCompressionType(tab.name)} />
      </div>
      {/* Content */}
      <div className="mt-4">
        {selected !== null ? selected.description : null}

        <label className="block mt-4 font-bold text-gray-900 dark:text-white">
          Target {context.compressionType.toLowerCase()}: {context.compressionTarget}%
        </label>
        <Slider
          color="success"
          value={context.compressionTarget}
          onChange={(e) => context.setCompressionTarget(e.target.value)}
        />
      </div>
    </div>
  );
}
