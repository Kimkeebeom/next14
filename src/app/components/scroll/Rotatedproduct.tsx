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
}

interface ProductListProps {
  startIndex: number; // 시작 인덱스
  endIndex: number; // 끝 인덱스
}

const ProductList: React.FC<ProductListProps> = ({ startIndex, endIndex }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // **JSON 데이터 로드 함수**
  const loadProducts = async (): Promise<Product[]> => {
    const response = await fetch("/data/products.json"); // JSON 파일 경로
    const data = await response.json();

    const now = new Date();
    return data.map((product: Omit<Product, "releaseDate" | "status">, index: number) => ({
      ...product,
      releaseDate: new Date(now.getTime() + index * 24 * 60 * 60 * 1000).toISOString(),
      status: "upcoming", // 초기 상태
    }));
  };

  // **상품 상태 업데이트 함수**
  const updateProductStatuses = (products: Product[], currentTime: Date): Product[] => {
    return products.map((product) => {
      const releaseDate = new Date(product.releaseDate);
      const timeDiff = currentTime.getTime() - releaseDate.getTime();

      if (timeDiff >= 0 && timeDiff < 24 * 60 * 60 * 1000) {
        // 활성 상태
        return { ...product, status: "open" };
      } else if (timeDiff >= 24 * 60 * 60 * 1000) {
        // 종료 상태
        return { ...product, status: "closed" };
      } else {
        // 대기 상태
        return { ...product, status: "upcoming" };
      }
    });
  };

  // **데이터 초기화**
  useEffect(() => {
    const fetchProducts = async () => {
      const loadedProducts = await loadProducts();
      setProducts(loadedProducts);
    };

    fetchProducts();
  }, []);

  // **현재 시간 갱신**
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // **상품 상태 업데이트**
  useEffect(() => {
    if (products.length > 0) {
      const updatedProducts = updateProductStatuses(products, currentTime);
      setProducts(updatedProducts);
    }
  }, [products, currentTime]);

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
          {/* <img src={product.image} alt={product.name} className={styles.image} /> */}
          {product.status === "closed" && (
            <>
                <img src={product.image} alt={product.name} className={styles.image} />
                <span className={styles.overlay}>CLOSED!</span>
            </>
            )}
          {product.status === "open" && (
            <>
                <a onClick={() => {alert("clicked")}}>
                    <div>
                    <img src={product.image} alt={product.name} className={styles.image} />
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
                    COMING SOON <br/>
                    {new Date(product.releaseDate).getMonth() + 1}.{new Date(product.releaseDate).getDate()}
                    ({new Date(product.releaseDate).toLocaleDateString("ko-KR", { weekday: "short" })})
                    10AM
                </span>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
