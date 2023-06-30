import React from 'react'
import mainbg from '../css/main-bg.module.scss'
import RollingTest from './RollingTest'
import RollingLeft from './RollingLeft';
import RollingLeft2 from './RollingLeft2';
import RollingLeft3 from './RollingLeft3';
import RollingRight from './RollingRight';
import RollingRight2 from './RollingRight2';

export default function MainBg() {

    const symbolStyles = [

            {
            left: '2.29%',
            right: '86.44%',
            top: '2.05%',
            bottom: '82.41%',
            },
            {
                left: '16.34%',
                right: '72.4%',
                top: '2.05%',
                bottom: '82.41%',
            },
            {
                left: '30.38%',
                right: '58.35%',
                top: '2.05%',
                bottom: '82.41%',
            },
            {
                left: '44.35%',
                right: '44.38%',
                top: '2.05%',
                bottom: '82.41%',
            },
            {
                left: '58.4%',
                right: '30.34%',
                top: '2.05%',
                bottom: '82.41%',
            },
            {
                left: '72.44%',
                right: '16.29%',
                top: '2.05%',
                bottom: '82.41%',
            },
            {
                left: '86.49%',
                right: '2.25%',
                top: '2.05%',
                bottom: '82.41%',
            },
            {
                left: '2.29%',
                right: '86.44%',
                top: '22.26%',
                bottom: '62.2%',
            },
            {
                left: '16.34%',
                right: '72.4%',
                top: '22.26%',
                bottom: '62.2%',
            },
            {
                left: '30.38%',
                right: '58.35%',
                top: '22.26%',
                bottom: '62.2%',
            },
            {
                left: '44.35%',
                right: '44.38%',
                top: '22.26%',
                bottom: '62.2%',
            },
            {
                left: '58.4%',
                right: '30.34%',
                top: '22.26%',
                bottom: '62.2%',
            },
            {
                left: '72.44%',
                right: '16.29%',
                top: '22.26%',
                bottom: '62.2%',
            },
            {
                left: '86.49%',
                right: '2.25%',
                top: '22.26%',
                bottom: '62.2%',
            },
            {
                left: '2.29%',
                right: '86.44%',
                top: '42.47%',
                bottom: '41.99%',
            },
            {
                left: '16.34%',
                right: '72.4%',
                top: '42.47%',
                bottom: '41.99%',
            },
            {
                left: '30.38%',
                right: '58.35%',
                top: '42.47%',
                bottom: '41.99%',
            },
            {
                left: '44.35%',
                right: '44.38%',
                top: '42.47%',
                bottom: '41.99%',
            },
            {
                left: '58.4%',
                right: '30.34%',
                top: '42.47%',
                bottom: '41.99%',
            },
            {
                left: '72.44%',
                right: '16.29%',
                top: '42.47%',
                bottom: '41.99%',
            },
            {
                left: '86.49%',
                right: '2.25%',
                top: '42.47%',
                bottom: '41.99%',
            },
            {
                left: '2.29%',
                right: '86.44%',
                top: '62.68%',
                bottom: '21.78%',
            },
            {
                left: '16.34%',
                right: '72.4%',
                top: '62.68%',
                bottom: '21.78%',
            },
            {
                left: '30.38%',
                right: '58.35%',
                top: '62.68%',
                bottom: '21.78%',
            },
            {
                left: '44.35%',
                right: '44.38%',
                top: '62.68%',
                bottom: '21.78%',
            },
            {
                left: '58.4%',
                right: '30.34%',
                top: '62.68%',
                bottom: '21.78%',
            },
            {
                left: '72.44%',
                right: '16.29%',
                top: '62.68%',
                bottom: '21.78%',
            },
            {
                left: '86.49%',
                right: '2.25%',
                top: '62.68%',
                bottom: '21.78%',
            },
            {
                left: '2.29%',
                right: '86.44%',
                top: '82.91%',
                bottom: '1.55%',
            },
            {
                left: '16.34%',
                right: '72.4%',
                top: '82.91%',
                bottom: '1.55%',
            },
            {
                left: '30.38%',
                right: '58.35%',
                top: '82.91%',
                bottom: '1.55%',
            },
            {
                left: '44.35%',
                right: '44.38%',
                top: '82.91%',
                bottom: '1.55%',
            },
            {
                left: '58.4%',
                right: '30.34%',
                top: '82.91%',
                bottom: '1.55%',
            },
            {
                left: '72.44%',
                right: '16.29%',
                top: '82.91%',
                bottom: '1.55%',
            },
            {
                left: '86.49%',
                right: '2.25%',
                top: '82.91%',
                bottom: '1.55%',
            },
        ];

    return (
        // 전체 같은 이미지 적용
        // <div className={`${mainbg[`main-bg-wrap`]}`}>
        //     {symbolStyles.map((style, index) => (
        //         <div key={index} style={style} className={`${mainbg[`symbol_s`]}`}><img src="/img/bokka_symbol_subcolor.svg" alt="로고" /></div>
        //     ))}
        // </div>

        // 홀수 짝수 이미지 다르게 적용
        // <div className={`${mainbg['main-bg-wrap']}`}>
        // {symbolStyles.map((style, index) => (
        //     <div key={index} style={style} className={`${mainbg['symbol_s']}`}>
        //         <img
        //         src={`/img/bokka_symbol_${index % 2 === 0 ? 'subcolor' : 'maincolor'}.svg`}
        //         alt="로고"
        //         />
        //     </div>
        //     ))}
        // </div>
        <div>
            <div className={`${mainbg['main-bg-wrap']}`}>
                <RollingLeft/>
                <RollingRight/>
                <RollingLeft2/>
                <RollingRight2/>
                <RollingLeft3/>
            </div>

        {/* <div className={`${mainbg['main-bg-wrap']}`}>
        {symbolStyles.map((style, index) => (
            <div key={index} style={style} className={`${mainbg['symbol_s']}`}>
                {index === 2 ? (
                <img src="/img/m-left-01-02.png" alt="로고" />
                ) : index === 7 ? (
                <img src="/img/mmtc-06.png" alt="로고" />
                ) : index === 12 ? (
                <img src="/img/mmtc-08.png" alt="로고" />
                ) : index === 22 ? (
                <img src="/img/m-right-02.png" alt="로고" />
                ) : index === 27 ? (
                <img src="/img/mmtc-07.png" alt="로고" />
                ) : index === 32 ? (
                <img src="/img/mmtc-09.png" alt="로고" />
                ) : (
                <img src="/img/bokka_symbol_subcolor.svg" alt="로고" />
                )}
            </div>
            ))}
        </div> */}

        </div>

    )
}
