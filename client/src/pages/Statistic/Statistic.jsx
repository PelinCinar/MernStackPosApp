import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import StatisticCard from "../../components/Statistic/StatisticCard";
import { Spin } from "antd";

const Statistic = () => {
  const [billItems, setBillItems] = useState();
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("popUser")); // localStorage'dan kullanıcı verisini al

  useEffect(() => {
    const getBills = async () => {
      try {
        const res = await fetch(
          import.meta.env.VITE_SERVER_URL + "/api/bills/get-all"
        );
        const data = await res.json();
        const formattedData = data.map((item) => ({
          ...item,
          key: item._id, // Table için benzersiz bir kimlik
        }));
        setBillItems(formattedData);
      } catch (error) {
        console.log(error);
      }
    };
    getBills();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(
          import.meta.env.VITE_SERVER_URL + "/api/products/get-all"
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  // Total Amount Hesaplama Fonksiyonu
  const totalAmount = () => {
    if (!billItems) return "0₺"; // Eğer billItems yoksa sıfır dön
    const amount = billItems.reduce(
      (total, item) => item.totalAmount + total,
      0
    );
    return `${amount.toFixed(2)}₺`;
  };

  return (
    <>
      <Header />
      <h1 className="flex justify-center items-center text-4xl mb-10 bg-slate-100 rounded-sm px-1 py-2 font-thin">
        İSTATİSTİKLERİM
      </h1>
      {billItems ? (
        <div className="px-6 md:pb-0 pb-20">
          <div className="statistic-section">
            <h2 className="text-lg">
              Hoş geldin
              <span className="text-green-700 font-bold text-xl">
                {" "}
                {user?.userName || "Kullanıcı"}{" "}
                {/* Kullanıcı adı yoksa 'Kullanıcı' göster */}
              </span>
              .
            </h2>
            <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2 my-10 md:gap-10 gap-4">
              <StatisticCard
                title={"Toplam Müşteri"}
                amount={billItems?.length} // Doğru: Müşteri sayısı
                img={"images/user.png"}
              />
              <StatisticCard
                title={"Toplam Kazanç"}
                amount={totalAmount()} // Doğru: Toplam kazancı hesaplayıp string olarak döndürmek
                img={"images/money.png"}
              />
              <StatisticCard
                title={"Toplam Satış"}
                amount={billItems?.length} // Doğru: Satış sayısı (ya da gerekli başka bir veri)
                img={"images/sale.png"}
              />
              <StatisticCard
                title={"Toplam Ürün"}
                amount={products?.length} // Doğru: Ürün sayısı
                img={"images/product.png"}
              />
            </div>
          </div>
        </div>
      ) : (
        <Spin
          size="large"
          className="absolute h-screen w-screen top-1/2  flex justify-center   "
        />
      )}
    </>
  );
};

export default Statistic;
