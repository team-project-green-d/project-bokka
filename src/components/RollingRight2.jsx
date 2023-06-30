import React, { useEffect, useRef } from 'react';
import styles from '../css/rolling.module.scss';

const RollingRight2 = () => {
    const rollerRBoxRef = useRef(null);
    const rollerRef = useRef(null);
    const cloneRRef = useRef(null);

    useEffect(() => {
        const rollerBox = rollerRBoxRef.current;
        const rollerR = rollerRef.current;
        const cloneR = cloneRRef.current;

        let expertiseWidth = `-${rollerR.offsetWidth}px`;
        // rollerBox.appendChild(cloneR);
        rollerBox.appendChild(cloneR);

        rollerR.style.right = '0px';
        cloneR.style.right = expertiseWidth; // Position cloneR right after rollerRef
        rollerR.classList.add(styles.originalR);
        cloneR.classList.add(styles.cloneR);

        const handleResize = () => {
            expertiseWidth = `${rollerR.offsetWidth}px`;
            rollerR.style.right = '0px';
            cloneR.style.right = expertiseWidth; // Update cloneR position on resize
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={styles.rolling} ref={rollerRBoxRef}>
            <div className={styles.expertise} ref={rollerRef}>
                <ul className={styles.expertise_wrap}>
                    <li><img src="/img/bokka_symbol_subcolor.svg" alt="Logo" /></li>
                    <li><img src="/img/bokka_symbol_subcolor.svg" alt="Logo" /></li>
                    <li><img src="/img/mmtc-09.png" alt="로고" /></li>
                    <li><img src="/img/bokka_symbol_subcolor.svg" alt="Logo" /></li>
                    <li><img src="/img/bokka_symbol_subcolor.svg" alt="Logo" /></li>
                    <li><img src="/img/bokka_symbol_subcolor.svg" alt="Logo" /></li>
                    <li><img src="/img/mmtc-10.png" alt="로고" /></li>
                    <li><img src="/img/bokka_symbol_subcolor.svg" alt="Logo" /></li>
                    <li><img src="/img/bokka_symbol_subcolor.svg" alt="Logo" /></li>
                </ul>
            </div>
            <div className={`${styles.expertise} ${styles.cloneR}`} ref={cloneRRef}>
                <ul className={styles.expertise_wrap}>
                    <li><img src="/img/bokka_symbol_subcolor.svg" alt="Logo" /></li>
                    <li><img src="/img/bokka_symbol_subcolor.svg" alt="Logo" /></li>
                    <li><img src="/img/mmtc-11.png" alt="로고" /></li>
                    <li><img src="/img/bokka_symbol_subcolor.svg" alt="Logo" /></li>
                    <li><img src="/img/bokka_symbol_subcolor.svg" alt="Logo" /></li>
                    <li><img src="/img/bokka_symbol_subcolor.svg" alt="Logo" /></li>
                    <li><img src="/img/mmtc-12.png" alt="로고" /></li>
                    <li><img src="/img/bokka_symbol_subcolor.svg" alt="Logo" /></li>
                    <li><img src="/img/bokka_symbol_subcolor.svg" alt="Logo" /></li>
                </ul>
            </div>
        </div>
    );
};

export default RollingRight2;
