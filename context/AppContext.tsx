import { createContext } from 'react';

const dispatchFunction = (value: any) => {
  return;
};

type Results = {
  score: number;
  model_size: number;
  params: number;
  macs: number;
  batch_duration: number;
  data_duration: number;
};

const AppContext = createContext({
  modelStateFile: null,
  setModelState: dispatchFunction,
  modelArchitectureFile: null,
  setModelArchitecture: dispatchFunction,
  dataset: null,
  setDataset: dispatchFunction,
  compressionType: null,
  setCompressionType: dispatchFunction,
  compressionTarget: null,
  setCompressionTarget: dispatchFunction,
  performanceTarget: null,
  setPerformanceTarget: dispatchFunction,
  compressionActions: null,
  setCompressionActions: dispatchFunction,
  originalResults: null,
  setOriginalResults: dispatchFunction,
  compressedResults: null,
  setCompressedResults: dispatchFunction,
  compressedFile: null,
  setCompressedFile: dispatchFunction,
});

export default AppContext;
