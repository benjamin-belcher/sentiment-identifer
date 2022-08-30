import DashboardIcon from '@mui/icons-material/Dashboard';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import SanitizerIcon from '@mui/icons-material/Sanitizer';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import TwitterIcon from '@mui/icons-material/Twitter';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import {useContext, useState} from 'react';
import {Box} from '@mui/material'
import {Link, useNavigate} from 'react-router-dom';
import './styles.scss';

import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Avatar, IconButton } from '@mui/material';
import { UserContext } from '../../util/UserContext';
import { UserContextType } from '../../util/UserContextType';

export default function MiniDrawer(){
  const [collapsed, setCollapsed] = useState(false);
  const context = useContext(UserContext) as UserContextType;
  const navigate = useNavigate();

  return(
    <ProSidebar collapsed={collapsed}>
      <SidebarHeader>
        <Menu iconShape='round'>
            <MenuItem icon={<Avatar src={context.currentUser.profileImg}></Avatar>}>{context.currentUser.firstname} {context.currentUser.lastname} <Link to={context.currentUser.id}/></MenuItem>
        </Menu>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="round">
          <MenuItem icon={<DashboardIcon color="secondary" />}>
            Dashboard
            <Link to="/"/>
          </MenuItem>
          <SubMenu title="Analyse Data" icon={<AutoFixHighIcon color="secondary" />}>
            <MenuItem icon={<AddIcon color="secondary" />}>
              New Analysis
              <Link to="/analysis/new" />
            </MenuItem>
            <MenuItem icon={<HistoryIcon color="secondary" />}>Analysis Hiostory</MenuItem>
          </SubMenu>
          <SubMenu title="Clean Data" icon={<SanitizerIcon color="secondary"/>}>
            <MenuItem icon={<StorageRoundedIcon color="secondary" />}>Clean Data</MenuItem>
          </SubMenu>
          <SubMenu title="Source Data" icon={<TravelExploreIcon color="secondary"/>}>
            <MenuItem icon={<TwitterIcon color="secondary"/>}>Source Twitter Data</MenuItem>
          </SubMenu>
        </Menu>
      </SidebarContent>
    <SidebarFooter>
        <Box sx={{padding:"8px 20px 8px 20px", display:"flex", alignItems:"center", justifyContent: "flex-end", width:"fit-content"}}>
          {
            collapsed? 
              <IconButton onClick={() => {setCollapsed(false)}}>
                <ChevronRightIcon color="secondary" /> 
              </IconButton>  
            : 
              <IconButton onClick={() => {setCollapsed(true)}}>
                <ChevronLeftIcon color="secondary"/>
              </IconButton>
          }
        </Box>
    </SidebarFooter>
  </ProSidebar>
  )
}

