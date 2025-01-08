import { useEffect, useState } from "react";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import PropTypes from "prop-types";
import AddCategories from "./AddCategories";
import EditCategories from "./EditCategories";
import "./style.css";

const Categories = ({ categories, setCategories, setFiltered, products }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("Tümü");

  useEffect(() => {
    if (categoryTitle === "Tümü") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((item) => item.category === categoryTitle));
    }
  }, [products, setFiltered, categoryTitle]); // products, setFiltered veya categoryTitle değiştiğinde bu useEffect tetiklenir.
  //llanıcı bir kategoriye tıkladığında setCategoryTitle(item.title) çağrılır ve categoryTitle state'i güncellenir.

  return (
    <ul className="flex gap-4 md:flex-col text-lg ">
      {categories.map((item) => (
        <li
          className={`category-item ${item.title === categoryTitle && "!bg-slate-600"}`}
          key={item._id}
          onClick={() => setCategoryTitle(item.title)}
        >
          <span>{item.title}</span>
        </li>
      ))}

      <li
        className="category-item !bg-green-600 hover:opacity-90 "
        onClick={() => setIsAddModalOpen(true)}
      >
        <PlusOutlined className="md:text-2xl" />
      </li>
      <li
        className="category-item !bg-orange-400 hover:opacity-90 "
        onClick={() => setIsEditModalOpen(true)}
      >
        <EditOutlined className="md:text-2xl" />
      </li>
      <Modal
        title="Yeni Kategori Ekle"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={false}
      >
        <Form layout="vertical">
          <Form.Item
            name="title"
            label="Kategori Ekle"
            rules={[
              { required: true, message: "Kategori alanı boş geçilemez!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item className="flex justify-end mb-0">
            <Button type="primary" htmlType="submit">
              Oluştur
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <AddCategories
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        setCategories={setCategories}
        categories={categories}
      />
      <EditCategories
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        categories={categories}
        setCategories={setCategories}
      />
    </ul>
  );
};

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  setCategories: PropTypes.func.isRequired,
  setFiltered: PropTypes.func.isRequired,
};

export default Categories;
