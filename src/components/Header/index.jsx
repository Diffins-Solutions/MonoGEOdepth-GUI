import React from 'react';
import { Button, Toolbar, AppBar, Box, Typography, IconButton } from '@mui/material';
import icon from '../../assets/images/icon-mars-white.png';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

const Header = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }} >
        <AppBar
          position="static"
          sx={{
            bgcolor: 'rgba(155, 11, 11, 0.2)',
          }}
        >
          <Toolbar>
            <Link to="/">
              <IconButton size="small" edge="start" color="inherit" aria-label="menu" sx={{ mr: 1 }}>
                <img src={icon} alt="Icon" style={{ height: 30, width: 30 }} />
              </IconButton>
            </Link>
            <Typography variant="h11" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }} className={styles['app-bar-font']}>
              MonoGEOdepth
            </Typography>
            <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h11" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }} className={styles['app-bar-font']}>
                About
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Header;
