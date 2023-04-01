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
  dataset: "",
  setDataset: dispatchFunction,
  compressionType: "Model Size",
  setCompressionType: dispatchFunction,
  compressionTarget: 1,
  setCompressionTarget: dispatchFunction,
  performanceTarget: 1,
  setPerformanceTarget: dispatchFunction,
  compressionActions: [],
  setCompressionActions: dispatchFunction,
  originalResults: null,
  setOriginalResults: dispatchFunction,
  compressedResults: null,
  setCompressedResults: dispatchFunction,
  compressedFile: null,
  setCompressedFile: dispatchFunction,
  compressedArchitecture: "",
  setCompressedArchitecture: dispatchFunction,
});

export default AppContext;
