import React, { useState, useRef } from 'react';
import axios from 'axios';
import styles from './index.module.css';
import Header from '../../components/Header';
import { Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import icon from '../../assets/images/black-hole.gif';
import { FileUploader } from "react-drag-drop-files";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const handleChange = (file) => {
      setFile(file);
      axios.get(process.env.REACT_APP_API_URL + '/depthAPI')
      .then(res => {
        const data = res.data;
        console.log(data);
      }).catch(error => {
        console.log(error);
      });
      console.log(file);
    };
 

  return (
    <>
      <Header />
      <div className={styles['home-body']}>
        <Typography variant="h3">
          EASILY GENERATE <br /> GEOGRAPHICAL DEPTH MAPS <br />
          USING MONOGEODEPTH
        </Typography>
        <div className={styles['btn-container']}>
          <button className={styles['upload-btn']} variant="contained" onClick={handleOpen}>
            <div className={styles['btn-content']}>
              <Typography fontSize="small" style={{ letterSpacing: '2px', fontWeight: 'bold' }}>
                Upload
              </Typography>
              <img src={icon} alt="Icon" style={{ height: 30, width: 30 }} />
            </div>
          </button>
        </div>

        <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{'Upload your satallite image'}</DialogTitle>
          <DialogContent>
          <FileUploader handleChange={handleChange} name="file" types={["JPG", "PNG"]} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Home;
