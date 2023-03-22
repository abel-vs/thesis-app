const TASK_CATEGORIES = ['Computer Vision', 'Natural Language Processing'];

const TASK_TYPES = {
  'Computer Vision': ['Image Classification', 'Object Detection', 'Image Segmentation'],
  'Natural Language Processing': [
    'Text Classification',
    'Text Generation',
    'Question Answering',
    'Machine Translation',
    'Summarization',
  ],
};

const DATASETS = [
  {
    name: 'MNIST',
    type: 'Image Classification',
  },
  {
    name: 'GLUE',
    type: 'Text Classification',
  },
  {
    name: 'CIFAR-10',
    type: 'Image Classification',
  },
  {
    name: 'WikiText',
    type: 'Text Generation',
  },
];

const LOSS_FUNCTIONS = {
  CELoss: {
    name: 'CrossEntropyLoss',
    info: 'This loss function is commonly used for multi-class classification problems. It applies a softmax function to the model output and computes the negative log-likelihood loss between the predicted probabilities and the true labels.',
  },
  BCELoss: {
    name: 'BinaryCrossEntropyLoss',
    info: 'This loss function is commonly used for binary classification problems. It applies a sigmoid function to the model output and computes the binary cross-entropy loss between the predicted probabilities and the true labels.',
  },
  MSELoss: {
    name: 'MSELoss',
    info: 'This loss function is commonly used for regression problems. It computes the mean squared error between the predicted values and the true values.',
  },
  L1Loss: {
    name: 'L1Loss',
    info: 'This loss function is also commonly used for regression problems. It computes the mean absolute error between the predicted values and the true values.',
  },
  NLLLoss: {
    name: 'NLLLoss',
    info: "This loss function is similar to CrossEntropyLoss but it doesn't apply a softmax function to the model output. It computes the negative log-likelihood loss between the predicted logits and the true labels.",
  },
  PoissonLoss: {
    name: 'PoissonNLLLoss',
    info: 'This loss function is used for Poisson regression problems. It computes the negative log-likelihood loss between the predicted Poisson rate and the true counts.',
  },
  KLDivLoss: {
    name: 'KLDivLoss',
    info: 'This loss function is used for measuring the difference between two probability distributions. It computes the Kullback-Leibler divergence between the predicted distribution and the true distribution.',
  },
  BCEWithLogitsLoss: {
    name: 'BCEWithLogitsLoss',
    info: 'This loss function is similar to BinaryCrossEntropyLoss but it combines the sigmoid function and the binary cross-entropy loss into a single function for numerical stability.',
  },
  SmoothL1Loss: {
    name: 'SmoothL1Loss',
    info: 'This loss function is a variant of L1Loss that is less sensitive to outliers. It computes a smooth L1 loss between the predicted values and the true values.',
  },
  TripletLoss: {
    name: 'TripletMarginLoss',
    info: 'This loss function is commonly used for metric learning problems. It computes the triplet loss between the anchor, positive, and negative samples to encourage the model to learn meaningful embeddings.',
  },
};

const PERFORMANCE_METRICS = {
  accuracy: {
    name: 'Accuracy',
    info: 'This metric measures the proportion of correctly classified instances in a classification problem.',
  },
  precision: {
    name: 'Precision',
    info: 'This metric measures the proportion of true positives among all predicted positive instances in a binary classification problem.',
  },
  recall: {
    name: 'Recall',
    info: 'This metric measures the proportion of true positives among all actual positive instances in a binary classification problem.',
  },
  F1: {
    name: 'F1 score',
    info: 'This metric combines precision and recall into a single metric that balances the trade-off between them in a binary classification problem.',
  },
  MSE: {
    name: 'Mean squared error (MSE)',
    info: 'This metric measures the average of the squared differences between the predicted and true values in a regression problem.',
  },
  MAE: {
    name: 'Mean absolute error (MAE)',
    info: 'This metric measures the average of the absolute differences between the predicted and true values in a regression problem.',
  },
  R2: {
    name: 'R-squared (R2)',
    info: 'This metric measures the proportion of variance in the target variable that is explained by the model in a regression problem.',
  },
  AUC: {
    name: 'Area under the curve (AUC)',
    info: 'This metric measures the performance of a binary classifier over all possible thresholds by computing the area under the receiver operating characteristic (ROC) curve.',
  },
  IoU: {
    name: 'Intersection over union (IoU)',
    info: 'This metric is commonly used in object detection and segmentation tasks to measure the overlap between the predicted and true bounding boxes or masks.',
  },
  mAP: {
    name: 'Mean average precision (mAP)',
    info: 'This metric is commonly used in object detection and segmentation tasks to measure the precision and recall of the model across different confidence thresholds.',
  },
};

// Function that returns the performance metric for a given dataset as a string
const getPerformanceMetric = (dataset: string) => {
  switch (dataset) {
    case 'MNIST':
      return 'accuracy';
    case 'CIFAR-10':
      return 'accuracy';
    case 'GLUE':
      return 'accuracy';
    case 'WikiText':
      return 'perplexity';
    default:
      return 'accuracy';
  }
};

export { TASK_CATEGORIES, TASK_TYPES, DATASETS, LOSS_FUNCTIONS, PERFORMANCE_METRICS, getPerformanceMetric };
