import { Button, Table, DatePicker, Input, Spin } from "antd";
import { useEffect, useState } from "react";
import PrintBill from "../../components/Bills/PrintBill.jsx";
import Header from "../../components/Header/Header";
import moment from "moment"; // Tarih formatlaması için moment.js kullanıyoruz

const Bill = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billItems, setBillItems] = useState(); //arrray olunca true döner ve spiner çalışmaz
  const [customer, setCustomer] = useState();

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

  const handleDateFilter = (value, key) => {
    const formattedDate = value ? value.format("YYYY-MM-DD") : "";
    return billItems.filter((item) => {
      const itemDate = item[key] ? item[key].substring(0, 10) : "";
      return itemDate.includes(formattedDate);
    });
  };

  const columns = [
    {
      title: "Müşteri Adı",
      dataIndex: "customerName",
      key: "customerName",
      // Müşteri adı filtresi
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Müşteri adına göre filtrele"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
            }}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button type="link" size="small" onClick={() => clearFilters()}>
              Temizle
            </Button>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                confirm();
              }}
            >
              Uygula
            </Button>
          </div>
        </div>
      ),
      onFilter: (value, record) => {
        return record.customerName.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Telefon Numarası",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
    },
    {
      title: "Oluşturma Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return <span>{text ? text.substring(0, 10) : "Tarih Yok"}</span>;
      },
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <DatePicker
            value={selectedKeys[0] ? moment(selectedKeys[0]) : null}
            onChange={(date) => {
              setSelectedKeys(date ? [date] : []);
            }}
            style={{ width: 188, marginBottom: 8, display: "block" }}
            placeholder="Tarihe göre filtrele"
            disabledDate={(current) => current && current > moment()} // Bugünün tarihini geçemeyen tarihleri engeller
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button type="link" size="small" onClick={() => clearFilters()}>
              Temizle
            </Button>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                confirm();
              }}
            >
              Uygula
            </Button>
          </div>
        </div>
      ),
      onFilter: (value, record) => {
        const date = moment(value).format("YYYY-MM-DD");
        return record.createdAt && record.createdAt.includes(date);
      },
    },
    {
      title: "Ödeme Yöntemi",
      dataIndex: "paymentMode",
      key: "paymentMode",
    },
    {
      title: "Toplam Fiyat",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text) => {
        return <span>{Number(text).toFixed(2)}₺</span>;
      },
      sorter: (a, b) => a.totalAmount - b.totalAmount,
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <Button
            type="link"
            className="text-green-600 text-xl bg-slate-300 !hover:bg-slate-400 rounded-md flex justify-center items-center"
            onClick={() => {
              setIsModalOpen(true);
              setCustomer(record);
            }}
          >
            Yazdır
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Header />
      <h1 className="flex justify-center items-center text-4xl mb-10 bg-slate-100 rounded-sm px-1 py-2 font-thin">
        FATURALARIM
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
      <PrintBill
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        customer={customer}
      />
    </>
  );
};

export default Bill;
