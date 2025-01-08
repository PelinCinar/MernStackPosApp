import { Button, Carousel, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER_URL + "/api/auth/register",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      if (res.status === 200) {
        message.success("Kayıt işlemi başarılı.");
        navigate("/login");
        setLoading(false);
      }
    } catch (error) {
      message.error("Bir şeyler yanlış gitti.");
      console.log(error);
    }
  };
  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
          <h2 className="text-3xl font-thin md:text-4xl bg-[#ddd4c96e] rounded-xl py-2 px-3 flex justify-center items-center mb-6 ">
            TARSUSİ
          </h2>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Kullanıcı Adı"
              name={"username"}
              rules={[
                {
                  required: true,
                  message: "Kullanıcı Adı Alanı Boş Bırakılamaz!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="E-mail"
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "E-mail Alanı Boş Bırakılamaz!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Şifre"
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Şifre Alanı Boş Bırakılamaz!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Şifre Tekrar"
              name={"passwordAgain"}
              rules={[
                {
                  required: true,
                  message: "Şifre Tekrar Alanı Boş Bırakılamaz!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Şifreler Aynı Olmak Zorunda!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                Kaydol
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Bir hesabınız var mı?&nbsp;
            <Link to="/login" className="text-[#8b7355]">
              Şimdi giriş yap
            </Link>
          </div>
        </div>
        <div className="xl:w-3/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#8b7355] h-full">
          <div className="w-full h-full flex items-center ">
            <div className="w-full ">
              <Carousel className="!h-full px-6" autoplay>
                <AuthCarousel
                  img="/images/img1.jpg"
                  title="Responsive"
                  desc="Tüm Cihaz Boyutlarıyla Uyumluluk"
                />
                <AuthCarousel
                  img="/images/img2.jpg"
                  title="İstatistikler"
                  desc="Geniş Tutulan İstatistikler"
                />
                <AuthCarousel
                  img="/images/img4.jpg"
                  title="Müşteri Memnuniyeti"
                  desc="Deneyim Sonunda Üründen Memnun Müşteriler"
                />
                <AuthCarousel
                  img="/images/img3.jpg"
                  title="Yönetici Paneli"
                  desc="Tek Yerden Yönetim"
                />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
