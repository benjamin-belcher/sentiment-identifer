import {
    Box,
    Button,
    Chip,
    Divider,
    FormControl,
    InputLabel,
    ListItemIcon,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import React from 'react';
import twitterIcon from '../../assets/twitterIcon.svg';
import {APIEndpoint} from '../../util/constants/BaseAPIEndpoints';
import { Navigate } from 'react-router-dom';

export default function SocialMediaData(props: any){
    const [platform, setPlatform] = React.useState('');
    const [displayKeywordSearch, setDisplayKeywordSearch] = React.useState(false);
    const [keywords, addKeywords] = React.useState<string[]>([]);
    const [numberOfPosts, setNumberOfPosts] =React.useState(0);
    const [keywordInput, setKeywordInput] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [tweets, setTweets] = React.useState([]);

    const handleChange = (event: SelectChangeEvent) => {
        setPlatform(event.target.value as string);
        setDisplayKeywordSearch(true);
    };

    const addKeyword = () => {
        addKeywords(keywords.concat(keywordInput));
        setKeywordInput("");
    }

    const removeKeyword = (index: number) => {
        let keywordsCopy = keywords.slice();
        keywordsCopy.splice(index, 1);
        addKeywords(keywordsCopy);
    }

    // Validation for the number inputs to only allow numbers between 0 & 100
    const handleNumberInput = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setState:  React.Dispatch<React.SetStateAction<number>>) => {
        const val = parseInt(e.target.value);
        if(e.target.value.toString() === "" || !isNaN(val) && val <= 100){
            setState(val);
        }
    }

    const startSocialMediaSearch = () => {
        setLoading(true);
        switch(platform){
            case "Twitter":
                axios.post(APIEndpoint+"tweet/search", {
                    "keyword":keywords[0],
                    "numberOfTweets": numberOfPosts
                })
                    .then(response => {
                        setTweets(response.data);
                        props.setDataToDisplay({
                            "columns":[
                                {
                                    "field": "text",
                                    "headerName": "Tweet",
                                    "width": 1200,
                                },
                                {
                                    "field": "posted_at",
                                    "headerName": "Date Posted",
                                    "width": 180,
                                }
                            ],
                            "rows": response.data
                        });
                        setLoading(false);
                    })
        }
    }

    const onSeeTweetsClicked = () => {
        props.reviewData();
    }
    
    return(
        <Paper elevation={2} sx={{padding:4}}>
            <Typography variant="h5">Select a platform to search</Typography>
            <Divider sx={{marginTop:2, marginBottom:2}}/>
            <FormControl sx={{marginTop:1}} fullWidth>
                <InputLabel id="social-media-platform-label">Platform</InputLabel>
                <Select
                    disabled={loading}
                    labelId="social-media-platform-label"
                    id="social-media-platform-select"
                    value={platform}
                    label="Platform"
                    onChange={handleChange}
                    sx={{width:'100%', display: 'flex'}}>
                    <MenuItem value="Twitter" >
                        <Box sx={{display: 'flex',alignItems: "center"}}>
                            <Box sx={{height:"25px", marginRight:"12px"}} component="img" src={twitterIcon}/>
                            Twitter
                        </Box>
                        
                    </MenuItem>
                </Select>
            </FormControl>
            {displayKeywordSearch ? 
            <Box sx={{marginTop:2}}>
                <Stack spacing={1} direction="row" sx={{marginBottom:1}}>
                    {keywords.map((keyword, index) => {
                        return (
                            <Chip disabled={loading} key={index} label={keyword} onClick={() =>{removeKeyword(index)}}/>
                        );
                    })}
                </Stack>
                
                <Stack direction="row" spacing={1}>
                    <TextField 
                        disabled={loading}
                        variant='outlined' 
                        label="Keywords" 
                        value={keywordInput}
                        onChange={(e) => setKeywordInput(e.target.value)}
                        helperText="Enter a keyword or phrase to search by"
                        onKeyDown={(e) => e.key === "Enter" ? addKeyword(): null}
                    ></TextField>
                    <Button variant="contained" sx={{height:"3.5rem"}} onClick={() => addKeyword()}>Add</Button>
                </Stack>
                {keywords.length >=1 ? 
                    <TextField 
                        disabled={loading}
                        sx={{marginTop:3}}
                        InputProps={{ inputProps:{type:'number', min:0, max:100} }} 
                        label="Number of Posts"
                        variant='outlined' 
                        value={numberOfPosts} 
                        onChange={(e) => {handleNumberInput(e, setNumberOfPosts)}}/>
                : <></>
                }
                {numberOfPosts >=1 ? 
                <Box>
                    <Divider sx={{marginTop:2, marginBottom:2}}/>
                    {tweets.length > 0 ?
                        <Button variant="contained" onClick={() => {onSeeTweetsClicked()}}>See Tweets</Button>
                    :
                        <LoadingButton variant="contained" loading={loading} onClick={() => {startSocialMediaSearch()}}>Start</LoadingButton>
                    }
                </Box>
                :
                <></>
                }
                
            </Box>
            : <></>
            }
        </Paper>
    )
}