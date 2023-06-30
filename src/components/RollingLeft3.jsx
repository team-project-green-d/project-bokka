import React, { useEffect, useRef } from 'react';
import styles from '../css/rolling.module.scss';

const RollingLeft2 = () => {
    const rollerBoxRef = useRef(null);
    const rollerRef = useRef(null);
    const cloneRef = useRef(null);

    useEffect(() => {
        const rollerBox = rollerBoxRef.current;
        const roller = rollerRef.current;
        const clone = cloneRef.current;

        let expertiseWidth = `${roller.offsetWidth}px`;
        rollerBox.appendChild(clone);

        roller.style.left = '0px';
        clone.style.left = expertiseWidth;
        roller.classList.add(styles.original);
        clone.classList.add(styles.clone);

        const handleResize = () => {
            expertiseWidth = `${roller.offsetWidth}px`;
            roller.style.left = '0px';
            clone.style.left = expertiseWidth;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={styles.rolling} ref={rollerBoxRef}>
            <div className={styles.expertise} ref={rollerRef}>
                <ul className={styles.expertise_wrap}>

                    <li><img src={`${process.env.PUBLIC_URL}/img/bokka_symbol_subcolor.svg`} alt="Logo" /></li>
                    <li><img src={`${process.env.PUBLIC_URL}/img/bokka_symbol_subcolor.svg`} alt="Logo" /></li>
                    <li><img src={`${process.env.PUBLIC_URL}/img/mmtc-17.png`} alt="로고" /></li>
                    <li><img src={`${process.env.PUBLIC_URL}/img/bokka_symbol_subcolor.svg`} alt="Logo" /></li>
                    <li><img src={`${process.env.PUBLIC_URL}/img/bokka_symbol_subcolor.svg`} alt="Logo" /></li>
                    <li><img src={`${process.env.PUBLIC_URL}/img/bokka_symbol_subcolor.svg`} alt="Logo" /></li>
                    <li><img src={`${process.env.PUBLIC_URL}/img/mmtc-19.png`} alt="로고" /></li>
                    <li><img src={`${process.env.PUBLIC_URL}/img/bokka_symbol_subcolor.svg`} alt="Logo" /></li>
                    <li><img src={`${process.env.PUBLIC_URL}/img/bokka_symbol_subcolor.svg`} alt="Logo" /></li>
                </ul>
            </div>
            <div className={`${styles.expertise} ${styles.clone}`} ref={cloneRef}>
                <ul className={styles.expertise_wrap}>
                    <li><img src={`${process.env.PUBLIC_URL}/img/bokka_symbol_subcolor.svg`} alt="Logo" /></li>
                    <li><img src={`${process.env.PUBLIC_URL}/img/bokka_symbol_subcolor.svg`} alt="Logo" /></li>
                    <li><img src={`${process.env.PUBLIC_URL}/img/mmtc-18.png`} alt="로고" /></li>
                    <li><img src={`${process.env.PUBLIC_URL}/img/bokka_symbol_subcolor.svg`} alt="Logo" /></li>
                    <li><img src={`${process.env.PUBLIC_URL}/img/bokka_symbol_subcolor.svg`} alt="Logo" /></li>
                    <li><img src={`${process.env.PUBLIC_URL}/img/bokka_symbol_subcolor.svg`} alt="Logo" /></li>
                    <li><img src={`${process.env.PUBLIC_URL}/img/mmtc-21.png`} alt="로고" /></li>
                    <li><img src={`${process.env.PUBLIC_URL}/img/bokka_symbol_subcolor.svg`} alt="Logo" /></li>
                    <li><img src={`${process.env.PUBLIC_URL}/img/bokka_symbol_subcolor.svg`} alt="Logo" /></li>
                </ul>
            </div>
        </div>
    );
};

export default RollingLeft2;
