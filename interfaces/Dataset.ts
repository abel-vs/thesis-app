import Metric from './Metric';
import TaskType from './TaskType';

export default interface Dataset {
  name: string;
  type: TaskType;
  category: string;
  metric: Metric;
}
