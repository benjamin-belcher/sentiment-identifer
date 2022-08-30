import { Box, IconButton } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

export default function ProfilePage(){
    const navigate = useNavigate();
    return(
        <Box>
            <IconButton onClick={() => {navigate("/logout")}}>
                <LogoutIcon />
            </IconButton>
        </Box>
    )
}