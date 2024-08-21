import React from "react";
import { Form, Input, Button, Checkbox, Space, Select } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../router/paths";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    navigate(paths.HOME);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {t("Login")}
        </h2>
        <Space className="flex items-center pb-3 justify-center">
          <Select
            defaultValue={i18n.language}
            onChange={(value) => i18n.changeLanguage(value)}
            style={{ width: 120 }}
          >
            <Select.Option value="uz">O'zbekcha</Select.Option>
            <Select.Option value="ru">Русский</Select.Option>
            <Select.Option value="en">English</Select.Option>
          </Select>
        </Space>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: t("Please input your Username!") },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder={t("Username")} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: t("Please input your Password!") },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t("Password")}
            />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>{t("Remember me")}</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              {t("Log in")}
            </Button>
          </Form.Item>
          <div className="text-center">
            <span>{t("Don't have an account?")} </span>
            <Link to={paths.SIGNUP} className="text-blue-500">
              {t("Sign Up")}
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
