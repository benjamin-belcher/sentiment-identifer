import React, {useState, useEffect} from "react";
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
import { Map } from "typescript";

export default function NewAnalysisPage(){
    const [activeStep, setActiveStep] = React.useState(0);
    const [dataToDisplay, setDataToDisplay] = React.useState<IDataTableProps>();
    const [analysedData, setAnalysedData] = React.useState<IAnalysedData[]>(emptyIAnalysedData);
    const [cumulatedSentimentData, setCumulatedSentimentData] = React.useState<any[]>([]);
    const [cumulatedSubjectivityData, setCumulatedSubjectivityData] = React.useState<any[]>([]);
    const [averageSentiment, setAverageSentiment] = React.useState({});
    const [averageSubjectivity, setAverageSubjectivity]= React.useState({});
    
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
        
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    useEffect(() => {
        if(analysedData.length> 1){
            setCumulatedSentimentData(calculateAverageData("sentiment")!);
            setCumulatedSubjectivityData(calculateAverageData("subjectivity")!);
        }
        else{
            return;
        }
        
    }, [analysedData])

    useEffect(() => {
        if(cumulatedSentimentData.length > 1) {
            console.log("Sentiment ",cumulatedSentimentData);
            console.log([...calculateAverageData("sentiment")!.entries()].reduce((a, e ) => e[1] > a[1] ? e : a));
            setAverageSentiment([...calculateAverageData("sentiment")!.entries()].reduce((a, e ) => e[1] > a[1] ? e : a));
            setAverageSubjectivity([...calculateAverageData("subjectivity")!.entries()].reduce((a, e ) => e[1] > a[1] ? e : a));
        }
        else{
            return;
        }   
    }, [cumulatedSentimentData])

    const calculateAverageData = (dataToCalculate:string) =>{
        switch(dataToCalculate){
            case "sentiment":
                let sentimentMap = analysedData.reduce((acc, e) => acc.set(e.sentiment_label, (acc.get(e.sentiment_label) || 0) + 1), new Map());
                const sentimentArr = [...sentimentMap].map(([label, value]) => ({ label, value }));
                return sentimentArr;
            case "subjectivity":
                let subjectivityMap = analysedData?.reduce((acc, e) => acc.set(e.subjectivity_label, (acc.get(e.subjectivity_label) || 0) + 1), new Map());
                const subjectivityArr = [...subjectivityMap].map(([label, value]) => ({ label, value }));
                return subjectivityArr;
        }
    }

    const startAnalysis = () => {
        axios.post(localBackendAPI+"analyse", {"data":dataToDisplay?.rows})
            .then(response => {
                setAnalysedData(response.data.data); 
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
                    <AnalysedDataInfoCard averageSentiment={averageSentiment} averageSubjectivity={averageSubjectivity} />
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