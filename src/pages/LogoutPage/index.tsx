import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../util/UserContext";
import { UserContextType } from "../../util/UserContextType";
import {
    Box,
    Paper,
    Typography,
    Button
} from '@mui/material';

export default function LogoutPage(){
    const {setUser} = useContext(UserContext) as UserContextType;
    const navigate = useNavigate();

    useEffect(() =>{
        setUser({
            id:'',
            firstname:'',
            lastname:'',
            email: '',
            profileImg: '',
        });
        localStorage.removeItem('currentUser');
    }, [])
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
                        display:"flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>
                    <Typography color="secondary" variant="h4">You've been logged out</Typography>
                    <Button variant="contained" onClick={() =>{navigate("/signin")}}>Login again</Button>
            </Paper>
        </Box>
    )
}