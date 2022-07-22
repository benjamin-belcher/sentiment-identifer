import {
    Card,
    CardContent,
    Typography,
    Box,
    Divider
} from '@mui/material';
import React from 'react';
import { IAnalysedData } from '../../interfaces/IAnalysedData';

export default function AnalysedDataInfoCard(props: IAnalysedData[]){
    
    const calculateAverageData = (propertyName: string) =>{
        const
        props.forEach(label => {

        })
    }
    return(
        <Card sx={{minWidth:275}}>
            <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Average Sentiment</Typography>
            <Typography variant="h5" component="div">{calculateAverageData("sentiment_label")}</Typography>
            <Divider sx={{marginTop:2, marginBottom:2}}/>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Average Subjectivity</Typography>
            <Typography variant="h5" component="div">{calculateAverageData("subjectivity_label")}</Typography>
            </CardContent>
        </Card>
    )
}