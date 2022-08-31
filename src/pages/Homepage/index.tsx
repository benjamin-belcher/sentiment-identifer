import {useCallback, useContext, useRef, useEffect, useState} from 'react';
import { UserContext } from '../../util/UserContext';
import { UserContextType } from '../../util/UserContextType';
import {useNavigate} from 'react-router-dom';
import {
    Box, Button, ButtonGroup, CircularProgress, Divider, Stack, Typography
} from '@mui/material';
import moment from 'moment';
import Charts from '../../components/Charts';
import axios from 'axios';
import { APIEndpoint } from '../../util/constants/BaseAPIEndpoints';
import { IAnalysedData, emptyIAnalysedData } from '../../interfaces/IAnalysedData';

export default function Homepage(props: any){
    
    const context = useContext(UserContext) as UserContextType;
    const navigate = useNavigate();
    const firstChartRef = useRef<any>(null);
    const secondChartRef = useRef<any>(null);
    const [chartData, setChartData] = useState<any>()
    const [cumulatedChart1Data, setCumulatedChart1Data] = useState<any[]>([]);
    const [cumulatedChart2Data, setCumulatedChart2Data] = useState<any[]>([]);
    const [chart1AverageData, setChart1AverageData] = useState({label:"", qty:0});
    const [chart2AverageData, setChart2AverageData] = useState({label:"", qty:0});
    const [loading, setLoading] = useState(false);
    const [chartDataIdentifier, setChartDataIdentifier] = useState<string[]>([])

    useEffect(() => {
        setLoading(true);
        axios.get(APIEndpoint+"find-latest-charts", {
            params:{
                "user": context.currentUser.email
            }
        }).then(response => {
            console.log(response.data.Pandas);
            let updatedArray = []
            for(var key in response.data){
                updatedArray.push(key)
            setChartDataIdentifier(updatedArray);
            }
            setChartData(response.data);
        })
    },[])

    useEffect(() => {
        if(chartData !== undefined) {
            setCumulatedChart1Data(calculateAverageData("sentiment", chartDataIdentifier[0])!);
            setCumulatedChart2Data(calculateAverageData("sentiment", chartDataIdentifier[0])!);
            setLoading(false);
        }
        else{
            return;
        }
        
    }, [chartData])

    useEffect(() => {
        if(cumulatedChart1Data.length > 1) {
            // console.log([...calculateAverageData("sentiment")!.entries()].reduce((a, e ) => e[1] > a[1] ? e : a));
            setChart1AverageData(cumulatedChart1Data.reduce((a, e ) => e[1] > a[1] ? e : a));
            setChart2AverageData(cumulatedChart2Data.reduce((a, e ) => e[1] > a[1] ? e : a));
        }
        else{
            return;
        }   
    }, [cumulatedChart1Data])


    const calculateAverageData = (dataToCalculate:string, identifier:string) =>{
        switch(dataToCalculate){
            case "sentiment":
                let sentimentMap = chartData[identifier].reduce((acc: any, e: any) => acc.set(e.sentiment_label, (acc.get(e.sentiment_label) || 0) + 1), new Map());
                const sentimentArr = [...sentimentMap].map(([label, qty]) => ({ label, qty }));
                return sentimentArr;
            case "subjectivity":
                let subjectivityMap = chartData[identifier].reduce((acc: any, e: any) => acc.set(e.subjectivity_label, (acc.get(e.subjectivity_label) || 0) + 1), new Map());
                const subjectivityArr = [...subjectivityMap].map(([label, qty]) => ({ label, qty }));
                return subjectivityArr;
        }
    }

    const getDataForPlot = (chart: any) => {
        let data: number[] = [];
            chart.map((c: any) => {
                data.push(c.qty);
            })
        return data;
    }

    const getLabelsForPlot = (chart: any) => {
        let labels: string[] = [];
        chart.map((c: any) => {
            labels.push(c.label);
        })
        return labels;
    }

    const downloadChart = useCallback((chartRef: any, filename: string) => {
        const link = document.createElement("a");
        link.download = filename;
        link.href = chartRef?.current?.toBase64Image();
        
        link.click();
    }, []) 

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
        <Box sx={{margin:2, width:'80%', padding:3, height:'100%', flexShrink:"1"}}>
            <Typography variant="h3">{getTime()} {context.currentUser.firstname}</Typography>
            <Divider sx={{marginTop:2, marginBottom:2}} />
            <Typography variant="h5">Jump Back In</Typography>
            <Box>
                <Stack direction="row" spacing={2}>
                    <Box sx={{width:"50%"}}>
                        <ButtonGroup size="small" disabled={loading}>
                            <Button onClick={() =>{downloadChart(firstChartRef, "FirstChart")}}>Export Chart</Button>
                            <Button>Export Dataset</Button>
                            <Button>Edit Dataset</Button>
                        </ButtonGroup>
                        <Stack direction="row" spacing={2}>
                        {loading? <Box sx={{height: '400px', width: '100%', display: 'flex', alignItems: "center", justifyContent: "center"}}><CircularProgress /></Box>:
                            <Charts cref={firstChartRef} chartType="Bar" chartHeader={`${chartDataIdentifier[0]} Sentiment Results`} chartBackgroundColor="rgba(5, 109, 120, 0.8)" data={getDataForPlot(cumulatedChart1Data)} labels={getLabelsForPlot(cumulatedChart1Data)}/>
                        }
                        </Stack>
                    </Box>
                    <Box sx={{width:"50%"}}>
                        <ButtonGroup size="small" disabled={loading}>
                            <Button onClick={() =>{downloadChart(secondChartRef, "SecondChart")}}>Export Chart</Button>
                            <Button>Export Dataset</Button>
                            <Button>Edit Dataset</Button>
                        </ButtonGroup>
                        <Stack direction="row" spacing={2}>
                            {loading? <Box sx={{height: '400px', width: '100%', display: 'flex', alignItems: "center", justifyContent: "center"}}><CircularProgress /></Box>:
                                <Charts cref={secondChartRef} chartType="Bar" chartHeader={`${chartDataIdentifier[1]} Sentiment Results`} chartBackgroundColor="rgba(5, 109, 120, 0.8)" data={getDataForPlot(cumulatedChart2Data)} labels={getLabelsForPlot(cumulatedChart2Data)}/>
                            }
                            </Stack>
                    </Box>   
                </Stack>                 
            </Box>
        </Box>
        
    )
}