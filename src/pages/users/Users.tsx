import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Input, Form, Space } from "antd";
import { useUserStore } from "../../app/userStore";
import Search from "antd/es/input/Search";

const { Column } = Table;

const User: React.FC = () => {
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
      title: "Foydalanuvchini o'chirishni tasdiqlang",
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
        User List ({users.length})
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
          placeholder="Search by First or Last Name"
          onSearch={handleSearch}
          style={{ width: 300 }}
        />
        <Button type="primary" onClick={handleAdd}>
          Add User
        </Button>
      </Space>
      <Table dataSource={users} rowKey="id" loading={loading}>
        <Column title="First Name" dataIndex="firstName" key="firstName" />
        <Column title="Last Name" dataIndex="lastName" key="lastName" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Phone" dataIndex="phone" key="phone" />
        <Column
          title="Actions"
          key="actions"
          render={(text, record: any) => (
            <Space size="middle">
              <Button onClick={() => handleEdit(record)}>Edit</Button>
              <Button danger onClick={() => handleDelete(record.id)}>
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>

      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical" name="userForm">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default User;
