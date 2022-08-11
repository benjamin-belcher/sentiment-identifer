import {
    Card,
    CardContent,
    Typography,
    Divider,
    Box
} from '@mui/material';
import { IAnalysedDataCardProps } from '../../interfaces/props/IAnalysedDataCardProps';

export default function AnalysedDataInfoCard(props: IAnalysedDataCardProps){
    
    return(
        <Box sx={{width:"250px"}}>
            <Card>
                <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Average Sentiment</Typography>
                <Typography variant="h5" component="div">{props.averageSentiment.label}</Typography>
                <Divider sx={{marginTop:2, marginBottom:2}}/>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Average Subjectivity</Typography>
                <Typography variant="h5" component="div">{props.averageSubjectivity.label}</Typography>
                </CardContent>
            </Card>
        </Box>
    )
}