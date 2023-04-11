import Loss from '../interfaces/Loss';

const LOSS_FUNCTIONS: Record<string, Loss> = {
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

export default LOSS_FUNCTIONS;
