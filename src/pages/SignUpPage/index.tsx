import {Link} from 'react-router-dom';
import {
    Box,
    TextField,
    Button,
    Paper,
    Stack,
    Typography,
    Divider,
} from '@mui/material';
import {useState} from 'react';

export default function SignUpPage(props: any){
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return(
        <Box 
            sx={{
                margin:2, 
                padding:2,
                display:"flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth:"200px",
                
            }}>
            <Paper
                elevation={2}
                sx={{
                        padding:6, 
                        borderRadius:4,
                        width:"25%",
                        minWidth:"250px",
                    }}>
                <Typography color="secondary" variant="h2">Sign Up</Typography>
                <Divider sx={{marginTop:2, marginBottom:2}}/>
                <Stack direction="column" spacing={2}>
                    <TextField variant='outlined' label="Firstname" value={firstname} onChange={(e) => {setFirstname(e.target.value)}} />
                    <TextField variant='outlined' label="Lastname" value={lastname} onChange={(e) => {setLastname(e.target.value)}}/>
                    <TextField variant='outlined' label="Email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                    <TextField variant='outlined' label="Password" type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                    <TextField variant='outlined' label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}}/>
                </Stack>
                <Typography><Link to="/signin">Already have an account?</Link></Typography>
            </Paper>
        </Box>
    )
}