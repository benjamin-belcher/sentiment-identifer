import { 
    Typography,
    Box,
    Button,
    Paper
} from "@mui/material";
import React, {useContext} from "react";
import { UserContext } from "../../util/UserContext";
import { UserContextType } from "../../util/UserContextType";
import useDrivePicker from 'react-google-drive-picker'

export default function UserStorage(){
    const [openPicker, authResponse] = useDrivePicker();  
    // const customViewsArray = [new google.picker.DocsView()]; // custom view
    const handleOpenPicker = () => {
        openPicker({
        clientId: process.env.REACT_APP_GOOGLE_CLOUD_CLIENT_ID || '',
        developerKey: process.env.REACT_APP_GOOGLE_CLOUD_API_KEY || '',
        viewId: "DOCS",
        // token: token, // pass oauth token in case you already have one
        showUploadView: true,
        showUploadFolders: true,
        supportDrives: true,
        multiselect: true,
        // customViews: customViewsArray, // custom view
        callbackFunction: (data) => {
            if (data.action === 'cancel') {
            console.log('User clicked cancel/close button')
            }
            console.log(data)
        },
        })
    }

    const context = useContext(UserContext) as UserContextType;
    return(
        <Paper elevation={2} sx={{padding:4}}>
            <Typography variant="h5">Open a file from Google Drive</Typography>
            <Button variant="contained" onClick={() => handleOpenPicker()}>Select</Button>
        </Paper>
    )
}