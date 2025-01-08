import { Badge, Input, message } from "antd";
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./index.css";
import { useSelector } from "react-redux";

const Header = ({ setSearch }) => {
  const cart = useSelector((state) => state.cart);
  const { pathname } = useLocation(); //bulunduğumuz pathi bulacağzı
  const navigate = useNavigate();

  const logOut = () => {
    if (window.confirm("Çıkış yapmak istediğinizden emin misiniz ?")) {
      localStorage.removeItem("posUser");
      navigate("/login");
      message.success("Çıkış işlemi başarılı.");
    }
  };
  return (
    <div className="border-b mb-6">
      <header className="py-4 px-6 flex justify-between items-center gap-10">
        <div className="logo">
          <Link to="/">
            <h2 className="text-3xl font-thin md:text-4xl bg-slate-100 rounded-xl py-2 px-3">
              TARSUSİ
            </h2>
          </Link>
        </div>
        <div className="header-search flex-1 flex justify-center">
          <Input
            size="large"
            placeholder="Ürün Ara..."
            prefix={<SearchOutlined />}
            className="rounded-full max-w-[800px] "
            onClick={() => {
              pathname !== "/" && navigate("/");
            }} //pathime göre sadece panasayfaya gönderlimesini sağladık
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
        <div className="menu-links flex justify-between items-center gap-7 md:static fixed z-50 bottom-0 md:w-auto w-screen md:bg-transparent bg-white left-0 md:border-t-0 border-t md:px-0 px-4 ">
          <Link
            to={"/"}
            className={`menu-link ${pathname === "/" && "active"}`}
          >
            <HomeOutlined className="md:text-3xl text-xl bg-slate-100 rounded-full  py-1 px-1 hover:scale-110 transition-transform" />
            <span className="md:text-sm text-[10px] mt-1">Ana Sayfa</span>
          </Link>
          <Badge
            count={cart.cartItems.length}
            offset={[0, 6]}
            className="md:flex hidden"
          >
            <Link
              to={"/cart"}
              className={`menu-link ${pathname === "/cart" && "active"}`}
            >
              <ShoppingCartOutlined className="md:text-3xl text-xl bg-slate-100  rounded-full  py-1 px-1 hover:scale-110 transition-transform" />
              <span className="md:text-sm text-[10px] mt-1">Sepet</span>
            </Link>
          </Badge>
          <Link
            to={"/bills"}
            className={`menu-link ${pathname === "/bills" && "active"}`}
          >
            <CopyOutlined className="md:text-3xl text-xl bg-slate-100 rounded-full  py-1 px-1 hover:scale-110 transition-transform" />
            <span className="md:text-sm text-[10px] mt-1">Faturalar</span>
          </Link>
          <Link
            to={"/customers"}
            className={`menu-link ${pathname === "/customers" && "active"}`}
          >
            <UserOutlined className="md:text-3xl text-xl bg-slate-100  rounded-full  py-1 px-1 hover:scale-110 transition-transform" />
            <span className="md:text-sm text-[10px] mt-1">Müşteriler</span>
          </Link>
          <Link
            to={"/statistic"}
            className={`menu-link ${pathname === "/statistic" && "active"}`}
          >
            <BarChartOutlined className="md:text-3xl text-xl bg-slate-100  rounded-full  py-1 px-1 hover:scale-110 transition-transform " />
            <span className="md:text-sm text-[10px] mt-1">İstatistikler</span>
          </Link>
          <div onClick={logOut}>
            <Link
              className={`menu-link flex flex-col items-center  text-red-500 hover:text-[#eb5a5a] transition-all`}
            >
              <LogoutOutlined className="md:text-3xl text-xl bg-slate-100  rounded-full  py-1 px-1 hover:scale-110 transition-transform" />
              <span className="md:text-sm text-[10px] mt-1">Çıkış</span>
            </Link>
          </div>
        </div>
        <Badge
          count={cart.cartItems.length}
          offset={[0, 0]}
          className="md:hidden flex"
        >
          <Link
            to={"/cart"} // Sepet linki doğru olmalı
            className="menu-link flex flex-col items-center hover:text-[#ce5cfb] transition-all"
          >
            <ShoppingCartOutlined className="text-4xl" />
            <span className="md:text-xs text-[10px] mt-1">Sepet</span>
          </Link>
        </Badge>
      </header>
    </div>
  );
};

export default Header;
