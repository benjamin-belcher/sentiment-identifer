import React, {useState, useContext} from 'react';
import {Box, Stack, Divider, Avatar, InputAdornment, TextField, IconButton, Link, ListItemIcon, ListItemText, ListItemButton, List, Collapse, ListItem} from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AppsIcon from '@mui/icons-material/Apps';
import InfoIcon from '@mui/icons-material/Info';
import SanitizerIcon from '@mui/icons-material/Sanitizer';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { UserContext } from '../../util/UserContext';
import { UserContextType } from '../../util/UserContextType';
import {useNavigate} from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const clientId = "945406263981-q6r8d575nd6orns70p25s95l92odtrrq.apps.googleusercontent.com";

export default function NavigationSideBar(props: any){
    const context = useContext(UserContext) as UserContextType;
    const [managerListOpen, setManagerListOpen] = useState(false);
    const [adminListOpen, setAdminListOpen] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setManagerListOpen(!managerListOpen);
      };

      const handleAdminClick = () => {
        setAdminListOpen(!adminListOpen);
      };

      const handleNavigate = (url: string) => {
          navigate(url);
      }

    return(
        <Stack direction="row" minWidth="340px" sx={{backgroundColor:'#F4F5F6'}}>
            <Box sx={{height:'100%' ,width:'80px', backgroundColor:'#1B838B', display: 'flex', flexDirection:'column', justifyContent: 'space-between'}} className="side-nav">
                <IconButton onClick={() => {navigate("/record/"+context.currentUser.id)}}><Avatar src={context.currentUser.profileImg}  sx={{margin:'8px 8px 24px 8px'}}/></IconButton>
                <IconButton onClick={() => {navigate("/logout")}}><LogoutIcon sx={{margin:'8px 8px 24px 8px', color:"white"}}/></IconButton>
            </Box>
            <Box sx={{width:'100%', paddingLeft:2,  paddingRight:2,  paddingTop:2}}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    }}>
                    <IconButton onClick={() => {navigate("/")}}>        
                        <AutoFixHighIcon  />
                    </IconButton>
                    <Link href="/" underline="none" lineHeight="1.6" sx={{color:'#000000', fontSize:'1.25rem'}}>Sentiment Identifer</Link>
                </div>

                <Divider />

                <Stack>
                    <TextField
                        variant="outlined"
                        size="small"
                        sx={{width:'100%', marginTop:2}}
                        placeholder="Search..."
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                            ),
                        }}
                    />

                    <List sx={{width:'100%', margin:0}}>
                        <ListItem sx={{padding:0}} disabled>
                            <ListItemButton sx={{padding:0}}>  
                                <ListItemIcon sx={{marginRight:'1em', minWidth:0}}>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primaryTypographyProps={{fontSize: '1.1rem'}}  primary="Dashboard" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem sx={{padding:0}}>
                            <ListItemButton sx={{padding:0}} onClick={handleAdminClick}>  
                                <ListItemIcon sx={{marginRight:'1em', minWidth:0}}>
                                    <AutoFixHighIcon />
                                </ListItemIcon>
                                <ListItemText primaryTypographyProps={{fontSize: '1.1rem'}}  primary="Analyse Data" />
                                {adminListOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            </ListItem>
                            <Collapse in={adminListOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }} onClick={() => {handleNavigate("/analysis/new")}}>
                                        <ListItemText primary="New Analysis" sx={{marginLeft:'1em'}}/>
                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4 }} disabled>
                                        <ListItemText primary="Analysis History" sx={{marginLeft:'1em'}}/>
                                </ListItemButton>
                                </List>
                            </Collapse>

                        <ListItem sx={{padding:0}} disabled>
                            <ListItemButton sx={{padding:0}}>  
                                <ListItemIcon sx={{marginRight:'1em', minWidth:0}}>
                                    <SanitizerIcon />
                                </ListItemIcon>
                                <ListItemText primaryTypographyProps={{fontSize: '1.1rem'}}  primary="Clean Data" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem sx={{padding:0}}>
                            <ListItemButton sx={{padding:0}}>  
                                <ListItemIcon sx={{marginRight:'1em', minWidth:0}}>
                                    <AutoStoriesIcon />
                                </ListItemIcon>
                                <ListItemText primaryTypographyProps={{fontSize: '1.1rem'}}  primary="Source Data" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem sx={{padding:0}}>
                            <ListItemButton sx={{padding:0}} onClick={() => {handleNavigate("/help")}}>  
                                <ListItemIcon sx={{marginRight:'1em', minWidth:0}}>
                                    <InfoIcon />
                                </ListItemIcon>
                                <ListItemText primaryTypographyProps={{fontSize: '1.1rem'}}  primary="Help" />
                            </ListItemButton>
                        </ListItem>

                            <ListItem sx={{padding:0}} disabled>
                            <ListItemButton sx={{padding:0}}>  
                                <ListItemIcon sx={{marginRight:'1em', minWidth:0}}>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText primaryTypographyProps={{fontSize: '1.1rem'}}  primary="Settings" />
                            </ListItemButton>
                        </ListItem>
                        </List>
                </Stack>
                
            </Box>
        </Stack>
    )
}