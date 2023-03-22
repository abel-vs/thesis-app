import React, { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function ButtonGroup({ options, defaultSelected, onChange }) {
  const [selected, setSelected] = useState(defaultSelected);

  const handleClick = (option) => {
    setSelected(option);
    onChange(option);
  };

  return (
    <nav className="flex space-x-4 bg-gray-100 rounded-lg" aria-label="Tabs">
      {options.map((option) => (
        <a
          key={option.name}
          className={classNames(
            option.name === selected.name ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:text-gray-700',
            'px-3 py-2 font-medium text-sm rounded-lg flex-1 text-center'
          )}
          aria-current={option.index ? 'page' : undefined}
          onClick={() => handleClick(option)}
        >
          <div className="flex flex-row justify-center">
            <div
              className={classNames(option.name === selected.name ? 'text-green-500' : 'text-gray-500', 'w-5 h-5 mr-2 ')}
              aria-hidden="true"
            >
              {option.icon ?? (option.name === selected.name && <CheckCircleIcon className="w-5 h-5 mr-2 text-green-500" aria-hidden="true" />)}
            </div>
            {option.name}
          </div>
        </a>
      ))}
    </nav>
  );
}

export default ButtonGroup;
