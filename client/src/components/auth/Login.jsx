import { Button, Carousel, Checkbox, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";
import { useState } from "react";
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch(import.meta.env.VITE_SERVER_URL + "/api/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      const user = await res.json(); //giren kullanıcnın bilgilerini kosnoldan baktık geldi
      //biz bunu 200 kodunu aldığımız an kaydedeceğiz
      //localstorage bizim tarayıcımızdaki depolama yeri vtbanı gibi düşün sadece tarayıcıda

      if (res.status === 200) {
        localStorage.setItem(
          "posUser",
          JSON.stringify({
            userName: user.username,
            email: user.email,
          })
        );
        message.success("Giriş işlemi başarılı.");
        navigate("/");
      } else if (res.status === 404) {
        message.error("Kullanıcı bulunamadı!");
      } else if (res.status === 403) {
        message.error("Şifre Yanlış!");
      }
      setLoading(false);
    } catch (error) {
      message.error("Bir şeyler yanlış gitti.");
      console.log(error);
      setLoading(false);

    }
  };
  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
          <h2 className="text-3xl font-thin md:text-4xl bg-[#ddd4c96e] rounded-xl py-2 px-3 flex justify-center items-center mb-6">
            TARSUSİ
          </h2>
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              remember: false,
            }}
          >
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
            <Form.Item name={"remember"} valuePropName="checked">
              <div className="flex justify-between items-center">
                <Checkbox>Remember me</Checkbox>
                <Link>Forgot Password?</Link>
              </div>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                Giriş Yap
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Henüz bir hesabınız yok mu?&nbsp;
            <Link to="/register" className="text-[#8b7355]">
              Şimdi kaydol
            </Link>
          </div>
        </div>
        <div className="xl:w-3/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#8b7355] h-full">
          <div className="w-full h-full flex items-center">
            <div className="w-full">
              <Carousel className="!h-full px-6 " autoplay>
                <AuthCarousel
                  img="/images/img3.jpg"
                  title="Kahve"
                  desc="Tüm Cihaz Boyutlarıyla Uyumluluk"
                />
                <AuthCarousel
                  img="/images/img2.jpg"
                  title="Moda"
                  desc="Geniş Tutulan İstatistikler"
                />
                <AuthCarousel
                  img="/images/img4.jpg"
                  title="Müşteri Memnuniyeti"
                  desc="Deneyim Sonunda Üründen Memnun Müşteriler"
                />
                <AuthCarousel
                  img="/images/img1.jpg"
                  title="Cart Curt"
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
export default Login;
