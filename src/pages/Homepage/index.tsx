import {useContext} from 'react';
import { UserContext } from '../../util/UserContext';
import { UserContextType } from '../../util/UserContextType';
import {useNavigate} from 'react-router-dom';
import {
    Box, Button, ButtonGroup, Divider, Stack, Typography
} from '@mui/material';
import moment from 'moment';
import Charts from '../../components/Charts';

export default function Homepage(props: any){
    
    const context = useContext(UserContext) as UserContextType;
    const navigate = useNavigate();

    const getTime = () => {
        let current_time = moment().format("HH")
        if(parseInt(current_time)<12){
            return "Good Morning";
        }
        else if(parseInt(current_time)>12 && parseInt(current_time)<19){
            return "Good Afternoon";
        }
        else if(parseInt(current_time)>19){
            return "Good Evening";
        }
        else{
            return "";
        }

    }

    return(
        <Box sx={{margin:2, width:'100%', padding:3, height:'100%'}}>
            <Typography variant="h3">{getTime()} {context.currentUser.firstname}</Typography>
            <Divider sx={{marginTop:2, marginBottom:2}} />
            <Typography variant="h5">Jump Back In</Typography>
            <Box>
                <Stack direction="row" spacing={2}>
                    <Box sx={{width:"50%"}}>
                        <ButtonGroup size="small">
                            <Button>Export Chart</Button>
                            <Button>Export Dataset</Button>
                            <Button>Edit Dataset</Button>
                        </ButtonGroup>
                        <Stack direction="row" spacing={2}>
                            <Charts chartType="Bar" chartHeader="Sentiment Results" chartBackgroundColor="rgba(5, 109, 120, 0.8)" data={[10,2,3,5,8]} labels={["Test","Test","Test","Test","Test"]}/>
                        </Stack>
                    </Box>
                    <Box sx={{width:"50%"}}>
                        <ButtonGroup size="small">
                            <Button>Export Chart</Button>
                            <Button>Export Dataset</Button>
                            <Button>Edit Dataset</Button>
                        </ButtonGroup>
                        <Stack direction="row" spacing={2}>
                            <Charts chartType="Line" chartHeader="Sentiment Results" chartBackgroundColor="rgba(5, 109, 120, 0.8)" data={[10,2,3,5,8]} labels={["Test","Test","Test","Test","Test"]}/>
                        </Stack>
                    </Box>   
                </Stack>                 
            </Box>
        </Box>
        
    )
}