import queryString from 'query-string';

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
  const formData = new FormData();
  formData.append('model_state', model_state);
  formData.append('model_architecture', model_architecture);
  try {
    const res = await fetch(url + '/analyze?' + queryString.stringify(settings), {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    console.log(data);
    return data.compression_actions;
  } catch (err) {
    console.log(err);
  }
};

export { callAPI, analyzeModel };
