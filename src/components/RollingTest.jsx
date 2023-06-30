import React, { useEffect, useRef } from 'react';
import styles from '../css/rolling.module.scss';

const RollingTest = () => {
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
                    <li><img src="/img/bokka_symbol_subcolor.svg" alt="Logo" /></li>
                    <li><img src="/img/bokka_symbol_subcolor.svg" alt="Logo" /></li>
                    <li><img src="/img/m-left-01-02.png" alt="로고" /></li>
                    <li><img src="/img/bokka_symbol_subcolor.svg" alt="Logo" /></li>
                    <li><img src="/img/bokka_symbol_subcolor.svg" alt="Logo" /></li>
                    <li><img src="/img/bokka_symbol_subcolor.svg" alt="Logo" /></li>
                    <li><img src="/img/mmtc-06.png" alt="로고" /></li>
                    <li><img src="/img/bokka_symbol_subcolor.svg" alt="Logo" /></li>
                    <li><img src="/img/bokka_symbol_subcolor.svg" alt="Logo" /></li>
                </ul>
            </div>
            <div className={`${styles.expertise} ${styles.clone}`} ref={cloneRef}>
                <ul className={styles.expertise_wrap}>
                    <li><img src="/img/bokka_symbol_subcolor.svg" alt="Logo" /></li>
                    <li><img src="/img/bokka_symbol_subcolor.svg" alt="Logo" /></li>
                    <li><img src="/img/m-left-01-02.png" alt="로고" /></li>
                    <li><img src="/img/bokka_symbol_subcolor.svg" alt="Logo" /></li>
                    <li><img src="/img/bokka_symbol_subcolor.svg" alt="Logo" /></li>
                    <li><img src="/img/bokka_symbol_subcolor.svg" alt="Logo" /></li>
                    <li><img src="/img/mmtc-06.png" alt="로고" /></li>
                    <li><img src="/img/bokka_symbol_subcolor.svg" alt="Logo" /></li>
                    <li><img src="/img/bokka_symbol_subcolor.svg" alt="Logo" /></li>
                </ul>
            </div>
        </div>
    );
};

export default RollingTest;
