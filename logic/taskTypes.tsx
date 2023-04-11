import TaskType from '../interfaces/TaskType';

const TASK_TYPES: Record<string, TaskType> = {
  ImageClassification: {
    name: 'Image Classification',
    category: 'Computer Vision',
  },
  ObjectDetection: {
    name: 'Object Detection',
    category: 'Computer Vision',
  },
  ImageSegmentation: {
    name: 'Image Segmentation',
    category: 'Computer Vision',
  },
  TextClassification: {
    name: 'Text Classification',
    category: 'Natural Language Processing',
  },
  TextGeneration: {
    name: 'Text Generation',
    category: 'Natural Language Processing',
  },
  QuestionAnswering: {
    name: 'Question Answering',
    category: 'Natural Language Processing',
  },
  MachineTranslation: {
    name: 'Machine Translation',
    category: 'Natural Language Processing',
  },
  Summarization: {
    name: 'Summarization',
    category: 'Natural Language Processing',
  },
};

export default TASK_TYPES;
