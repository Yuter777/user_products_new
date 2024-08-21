import { Form, Input, Button, Space, Select } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../router/paths";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    navigate(paths.LOGIN);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {t("Sign Up")}
        </h2>{" "}
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
        <Form name="register" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: t("Please input your Email!") },
              { type: "email", message: t("Please enter a valid email!") },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder={t("Email")} />
          </Form.Item>

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
              { min: 6, message: t("Password must be at least 6 characters!") },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t("Password")}
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: t("Please confirm your password!") },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(t("The two passwords do not match!"))
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t("Confirm Password")}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              {t("Register")}
            </Button>
          </Form.Item>
          <div className="text-center">
            <span>{t("Already have an account?")} </span>
            <Link to={paths.LOGIN} className="text-blue-500">
              {t("Log in")}
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
