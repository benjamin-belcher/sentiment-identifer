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
import GoogleLoginComponent from '../../components/GoogleLogin';

const clientConfig = { client_id: '945406263981-q6r8d575nd6orns70p25s95l92odtrrq.apps.googleusercontent.com' }

export default function SignInPage(props: any){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                        color:"#2F4051",
                    }}>
                <Typography color="secondary" variant="h2">Login</Typography>
                <Divider sx={{marginTop:2, marginBottom:2}}/>
                <Stack direction="column" spacing={2}>
                    <TextField variant='outlined' label="Email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                    <TextField variant='outlined' label="Password" type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                </Stack>
                <Divider sx={{marginTop:2, marginBottom:2}}>or</Divider>
                <GoogleLoginComponent/>
                <Typography><Link to="/signup">New Here?</Link></Typography>
            </Paper>
        </Box>
    )
}