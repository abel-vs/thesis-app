import { NextRouter } from 'next/router';
import { AppState } from '../context/AppContext';

export default function routingEffect(context: AppState, router: NextRouter) {
  // No model files provided
  if (!context.modelStateFile || !context.modelArchitectureFile) {
    router.push('/model');
    return;
  }
  // No dataset configured
  if (!context.dataset || !context.originalResults) {
    router.push('/data');
    return;
  }
  // No compression actions received
  if (!context.compressionActions) {
    router.push('/goal');
    return;
  }
  // No compressed model received
  if (!context.originalResults || !context.compressedResults) {
    router.push('/compression');
    return;
  }
}
