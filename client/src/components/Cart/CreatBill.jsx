import { Button, Card, Form, Input, message, Modal, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../../redux/cartSlice";
import PropTypes from "prop-types";

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER_URL + "/api/bills/add-bill",
        {
          method: "POST",
          body: JSON.stringify({
            ...values,
            subTotal: cart.total,
            tax: ((cart.total * cart.tax) / 100).toFixed(2),
            totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(
              2
            ),
            cartItems: cart.cartItems,
          }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      if (res.status === 200) {
        message.success("Fatura başarıyla oluşturuldu.");
        dispatch(reset());
        navigate("/bills");
      }
    } catch (error) {
      message.danger("Bir şeyler yanlış gitti.");
      console.log(error);
    }
  };

  return (
    <Modal
      title="Fatura Oluştur"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
    >
      <Form layout={"vertical"} onFinish={onFinish}>
        <Form.Item
          label="Müşteri Adı"
          name={"customerName"}
          rules={[
            {
              required: true,
              message: "Müşteri adı zorunludur",
            },
          ]}
        >
          <Input placeholder="Bir Müşteri Adı Yazınız" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name={"customerPhoneNumber"}
          label="Tel No"
        >
          <Input placeholder="Bir Tel No Yazınız" maxLength={11} />
        </Form.Item>
        <Form.Item
          label="Ödeme Yöntemi"
          rules={[{ required: true }]}
          name={"paymentMode"}
        >
          <Select placeholder="Bir Ödeme Yöntemi Seçiniz">
            <Select.Option value="Nakit">Nakit</Select.Option>
            <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
          </Select>
        </Form.Item>
        <Card>
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
          <div className="flex justify-end">
            <Button
              className="mt-4"
              type="primary"
              htmlType="submit"
              disabled={cart.cartItems.length === 0}
            >
              Sipariş Oluştur
            </Button>
          </div>
        </Card>
      </Form>
    </Modal>
  );
};
CreateBill.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
};

export default CreateBill;
