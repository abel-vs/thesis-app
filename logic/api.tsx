import Dataset from '../interfaces/Dataset';
import ModelDefinition from '../interfaces/ModelDefinition';

const url = 'http://127.0.0.1:8000';

const evaluateModel = async (
  model_state: File,
  model_architecture: File,
  model_definition: ModelDefinition,
  dataset: Dataset
) => {
  const form = new FormData();
  form.append('model_state', model_state);
  form.append('model_architecture', model_architecture);
  form.append('model_definition', JSON.stringify(model_definition));
  form.append('dataset', dataset.name);
  try {
    const res = await fetch(url + '/evaluate', {
      method: 'POST',
      body: form,
    });
    return res;
  } catch (err) {
    console.error(err);
  }
};

const analyzeModel = async (
  model_state: File,
  model_architecture: File,
  mode_definition: ModelDefinition,
  settings: object
) => {
  const form = new FormData();
  form.append('model_state', model_state);
  form.append('model_architecture', model_architecture);
  form.append('model_definition', JSON.stringify(mode_definition));
  form.append('settings', JSON.stringify(settings));

  try {
    const res = await fetch(url + '/analyze', {
      method: 'POST',
      body: form,
    });
    const data = await res.json();
    return data.compression_actions;
  } catch (err) {
    console.error(err);
  }
};

const compressModel = async (
  model_state: File,
  model_architecture: File,
  model_definition: ModelDefinition,
  settings: object
) => {
  const form = new FormData();
  form.append('model_state', model_state);
  form.append('model_architecture', model_architecture);
  form.append('model_definition', JSON.stringify(model_definition));
  form.append('settings', JSON.stringify(settings));
  console.log(form.get('model_definition'));
  console.log(form.get('settings'));
  try {
    const res = await fetch(url + '/compress', {
      method: 'POST',
      body: form,
    });
    return res;
  } catch (err) {
    console.error(err);
  }
};

const getModulesMethods = async (file: File) => {
  const form = new FormData();
  form.append('file', file);
  try {
    const res = await fetch(url + '/get-modules-methods', {
      method: 'POST',
      body: form,
    });
    return res.json();
  } catch (err) {
    console.error(err);
  }
};

export { evaluateModel, analyzeModel, compressModel, getModulesMethods };
