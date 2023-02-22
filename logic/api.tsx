const url = 'http://127.0.0.1:8000';

const callAPI = async () => {
  try {
    const res = await fetch(url + '/');
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

const analyzeModel = async (model_state, model_architecture, settings) => {
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
    console.log(data);
    return data.compression_actions;
  } catch (err) {
    console.error(err);
  }
};

const compressModel = async (model_state, model_architecture, compression_actions) => {
  const form = new FormData();
  form.append('model_state', model_state);
  form.append('model_architecture', model_architecture);
  form.append('compression_actions', '{"actions":' + JSON.stringify(compression_actions) + '}');
  try {
    const res = await fetch(url + '/compress', {
      method: 'POST',
      body: form,
    });
    const data = await res.json();
    console.log('Data', data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export { callAPI, analyzeModel, compressModel };
