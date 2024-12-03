"use client";

import React from "react";
import Menu from "./menu/Menu";
import Header from "./top/Header";
import Section01 from "./sections/Section01";
import Section02 from "./sections/Section02";
// 필요한 섹션을 계속 추가

interface Props {
  showStart: number;
  resetStart: number;
}

const Scrollmanager: React.FC<Props> = ({ /* showStart, resetStart */ }) => {
  return (
    <>
      <Header />
      <Menu />
      <Section01 />
      <Section02 />
      {/* 필요한 섹션 추가 */}
    </>
  );
};

export default Scrollmanager;