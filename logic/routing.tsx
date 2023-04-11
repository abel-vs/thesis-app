import { AppState } from '../context/AppContext';

export default function routingLogic(context: AppState) {
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
