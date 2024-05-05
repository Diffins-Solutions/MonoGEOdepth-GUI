import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import resultImage from '../../assets/images/result.png';
import Header from '../../components/Header';
import styles from './index.module.css';
import { IoIosCloudDownload } from 'react-icons/io';
import ClipLoader from 'react-spinners/ClipLoader';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  let [color, setColor] = useState('#9b0b0b');
  const navigate = useNavigate();

  useEffect(() => {
    const file = location.state?.file;
    console.log(file);

    let form_data = new FormData();
    form_data.append('image', file, file.name)

    axios.post(process.env.REACT_APP_API_URL + '/depthAPI/getDepth', form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }).then((res) => {
      console.log(res.data);
      const resultI = resultImage;
      setResult(resultI);
      setLoading(false);
    });
  }, []);

  const handleClose = () => {
    navigate('/');
  };

  const handleDownload = () => {
    console.log(result);
    const link = document.createElement('a');
    link.href = result;
    link.download = 'monoGEOdepth-result-depthmap.png';
    link.click();

    //TODO: use fileDownload for the actual scene if this does not work
  };
  return (
    <>
      <Header />
      <div className={styles['result-body']}>
        <div className={styles['result-image-box']}>
          {!loading && (
            <IconButton style={{ paddingRight: '30px', alignSelf: 'flex-end' }} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          )}
          <ClipLoader color={color} loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader" />
          {!loading && (
            <div className={styles['result-image-box']}>
              <img src={result} className={styles['image']} alt="Responsive image" />
              <div className={styles['middle']}>
                <div className={styles['text']}>
                  <IoIosCloudDownload size={60} onClick={handleDownload} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Result;
