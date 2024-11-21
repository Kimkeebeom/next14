"use client";

import React, { useEffect, useState } from 'react';
import styles from './scroll.module.css';
import Aos from 'aos';

interface Props {
  children: React.ReactNode;
  showStart: number; // 나타나는 시작 스크롤 위치
  resetStart: number; // 사라지는 시작 스크롤 위치
}

const ScrollItem: React.FC<Props> = ({ children, showStart, resetStart }) => {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
      const handleScroll = () => {
        const currentScroll =
          window.scrollY || document.documentElement.scrollTop;
          console.log("currentScroll: ", currentScroll);
        
      if (currentScroll > showStart) {
        // showStart 이후에 나타남
        setVisible(true);
      }  
      if (currentScroll < resetStart || currentScroll === 0) {
        // resetStart 이전에 사라짐
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    Aos.refresh();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showStart, resetStart]);

  return (
    <div
      className={`${styles.scrollItem} ${
        isVisible ? styles.visible : ''
      }`}
      data-aos="fade-up" //Aos 애니메이션 속성
    >
      {children}
    </div>
  );
};

export default ScrollItem;
