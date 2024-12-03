"use client";

import React from 'react';
import ScrollItem from './items/ScrollItem';
import styles from './scroll.module.css';

const ScrollWrapper: React.FC = () => {
  const baseShowStart = 100; // 기본 시작 스크롤 위치
  const gap = 600; // 섹션 간격

  const scrollItems = [1, 2, 3, 4].map((id, index) => ({
    id,
    showStart: baseShowStart + gap * index, // 등장 시작 위치
    resetStart: baseShowStart + gap * index - 200, // 사라짐 시작 위치
  }));

  return (
    <div>
      {scrollItems.map((item) => (
        <section className={styles.section} key={item.id}>
          <ScrollItem
            showStart={item.showStart}
            resetStart={item.resetStart}
          >
            나타나는 요소 {item.id}
          </ScrollItem>
        </section>
      ))}
    </div>
  );
};

export default ScrollWrapper;
