import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from '@mui/material';
import React from 'react';

export default function SocialMediaData(){
    const [platform, setPlatform] = React.useState('');
    const [displayKeywordSearch, setDisplayKeywordSearch] = React.useState(false);

    const handleChange = (event: SelectChangeEvent) => {
        setPlatform(event.target.value as string);
        setDisplayKeywordSearch(true);
    };
    
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
            <Box>
                <Typography variant="body1">Enter a keyword to search by</Typography>
                <TextField variant='outlined' label="Keywords"></TextField>
            </Box>
            : <></>
            }
        </Paper>
    )
}