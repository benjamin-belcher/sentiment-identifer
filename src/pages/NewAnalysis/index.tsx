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
    MobileStepper,
} from '@mui/material';
import UserStorage from "../../components/UserStorage/idex";
import SocialMediaData from "../../components/SocialMediaData";
import DataTable from "../../components/DataTable";
import { IDataTableProps } from "../../interfaces/props/IDataTableProps";
import axios from "axios";
import {localBackendAPI} from '../../util/constants/BaseAPIEndpoints';
import { IAnalysedData, emptyIAnalysedData } from "../../interfaces/IAnalysedData";
import AnalysedDataInfoCard from "../../components/AnalysedDataInfoCard";

export default function NewAnalysisPage(){
    const [activeStep, setActiveStep] = React.useState(0);
    const [dataToDisplay, setDataToDisplay] = React.useState<IDataTableProps>();
    const [analysedData, setAnalysedData] = React.useState<IAnalysedData[]>();
    const [cumulatedSentimentData, setCumulatedSentimentData] = React.useState<Map<string, number>>(new Map());
    const [cumulatedSubjectivityData, setCumulatedSubjectivityData] = React.useState<Map<string, number>>(new Map());
    
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
        
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const calculateAverageData = (dataToCalculate:string) =>{
        console.log(analysedData);
        let map;
        switch(dataToCalculate){
            case "sentiment":
                map = analysedData?.reduce((acc, e) => acc.set(e.sentiment_label, (acc.get(e.sentiment_label) || 0) + 1), new Map());
                console.log(map);
                return map;
            case "subjectivity":
                map = analysedData?.reduce((acc, e) => acc.set(e.subjectivity_label, (acc.get(e.subjectivity_label) || 0) + 1), new Map());
                console.log(map);
                return map;
        }
    }

    const startAnalysis = () => {
        axios.post(localBackendAPI+"analyse", {"data":dataToDisplay?.rows})
            .then(response => {
                setAnalysedData(response.data.data); 
                setCumulatedSentimentData(calculateAverageData("sentiment")!);
                setCumulatedSubjectivityData(calculateAverageData("subjectivity")!);
                handleNext()});
    }

    const steps=[
        {
            element:(
                <> 
                    <Typography variant="h4">Add your data</Typography>
                    <Stack direction="row" spacing={2} sx={{marginTop:2, marginBottom:6}}>
                        <UserStorage/>
                        <SocialMediaData reviewData={handleNext} setDataToDisplay={setDataToDisplay}/>
                    </Stack>
                </>
               
            )
        },
        {
            element: (
                <>
                    <Typography variant="h4" sx={{marginBottom:2}}>Review Your Data</Typography>
                    <DataTable columns={dataToDisplay?.columns} rows={dataToDisplay?.rows} />
                    <Stack direction="row" justifyContent="space-between">
                        <Button variant="contained" sx={{marginTop:1, marginBottom:4}} onClick={() =>{handleBack(); setDataToDisplay(undefined)}}>Back</Button>
                        <Button variant="contained" sx={{marginTop:1, marginBottom:4}} onClick={() =>{startAnalysis()}}>Analyse</Button>
                    </Stack>

                    
                </>
                
            )
        },
        {
            element:(
                <>
                    <Typography variant="h4" sx={{marginBottom:2}}>Your Results</Typography>
                    <AnalysedDataInfoCard averageSentiment={Math.max(...cumulatedSentimentData.values())} averageSubjectivity={Math.max(...cumulatedSubjectivityData.values())} />
                </>
            )
        }
    ]

    const maxSteps = steps.length;
    
    return(
        <Box
            sx={{margin:2, width:'100%', padding:3, height:'100%'}}>
            <Typography variant="h2">New Analysis</Typography>
            <Divider sx={{marginTop:2, marginBottom:2}}/>

            {steps[activeStep].element}
            <Box >
                <MobileStepper
                    variant="progress"
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={<></>} 
                    backButton={<></>}/>
            </Box>
            
            
        </Box>
        
    )
}