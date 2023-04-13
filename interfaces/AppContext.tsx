import { createContext } from 'react';
import Dataset from './Dataset';
import Action from './Action';
import Results from './Results';
import ModelDefinition from './ModelDefinition';

const dispatchFunction = () => {
  return;
};

export interface AppState {
  modelStateFile: File | null;
  setModelState: (value: File | null) => void;
  modelArchitectureFile: File | null;
  setModelArchitecture: (value: File | null) => void;
  modelDefinition: ModelDefinition | null;
  setModelDefinition: (value: ModelDefinition | null) => void;
  dataset: Dataset | null;
  setDataset: (value: Dataset | null) => void;
  compressionType: string;
  setCompressionType: (value: string) => void;
  compressionTarget: number;
  setCompressionTarget: (value: number) => void;
  performanceTarget: number;
  setPerformanceTarget: (value: number) => void;
  compressionActions: Action[];
  setCompressionActions: (value: Action[]) => void;
  originalResults: Results | null;
  setOriginalResults: (value: Results | null) => void;
  compressedResults: Results | null;
  setCompressedResults: (value: Results | null) => void;
  compressedFile: File | null;
  setCompressedFile: (value: File | null) => void;
  compressedArchitecture: string;
  setCompressedArchitecture: (value: string) => void;
}

export const AppContext = createContext<AppState>({
  modelStateFile: null,
  setModelState: dispatchFunction,
  modelArchitectureFile: null,
  setModelArchitecture: dispatchFunction,
  modelDefinition: null,
  setModelDefinition: dispatchFunction,
  dataset: null,
  setDataset: dispatchFunction,
  compressionType: 'Model Size',
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
  compressedArchitecture: '',
  setCompressedArchitecture: dispatchFunction,
});
