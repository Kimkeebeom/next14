"use client";

import { useEffect } from "react";
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '@/utils/emotion-cache';
import AOS from "aos";
import "aos/dist/aos.css";
import './styles/reset.css'

const emotionCache = createEmotionCache();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      duration: 1000, // 애니메이션 지속 시간 (ms)
      offset: 120, // 스크롤 시작 시점 (px)
      once: false, // 애니메이션이 한 번만 실행되도록 설정
    });
  }, []);

  return (
    <html lang="en">
      <body>
        <CacheProvider value={emotionCache}>
          {children}
        </CacheProvider>
      </body>
    </html>
  );
}
