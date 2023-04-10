import { Alert, Card, FileInput, Label, Radio, Select, Tabs, TextInput } from 'flowbite-react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useContext, useState } from 'react';
import Button from '../components/Button';
import TitleBlock from '../components/Title';
import { AppState, AppContext } from '../context/AppContext';
import Badge from '../components/Badge';
import { DATASETS, LOSS_FUNCTIONS, TASK_CATEGORIES, PERFORMANCE_METRICS, TASK_TYPES } from '../logic/datasets';
import InfoLink from '../components/InfoLink';
import router from 'next/router';
import { evaluateModel } from '../logic/api';
import { ButtonOption } from '../components/ButtonGroup';
import ButtonGroup from '../components/ButtonGroup';

const DataSetSelector = (context: AppState) => {
  return (
    <ul className="my-2 space-y-3">
      {DATASETS.map((option) => (
        <li key={option.name}>
          <div
            onClick={() => {
              document.getElementById(option.name)?.click();
              context.setDataset(option);
            }}
            className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
          >
            <Radio id={option.name} name="dataset" value={option.name} defaultChecked={context.dataset === option} />
            <a className="ml-3 flex-1 whitespace-nowrap">{option.name}</a>
            {option.type !== null ? <Badge>{option.type}</Badge> : null}
          </div>
        </li>
      ))}
    </ul>
  );
};

interface DatasetType {
  name: string;
  description: string;
}

const DataPage: NextPage = () => {
  const context = useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [taskCategory, setTaskCategory] = useState('Computer Vision');
  const [taskType, setTaskType] = useState(null);
  const [lossFunction, setLossFunction] = useState(null);
  const [metric, setMetric] = useState(null);
  const [trainData, setTrainData] = useState(null);
  const [testData, setTestData] = useState(null);

  const tabs: DatasetType[] = [
    { name: 'Existing Dataset', description: 'Choose an existing dataset.' },
    { name: 'Custom Dataset', description: 'Choose a custom dataset.' },
  ];
  const [selected, setSelected] = useState<DatasetType>(tabs[0]);

  return (
    <>
      <TitleBlock title="Data" subtitle="Select the dataset your model is trained and evaluated on." />

      <div className="w-full my-6">
        <Card className="text-left">
          <>
            <ButtonGroup
              options={tabs.map((tab) => {
                return {
                  name: tab.name,
                  object: tab,
                };
              })}
              onChange={(option: ButtonOption) => {
                // context.setDatasetType(value);
                option.object && setSelected(option.object as DatasetType);
              }}
              defaultSelected={tabs[0]}
            />
            {selected.name === 'Existing Dataset' ? (
              DataSetSelector(context)
            ) : (
              <div id="customForm">
                <div id="nameInput" className="my-3">
                  <div className="mb-2 block">
                    <Label htmlFor="name" value="Name" />
                  </div>
                  <TextInput id="name" placeholder="My custom dataset" required={true} />
                </div>
                <div id="taskCategorySelect" className="my-3">
                  <div className="mb-2 block">
                    <Label htmlFor="taskCategory" value="Task Category" />
                  </div>
                  <Select
                    id="taskCategory"
                    required={true}
                    value={taskCategory}
                    onChange={(event) => {
                      console.log('Category Select changed:', event.target.value);
                      setTaskCategory(event.target.value);
                    }}
                  >
                    {TASK_CATEGORIES.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </Select>
                </div>
                {taskCategory !== null && (
                  <div id="taskTypeSelect" className="my-3">
                    <div className="mb-2 block">
                      <Label htmlFor="taskType" value="Task Type" />
                    </div>
                    <Select id="taskType" required={true}>
                      {TASK_TYPES[taskCategory].map((type) => (
                        <option key={type}>{type}</option>
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
                    // helperText="Train Data"
                  />
                </div>
                <div id="testData" className="my-3">
                  <div className="mb-2 block">
                    <Label htmlFor="testData" value="Test Data" />
                  </div>
                  <FileInput
                    id="testData"
                    // helperText="Test Data"
                  />
                </div>
                <div id="lossSelect" className="my-3">
                  <div className="mb-2 block">
                    <Label htmlFor="loss" value="Loss Function" />
                  </div>
                  <Select id="loss" required={true}>
                    {Object.entries(LOSS_FUNCTIONS).map(([key, value]) => (
                      <option key={key}>{value.name}</option>
                    ))}
                  </Select>
                </div>
                <div id="performanceSelect" className="my-3">
                  <div className="mb-2 block">
                    <Label htmlFor="loss" value="Performance Metric" />
                  </div>
                  <Select id="loss" required={true}>
                    {Object.entries(PERFORMANCE_METRICS).map(([key, value]) => (
                      <option key={key}>{value.name}</option>
                    ))}
                  </Select>
                </div>
              </div>
            )}

            <InfoLink
              text="Why do I need to select a dataset?"
              info="The dataset is needed to evaluate performance and estimate the number of computations."
            />
          </>
        </Card>
      </div>

      <div className="flex flex-row w-full">
        <Link href="/model" className="flex-none w-10 mr-2">
          <Button text="&larr;" />
        </Link>

        <Button
          text="Analyze"
          disabled={context.dataset === null}
          loading={loading}
          onClick={async () => {
            setLoading(true);
            const res = await evaluateModel(context.modelStateFile, context.modelArchitectureFile, context.dataset);
            if (res === undefined) {
              setLoading(false);
              setErrorMessage('Something went wrong. Please try again later. ');
            } else if (!res.ok) {
              setLoading(false);
              setErrorMessage('Error: ' + res.statusText);
            } else {
              const results = await res.json();
              context.setOriginalResults(results);
              setLoading(false);
              router.push('/goal');
            }
          }}
        />
      </div>
      {errorMessage && (
        <>
          <Alert color="failure" onDismiss={() => setErrorMessage(null)} className="mt-4">
            {errorMessage}
          </Alert>
        </>
      )}
    </>
  );
};

export default DataPage;
