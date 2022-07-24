import {
    Card,
    CardContent,
    Typography,
    Box,
    Divider
} from '@mui/material';
import React from 'react';
import { IAnalysedDataCardProps } from '../../interfaces/props/IAnalysedDataCardProps';

export default function AnalysedDataInfoCard(props: IAnalysedDataCardProps){
    React.useEffect(() => {
        // console.log(props.averageSentiment[0]);
    })
    
    
    return(
        <Card sx={{minWidth:275}}>
            <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Average Sentiment</Typography>
            <Typography variant="h5" component="div"></Typography>
            <Divider sx={{marginTop:2, marginBottom:2}}/>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Average Subjectivity</Typography>
            <Typography variant="h5" component="div"></Typography>
            </CardContent>
        </Card>
    )
}