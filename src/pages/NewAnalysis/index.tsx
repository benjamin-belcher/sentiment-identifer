import React, {useState, useEffect} from "react";
import {
    Box, 
    Divider, 
    Typography,
    Button,
    Stack,
    MobileStepper,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    useTheme,
    IconButton,
} from '@mui/material';
import UserStorage from "../../components/UserStorage/idex";
import SocialMediaData from "../../components/SocialMediaData";
import DataTable from "../../components/DataTable";
import { IDataTableProps } from "../../interfaces/props/IDataTableProps";
import axios from "axios";
import {APIEndpoint} from '../../util/constants/BaseAPIEndpoints';
import { IAnalysedData, emptyIAnalysedData } from "../../interfaces/IAnalysedData";
import AnalysedDataInfoCard from "../../components/AnalysedDataInfoCard";
import Charts from "../../components/Charts";
import DropdownButton from "../../components/DropdownButton";
import { ChartTypes } from "../../util/constants/ChartTypes";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import "./styles.css";
import { useNavigate } from "react-router-dom";

export default function NewAnalysisPage(){
    const [activeStep, setActiveStep] = React.useState(0);
    const [dataToDisplay, setDataToDisplay] = React.useState<IDataTableProps>();
    const [analysedData, setAnalysedData] = React.useState<IAnalysedData[]>(emptyIAnalysedData);
    const [cumulatedSentimentData, setCumulatedSentimentData] = React.useState<any[]>([]);
    const [cumulatedSubjectivityData, setCumulatedSubjectivityData] = React.useState<any[]>([]);
    const [averageSentiment, setAverageSentiment] = React.useState({label:"", qty:0});
    const [averageSubjectivity, setAverageSubjectivity]= React.useState({label:"", qty:0});
    const [haveData, setHaveData] = React.useState(false);
    const [chartType, setChartType] = React.useState("Bar");
    const navigate = useNavigate();
    
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
            setHaveData(true);
        }
        else{
            return;
        }
        
    }, [analysedData])

    useEffect(() => {
        if(cumulatedSentimentData.length > 1) {
            // console.log([...calculateAverageData("sentiment")!.entries()].reduce((a, e ) => e[1] > a[1] ? e : a));
            setAverageSentiment(cumulatedSentimentData.reduce((a, e ) => e[1] > a[1] ? e : a));
            setAverageSubjectivity(cumulatedSubjectivityData.reduce((a, e ) => e[1] > a[1] ? e : a));
        }
        else{
            return;
        }   
    }, [cumulatedSentimentData])

    const calculateAverageData = (dataToCalculate:string) =>{
        switch(dataToCalculate){
            case "sentiment":
                let sentimentMap = analysedData.reduce((acc, e) => acc.set(e.sentiment_label, (acc.get(e.sentiment_label) || 0) + 1), new Map());
                const sentimentArr = [...sentimentMap].map(([label, qty]) => ({ label, qty }));
                return sentimentArr;
            case "subjectivity":
                let subjectivityMap = analysedData?.reduce((acc, e) => acc.set(e.subjectivity_label, (acc.get(e.subjectivity_label) || 0) + 1), new Map());
                const subjectivityArr = [...subjectivityMap].map(([label, qty]) => ({ label, qty }));
                return subjectivityArr;
        }
    }

    const startAnalysis = () => {
        axios.post(APIEndpoint+"analyse", {"data":dataToDisplay?.rows})
            .then(response => {
                setAnalysedData(response.data.data); 
                handleNext()});
    }

    const getSentimentData = () => {
        let data: number[] = [];
            cumulatedSentimentData.map((sentimentData) => {
                data.push(sentimentData.qty);
            })
        return data;
    }

    const getSubjectivityData = () => {
        let data: number[] = [];
            cumulatedSubjectivityData.map((subjectData) => {
                data.push(subjectData.qty);
            })
        return data;
    }

    const getSentimentLabels = () => {
        let labels: string[] = [];
        cumulatedSentimentData.map((sentimentData) => {
            labels.push(sentimentData.label);
        })
        return labels;
    }

    const getSubjectivityLabels = () => {
        let labels: string[] = [];
        cumulatedSubjectivityData.map((subjectData) => {
            labels.push(subjectData.label);
        })
        return labels;
    }

    const handleStartNewAnalysis = () => {
        setActiveStep(0);
        setAnalysedData(emptyIAnalysedData);
        setCumulatedSubjectivityData([]);
        setCumulatedSentimentData([]);
        setDataToDisplay(undefined);
        setHaveData(false);
    }

    const handleChartTypeChange = (e: SelectChangeEvent) => {
        setChartType(e.target.value as string);
    }

    const steps=[
        {
            element:(
                <> 
                    <Stack direction="row">
                        <Typography variant="h4">Add your data</Typography>
                        <IconButton color="primary" onClick={() =>{navigate("/help")}}>
                            <InfoOutlinedIcon/>
                        </IconButton>
                        
                    </Stack>
                    
                    <Stack direction="row" spacing={2} sx={{marginTop:2, marginBottom:6}}>
                        {/* TODO: Waiting to fully impliment this */}
                        {/* <UserStorage/> */}
                        <SocialMediaData reviewData={handleNext} setDataToDisplay={setDataToDisplay}/>
                    </Stack>
                </>
               
            )
        },
        {
            element: (
                <>
                    <Stack direction="row" sx={{display:"flex",alignItems: "flex-start"}}>
                        <Typography variant="h4" sx={{marginBottom:2}}>Review Your Data</Typography>
                        <IconButton color="primary" onClick={() =>{navigate("/help")}}>
                            <InfoOutlinedIcon/>
                        </IconButton>
                    </Stack>
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
                <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row" sx={{display:"flex",alignItems: "flex-start"}}>
                        <Typography variant="h4" sx={{marginBottom:2}}>Your Results</Typography>
                        <IconButton color="primary" onClick={() =>{navigate("/help")}}>
                            <InfoOutlinedIcon/>
                        </IconButton>
                    </Stack>
                    
                    <Box sx={{display: 'flex', height:"fit-content"}}>
                        <DropdownButton options={["Save Analysed Data", "Save Charts", "Save All"]} />
                        <Button variant="contained" sx={{marginLeft:"1rem"}} onClick={() => {handleStartNewAnalysis()}}>Start Again</Button>
                    </Box>
                    
                </Stack>
                <Box sx={{width:"150px"}}>
                    <FormControl fullWidth>
                        <InputLabel id="chart-type-label">Chart Type</InputLabel>
                        <Select
                            labelId="chart-type-label"
                            id="chart-type-select"
                            value={chartType}
                            label="Chart Type"
                            onChange={handleChartTypeChange}
                        >
                            {ChartTypes.map(chartType =>(
                                <MenuItem value={chartType}>{chartType}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                    {/* There is a bug with calculating the cumulated data */}
                    {/* <AnalysedDataInfoCard averageSentiment={averageSentiment} averageSubjectivity={averageSubjectivity} /> */}
                    <Box sx={{width:"50%"}}>
                        {haveData?
                            <Stack direction="row">
                                <Charts chartType={chartType} chartHeader="Sentiment Results" chartBackgroundColor="rgba(5, 109, 120, 0.8)" data={getSentimentData()} labels={getSentimentLabels()}/>
                                <Charts chartType={chartType} chartHeader="Subjectivity Results" chartBackgroundColor="rgba(227, 0, 114, 0.8)" data={getSubjectivityData()} labels={getSubjectivityLabels()} />
                            </Stack>
                        :
                        <></>}
                    </Box>
                    
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