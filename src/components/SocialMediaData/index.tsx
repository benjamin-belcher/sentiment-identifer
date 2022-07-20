import {
    Box,
    Button,
    Chip,
    FormControl,
    InputLabel,
    ListItemIcon,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import React from 'react';
import twitterIcon from '../../assets/twitterIcon.svg';

export default function SocialMediaData(){
    const [platform, setPlatform] = React.useState('');
    const [displayKeywordSearch, setDisplayKeywordSearch] = React.useState(false);
    const [keywords, addKeywords] = React.useState<string[]>([]);
    const [keywordInput, setKeywordInput] = React.useState("");

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

    const startSocialMediaSearch = () => {
        console.log("Platform is ", platform);
    }
    
    return(
        <Paper elevation={2} sx={{padding:4}}>
            <Typography variant="h5">Select a platform to search</Typography>
            <FormControl sx={{marginTop:1}} fullWidth>
                <InputLabel id="social-media-platform-label">Platform</InputLabel>
                <Select
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
                            <Chip key={index} label={keyword} onClick={() =>{removeKeyword(index)}}/>
                        );
                    })}
                </Stack>
                
                <Stack direction="row" spacing={1}>
                    <TextField 
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
                <Button variant="contained" onClick={() => {startSocialMediaSearch()}}>Start</Button>
                :
                <></>
                }
                
            </Box>
            : <></>
            }
        </Paper>
    )
}