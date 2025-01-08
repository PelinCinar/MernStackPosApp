import { Button, Form, Input, message, Modal, Table } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";

const EditCategories = ({
  isEditModalOpen,
  setIsEditModalOpen,
  categories,
  setCategories,
}) => {
  const [editingRow, setEditingRow] = useState({});

  const onFinish = (values) => {
    try {
      fetch(
        import.meta.env.VITE_SERVER_URL + "/api/categories/update-category",
        {
          method: "PUT",
          body: JSON.stringify({ ...values, categoryId: editingRow._id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      message.success("Kategori başarıyla güncellendi");
      setCategories(
        categories.map((item) => {
          if (item._id === editingRow._id) {
            return { ...item, title: values.title };
          }
          return item;
        })
      );
    } catch (error) {
      message.error("Kategori güncellemesi başarısız");

      console.log(error);
    }
  };

  const deleteCategory = (id) => {
    if (window.confirm("Silmek istediğinizde emin misiniz?")) {
      try {
        fetch(
          import.meta.env.VITE_SERVER_URL + "/api/categories/delete-category",
          {
            method: "DELETE",
            body: JSON.stringify({ categoryId: id }),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          }
        );
        message.success("Kategori başarıyla silindi.");
        setCategories(categories.filter((item) => item._id !== id)); //gönderdiğim id döndürdüğün idye eşit değilse filtreleme işlemi yap dedik
      } catch (error) {
        message.error("Silme işlemi başarısız.");

        console.log(error);
      }
    }
  };
  const columns = [
    {
      title: "Kategori Başlıkları",
      dataIndex: "title",
      render: (_, record) => {
        //render olayları iki parametre alır btw.buradaki  dataIndex ile gele değerdir.record: Satırdaki tüm verileri temsil eder_:Bir parametre kullanılmadığında
        if (record._id === editingRow._id) {
          return (
            <Form.Item className="mb-0" name="title">
              <Input defaultValue={record.title} />
            </Form.Item>
          );
        } else {
          return <p>{record.title}</p>;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <div className="flex gap-2">
            <Button
              type="link "
              onClick={() => setEditingRow(record)}
              className="pl-0 text-green-900"
            >
              Düzenle
            </Button>
            <Button type="link" htmlType="submit">
              Kaydet
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
    <Modal
      open={isEditModalOpen}
      title="Kategori İşlemleri"
      footer={false}
      onCancel={() => setIsEditModalOpen(false)}
    >
      <Form onFinish={onFinish}>
        <Table
          bordered
          dataSource={categories}
          columns={columns}
          rowKey={"_id"}
        />
      </Form>
    </Modal>
  );
};
EditCategories.propTypes = {
  isEditModalOpen: PropTypes.bool.isRequired,
  setIsEditModalOpen: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  setCategories: PropTypes.func.isRequired,
};

export default EditCategories;
