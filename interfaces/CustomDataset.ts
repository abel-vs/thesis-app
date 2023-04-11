import Dataset from './Dataset';
import Loss from './Loss';
import Metric from './Metric';
import TaskType from './TaskType';

export default interface CustomDataset extends Dataset {
  name: string;
  type: TaskType;
  category: string;
  metric: Metric;
  trainData: File | null;
  testData: File | null;
  loss: Loss;
}
