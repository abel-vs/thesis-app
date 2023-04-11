import Metric from '../interfaces/Metric';

const PERFORMANCE_METRICS: Record<string, Metric> = {
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

export default PERFORMANCE_METRICS;
