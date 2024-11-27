// scrollStyles.ts
import styled from "@emotion/styled";
import {keyframes} from "@emotion/react";

// keyframes 정의
const blinkAnimation1 = keyframes`
  0% {opacity: 1;}
  30% {opacity: 0.2;}
  60% {opacity: 0.3;}
  100% {opacity: 1;}
`;
const blinkAnimation2 = keyframes`
  0% {opacity: 1;}
  50% {opacity: 0.2;}
  100% {opacity: 1;}
`;
const bounce = keyframes`
  100%{transform: translateY(-30px);}
`
const heartbeat = keyframes`
  0% {
    transform: scale(1);
    transform-origin: center center;
    animation-timing-function: ease-out;
  }
  10% {
    transform: scale(.91);
    animation-timing-function: ease-in;
  }
  17% {
    transform: scale(.98);
    animation-timing-function: ease-out;
  }
  33% {
    transform: scale(.87);
    animation-timing-function: ease-in;
  }
  45% {
    transform: scale(1);
    animation-timing-function: ease-out;
  }
`
const motion = keyframes`
  0% {margin-top: 0px;}
  100% {margin-top: 15px;}
`

// 스타일 정의
// export const Section = styled.section`
//   height: 600px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: #f0f0f0;
//   margin-bottom: 20px;
//   border: 1px solid #ccc;
// `;
export const Intro = styled.div`
  background: url("/images/nationalGeographic/intro-bgg.jpg");
  position: relative;
  overflow: hidden;
  background-size: cover;
  margin: 0 auto;
  width: 100%;
  height: 100vh;
`;

export const IntroLogo = styled.div`
  width: 100%;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%) !important;

  &.aos-animate {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
`;

export const Logo = styled.h1`
  background: url("/images/nationalGeographic/nstation-logo.png");
  width: 150px;
  height: 34px;
  text-indent: -9999px;
  overflow: hidden;
  background-size: cover;
  margin: 0 auto;
`;

export const IntroContentGroup = styled.div`
  position: absolute;
  margin-top: 70px;
  top: 38%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const IntroLight = styled.div`
  text-align: center;
  position: relative;
  width: 939px;
  height: 304.7px;
  background: url("/images/nationalGeographic/intro-text2.png");
  overflow: hidden;
  background-size: cover;
  margin: 0 auto;
`

// Image 태그에 적용할 스타일 정의
export const introLight1 = styled.div`
  position: absolute;
  right: 300px;
  top: 35px;
  width: 77px;
  height: 69px;
  animation: ${blinkAnimation1} 2s ease-in-out infinite both;
`;

export const introLight2 = styled.div`
  position: absolute;
  width: 77px;
  right: 125px;
  bottom: 45px;
  animation: ${blinkAnimation2} 2s ease-in-out infinite both;
`;

export const ngLogo = styled.div`
  width: 119px;
  height: 35px;
`
export const mgLogo = styled.div`
  width: 121px;
  height: 31px;
`
export const brtLogo = styled.div`
  width: 80px;
  height: 30.97px;
