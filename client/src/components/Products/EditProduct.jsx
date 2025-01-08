import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import { useEffect, useState } from "react";

const Edit = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState({});//tıkladığımızda record ile alarak input alanını almak ve üzerinde değişikli yapmak adına açtık
  const [form] = Form.useForm();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_SERVER_URL+"/api/products/get-all");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_SERVER_URL+"/api/categories/get-all");
        const data = await res.json();
        data &&
          setCategories(
            data.map((item) => {
              return { ...item, value: item.title };
            })
          );
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  const onFinish = (values) => {
    console.log(values);
    try {
      fetch(import.meta.env.VITE_SERVER_URL+"/api/products/update-product", {
        method: "PUT",
        body: JSON.stringify({ ...values, productId: editingItem._id }),//api kısmında idyi alıyorsun bunun gibii eşylerde dosyalarını takip et
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Ürün başarıyla güncellendi.");
      setProducts(
        products.map((item) => {
          if (item._id === editingItem._id) {
            return values;
          }
          return item;
        })
      );
    } catch (error) {
      message.error("Bir şeyler yanlış gitti.");
      console.log(error);
    }
  };

  const deleteCategory = (id) => {
    if (window.confirm("Emin misiniz?")) {
      try {
        fetch(import.meta.env.VITE_SERVER_URL+"/api/products/delete-product", {
          method: "DELETE",
          body: JSON.stringify({ productId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        message.success("Ürün başarıyla silindi.");
        setProducts(products.filter((item) => item._id !== id));
      } catch (error) {
        message.error("Bir şeyler yanlış gitti.");
        console.log(error);
      }
    }
  };

  const columns = [
    {
      title: "Ürün Adı",
      dataIndex: "title",
      width: 150,
      render: (_, record) => {
        return <p>{record.title}</p>;
      },
    },
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      width: 100,
      render: (_, record) => {
        return (
          <img
            src={record.img}
            alt=""
            className="w-full h-20 object-cover rounded-md"
          />
        );
      },
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      width: 150,
    },
    {
      title: "Kategori",
      dataIndex: "category",
      width: 150,
    },
    {
      title: "Action",
      dataIndex: "action",
      width: 200,
      render: (_, record) => {
        return (
          <div>
            <Button
              type="link"
              className="pl-0"
              onClick={() => {
                setIsEditModalOpen(true);
                setEditingItem(record);
              }}
            >
              Düzenle
            </Button>

            <Button
              type="link"
              danger
              onClick={() => deleteCategory(record._id)}
            >
              Sil
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ height: "calc(100vh - 100px)", overflow: "auto" }}>
      <>
        <Table
          bordered
          dataSource={products}
          columns={columns}
          rowKey={"_id"}
          scroll={{
            x: 1000,
            y: 400, // İçerik yüksekliğini düzenleyin
          }}
        />
        <Modal
          title="Yeni Ürün Ekle"
          open={isEditModalOpen}
          onCancel={() => setIsEditModalOpen(false)}
          footer={false}
        >
          <Form
            layout="vertical"
            onFinish={onFinish}
            form={form}
            initialValues={editingItem}
          >
            <Form.Item
              name="title"
              label="Ürün Adı"
              rules={[
                { required: true, message: "Ürün Adı Alanı Boş Geçilemez!" },
              ]}
            >
              <Input placeholder="Ürün adı giriniz." />
            </Form.Item>
            <Form.Item
              name="img"
              label="Ürün Görseli"
              rules={[
                {
                  required: true,
                  message: "Ürün Görseli Alanı Boş Geçilemez!",
                },
              ]}
            >
              <Input placeholder="Ürün görseli giriniz." />
            </Form.Item>
            <Form.Item
              name="price"
              label="Ürün Fiyatı"
              rules={[
                { required: true, message: "Ürün Fiyatı Alanı Boş Geçilemez!" },
              ]}
            >
              <Input placeholder="Ürün fiyatı giriniz." />
            </Form.Item>
            <Form.Item
              name="category"
              label="Kategori Seç"
              rules={[
                { required: true, message: "Kategori Alanı Boş Geçilemez!" },
              ]}
            >
              <Select
                showSearch
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.title ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.title ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.title ?? "").toLowerCase())
                }
                options={categories}
              />
            </Form.Item>
            <Form.Item className="flex justify-end mb-0">
              <Button type="primary" htmlType="submit">
                Güncelle
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    </div>
  );
};

export default Edit;
