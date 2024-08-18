import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, Space, theme } from "antd";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { HiChartPie } from "react-icons/hi";
import { FaUsers, FaUserCircle } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { paths } from "../router/paths";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   // Bu yerda autentifikatsiya holatini tozalash logikasini amalga oshirasiz
  //   // Masalan, tokenni localStorage'dan o'chirish
  //   // localStorage.removeItem("authToken");
  //   navigate(paths.LOGIN);
  // };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to={paths.PROFILE}>Profile</Link>
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => {
          localStorage.removeItem("access_token");
          navigate("/login");
        }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="h-[100vh]">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Link
          to={paths.HOME}
          className={`demo-logo-vertical flex items-center justify-center ${
            collapsed ? "p-2" : "p-5"
          }`}
        >
          <h1 className={`${collapsed ? "text-xl" : "text-3xl"} text-white`}>
            LOGO
          </h1>
        </Link>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <HiChartPie size={20} />,
              label: <Link to={paths.HOME}>Dashboard</Link>,
            },
            {
              key: "2",
              icon: <FaUsers size={20} />,
              label: <Link to={paths.USERS}>Users</Link>,
            },
            {
              key: "3",
              icon: <AiOutlineProduct size={20} />,
              label: <Link to={paths.PRODUCTS}>Products</Link>,
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
          <Dropdown overlay={menu} trigger={["click"]}>
            <Space className="cursor-pointer mr-5">
              <FaUserCircle size={24} />
            </Space>
          </Dropdown>
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
