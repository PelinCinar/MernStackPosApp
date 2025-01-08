import { useState } from "react";
import ProductItem from "./ProductItem";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import AddProduct from "./AddProduct";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Products = ({ categories, filtered, products, setProducts, search }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="products-wrapper grid grid-cols-card gap-4">
      {filtered
        .filter((product) =>
          product.title?.toLowerCase().includes(search || "")
        )
        .map((item) => (
          <ProductItem item={item} key={item._id} />
        ))}
      <div
        className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-green-600 rounded-md flex justify-center items-center hover:opacity-90 min-h-[180px]"
        onClick={() => setIsAddModalOpen(true)}
      >
        <PlusOutlined className="text-white md:text-2xl " />
      </div>
      <div
        className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-orange-400 rounded-md flex justify-center items-center hover:opacity-90"
        onClick={() => navigate("/products")}
      >
        <EditOutlined className="text-white md:text-2xl min-h-[180px] " />
      </div>
      <AddProduct
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        products={products}
        setProducts={setProducts}
        categories={categories}
      />
    </div>
  );
};
Products.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired, // Kategoriler bir dizi nesne olmalı
  filtered: PropTypes.arrayOf(PropTypes.object).isRequired, // Filtrelenmiş ürünler bir dizi nesne olmalı
  products: PropTypes.arrayOf(PropTypes.object).isRequired, // Ürünler bir dizi nesne olmalı
  setProducts: PropTypes.func.isRequired, // setProducts bir fonksiyon olmalı
};

export default Products;
