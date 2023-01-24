import { createContext } from 'react';

const AppContext = createContext({
  modelStateFile: null,
  setModelState: null,
  modelArchitectureFile: null,
  setModelArchitecture: null,
});

export default AppContext;
