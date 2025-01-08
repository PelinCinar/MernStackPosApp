import Header from "../../components/Header/Header";
import EditProduct from "../../components/Products/EditProduct"
const Product = () => {
  return (
    <>
      <Header />
      <div className="px-6">
        <h1 className="flex justify-center items-center text-4xl mb-10 bg-slate-100 rounded-sm px-1 py-2 font-thin">
          ÜRÜNLER
        </h1>
         <EditProduct/>
      </div>
    </>
  );
};

export default Product;
