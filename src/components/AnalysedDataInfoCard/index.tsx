import {
    Card,
    CardContent,
    Typography,
    Box,
    Divider
} from '@mui/material';
import React from 'react';

export default function AnalysedDataInfoCard(props: any){
    
    const calculateAverageData = (propertyName: string) =>{
        const hashmap = props.analysedData.reduce( (acc: any, val: any) => {
            acc[val] = (acc[val] || 0 ) + 1;
            return acc;
         },{})
         console.log(Object.keys(hashmap).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b));
        return Object.keys(hashmap).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b)
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