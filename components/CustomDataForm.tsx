import { FileInput, Label, Select, TextInput } from 'flowbite-react';
import CustomDataset from '../interfaces/CustomDataset';
import LOSS_FUNCTIONS from '../logic/losses';
import PERFORMANCE_METRICS from '../logic/metrics';
import TASK_CATEGORIES from '../logic/taskCategories';
import TASK_TYPES from '../logic/taskTypes';

interface CustomDataFormProps {
  customDataset: CustomDataset;
  setCustomDataset: (customDataset: CustomDataset) => void;
}

const CustomDataForm = ({ customDataset, setCustomDataset }: CustomDataFormProps) => {
  return (
    <div id="customForm">
      <div id="nameInput" className="my-3">
        <div className="mb-2 block">
          <Label htmlFor="name" value="Name" />
        </div>
        <TextInput
          id="name"
          placeholder="My custom dataset"
          required={true}
          onChange={(event) => {
            setCustomDataset({
              ...customDataset,
              name: event.target.value,
            });
          }}
        />
      </div>
      <div id="taskCategorySelect" className="my-3">
        <div className="mb-2 block">
          <Label htmlFor="taskCategory" value="Task Category" />
        </div>
        <Select
          id="taskCategory"
          required={true}
          value={customDataset.category}
          onChange={(event) => {
            setCustomDataset({ ...customDataset, category: event.target.value });
          }}
        >
          {TASK_CATEGORIES.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </Select>
      </div>
      {customDataset.category !== null && (
        <div id="taskTypeSelect" className="my-3">
          <div className="mb-2 block">
            <Label htmlFor="taskType" value="Task Type" />
          </div>
          <Select
            id="taskType"
            required={true}
            value={customDataset.type.name}
            onChange={(event) => {
              setCustomDataset({
                ...customDataset,
                type: Object.values(TASK_TYPES).filter((task) => task.name === event.target.value)[0],
              });
            }}
          >
            {Object.values(TASK_TYPES)
              .filter((task) => task.category === customDataset.category)
              .map((task) => (
                <option key={task.name}>{task.name}</option>
              ))}
          </Select>
        </div>
      )}
      <div id="trainData" className="my-3">
        <div className="mb-2 block">
          <Label htmlFor="trainData" value="Train Data" />
        </div>
        <FileInput
          id="trainData"
          onChange={(event) => {
            setCustomDataset({
              ...customDataset,
              trainData: event.target.files ? event.target.files[0] : null,
            });
          }}
        />
      </div>
      <div id="testData" className="my-3">
        <div className="mb-2 block">
          <Label htmlFor="testData" value="Test Data" />
        </div>
        <FileInput
          id="testData"
          onChange={(event) => {
            setCustomDataset({
              ...customDataset,
              testData: event.target.files ? event.target.files[0] : null,
            });
          }}
        />
      </div>
      <div id="lossSelect" className="my-3">
        <div className="mb-2 block">
          <Label htmlFor="loss" value="Loss Function" />
        </div>
        <Select
          id="loss"
          required={true}
          value={customDataset.loss.name}
          onChange={(event) => {
            setCustomDataset({
              ...customDataset,
              loss: Object.values(LOSS_FUNCTIONS).filter((loss) => loss.name === event.target.value)[0],
            });
          }}
        >
          {Object.entries(LOSS_FUNCTIONS).map(([key, value]) => (
            <option key={key}>{value.name}</option>
          ))}
        </Select>
      </div>
      <div id="performanceSelect" className="my-3">
        <div className="mb-2 block">
          <Label htmlFor="loss" value="Performance Metric" />
        </div>
        <Select
          id="metric"
          required={true}
          value={customDataset.metric.name}
          onChange={(event) => {
            setCustomDataset({
              ...customDataset,
              metric: Object.values(PERFORMANCE_METRICS).filter((metric) => metric.name === event.target.value)[0],
            });
          }}
        >
          {Object.entries(PERFORMANCE_METRICS).map(([key, value]) => (
            <option key={key}>{value.name}</option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default CustomDataForm;
