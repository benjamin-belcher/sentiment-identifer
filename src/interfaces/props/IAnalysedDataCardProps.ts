import {IAnalysedData} from '../IAnalysedData';

export interface IAnalysedDataCardProps{
    averageSentiment: {
        label: string,
        qty: number,
    },
    averageSubjectivity: {
        label: string,
        qty: number,
    },
}