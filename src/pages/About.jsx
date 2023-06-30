import React from 'react';
import mainStyle from '../css/sass.module.scss'
import aboutStyle from '../css/about.module.scss'
import MainBg from '../components/MainBg';
import BackToTopButton from '../components/ScrollButton/BackToTopButton';

import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

export default function About() {

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



    // ---------------- 채팅창 FadeUp --------------------

    
    const AosFadeUp01 = ({ children }) => {
        return (
            <div
                data-aos="fade-up"
                data-aos-offset="0"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
            >
                {children}
            </div>
        );
    };

    const AosFadeUp02 = ({ children }) => {
        return (
            <div
                data-aos="fade-up"
                data-aos-offset="0"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
            >
                {children}
            </div>
        );
    };




    return (
        // <div className={`${mainStyle['main-color']}`}>
        <div>

            <div className={`${aboutStyle['bg-wrap']}`}>
                <MainBg />

                <BackToTopButton />
                {/* ----------------- section 01 / 설명 -------------------*/}
                <section className={aboutStyle['section-wrap']}>
                    <div className={aboutStyle['about-top-logo']}>
                        <img src="/img/bokka logo_kor_w.png" alt="사진" />
                    </div>
                    <span>about</span>
                    <p>BOKKA?!</p>
                    <div className={aboutStyle['section01-text']}>
                        약속을 잡고 싶은 날,
                        <br />
                        <br />
                        친구들의 약속 없는 날을 모아서
                        <br />
                        <br />
                        알려주고,<br />
                        추천해주는,
                        <br />
                        <br />
                        바쁜 현대사회의<br />
                        많은 약속들을 관리해주는<br />
                        <b>통합 약속관리 사이트</b>입니다!
                    </div>
                </section>

            </div>

            {/* ----------------- section 02 / 채팅 -------------------*/}
            <div className={`${aboutStyle['fullpage']} ${aboutStyle['chat-section']}`}>

                <section className={`${aboutStyle['about-wrap']} ${aboutStyle['section-wrap']}}`}>
                    <div className={aboutStyle['chat-wrap']}>

                        <AosFadeUp01>
                            <div className={`${aboutStyle['chatbox']} ${aboutStyle['chatbox-left']}`}>
                                <img src="/img/chatbox-b-01.png" alt="사진" />
                                <div>
                                    언니, 잘지냈어요?<br />
                                    프사 바꼈네요, 넘 예뻐요!! 꺄
                                </div>
                            </div>
                            <div className={`${aboutStyle['chatfaceA']} ${aboutStyle['chatface-left']}`}>
                                <img src="/img/m-left-01.png" alt="사진" />
                            </div>
                        </AosFadeUp01>

                        <AosFadeUp02>
                            <div className={`${aboutStyle['chatbox']} ${aboutStyle['chatbox-right']}`}>
                                <img src="/img/chatbox-b-04.png" alt="사진" />
                                <div className={`${aboutStyle['chatbox-right-text']}`}>
                                    꺄 고마워!!!<br />
                                    조만간 맛있는거 먹으러가자!
                                </div>
                            </div>
                            <div className={`${aboutStyle['chatface']} ${aboutStyle['chatface-right']}`}>
                                <img src="/img/m-right-01.png" alt="사진" />
                            </div>
                        </AosFadeUp02>

                        <AosFadeUp02>
                            <div className={`${aboutStyle['chatbox']} ${aboutStyle['chatbox-left']}`}>
                                <img src="/img/chatbox-b-01.png" alt="사진" />
                                <div>
                                    가요가요!!!<br />
                                    언니 시간되는 날 알려주세요!
                                </div>
                            </div>
                            <div className={`${aboutStyle['chatface']} ${aboutStyle['chatface-left']}`}>
                                <img src="/img/m-left-02.png" alt="사진" />
                            </div>
                        </AosFadeUp02>

                        <AosFadeUp02>
                            <div className={`${aboutStyle['chatbox']} ${aboutStyle['chatbox-right']}`}>
                                <img src="/img/chatbox-b-04.png" alt="사진" />
                                <div className={`${aboutStyle['chatbox-right-text']}`}>
                                    응응!! 이번달은 안될꺼같구<br />
                                    다음 달 스케줄 나오면 연락할께!
                                </div>
                            </div>
                            <div className={`${aboutStyle['chatface']} ${aboutStyle['chatface-right']}`}>
                                <img src="/img/m-right-02.png" alt="사진" />
                            </div>
                        </AosFadeUp02>

                        <AosFadeUp02>
                            <div className={`${aboutStyle['chatbox']} ${aboutStyle['chatbox-left']}`}>
                                <img src="/img/chatbox-b-06.png" alt="사진" />
                                <div className={aboutStyle['chatbox-last-left']}>
                                    조아효!! 연락주세요 언닝♡
                                </div>
                            </div>
                        </AosFadeUp02>

                        <AosFadeUp01>
                            <div className={aboutStyle.sendbox}>
                                <div className={aboutStyle['sendbox-left']}>
                                    <span>언니는 예쁘지않았고, 그 둘은 만나지 않았다..?!
                                    </span>
                                    <div className={aboutStyle['sendbox-cursor']}>.</div>
                                    {/* <span>{blogTitle}</span> */}
                                </div>
                                <div className={aboutStyle['sendbox-right']}>
                                    <img src="/img/send-icon.png" alt="사진" />
                                </div>
                            </div>
                        </AosFadeUp01>

                    </div>
                </section>

                <div className={`${aboutStyle['main-bg-wrap']}`}>
                    {symbolStyles.map((style, index) => (
                        <div key={index} style={style} className={`${aboutStyle['symbol_s']}`}>
                            <img src="/img/bokka_logo_eng_line_w.png" alt="로고" />
                        </div>
                    ))}
                </div>
                
            </div>

            {/* ----------------- section 03 / 마무리 -------------------*/}
            <div className={`${aboutStyle['fullpage']} ${aboutStyle['skill-section']}`}>
                {/* <section className={`${aboutStyle['about-wrap']} ${aboutStyle['section-wrap']}}`}> */}
                <section className={`${aboutStyle['about-wrap']} ${aboutStyle['skill-wrap']}`}>
                    <div className={aboutStyle['title']}>그럼 우리, 보까? 마까?</div>
                    <div className={aboutStyle['main-skill']}>

                        <ul>
                            <li>
                                <div className={aboutStyle['skill-textbox']}>
                                    약속잡고싶은 A캘린더<br />
                                    약속잡기싫은 B캘린더<br />
                                    <b>2가지 스타일로 관리</b>
                                </div>
                                <div className={aboutStyle['skill-memoji']}>
                                    <img src="/img/mmtc-23.png" alt="memoji" />
                                </div>
                            </li>

                            <li>
                                <div className={aboutStyle['skill-textbox']}>
                                    약속잡고싶은 사람<br />
                                    약속잡기싫은 사람<br />
                                    <b>A, B 캘린더 중 선택</b>
                                </div>
                                <div className={aboutStyle['skill-memoji']}>
                                    <img src="/img/mmtc-09.png" alt="memoji" />
                                </div>
                            </li>

                            <li>
                                <div className={aboutStyle['skill-textbox']}>
                                    등록된 친구는<br />
                                    <b>지정된 캘린더만</b><br />
                                    확인 가능<br />
                                </div>
                                <div className={aboutStyle['skill-memoji']}>
                                    <img src="/img/mmtc-19.png" alt="memoji" />
                                </div>
                            </li>

                            <li>
                                <div className={aboutStyle['skill-textbox']}>
                                    많은 약속 스케줄<br />
                                    캘린더로<br />
                                    <b>한 눈에 확인</b>
                                </div>
                                <div className={aboutStyle['skill-memoji']}>
                                    <img src="/img/mmtc-10.png" alt="memoji" />
                                </div>
                            </li>

                            <li className={aboutStyle['skill-main-li']}>
                                <div className={`${aboutStyle['skill-textbox']} ${aboutStyle['skill-main']}`}>
                                    <b className={`${aboutStyle['skill-textbox-small']}`}>
                                        약속이 많은 사람에게도,<br />
                                        약속을 피하고 사람에게도,<br />
                                        꼭 필요한!</b>
                                    <div className={aboutStyle['skill-logo']}>
                                        <img src="/img/bokka_logo_eng_line.png" alt="사진" />
                                    </div>
                                </div>
                            </li>

                            <li>
                            <div className={aboutStyle['skill-textbox']}>
                                    쉬고싶은 날,<br />
                                    약속 있는 척<br />
                                    <b>캘린더 막아두기</b>
                                </div>
                                <div className={aboutStyle['skill-memoji']}>
                                    <img src="/img/mmtc-07.png" alt="memoji" />
                                </div>
                            </li>

                            <li>
                                <div className={aboutStyle['skill-textbox']}>
                                    친구들의<br />
                                    스케줄 없는 날<br />
                                    <b> 확인 후 약속신청</b>
                                </div>
                                <div className={aboutStyle['skill-memoji']}>
                                    <img src="/img/mmtc-15.png" alt="memoji" />
                                </div>
                            </li>
                            <li>
                                <div className={aboutStyle['skill-textbox']}>
                                    모임 멤버들의<br />
                                    <b>비어있는 스케줄</b><br />
                                    확인 후 모임신청 가능
                                </div>
                                <div className={aboutStyle['skill-memoji']}>
                                    <img src="/img/mmtc-11.png" alt="memoji" />
                                </div>
                            </li>
                            <li>
                                <div className={aboutStyle['skill-textbox']}>        
                                    친구의 스케줄<br />
                                    실시간 변동사항<br />
                                    <b>타임라인 확인 가능</b>
                                </div>
                                <div className={aboutStyle['skill-memoji']}>
                                    <img src="/img/mmtc-22.png" alt="memoji" />
                                </div>
                            </li>
                        </ul>

                    </div>
                </section>

                <div className={`${aboutStyle['main-bg-wrap']}`}>
                    {symbolStyles.map((style, index) => (
                        <div key={index} style={style} className={`${aboutStyle['symbol_s']}`}>
                            <img src="/img/bokka_logo_eng_line_w.png" alt="로고" />
                        </div>
                    ))}
                </div>
                
            </div>

        </div>
    )
}
