import ScrollItem1 from './components/scroll/ScrollItem1';
// import ScrollWrapper from './components/scroll/ScrollWrapper';

// import ProductList from "./components/scroll/Rotatedproduct";

export default function Home() {
  return (
    <>
      {/* <ScrollWrapper /> */}
      <ScrollItem1 showStart={0} resetStart={0}/>
      {/* <ProductList/> */}
    </>
  );
}
