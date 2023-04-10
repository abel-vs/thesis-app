export default interface Results {
  score: number;
  model_size: number;
  params: number;
  macs: number;
  batch_duration: number;
  data_duration: number;
}
