import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SunOutlined,
  MoonOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, Space, theme, Select } from "antd";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { HiChartPie } from "react-icons/hi";
import { FaUsers, FaUserCircle } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { paths } from "../router/paths";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // Rejim holatini saqlash
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to={paths.PROFILE}>{t("profile")}</Link>
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => {
          localStorage.removeItem("access_token");
          navigate("/login");
        }}
      >
        {t("logout")}
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className={`h-[100vh] ${darkMode ? "dark" : "light"}`}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme={darkMode ? "dark" : "light"}
      >
        <Link
          to={paths.HOME}
          className={`demo-logo-vertical flex items-center justify-center ${
            collapsed ? "p-2" : "p-5"
          }`}
        >
          <h1
            className={`${collapsed ? "text-xl" : "text-3xl"} ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            LOGO
          </h1>
        </Link>
        <Menu
          theme={darkMode ? "dark" : "light"}
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <HiChartPie size={20} />,
              label: <Link to={paths.HOME}>{t("dashboard")}</Link>,
            },
            {
              key: "2",
              icon: <FaUsers size={20} />,
              label: <Link to={paths.USERS}>{t("users")}</Link>,
            },
            {
              key: "3",
              icon: <AiOutlineProduct size={20} />,
              label: <Link to={paths.PRODUCTS}>{t("products")}</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="flex justify-between items-center"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Space className="flex items-center">
            <Select
              defaultValue={i18n.language}
              onChange={(value) => i18n.changeLanguage(value)}
              style={{ width: 120 }}
            >
              <Select.Option value="uz">O'zbekcha</Select.Option>
              <Select.Option value="ru">Русский</Select.Option>
              <Select.Option value="en">English</Select.Option>
            </Select>
            <Button
              type="text"
              icon={darkMode ? <SunOutlined /> : <MoonOutlined />}
              onClick={() => setDarkMode(!darkMode)}
              style={{ fontSize: "10px" }}
            />
            <Dropdown overlay={menu} trigger={["click"]}>
              <Space className="cursor-pointer mr-5">
                <FaUserCircle size={25} className="mt-7" />
              </Space>
            </Dropdown>
          </Space>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "calc(100vh - 112px)",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflowY: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
