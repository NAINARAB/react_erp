import * as React from 'react';
import './header.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';

function Header() {
    return (
        <div>
            <div className='hed'>
                <div className='hedpos'>
                    <button className='hedbtn'><NotificationsIcon /></button>
                    <button className='hedbtn' style={{marginRight:'1.5em'}}><SettingsIcon /></button>
                    <br />
                </div>
            </div>
        </div>
    );
}

export default Header;