import React from "react";
import * as S from '@/app/styles/scroll/scrollStyles'

const Menu: React.FC = () => {
  return (
    <S.Section>
        <div className="topmenu fix">
        <a href="#section01" className="flex-item">특별 혜택</a>
        <a href="#section02" className="flex-item">24시간 특가</a>
        <a href="#section03" className="flex-item">추가 혜택</a>
        <a href="#section04" className="flex-item">엔프렌즈 스타일링</a>
        <a href="#section05" className="flex-item">이벤트</a>
        <a href="#section06" className="flex-item">할인 상품</a>
        <a href="#section07" className="flex-item">결제 혜택</a>
        <a href="#section08" className="flex-item">브랜드관</a>
        </div>
    </S.Section>
  );
};

export default Menu;