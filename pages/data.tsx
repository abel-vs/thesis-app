import { Alert, Card, Radio } from 'flowbite-react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import Badge from '../components/Badge';
import Button from '../components/Button';
import ButtonGroup, { ButtonOption } from '../components/ButtonGroup';
import CustomDataForm from '../components/CustomDataForm';
import InfoLink from '../components/InfoLink';
import TitleBlock from '../components/Title';
import { AppContext, AppState } from '../context/AppContext';
import CustomDataset from '../interfaces/CustomDataset';
import { evaluateModel } from '../logic/api';
import DATASETS from '../logic/datasets';
import LOSS_FUNCTIONS from '../logic/losses';
import PERFORMANCE_METRICS from '../logic/metrics';
import TASK_CATEGORIES from '../logic/taskCategories';
import TASK_TYPES from '../logic/taskTypes';
import ErrorAlert from '../components/ErrorAlert';

const DataSetSelector = (context: AppState) => {
  return (
    <ul className="my-2 space-y-3">
      {DATASETS.map((dataset) => (
        <li key={dataset.name}>
          <div
            onClick={() => {
              document.getElementById(dataset.name)?.click();
              context.setDataset(dataset);
            }}
            className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
          >
            <Radio id={dataset.name} name="dataset" value={dataset.name} defaultChecked={context.dataset === dataset} />
            <a className="ml-3 flex-1 whitespace-nowrap">{dataset.name}</a>
            {dataset.type !== null ? <Badge>{dataset.type.name}</Badge> : null}
          </div>
        </li>
      ))}
    </ul>
  );
};

const DataPage: NextPage = () => {
  const context = useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const [customDataset, setCustomDataset] = useState<CustomDataset>({
    name: '',
    type: TASK_TYPES.ImageClassification,
    category: TASK_CATEGORIES[0],
    trainData: null,
    testData: null,
    loss: LOSS_FUNCTIONS.CELoss,
    metric: PERFORMANCE_METRICS.accuracy,
  });

  const tabs: ButtonOption[] = [{ name: 'Existing Dataset' }, { name: 'Custom Dataset' }];
  const [selected, setSelected] = useState<ButtonOption>(tabs[0]);

  return (
    <>
      <TitleBlock title="Data" subtitle="Select the dataset your model is trained and evaluated on." />
      <div className="w-full my-6">
        <Card className="text-left">
          <>
            <ButtonGroup options={tabs} onChange={setSelected} defaultSelected={tabs[0]} />
            {selected.name === tabs[0].name
              ? DataSetSelector(context)
              : CustomDataForm({ customDataset, setCustomDataset })}

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
          disabled={
            (selected.name === tabs[0].name && context.dataset === null) ||
            (selected.name === tabs[1].name && !Object.values(customDataset).every((value) => !!value))
          }
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
      <ErrorAlert errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    </>
  );
};

export default DataPage;
