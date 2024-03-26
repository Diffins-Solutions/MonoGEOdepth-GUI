import React from 'react';
import Header from '../../components/Header';
import styles from './index.module.css';

const About = () => {
    return (
        <>
        <Header/>
            <div className={styles['about-body']}>Hello from About</div>
        </>
    );
};

export default About;