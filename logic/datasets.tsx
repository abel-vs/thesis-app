import Dataset from '../interfaces/Dataset';
import PERFORMANCE_METRICS from './metrics';
import TASK_TYPES from './taskTypes';

const DATASETS: Dataset[] = [
  {
    name: 'MNIST',
    type: TASK_TYPES.ImageClassification,
    category: 'Computer Vision',
    metric: PERFORMANCE_METRICS.accuracy,
  },
  {
    name: 'GLUE',
    type: TASK_TYPES.TextClassification,
    category: 'Natural Language Processing',
    metric: PERFORMANCE_METRICS.accuracy,
  },
  {
    name: 'CIFAR-10',
    type: TASK_TYPES.ImageClassification,
    category: 'Computer Vision',
    metric: PERFORMANCE_METRICS.accuracy,
  },
  {
    name: 'WikiText',
    type: TASK_TYPES.TextGeneration,
    category: 'Natural Language Processing',
    metric: PERFORMANCE_METRICS.perplexity,
  },
];

export default DATASETS;
