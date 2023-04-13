import { NextRouter } from 'next/router';
import { AppState } from '../interfaces/AppContext';

export function routingLogic(context: AppState) {
  // No model files provided
  if (!context.modelStateFile || !context.modelArchitectureFile) {
    return {
      redirect: {
        destination: '/model',
        permanent: false,
      },
    };
  }
  // No dataset configured
  if (!context.dataset || !context.originalResults) {
    return {
      redirect: {
        destination: '/data',
        permanent: false,
      },
    };
  }
  // No compression actions received
  if (!context.compressionActions) {
    return {
      redirect: {
        destination: '/goal',
        permanent: false,
      },
    };
  }
  // No compressed model received
  if (!context.originalResults || !context.compressedResults) {
    return {
      redirect: {
        destination: '/compression',
        permanent: false,
      },
    };
  }

  // Continue with normal page rendering
  return {
    props: {},
  };
}

export function routingEffect(context: AppState, router: NextRouter) {
  // No model files provided
  if (!context.modelStateFile || !context.modelArchitectureFile) {
    router.push('/model');
    return;
  }
  // No dataset configured
  else if (!context.dataset || !context.originalResults) {
    router.push('/data');
    return;
  }
  // No compression actions received
  else if (!context.compressionActions || !context.compressionActions.length) {
    router.push('/goal');
    return;
  }
  // No compressed model received
  else if (!context.originalResults || !context.compressedResults) {
    router.push('/compression');
    return;
  }
}
