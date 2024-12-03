import React, { useState, useRef, useEffect } from "react";
import * as S from '@/app/styles/scroll/scrollStyles';

// interface Props {
//   showStart: number;
//   resetStart: number;
// }

const Section01: React.FC/* <Props> */ = ({ /* showStart, resetStart */ }) => {
  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({});
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const toggleContent = (id: string) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
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
  );
};

export default Section01;
