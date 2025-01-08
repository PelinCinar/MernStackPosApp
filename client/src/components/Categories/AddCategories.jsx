import { Button, Form, Input, message, Modal } from "antd";
import PropTypes from "prop-types";

const AddCategories = ({
  isAddModalOpen,
  setIsAddModalOpen,
  categories,
  setCategories,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    try {
      fetch(import.meta.env.VITE_SERVER_URL + "/api/categories/add-category", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Kategori başarıyla eklendi.");
      form.resetFields();
      setCategories([
        ...categories,
        {
          _id: Math.random(), //uniqe key hatasını çözdükk
          title: values.title,
        },
      ]); //tüm kategorileri al sonra ekleyeceğin kategoriyi value içerisinde göndereceğiz. sayfa yeniilemeesi olmadan bunu yapıyoruz
      setIsAddModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      title="Yeni Kategori Ekle"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name="title"
          label="Kategori Ekle"
          rules={[{ required: true, message: "Kategori alanı boş geçilemez!" }]}
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
  );
};
AddCategories.propTypes = {
  categories: PropTypes.array.isRequired,
  setCategories: PropTypes.func.isRequired,
  isAddModalOpen: PropTypes.bool.isRequired,
  setIsAddModalOpen: PropTypes.func.isRequired,
};

export default AddCategories;
