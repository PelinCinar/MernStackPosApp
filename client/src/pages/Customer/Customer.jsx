import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Spin, Table } from "antd";

const Customer = () => {
  const [billItems, setBillItems] = useState();
  useEffect(() => {
    const getBills = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_SERVER_URL+"/api/bills/get-all");
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

  const columns = [
    {
      title: "Müşteri Adı",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Telefon Numarası",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
    },
    {
      title: "İşlem Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return <span>{text.substring(0, 10)}</span>;
      },
    },
  ];
  return (
    <>
      <Header />
      <h1 className="flex justify-center items-center text-4xl mb-10 bg-slate-100 rounded-sm px-1 py-2 font-thin">
            MÜŞTERİLERİM
          </h1>
      {billItems ? (
        <div className="px-6">
         
          <Table
            dataSource={billItems}
            columns={columns}
            bordered
            pagination={false}
            scroll={{
              x: 1000,
              y: 300,
            }}
            rowKey="_id"
          />
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
export default Customer;
