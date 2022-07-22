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