import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
    const cursorRef = useRef(null);

    useEffect(() => {
        // 마우스 커서 모양 변경
        const changeCursor = (e) => {
        const cursor = cursorRef.current;
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        };

        document.addEventListener('mousemove', changeCursor);

        return () => {
        // 이후에 컴포넌트가 사라질 때 이벤트 리스너 제거
        document.removeEventListener('mousemove', changeCursor);
        };
    }, []);

    useEffect(() => {
        // 기본 커서 모양 제거
        const removeDefaultCursor = () => {
        document.body.style.cursor = 'none';
        };

        removeDefaultCursor();

        return () => {
        // 컴포넌트가 사라질 때 기본 커서 모양 복원
        document.body.style.cursor = 'auto';
        };
    }, []);

    useEffect(() => {
        // 마우스 커서 층위 설정
        const cursor = cursorRef.current;
        cursor.style.zIndex = '9999';

        return () => {
        // 컴포넌트가 사라질 때 마우스 커서 층위 복원
        cursor.style.zIndex = 'auto';
        };
    }, []);

    return (
        <div className="custom-cursor" ref={cursorRef}>
        {/* 심볼 이미지 */}
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
            <image href="/img/bokka_symbol_maincolor.svg" width="100%" height="100%"/>
        </svg>
        </div>
    );
};

export default CustomCursor;
