import { Button, Card, message, Popconfirm, Table } from "antd";
import { useState } from "react";
import CreateBill from "../../components/Cart/CreatBill.jsx";
import Header from "../../components/Header/Header.jsx";
import { useDispatch, useSelector } from "react-redux";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { increase, decrase, deleteCart } from "../../redux/cartSlice.js";
const Cart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cart = useSelector((state) => state.cart); //redux'tan gelen veriler (cart.cartItems) tabloya aktarılıyor, ve render bu verilerin bir kısmını alıp görselleştiriyor.

  const dispatch = useDispatch();

  const columns = [
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      key: "img",
      width: "125px",
      render: (text) => {
        return <img src={text} alt="" className="w-full h-20 object-cover" />; //render fonksiyonu, sütunun her hücresinde gösterilecek içeriği özelleştirmenizi sağlar.
      },
    },
    {
      title: "Ürün Adı",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Kategori", 
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      key: "price",
      render: (text) => {
        return <span>{text.toFixed(2)}₺</span>;
      },
      sorter: (a, b) => a.price - b.price,

    },
    {
      title: "Ürün Adeti",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => {
        return (
          <div className="flex items-center gap-x-1">
            <div className="flex items-center gap-x-1">
              <Button
                type="primary"
                size="small"
                className="w-full flex items-center justify-center !rounded-full"
                icon={<PlusCircleOutlined />}
                onClick={() => dispatch(increase(record))} //record dememiz lazım.ecord, bir tablodaki satırdaki veri öğesini temsil ediyor. Bu, her satırdaki veriyi almamızı sağlar
              />
              <span className="font-bold w-6 inline-block text-center bg-slate-100 rounded-3xl">
                {record.quantity}
              </span>
              <Button
                type="primary"
                size="small"
                className="w-full flex items-center justify-center !rounded-full"
                icon={<MinusCircleOutlined />}
                onClick={() => {
                  if (record.quantity === 1) {
                    if (
                      window.confirm("Ürünü Simek İstediğinizden Emin Misiniz?")
                    ) {
                      dispatch(decrase(record));
                      message.success("Ürün Sepetten Silindi");
                    }
                  }
                  if (record.quantity > 1) {
                    dispatch(decrase(record));
                  }
                }}
              />
            </div>
          </div>
        );
      },
    },
    {
      title: "Toplam Fiyat",
      dataIndex: "price",
      key: "price",
      render: (text, record) => {
        return <span>{(record.quantity * record.price).toFixed(2)}₺</span>; //eehejeheh ben yaptım
      },
    },
    {
      title: "Actions",
      render: (_, record) => {
        return (
          <Popconfirm
            title="Silmek istediğinizden emin misiniz?"
            onConfirm={() => {
              dispatch(deleteCart(record));
              message.success("Ürün Sepetten Silindi");
            }}
            okText="Evet"
            cancelText="Hayır"
          >
            <Button type="link" danger className="bg-slate-100 font-bold">
              Sil
            </Button>
          </Popconfirm>
        ); //eehejeheh ben yaptım
      },
    },
  ];

  return (
    <>
      <Header />
      <div className="px-6">
        <h1 className="flex justify-center items-center text-4xl mb-10 bg-slate-100 rounded-sm px-1 py-2 font-thin">
          SEPETİM
        </h1>
        <Table
          dataSource={cart.cartItems}
          columns={columns}
          bordered
          pagination={false}
          scroll={{
            x: 1200,
            y: 200,
          }}
        />
        <div className="cart-total flex justify-end mt-4">
          <Card className="w-72">
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
            </div>
            <div className="flex justify-between my-2">
              <span>KDV %8</span>
              <span className="text-red-700">
                {(cart.total * cart.tax) / 100 > 0
                  ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                  : 0}
                ₺
              </span>
            </div>
            <div className="flex justify-between text-xl">
              <b> Genel Toplam</b>
              <span className="text-xl  rounded-3xl text-teal-700 ">
                {cart.total + (cart.total * cart.tax) / 100 > 0
                  ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                  : 0}
                ₺
              </span>
            </div>
            <Button
              className="mt-4 w-full"
              type="primary"
              size="large"
              onClick={() => setIsModalOpen(true)}
              disabled={cart.cartItems.length === 0}
            >
              Sipariş Oluştur
            </Button>
          </Card>
        </div>
      </div>
      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default Cart;
