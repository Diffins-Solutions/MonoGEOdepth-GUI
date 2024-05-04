import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import resultImage from '../../assets/images/result.png';
import Header from '../../components/Header';
import styles from './index.module.css';
import { IoIosCloudDownload } from 'react-icons/io';
import fileDownload from 'js-file-download';
import ClipLoader from 'react-spinners/ClipLoader';

const Result = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  let [color, setColor] = useState('#9b0b0b');

  //TODO: remove after backend integration
  function wait30SecondsPromise() {
    return new Promise((resolve) => {
      setTimeout(resolve, 10000);
    });
  }

  useEffect(() => {
    const file = location.state?.file;
    console.log(file);

    //TODO: axios post and then
    wait30SecondsPromise().then(() => {
      console.log('30 seconds have passed!');
      const resultI = resultImage;
      setResult(resultI);
      setLoading(false);
    });
  }, []);

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
          <ClipLoader color={color} loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader" />
          {!loading && (
            <div className={styles['result-image-box']}>
              <img src={result} className={styles['image']} alt="Responsive image" />
              <div className={styles['middle']}>
                <div class={styles['text']}>
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
