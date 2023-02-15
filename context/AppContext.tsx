import { createContext } from 'react';

const dispatchFunction = (value: any) => {
  return;
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
  originalResults: {},
  setOriginalResults: dispatchFunction,
  compressedResults: {},
  setCompressedResults: dispatchFunction,
});

export default AppContext;
