import { createContext } from 'react';

const AppContext = createContext({
  modelStateFile: null,
  setModelState: null,
  modelArchitectureFile: null,
  setModelArchitecture: null,
  dataset: null,
  setDataset: null,
});

export default AppContext;
