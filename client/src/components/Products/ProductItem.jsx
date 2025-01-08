import PropTypes from "prop-types";
import { addProduct } from "../../redux/cartSlice";
import { useDispatch} from "react-redux";
import { message } from "antd";
const ProductItem = ({ item }) => {

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addProduct({...item, quantity:1}))
    message.success("Ürün Sepete Eklendi")
  };


  
  return (
    <div
      key={item.id} // Benzersiz "id" özelliği kullanıldı
      className="product-item border hover:shadow-lg cursor-pointer transition-all select-none rounded-md"
      onClick={handleClick}
    >
      <div className="product-img">
        <img
          src={item.img}
          alt=""
          className="h-28 object-cover w-full border-b"
        />
      </div>
      <div className="product-info flex flex-col p-3">
        <span className="font-bold">{item.title}</span>
        <span>{item.price}₺</span>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};

export default ProductItem;
