// import ScrollItem1 from './components/scroll/items/ScrollItem1';
import Scrollmanager from './components/scroll/ScrollManager';
// import ScrollWrapper from './components/scroll/ScrollWrapper';

// import ProductList from "./components/scroll/Rotatedproduct";

export default function Home() {
  return (
    <>
      {/* <ScrollWrapper /> */}
      {/* <ScrollItem1 showStart={0} resetStart={0}/> */}
      <Scrollmanager showStart={0} resetStart={0}/>
      {/* <ProductList/> */}
    </>
  );
}
