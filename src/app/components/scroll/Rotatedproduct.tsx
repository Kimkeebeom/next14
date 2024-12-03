"use client";

import React, { useEffect, useState } from "react";
import styles from "./ProductList.module.css";

interface Product {
  id: number;
  name: string;
  image: string;
  releaseDate: string; // 항상 ISO 문자열
  status: "open" | "closed" | "upcoming";
  priceTagImg: string;
  url: string;
}

interface ProductListProps {
  startIndex: number; // 시작 인덱스
  endIndex: number; // 끝 인덱스
}

const ProductList: React.FC<ProductListProps> = ({ startIndex, endIndex }) => {
  const [products, setProducts] = useState<Product[]>([]);
//   const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // 시작 날짜를 12월 1일로 설정
  const startDate = new Date("2024-12-01T10:00:00"); // **추가된 코드**

  // **JSON 데이터 로드 함수**
  const loadProducts = async (): Promise<Product[]> => {
    const response = await fetch("/data/products.json"); // JSON 파일 경로
    const data = await response.json();

    return data.map((product: Omit<Product, "releaseDate" | "status">, index: number) => ({
      ...product,
      releaseDate: new Date(startDate.getTime() + index * 24 * 60 * 60 * 1000).toISOString(),
      status: "upcoming", // 초기 상태
    }));
  };

  // **상품 상태 업데이트 함수 (9일 주기 순환 적용)**
  const updateProductStatuses = (products: Product[], currentTime: Date): Product[] => {
    const timeDiff = Math.floor((currentTime.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
    const dayIndex = timeDiff % products.length; // 9일 주기로 순환 **추가된 코드**
    console.log("timeDiff: ", timeDiff);
    console.log("currentTime: ", Math.floor((currentTime.getTime()) / (24 * 60 * 60 * 1000)));
    console.log("startDate: ", startDate.getTime());
    console.log("dayIndex: ", dayIndex);
    
    return products.map((product, index) => {
      console.log("index: ", index);
      
      if (index === dayIndex) {
        return { ...product, status: "open" }; // 현재 상품 open
      } else if (index < dayIndex) {
        return { ...product, status: "closed" }; // 이전 상품 closed
      } else {
        return { ...product, status: "upcoming" }; // 이후 상품 upcoming
      }
    });
  };

  // **데이터 초기화**
  useEffect(() => {
    const updateProductsOnLoad = async () => {
        const loadedProducts = await loadProducts(); // JSON 데이터 로드
        const current = new Date(); // 현재 시간
    
        // 상품 상태 즉시 계산
        const updatedProducts = updateProductStatuses(loadedProducts, current);
        console.log("Updated Products: ", updatedProducts);
    
        // 로컬 스토리지 상태 최신화 **수정된 코드**
        const productStatuses = updatedProducts.reduce((acc, product) => {
          acc[product.id] = product.status; // 최신 상태 저장
          return acc;
        }, {} as Record<number, string>);
        localStorage.setItem("productStatuses", JSON.stringify(productStatuses)); // 최신 데이터 저장
    
        setProducts(updatedProducts); // 상태 업데이트
      };
    
      updateProductsOnLoad(); // 새로고침 시 즉시 실행
  },[]);

  // **현재 섹션에 해당하는 상품 추출**
  const sectionProducts = products.slice(startIndex, endIndex);

  return (
    <div className={styles.grid}>
      {sectionProducts.map((product) => (
        <div
          key={product.id}
          className={`${styles.card} ${
            product.status === "open"
              ? styles.open
              : product.status === "closed"
              ? styles.closed
              : styles.upcoming
          }`}
        >
          {product.status === "closed" && (
            <>
              <img src={product.image} alt={product.name} className={styles.image} />
              <span className={styles.overlay}>CLOSED!</span>
            </>
          )}
          {product.status === "open" && (
            <>
              <a href={product.url} target="_blank" rel="noopener noreferrer">
                <div>
                  <img src={product.image} alt={product.name} className={styles.open} />
                  <h3 className={styles.text}>
                    {new Date(product.releaseDate).getMonth() + 1}.{new Date(product.releaseDate).getDate()}
                    ({new Date(product.releaseDate).toLocaleDateString("ko-KR", { weekday: "short" })}) 10:00
                  </h3>
                  <div className={styles.price}>
                    <img src={product.priceTagImg} />
                  </div>
                </div>
              </a>
            </>
          )}
          {product.status === "upcoming" && (
            <>
              <img src={product.image} alt={product.name} className={styles.image} />
              <span className={styles.comingSoon}>
                COMING SOON <br />
                {new Date(product.releaseDate).getMonth() + 1}.{new Date(product.releaseDate).getDate()}
                ({new Date(product.releaseDate).toLocaleDateString("ko-KR", { weekday: "short" })}) 10AM
              </span>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