`
export const introSale = styled.div`
  margin-top: 20px;
  text-align: center;

  .sale-per {
    text-transform: uppercase;
    background-image: linear-gradient(-225deg, #7257AD 0%, #9572B4 29%, #CAAB81 67%, #7257AD 100%);
    background-size: 200% auto;
    color: #fff;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: textclip 2s linear infinite;
    display: inline-block;
    font-size: 40px;
    font-weight: 600;
    font-family: "Outfit", sans-serif;
    font-style: normal;
    font-optical-sizing: auto;
  }
  .sale-date {
    font-size: 23px;
    margin-top: 15px;
    font-family: "Outfit", sans-serif;
    font-style: normal;
    font-weight: 400;
    color: #9572B4;
    letter-spacing: 3px;
  }
  .logo-flex {
    display: flex;
    justify-content: space-between;
    width: 476px;
    height: 35px;
    margin: 0 auto;
    opacity: 60%;
    margin-top: 80px;
  }
`
export const Section = styled.section`
  width: 100%;

  .topmenu{
    min-width: 250px;
    background-color: #9572B4;
    color: #030303;
    display: flex;
    flex-wrap: nowrap;
    gap: 50px;
  }
  .flex-item {
    flex: 1 0 auto;
    text-align: center;
    padding: 20px 0;
    font-family: "pretendard", sans-serif;
    font-weight: 300;
    font-style: normal;
    font-size: 22px;
    line-height: 22px;
  }
  .fix {
    /* position: fixed;
    width: 100%;
    top: 72px;
    animation: down 0.5s ease;
    z-index: 999;
    white-space: nowrap;
    color: #030303 !important; */
  }
`
export const Section01 = styled.section`
  width: 100%;
  margin: 0 auto;
  text-align: center;
  background-color: #030303;

  .sc01-bg {
    width: 100%;
    max-height: 4000px;
    background: url("/images/nationalGeographic/sc01-bg-img5.jpg");
    overflow: hidden;
    background-size: cover;
    background-repeat: no-repeat;
    margin: 0 auto;
    padding: 180px 0;
    background-position: center center;
  }
  .sc-head {
    margin-bottom: 50px;
    text-align: center;
  }
  .sc01-head-nb {
    color: #fff;
    font-size: 25px;
    font-family: "Outfit", sans-serif;
    font-style: normal;
    font-weight: 300;
    align-content: center;
    opacity: 60%;
    letter-spacing: 1px;
  }
  .sc01-head-text {
    color: #fff;
    font-size: 55px;
    font-family: 'Paperlogy-8ExtraBold';
    font-weight: normal;
    margin-top: 10px;
  }
  .sc01-01-head img {
    width: 341px;
    height: 95px;
  }
  .sc01-text2 {
    color: #fff;
    font-size: 25px;
    line-height: 38px;
    font-family: "Pretendard", sans-serif;
    font-weight: 500;
    margin-top: 30px;
  }
  .lotto {
    position: relative;
    width: 969px;
    height: 571px;
    background: url("/images/nationalGeographic/lotto-bg2.png");
    overflow: hidden;
    background-size: cover;
    margin: 0 auto;
  }
  .sc01-lotto-group {
    width: 567px;
    height: 305px;
    position: relative;
    margin: 0 auto;
    top: 130px;
  }
  .sc01-lotto {
    width: 567px;
    height: 305px;
  }
  #container {
    position: absolute;
    width: 438px;
    height: 117px;
    background-image: url("/images/nationalGeographic/scratch-after.png");
    background-size: cover;
    bottom: 70px;
    left: 65px;
  }
  .lotto-txt {
    position: absolute;
    width: 100%;
    font-size: 27px;
    color: #767676;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    font-weight: 500;
  }
  .lotto-coin-1 img {
    position: absolute;
    width: 114px;
    height: 114px;
    right: 150px;
    bottom: 90px;
    animation: ${bounce} 0.6s cubic-bezier(0, 0, 0.18, 0.99) infinite alternate;
  }
  .lotto-coin-2 img {
    position: absolute;
    width: 89px;
    height: 95px;
    left: 150px;
    bottom: 30px;
    animation: ${bounce} 0.6s cubic-bezier(0, 0, 0.18, 0.99) infinite alternate;
  }
  #tg_nday {
    cursor: pointer;
    color: #A2A2A2;
    font-family: "pretendard", sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
    text-transform: uppercase;
  }
  #tg_wrap-nday, #tg_wrap-nday2, #tg_wrap-nday3 {
    padding-top: 30px;
    background: transparent;
  }
  .tg_con, .tg_con2, .tg_con3 {
    width: fit-content;
    margin: 0 auto;
  }
  .tg_con ul, .tg_con2 ul, .tg_con3 ul {
    color: #A2A2A2;
    font-family: "pretendard", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
    text-transform: uppercase;
  }
  .tg_con li, .tg_con2 li, .tg_con3 li {
    position: relative;
    padding: 0 0 10px 8px;
    line-height: 1.63;
    text-align: left;
  }
  .tg_con li::before, .tg_con2 li::before {
    content: "- ";
    position: absolute;
    left: 0;
    top: 0;
  }
  .w1280 {
    margin-top: 140px !important;
    max-width: 1280px;
    margin: 0 auto;
    display: block;
    text-align: center;
  }
  .sc01-02-head img {
    width: 399px;
    height: 95px;
  }
  .sc01-text02 {
    color: #fff;
    font-size: 25px;
    line-height: 38px;
    font-family: "Pretendard", sans-serif;
    font-weight: 500;
    margin-top: 30px;
  }
  .sc01-02-cp {
    margin-top: 70px !important;
    background: url("/images/nationalGeographic/sc01-02-coupon.png");
    overflow: hidden;
    background-size: cover;
    margin: 0 auto;
    width: 300px;
    height: 381px;
    padding: 50px 0;
  }
  .coupon-logo {
    width: 80px;
    height: 19px;
    background: url("/images/nationalGeographic/nstation-logo-bk.png");
    text-indent: -9999px;
    overflow: hidden;
    background-size: cover;
    margin: 0 auto;
  }
  .sc01-02-cp h3 {
    color: #030303;
    font-size: 80px;
    font-family: "Outfit", sans-serif;
    font-style: normal;
    font-weight: 800;
    margin: 25px 0;
  }
  .sc01-02-cp p {
    color: #030303;
    font-size: 13px;
    font-family: "Pretendard", sans-serif;
    font-style: normal;
    font-weight: 300;
    opacity: 50%;
  }
  .sc01-02-cp h6 {    
    color: #030303;
    font-size: 16px;
    font-family: "Outfit", sans-serif;
    font-style: normal;
    font-weight: 500;
    margin-top: 65px;
    letter-spacing: 10px;
  }
  #tg_nday2 {
    cursor: pointer;
    color: #A2A2A2;
    font-family: "pretendard", sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
    text-transform: uppercase;
    margin-top: 50px;
  }
  .sc01-03-head img {
    width: 445px;
    height: 94.91px;
  }
  .sc01-03-flex {
    margin-top: 70px !important;
    display: flex;
    justify-content: space-between;
    text-align: center;
    width: 900px;
    gap: 20px;
    margin: 0 auto;
  }
  .sc01-03-cp {
    background: url("/images/nationalGeographic/sc01-03-cp.png");
    overflow: hidden;
    background-size: cover;
    margin: 0 auto;
    width: 438px;
    height: 200px;
    padding: 30px;
    text-align: start;
  }
  .sc01-03-cp h6 {
    color: #030303;
    font-size: 17px;
    font-family: "Pretendard", sans-serif;
    font-style: normal;
    font-weight: 300;
    letter-spacing: -0.2px;
  }
  .sc01-03-price {
    display: flex;
    align-items: baseline;
  }
  .sc01-03-cp h3 {
    color: #030303;
    font-size: 65px;
    font-family: "Outfit", sans-serif;
    font-style: normal;
    font-weight: 700;
  }
  .sc01-03-cp h5 {
    color: #030303;
    font-size: 35px;
    font-family: "Pretendard", sans-serif;
    font-style: normal;
    font-weight: 500;
    padding-left: 3px;
  }
  .sc01-04-bg {
    position: relative;
    overflow: hidden;
    background-size: cover;
    margin: 0 auto;
    width: 800px;
    height: 340px;
  }
  .sc01-04-camera {
    width: 340px;
    height: 340px;
    position: absolute;
    display: flex;
    animation: ${heartbeat} 3s ease-in-out infinite both;
    left: 230px;
    z-index: 1;
  }
  .sc01-04-head img {
    width: 383px;
    height: 95px;
  }
  .sc01-text2 {
    color: #fff;
    font-size: 25px;
    line-height: 38px;
    font-family: "Pretendard", sans-serif;
    font-weight: 500;
    margin-top: 30px;
  }
  .sc05-text-nt {
    color: #fff;
    font-size: 17px;
    font-family: "Pretendard", sans-serif;
    font-weight: 300;
    font-style: normal;
    margin-top: 15px;
    opacity: 50%;
  }
  .sc01-04-flex {
    display: flex;
    justify-content: space-between;
    text-align: start;
    width: 100%;
    gap: 10px;
    margin: 0 auto;
    width: 950px;
    height: 250px;
  }
  .sc01-04-cp {
    display: flex;
    justify-content: space-between;
    gap: 5px;
  }
  .n-pay img {
    width: 104px;
    height: 32px;
    margin-bottom: 5px;
  }
  .sc01-04-text h6 {
    color: #ffffff;
    font-size: 60px;
    font-family: "Outfit", sans-serif;
    font-style: normal;
    font-weight: 600;
    letter-spacing: -0.2px;
  }
  .sc01-04-text p {
    color: #ffffff;
    font-size: 20px;
    font-family: "Pretendard", sans-serif;
    font-style: normal;
    font-weight: 300;
    margin-top: 10px;
  }
  .sc01-04-coin1 img {
    width: 155px;
    height: 177px;
  }
  .sc01-04-coin2-group {
    width: 200px;
    height: 268px;
    position: relative;
  }
  .sc01-04-pt img {
    width: 143px;
    height: 83px;
    position: absolute;
    top: -50px;
    left: 40px;
    animation: ${motion} 0.7s linear 0s infinite alternate;
  }
  #tg_nday3 {
    cursor: pointer;
    color: #A2A2A2;
    font-family: "pretendard", sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
    text-transform: uppercase;
    margin-top: 50px;
  }
  #tg_wrap-nday3 {

  }
`
export const Section02 = styled.section``
export const Section03 = styled.section``
export const Section04 = styled.section``
export const Section05 = styled.section``
export const Section06 = styled.section``
export const Section07 = styled.section``
export const Section08 = styled.section``



export const ScrollItem = styled.div`
  position: sticky;
  top: 50%;
`;

export const ScrollItemAos = styled(ScrollItem)`
  &[data-aos] {
    opacity: 0;
    transform: translateY(20px);
    transition-property: opacity, transform;
    transition-duration: 0.6s;
    transition-timing-function: ease-in-out;
  }

  &.aos-animate {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
`;
