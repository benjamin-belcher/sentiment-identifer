import {
    Box,
    Button,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import React from 'react';

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
        console.log("Index ", index," split array ", keywordsCopy);
        addKeywords(keywordsCopy);
    }
    
    return(
        <Paper elevation={2} sx={{padding:2}}>
            <Typography variant="h5">Select a platform to search</Typography>
            <FormControl sx={{marginTop:1}} fullWidth>
                <InputLabel id="demo-simple-select-label">Platform</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={platform}
                    label="Platform"
                    onChange={handleChange}
                >
                    <MenuItem value="Twitter">Twitter</MenuItem>
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
                
            </Box>
            : <></>
            }
        </Paper>
    )
}