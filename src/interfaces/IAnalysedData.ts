export interface IAnalysedData
{
    id: number,
    posted_at: string,
    sentiment: number,
    sentiment_label: string,
    subjectivity: number,
    subjectivity_label: string,
    text: string,
}

export const emptyIAnalysedData = [{
    id: 0,
    posted_at: "",
    sentiment: 0,
    sentiment_label: "",
    subjectivity: 0,
    subjectivity_label: "",
    text: "",
}]