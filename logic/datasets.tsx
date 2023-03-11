const datasets = [
    {
        name: 'MNIST',
        type: 'Image Classification',
    },
    {  
        name: 'GLUE',
        type: 'Text Classification',
    },
    {
        name: 'CIFAR-10',
        type: 'Image Classification',
    },
    {
        name: 'WikiText',
        type: 'Text Generation',
    }
]



// Function that returns the performance metric for a given dataset as a string
const getPerformanceMetric = (dataset: string) => {
    switch (dataset) {
        case 'MNIST':
        return 'accuracy';
        case 'CIFAR-10':
        return 'accuracy';
        case 'GLUE':
        return 'accuracy';
        case 'WikiText':
        return 'perplexity';
        default:
        return 'accuracy';
    }
    }

export {datasets, getPerformanceMetric};