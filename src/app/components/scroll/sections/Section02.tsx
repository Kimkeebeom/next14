"use client";

import React, { useEffect, useState } from 'react';
import * as S from '@/app/styles/scroll/scrollStyles';
import ProductList from '../../features/products/ProductsList';

const Section02: React.FC = () => {
    const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 }); // 카운트다운 시간
    const [currentStatus, setCurrentStatus] = useState<string>("upcoming"); // 상태: upcoming, active, closed
    
    // 다음날 오전 9시 59분 59초 계산 함수
    const calculateNextDayEnd = (): Date => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 9, 59, 59);
    };

    // 카운트다운 업데이트 함수
    const updateCountdown = (endTime: Date) => {
        const now = new Date();
        const diff = Math.max(endTime.getTime() - now.getTime(), 0);

        if (diff === 0) {
        setCurrentStatus("closed");
        return;
        }

        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setCountdown({ hours, minutes, seconds });
    };

    useEffect(() => {
        const endTime = calculateNextDayEnd();
    
        // 초기 상태 결정
        const now = new Date();
        if (now.getTime() < endTime.getTime()) {
          setCurrentStatus("active");
        } else {
          setCurrentStatus("closed");
        }
    
        // 카운트다운 업데이트
        const interval = setInterval(() => updateCountdown(endTime), 1000);
    
        return () => clearInterval(interval);
      }, []);
    
    return (
        <S.Section02 id='section02' className="sc02 sc-bk" style={{position: "relative"}}>
        <div className="sc02-clock-bg"></div>
        <div className="sc02-head">
          <p className="sc-head-nb">NO.2</p>
          <h3 className="sc-head-text">24시간 특가</h3>
          <p className="sc-sub-text">매일 다른 상품으로 찾아올게요! 매일 방문하고 CHECK!<br/>
          <span style={{fontWeight: "600;"}}>매일 오전 10시 - 다음 날 오전 9시 59분까지!</span></p>
          
          {currentStatus === "active" && (
            <div className="w1280 sc02-timer" style={{ marginTop: "30px" }}>
              <div className="container">
                <ul className="count-time">
                  <li>
                    <div id="c_hours" className="hours">
                      {String(countdown.hours).padStart(2, "0")}
                    </div>
                    <p>HOURS</p>
                  </li>
                  <li className="time-colon">:</li>
                  <li>
                    <div id="c_mins" className="mins">
                      {String(countdown.minutes).padStart(2, "0")}
                    </div>
                    <p>MINS</p>
                  </li>
                  <li className="time-colon">:</li>
                  <li>
                    <div id="c_sec" className="sec">
                      {String(countdown.seconds).padStart(2, "0")}
                    </div>
                    <p>SEC</p>
                  </li>
                </ul>
              </div>
            </div>
          )}
          {currentStatus === "closed" && (
            <div className="sc02-closed">
              <h3>CLOSED!</h3>
            </div>
          )}
        </div>
        <div className="sc02-flex " style={{paddingTop:"70px"}} data-aos="fade-up" data-aos-duration="1000">
          <ProductList startIndex={0} endIndex={3} />
        </div>
        <div className="sc02-flex " style={{paddingTop:"20px"}} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
          <ProductList startIndex={3} endIndex={6} />
        </div>
        <div className="sc02-flex " style={{paddingTop:"20px"}} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
          <ProductList startIndex={6} endIndex={9} />
        </div>
      </S.Section02>
    )
}

export default Section02