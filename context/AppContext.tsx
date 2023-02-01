import { createContext } from 'react';

const AppContext = createContext({
  modelStateFile: null,
  setModelState: null,
  modelArchitectureFile: null,
  setModelArchitecture: null,
  dataset: null,
  setDataset: null,
  compressionType: null,
  setCompressionType: null,
  compressionTarget: null,
  setCompressionTarget: null,
  performanceTarget: null,
  setPerformanceTarget: null,
  compressionActions: null,
  setCompressionActions: null,
});

export default AppContext;
