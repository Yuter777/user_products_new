import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Input, Form, Space } from "antd";
import { useUserStore } from "../../app/userStore";
import Search from "antd/es/input/Search";
import { useTranslation } from "react-i18next";

const { Column } = Table;

const User: React.FC = () => {
  const { t } = useTranslation();
  const {
    loading,
    users,
    error,
    fetchUsers,
    addUser,
    editUser,
    deleteUser,
    searchUsers,
  } = useUserStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAdd = () => {
    form.resetFields();
    setEditingUser(null);
    setIsModalVisible(true);
  };

  const handleEdit = (user: any) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this user?",
      okText: t("Yes, delete it"),
      cancelText: t("No, cancel"),
      onOk: () => deleteUser(id),
    });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingUser) {
          editUser({ ...editingUser, ...values });
        } else {
          addUser(values);
        }
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleSearch = (value: string) => {
    searchUsers(value);
  };
  return (
    <div>
      <h1 style={{ textAlign: "center", fontSize: "30px" }}>
        {t("User List")} ({users.length})
      </h1>
      <Space
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Search
          allowClear
          placeholder={t("Search by First or Last Name")}
          onSearch={handleSearch}
          style={{ width: 300 }}
        />
        <Button type="primary" onClick={handleAdd}>
          {t("Add User")}
        </Button>
      </Space>
      <Table dataSource={users} rowKey="id" loading={loading}>
        <Column title={t("First Name")} dataIndex="firstName" key="firstName" />
        <Column title={t("Last Name")} dataIndex="lastName" key="lastName" />
        <Column title={t("Email")} dataIndex="email" key="email" />
        <Column title={t("Phone")} dataIndex="phone" key="phone" />
        <Column
          title={t("Actions")}
          key="actions"
          render={(record: any) => (
            <Space size="middle">
              <Button onClick={() => handleEdit(record)}>{t("Edit")}</Button>
              <Button danger onClick={() => handleDelete(record.id)}>
                {t("Delete")}
              </Button>
            </Space>
          )}
        />
      </Table>

      <Modal
        title={editingUser ? t("Edit User") : t("Add User")}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical" name="userForm">
          <Form.Item
            name="firstName"
            label={t("First Name")}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label={t("Last Name")}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label={t("Email")}
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label={t("Username")}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label={t("Password")}
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="phone"
            label={t("Phone")}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default User;
