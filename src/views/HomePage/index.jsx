import React, { useState, useRef } from 'react';
import axios from 'axios';
import styles from './index.module.css';
import Header from '../../components/Header';
import { Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import icon from '../../assets/images/black-hole.gif';
import { FileUploader } from 'react-drag-drop-files';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (file != null) {
      setOpen(false);
      console.log(file);
      navigate('/result', { state: { file: file } });
    }
  };

  const handleChange = (file) => {
    setFile(file);

    let form_data = new FormData();
    form_data.append('image', file, file.name)
    axios.post(process.env.REACT_APP_API_URL + '/depthAPI/getDepth', form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err))

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
            <FileUploader handleChange={handleChange} name="file" types={['JPG', 'PNG']} />
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
