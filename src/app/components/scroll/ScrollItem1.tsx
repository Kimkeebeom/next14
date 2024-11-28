"use client";

import React, { useEffect, useRef, useState } from 'react';
// import styles from '@/app/styles/scroll/scroll.module.css';
import Aos from 'aos';
import * as S from '@/app/styles/scroll/scrollStyles';
import Image from 'next/image';
import ProductList from './Rotatedproduct';

interface Props {
//   children: React.ReactNode;
  showStart: number; // 나타나는 시작 스크롤 위치
  resetStart: number; // 사라지는 시작 스크롤 위치
}

// interface Product {
//   id: number;
//   name: string;
//   image: string;
//   releaseDate?: string; // 동적으로 추가
//   price?: string;
//   discount?: string;
//   status?: { current: "open" | "closed" | "upcoming" }; // 상태를 객체로 정의
// }

const ScrollItem1: React.FC<Props> = ({ showStart, resetStart }) => {
  const [, setScrollVisible] = useState(false); // 스크롤 상태
  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({});
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({}); // 콘텐츠의 실제 높이를 참조하기 위한 ref
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 }); // 카운트다운 시간
  const [currentStatus, setCurrentStatus] = useState<string>("upcoming"); // 상태: upcoming, active, closed
  // const [products, setProducts] = useState<Product[]>([]);
  // const [rotatedProducts, setRotatedProducts] = useState<Product[]>([]);
  // const [currentTime, setCurrentTime] = useState<Date>(new Date());

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

  // JSON 데이터 로드
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const response = await fetch("/data/products.json"); // JSON 파일 경로
  //     const data: Omit<Product, "releaseDate" | "status">[] = await response.json();

  //     // 현재 날짜 기준 releaseDate 설정
  //     const now = new Date();
  //     const updatedProducts = data.map((product: Product, index: number) => {
  //       const releaseDate = new Date(
  //         now.getTime() + index * 24 * 60 * 60 * 1000
  //       ); // 하루씩 증가
  //       return { ...product, releaseDate: releaseDate.toISOString(), status:  { current: "upcoming" as const }};
  //     });

  //     setProducts(updatedProducts);
  //   };

  //   fetchProducts();
  // }, []);

   // 현재 시간 업데이트
  //  useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentTime(new Date());
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

   // 상품 상태 업데이트 및 무한 순환 로직
  //  useEffect(() => {
  //   if (products.length === 0) return;

  //   const updatedProducts = products.map((product) => {
  //     const releaseDate = new Date(product.releaseDate || "");
  //     const diff = currentTime.getTime() - releaseDate.getTime();

  //     if (diff >= 0 && diff < 24 * 60 * 60 * 1000) {
  //       // 현재 시간 내에 활성화 상태
  //       return { ...product, status: { current: "open" } };
  //     } else if (diff >= 24 * 60 * 60 * 1000) {
  //       // 24시간 이후 종료 상태
  //       return { ...product, status: { current: "closed" } };
  //     } else {
  //       // 아직 오픈 전
  //       return { ...product, status: { current: "upcoming" } };
  //     }
  //   });

  //   // 무한 순환: 마지막 상품이 closed 상태가 되면 새로운 releaseDate로 설정
  //   const closedIndex = updatedProducts.findIndex(
  //     (product) => product.status?.current === "closed"
  //   );
  //   if (closedIndex >= 0) {
  //     const nextRotation = [...updatedProducts];
  //     const [rotated] = nextRotation.splice(closedIndex, 1);
  //     nextRotation.push({
  //       ...rotated,
  //       releaseDate: new Date(
  //         currentTime.getTime() + products.length * 24 * 60 * 60 * 1000
  //       ).toISOString(), // 새로운 날짜 설정
  //       status: { current: "upcoming"  as const},
  //     } as Product);
  //     setRotatedProducts(nextRotation);
  //   } else {
  //     setRotatedProducts(updatedProducts);
  //   }
  // }, [currentTime, products]);


  useEffect(() => {
      const handleScroll = () => {
        const currentScroll =
          window.scrollY || document.documentElement.scrollTop;
          console.log("currentScroll: ", currentScroll);
        
      if (currentScroll > showStart) {
        // showStart 이후에 나타남
        setScrollVisible(true);
      }  
      if (currentScroll < resetStart || currentScroll === 0) {
        // resetStart 이전에 사라짐
        setScrollVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // AOS  강제 새로고침
    Aos.refreshHard();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showStart, resetStart]);

  // 토글 함수
  const toggleContent = (id: string) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // 클릭된 콘텐츠만 열고 닫기
    }));
    console.log("높이: ",contentRefs.current?.scrollHeight);
  };
  
  // 복권 긁기 함수
  useEffect(() => {
    const canvas = document.getElementById("scratchCanvas") as HTMLCanvasElement;
    const container = document.getElementById("container");

    if (!canvas || !container) {
      console.error("Canvas or container element not found.");
      return;
    }

    const ctx = canvas.getContext("2d");
    console.log("ctx: ", ctx);
    if (!ctx) {
      console.error("Unable to get canvas 2D context.");
      return;
    }

    // 캔버스 크기 설정
    canvas.width = 438;
    canvas.height = 117;

    ctx.fillStyle = "#999"; // 덮일 색상 (회색)
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 덮을 이미지 준비
    const coverImage = new window.Image();
    coverImage.crossOrigin = "Anonymous"; // CORS 문제 해결
    coverImage.src = "/images/nationalGeographic/scratch-bg.png"; // 덮을 이미지 경로

    coverImage.onload = function () {
      console.log("Image loaded successfully");
      ctx.drawImage(coverImage, 0, 0, canvas.width, canvas.height);
    };

    coverImage.onerror = function () {
      console.error("Failed to load the image.");
    };

    let isDrawing = false;

    // 마우스나 터치 이벤트 등록
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    // 모바일 터치 이벤트 등록
    canvas.addEventListener("touchstart", startDrawing);
    canvas.addEventListener("touchmove", draw);
    canvas.addEventListener("touchend", stopDrawing);

    function startDrawing(e: MouseEvent | TouchEvent): void {
      const lottoText = document.querySelector(".lotto-txt") as HTMLElement;
      isDrawing = true;
      draw(e); // 첫번째 클릭에 긁기 시작
      if (lottoText) lottoText.style.display = "none";
    }

    function draw(e: MouseEvent | TouchEvent): void {
      if (!isDrawing || !ctx) return;

      const rect = canvas.getBoundingClientRect();
      const x =
        (e instanceof MouseEvent ? e.clientX : e.touches[0].clientX) -
        rect.left;
      const y =
        (e instanceof MouseEvent ? e.clientY : e.touches[0].clientY) -
        rect.top;

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2, false);
      ctx.fill();

      checkScratchCompletion();
    }

    function stopDrawing(): void {
      isDrawing = false;
    }

    function checkScratchCompletion(): void {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const totalPixels = imageData.data.length / 4; // 총 픽셀 수
      let clearedPixels = 0; // 긁힌 픽셀 수

      for (let i = 0; i < totalPixels; i++) {
        if (imageData.data[i * 4 + 3] === 0) {
          // 알파 값이 0이면 긁힌 상태
          clearedPixels++;
        }
      }

      const percentCleared = (clearedPixels / totalPixels) * 100;
      if (percentCleared > 60) {
        isDrawing = false;
        canvas.style.display = "none"; // 긁기가 완료되면 캔버스를 숨김
        randomCouponPublish();
      }
    }

    function randomCouponPublish(): void {
      alert('깜찍이 귀여웡♥')
      // 쿠폰 발행 로직 추가
    }
  }, []);
  

  return (
    <>
      <section>
          <S.Intro>
              <S.IntroLogo>
                  <S.Logo data-aos="fade-down" data-aos-duration="1500">Logo</S.Logo>
              </S.IntroLogo>
              <S.IntroContentGroup>
                <div data-aos="zoom-out-down" data-aos-duration="1500">
                  <S.IntroLight>
                    <S.introLight1>
                      <Image src='/images/nationalGeographic/intro-light-1.png' alt={'star'} 
                        width={77} height={69} data-aos="fade-down" data-aos-duration="1500" 
                        data-aos-delay="300"
                      />
                    </S.introLight1>
                    <S.introLight2>
                      <Image src='/images/nationalGeographic/intro-light-2.png' alt={'star'} 
                        width={77} height={70} data-aos="fade-down" data-aos-duration="1500" 
                        data-aos-delay="600"
                      />
                    </S.introLight2>
                  </S.IntroLight>
                  <S.introSale data-aos="fade-up" data-aos-duration="1500">
                    <h3 className='sale-per'>UP TO 71% OFF</h3>
                    <p className='sale-date'>11.18 00:00 - 11.29 10:00</p>
                    <div className='logo-flex' style={{display: "flex"}}>
                      <S.ngLogo>
                        <Image src={'/images/nationalGeographic/ng-logo.png'} alt={'brand-logo'} width={119} height={35}/>
                      </S.ngLogo>
                      <S.mgLogo>
                        <Image src={'/images/nationalGeographic/mg-logo.png'} alt={'brand-logo'} width={121} height={31}/>
                      </S.mgLogo>
                      <S.brtLogo>
                        <Image src={'/images/nationalGeographic/brt-logo.png'} alt={'brand-logo'} width={80} height={30.97}/>
                      </S.brtLogo>
                    </div>
                  </S.introSale>
                </div>
              </S.IntroContentGroup>
          </S.Intro>
      </section>
      <S.Section>
        <div className='topmenu fix'>
          <a href='#section01' className='flex-item'>특별 혜택</a>
          <a href='#section02' className='flex-item'>24시간 특가</a>
          <a href='#section03' className='flex-item'>추가 혜택</a>
          <a href='#section04' className='flex-item'>엔프렌즈 스타일링</a>
          <a href='#section05' className='flex-item'>이벤트</a>
          <a href='#section06' className='flex-item'>할인 상품</a>
          <a href='#section07' className='flex-item'>결제 혜택</a>
          <a href='#section08' className='flex-item'>브랜드관</a>
        </div>
      </S.Section>
      <S.Section01 id='section01'>
        <div className='sc01-bg'>
          <div className='sc-head'>
            <p className='sc01-head-nb'>NO.1</p>
            <h3 className='sc01-head-text'>특별 혜택</h3>
          </div>
          <div className='sameTag'>
            <div className='sc01-content'>
              <div className='sc01-01-head'>
                <img src='/images/nationalGeographic/sc01-01-head.png'/>
              </div>
              <div data-aos="fade-up" data-aos-duration="1000">
                <p className='sc01-text2'>
                  누구든 될 수 있는 행운의 복권 당첨자를 찾아요!
                  <br/>
                  <span style={{color: "#F3B481"}}>최대 20% 쿠폰을 한번에 무려 4장</span> 쏜다!
                </p>
              </div>
              <div className='lotto'>
                <div className='sc01-lotto-group'>
                  <img src='/images/nationalGeographic/lotto-image2.png'/>
                  <div id='container'>
                    <canvas id='scratchCanvas' width="438px" height="117px"></canvas>
                    <div className='lotto-txt'>복권을 긁어보세요!</div>
                  </div>
                </div>
                <div className='lotto-coin-1'>
                  <img src='/images/nationalGeographic/lotto-coin1.png' />
                </div>
                <div className='lotto-coin-2'>
                  <img src='/images/nationalGeographic/lotto-coin2.png' />
                </div>
              </div>
              <p id='tg_nday' onClick={() => toggleContent("tg_wrap-nday")}>+ 유의사항</p>
              <div 
                id='tg_wrap-nday'
                ref={(el) => {contentRefs.current["tg_wrap-nday"] = el;}}
                style={{
                  maxHeight: isOpen["tg_wrap-nday"]
                    ? `${contentRefs.current["tg_wrap-nday"]?.scrollHeight || 0}px`
                    : "0",
                  overflow: "hidden",
                  transition: "max-height 0.5s ease-in-out",
                }}
              >
                <div className="tg_con">
                  <ul>
                    <li>쿠폰 유효 기간: 11/18 00:00 -11/29 09:59</li>
                    <li>로또 쿠폰은 10~20% 쿠폰 중 랜덤 발행되며, 최소 5만 원 이상 결제 시, 최대 10만 원까지 할인 가능합니다. </li>
                    <li>참여 브랜드 : 내셔널지오그래픽 어패럴, 내셔널지오그래픽 키즈, 마크곤잘레스, 브롬톤 런던</li>
                    <li>본 쿠폰은 이벤트 기간 동안 ID 당 1회 다운로드 가능하며, 총 4장의 쿠폰이 일괄 발행됩니다. (3장 성인 브랜드 / 1장 키즈 브랜드 적용 가능)</li>
                    <li>본 쿠폰은 엔스테이션몰에서만 사용 가능하며, 발급 된 쿠폰은 변경 불가합니다. (예시: 성인 2장, 키즈 2장 발급 &gt; 성인 4장으로 변경 불가)</li>
                    <li>본 쿠폰을 사용하여 구매한 후 취소/반품 시, 쿠폰 사용 기간 내에는 원복 되나 유효기간이 지난 경우 자동 소멸되어 복구되지 않습니다.</li>
                    <li>본 쿠폰 사용하여 구매한 상품이 품절될 경우, 유효기간이 지난 쿠폰의 추가 발급은 어려운 점 양해 부탁드립니다.</li>
                    <li>본 쿠폰은 단일상품 1개 기준으로 적용 가능하며, 타 쿠폰과 중복 사용이 불가합니다.</li>
                    <li>본 쿠폰은 [마이페이지&gt;쿠폰]에서 확인 가능합니다.</li>
                    <li>본 이벤트는 당사 사정에 따라 사전 고지 없이 변경 또는 취소될 수 있습니다.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className='w1280'>
            <div className='sc01-02-head'>
              <img src='/images/nationalGeographic/sc01-02-head.png' data-aos="fade-down" data-aos-duration="1500"/>
            </div>
            <div data-aos="fade-up" data-aos-duration="1000">
              <p className='sc01-text02'>행사 기간 동안 구매시 <span style={{color: "#F3B481"}}>즉시 10%  쿠폰</span> 추가 발행!</p>
            </div>
            <div className='sc01-02-cp' data-aos="fade-up" data-aos-duration="1000">
              <h1 className='coupon-logo'>Logo</h1>
              <h3>10%</h3>
              <p>* 결제 완료 시, 자동 발행 (ID당 1회)</p>
              <h6>COUPON</h6>
            </div>
            <p id='tg_nday2' onClick={() => toggleContent("tg_wrap-nday2")}>+ 유의사항</p>
            <div 
              id='tg_wrap-nday2'
              ref={(el) => {contentRefs.current["tg_wrap-nday2"] = el;}}
                style={{
                  maxHeight: isOpen["tg_wrap-nday2"]
                    ? `${contentRefs.current["tg_wrap-nday2"]?.scrollHeight || 0}px`
                    : "0",
                  overflow: "hidden",
                  transition: "max-height 0.5s ease-in-out",
                }}
            >
              <div className="tg_con2">
                <ul>
                  <li>쿠폰 유효 기간: 11/18 00:00 -11/29 09:59</li>
                    <li>보너스 10% 쿠폰은 최소 3만 원 이상 결제 시, 최대 5만 원까지 할인 가능합니다.</li>
                    <li>참여 브랜드 : 내셔널지오그래픽 어패럴, 내셔널지오그래픽 키즈, 마크곤잘레스, 브롬톤 런던</li>
                    <li>본 쿠폰은 엔스테이션몰에서만 사용 가능하며, 24년 11월 18일 이후 가입한 경우 &quot;첫 구매 10프로 감사 쿠폰&quot;과 중복 지급되지 않습니다.</li>
                    <li>본 쿠폰을 사용하여 구매한 후 취소/반품 시, 쿠폰 사용 기간 내에는 원복 되나 유효기간이 지난 경우 자동 소멸되어 복구되지 않습니다.</li>
                    <li>본 쿠폰 사용하여 구매한 상품이 품절될 경우, 유효기간이 지난 쿠폰의 추가 발급은 어려운 점 양해 부탁드립니다.</li>
                    <li>본 쿠폰은 단일상품 1개 기준으로 적용 가능하며, 타 쿠폰과 중복 사용이 불가합니다.</li>
                    <li>본 쿠폰은 [마이페이지&gt;쿠폰]에서 확인 가능합니다.</li>
                    <li>본 이벤트는 당사 사정에 따라 사전 고지 없이 변경 또는 취소될 수 있습니다.</li>
                </ul>
              </div>
            </div>
          </div>
          <div className='w1280'>
            <div className='sc01-03-head'>
              <img src='/images/nationalGeographic/sc01-03-head.png' data-aos="fade-down" data-aos-duration="1000"/>
            </div>
            <div className='sc01-03-flex'>
              <div className='sc01-03-cp' data-aos="fade-right" data-aos-duration="1000">
                <h6>신규 가입 시, <span style={{fontWeight: "600" }}>1만원 쿠폰</span>즉시 지급</h6>
                <div className='sc01-03-price'>
                  <h3>10,000</h3>
                  <h5>원</h5>
                </div>
                <p>* 쿠폰 사용 기간 : 발급 후 30일</p>
              </div>
              <div className='sc01-03-cp' data-aos="fade-right" data-aos-duration="1000">
                <h6>앱 최초 다운로드 시,<span style={{fontWeight: "600" }}>5천원 쿠폰</span>즉시 지급</h6>
                <div className='sc01-03-price'>
                  <h3>5,000</h3>
                  <h5>원</h5>
                </div>
                <p>* 쿠폰 사용 기간 : 발급 후 30일</p>
              </div>
            </div>
          </div>
          <div className='w1280'>
            <div className='sc01-04-bg'>
              <img src='/images/nationalGeographic/sc01-04-camera.png' className='sc01-04-camera'/>
              <div className='sc01-04-head'>
                <img src='/images/nationalGeographic/sc01-04-head.png' data-aos="fade-down" data-aos-duration="1000"/>
              </div>
              <div data-aos="fade-up" data-aos-duration="1000">
              <p className='sc01-text2'>
                이벤트 신상품 구매 후, 포토 리뷰 작성 시
                <span style={{color: "#F3B481"}}>네이버 포인트</span>지급
              </p>
              <p className='sc05-text-nt' data-aos="fade-center" data-aos-duration="1000">※ 이벤트 당첨자 안내를 위해 SMS 수신 동의자에 한하여 적용됩니다.</p>
              </div>
            </div>
            <div className='sc01-04-flex'>
              <div className='sc01-04-cp' data-aos="fade-center" data-aos-duration="1500">
                <div className="sc01-04-text">
                  <div className="n-pay"><img src="/images/nationalGeographic/n-pay.png"/></div>
                  <h6>10,000P</h6>
                  <p>착용샷 포토 리뷰 <span style={{fontWeight: "600"}}>전원</span></p>
                </div>
                <div className="sc01-04-coin1">
                  <img src="/images/nationalGeographic/sc01-04-coin1.png"/>
                </div>
              </div>
              <div className="sc01-04-cp aos-init aos-animate" data-aos="fade-center" data-aos-duration="1500">
                <div className="sc01-04-text">
                  <div className="n-pay"><img src="/images/nationalGeographic/n-pay.png"/></div>
                  <h6>100,000P</h6>
                  <p>베스트 포토 리뷰 <span style={{fontWeight: "600"}}>10명</span></p>
                </div>
                <div className="sc01-04-coin2-group">
                  <div className="sc01-04-pt"><img src="/images/nationalGeographic/sc01-04-pt.png"/></div>
                  <div className="sc01-04-coin2"><img src="/images/nationalGeographic/sc01-04-coin2.png"/></div>
                </div>
              </div>
            </div>
            <p id="tg_nday3" onClick={() => toggleContent("tg_wrap-nday3")}>+ 유의사항</p>
            <div 
              id='tg_wrap-nday3'
              ref={(el) => {contentRefs.current["tg_wrap-nday3"] = el;}}
                style={{
                  maxHeight: isOpen["tg_wrap-nday3"]
                    ? `${contentRefs.current["tg_wrap-nday3"]?.scrollHeight || 0}px`
                    : "0",
                  overflow: "hidden",
                  transition: "max-height 0.5s ease-in-out",
                  // padding: isOpen["tg_wrap-nday3"] ? "10px" : "0",
                }}
            >
              <div className="tg_con3">
                <ul>
                  <li>참여 브랜드 : 내셔널지오그래픽 어패럴, 내셔널지오그래픽 키즈</li>
                    <li>-DAY 기간에 구매한 후, 11/19(화)-12/15(일) 사이에 “착용샷” 포토 리뷰 작성 시 12/20(금) 개별 SMS를 통해 포인트 지급됩니다. (베스트 포토 리뷰(10명) 동일)</li>
                    <li>이벤트 당첨자 안내를 위해 SMS 수신 동의자에 한하여 포인트 지급됩니다.</li>
                    <li>베스트 포토 리뷰(10명)는 12/20(금) 개별 연락 후 포인트 지급 예정입니다.</li>
                    <li>본 이벤트는 이벤트 대상 상품에 한하여 지급됩니다. (대상 상품은 상품 썸네일에 표기)</li>
                    <li>본 이벤트는 주문 번호가 아닌 상품 기준으로 포인트가 지급됩니다. (EX. 이벤트 대상 상품 2개 구매 후, 2건 모두 리뷰 작성 시, 2만 원 지급)</li>
                    <li>본 이벤트는 당사 사정에 따라 사전 고지 없이 변경 또는 취소될 수 있습니다.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </S.Section01>
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
      <S.Section03 id='section03'></S.Section03>
      <S.Section04 id='section04'></S.Section04>
      <S.Section05 id='section05'></S.Section05>
      <S.Section06 id='section06'></S.Section06>
      <S.Section07 id='section07'></S.Section07>
      <S.Section08 id='section08'></S.Section08>
    </>
  );
};

export default ScrollItem1;

