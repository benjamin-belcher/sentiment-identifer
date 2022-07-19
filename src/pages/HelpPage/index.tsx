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

const steps = [
    {
        label:"Add your data", 
        helpText: "To get started you need to add some data to analyse. You could add source some from social media sites or upload your own datasets. To add the data simply select the dataset you want from your storage."
    }, 
    {
        label:"Configure your results",
        helpText:"Once you have added your data you need to configure how you would like to digest the results. You could have various charts drawn, add the results to a interactive table or have a report generated."
    }, 
    {
        label:"Save & Share your results",
        helpText:"Once you have the results from the analysis you can share them or save the results to your accounts storage or download a local copy. "
    }
]

export default function HelpPage(){
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    return(
        <Box
            sx={{margin:2, width:'100%', padding:3}}>
            <Typography variant="h2">Help Page</Typography>
            <Divider sx={{marginTop:2, marginBottom:2}}/>

            <Typography variant="h5" sx={{marginBottom:2}}>What do you need to start analysing?</Typography>

            <Stepper activeStep={activeStep}>
                {steps.map((step, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: React.ReactNode;
                    } = {};
                    return (
                        <Step key={step.label} {...stepProps}>
                        <StepLabel {...labelProps}>{step.label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
                <React.Fragment>
                    {/* This is the helper text for each of the steps */}
                    
                        <Stack direction="row" sx={{height:'195px'}}>
                            {steps.map((step, index) => {
                                
                                return(
                                    <>
                                    {activeStep === index ? 
                                        <Paper elevation={2} sx={{ margin:2, padding: 4, backgroundColor:'#D2F6FA',display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                                            <Typography variant="body1">{step.helpText}</Typography>
                                        </Paper>
                                    : <Box sx={{width:'100%'}}></Box>
                                    }
                                    </>
                                )
                            })}
                        </Stack>
                        
                    

                    {/* Next and Back Buttons */}
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                            >
                        Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleNext} disabled={activeStep === steps.length - 1}>
                            Next
                        </Button>
                        
                    </Box>
                </React.Fragment>
        </Box>
    )
}