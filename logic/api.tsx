import Dataset from '../interfaces/Dataset';

const url = 'http://127.0.0.1:8000';

const evaluateModel = async (model_state: File, model_architecture: File, dataset: Dataset) => {
  const form = new FormData();
  form.append('model_state', model_state);
  form.append('model_architecture', model_architecture);
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

const analyzeModel = async (model_state: File, model_architecture: File, settings: object) => {
  const form = new FormData();
  form.append('model_state', model_state);
  form.append('model_architecture', model_architecture);
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

const compressModel = async (model_state: File, model_architecture: File, settings: object) => {
  const form = new FormData();
  form.append('model_state', model_state);
  form.append('model_architecture', model_architecture);
  form.append('settings', JSON.stringify(settings));
  console.log(form);
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

const getClasses = async (file: File) => {
  const form = new FormData();
  form.append('file', file);
  try {
    const res = await fetch(url + '/get-classes', {
      method: 'POST',
      body: form,
    });
    return res.json();
  } catch (err) {
    console.error(err);
  }
};

export { evaluateModel, analyzeModel, compressModel, getClasses };
