import React, {useState} from "react";
import {
    Box, 
    Divider, 
    Paper, 
    Typography,
    Stepper,
    Step,
    StepLabel,
    Button,
    Stack,
} from '@mui/material';
import UserStorage from "../../components/UserStorage/idex";
import SocialMediaData from "../../components/SocialMediaData";

export default function NewAnalysisPage(){
    
    return(
        <Box
            sx={{margin:2, width:'100%', padding:3}}>
            <Typography variant="h2">New Analysis</Typography>
            <Divider sx={{marginTop:2, marginBottom:2}}/>

            <Typography variant="h4">Add your data</Typography>
            <Stack direction="row" spacing={2} sx={{marginTop:2}}>
                <UserStorage/>
                <SocialMediaData />
            </Stack>
            
        </Box>
        
    )
}