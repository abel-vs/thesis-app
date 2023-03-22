import React, { useState } from 'react';
import { Select, Label, FileInput } from 'flowbite-react';
import { TASK_CATEGORIES, TASK_TYPES, LOSS_FUNCTIONS, PERFORMANCE_METRICS } from '../logic/datasets';

export default function CustomData() {
  const [taskCategory, setTaskCategory] = useState(null);
  const [taskType, setTaskType] = useState(null);
  const [lossFunction, setLossFunction] = useState(null);
  const [metric, setMetric] = useState(null);
  const [trainData, setTrainData] = useState(null);
  const [testData, setTestData] = useState(null);

  return (
    <div id="customForm">
      <div id="taskCategorySelect" className="my-3">
        <div className="mb-2 block">
          <Label htmlFor="taskCategory" value="Task Category" />
        </div>
        <Select id="taskCategory" required={true} onSelect={(value) => setTaskCategory(value)}>
          {TASK_CATEGORIES.map((category) => (
            <option>{category}</option>
          ))}
        </Select>
      </div>
      {
        taskType === null ? null :
        <div id="taskTypeSelect" className="my-3">
          <div className="mb-2 block">
            <Label htmlFor="taskType" value="Task Type" />
          </div>
          <Select id="taskType" required={true} onSelect={setTaskType}>
            {TASK_TYPES[taskCategory].map(([key, value]) => (
              <option>{value.name}</option>
            ))}
          </Select>
        </div>
      }
      <div id="trainData" className="my-3">
        <div className="mb-2 block">
          <Label htmlFor="trainData" value="Train Data" />
        </div>
        <FileInput
          id="trainData"
          onSelect={setTrainData}
          // helperText="Train Data"
        />
      </div>
      <div id="testData" className="my-3">
        <div className="mb-2 block">
          <Label htmlFor="testData" value="Test Data" />
        </div>
        <FileInput
          id="testData"
          onSelect={setTestData}
          // helperText="Test Data"
        />
      </div>
      <div id="lossSelect" className="my-3">
        <div className="mb-2 block">
          <Label htmlFor="loss" value="Loss Function" />
        </div>
        <Select id="loss" required={true} onSelect={setLossFunction}>
          {Object.entries(LOSS_FUNCTIONS).map(([key, value]) => (
            <option>{value.name}</option>
          ))}
        </Select>
      </div>
      <div id="performanceSelect" className="my-3">
        <div className="mb-2 block">
          <Label htmlFor="loss" value="Performance Metric" />
        </div>
        <Select id="loss" required={true} onSelect={setMetric}>
          {Object.entries(PERFORMANCE_METRICS).map(([key, value]) => (
            <option>{value.name}</option>
          ))}
        </Select>
      </div>
    </div>
  );
}
