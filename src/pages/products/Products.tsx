import { useEffect, useState } from "react";
import { Input, Button, Table, Modal, Form, InputNumber } from "antd";
import { ColumnsType } from "antd/es/table";
import { useProductStore } from "../../app/productStore";
import { useTranslation } from "react-i18next";

const { Search } = Input;

interface Product {
  id: string;
  title: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  comments: string;
  images: string[];
}

const Products: React.FC = () => {
  const { t } = useTranslation();
  const {
    loading,
    filteredProducts,
    error,
    fetchProducts,
    deleteProduct,
    updateProduct,
    addProduct,
    searchProducts,
  } = useProductStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleModalOpen = (product?: Product) => {
    if (product) {
      setIsEditMode(true);
      setCurrentProduct(product);
      form.setFieldsValue(product);
    } else {
      setIsEditMode(false);
      setCurrentProduct(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        if (isEditMode && currentProduct) {
          updateProduct(currentProduct.id, values);
        } else {
          addProduct(values);
        }
        handleModalClose();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const showDeleteConfirm = (id: string) => {
    Modal.confirm({
      title: t("Are you sure you want to delete this product?"),
      content: t("This action cannot be undone."),
      okText: t("Yes, delete it"),
      okType: "danger",
      cancelText: t("No, cancel"),
      onOk() {
        deleteProduct(id);
      },
    });
  };

  const getUniqueBrands = () => {
    const brands = filteredProducts.map((product) => product.brand);
    return Array.from(new Set(brands)).map((brand) => ({
      text: brand,
      value: brand,
    }));
  };

  const getUniqueCategory = () => {
    const categorys = filteredProducts.map((product) => product.category);
    return Array.from(new Set(categorys)).map((category) => ({
      text: category,
      value: category,
    }));
  };

  const columns: ColumnsType<Product> = [
    {
      title: t("Title"),
      dataIndex: "title",
      key: "title",
      render: (text: string) => (
        <span title={text}>
          {text.length > 20 ? `${text.substring(0, 20)}...` : text}
        </span>
      ),
    },
    {
      title: t("Brand"),
      dataIndex: "brand",
      key: "brand",
      filters: getUniqueBrands(),
      onFilter: (value, record) => record.brand.indexOf(value as string) === 0,
    },
    {
      title: t("Category"),
      dataIndex: "category",
      key: "category",
      filters: getUniqueCategory(),
      onFilter: (value, record) =>
        record.category.indexOf(value as string) === 0,
    },
    {
      title: t("Price"),
      dataIndex: "price",
      key: "price",
      render: (text: number) => `$${text.toFixed(2)}`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: t("Rating"),
      dataIndex: "rating",
      key: "rating",
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: t("Actions"),
      key: "actions",
      render: (record) => (
        <span>
          <Button type="link" onClick={() => handleModalOpen(record)}>
            {t("Edit")}
          </Button>
          <Button
            type="link"
            danger
            onClick={() => showDeleteConfirm(record.id)}
          >
            {t("Delete")}
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", fontSize: "30px" }}>
        {t("Products List")} ({filteredProducts.length})
      </h1>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Search
          allowClear
          placeholder={t("Search products")}
          onSearch={searchProducts}
          style={{ width: "300px" }}
        />
        <Button type="primary" onClick={() => handleModalOpen()}>
          {t("Add Product")}
        </Button>
      </div>
      {loading && <h2>{t("Loading...")}</h2>}
      {error && <h2>{error}</h2>}
      <Table dataSource={filteredProducts} columns={columns} rowKey="id" />

      <Modal
        title={isEditMode ? t("Edit Product") : t("Add Product")}
        visible={isModalOpen}
        onCancel={handleModalClose}
        onOk={handleFormSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label={t("Title")}
            rules={[
              { required: true, message: t("Please input the product title!") },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label={t("Description")}
            rules={[
              {
                required: true,
                message: t("Please input the product description!"),
              },
            ]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            name="brand"
            label={t("Brand")}
            rules={[{ required: true, message: t("Please input the brand!") }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label={t("Category")}
            rules={[
              { required: true, message: t("Please input the category!") },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label={t("Price")}
            rules={[{ required: true, message: t("Please input the price!") }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="discountPercentage"
            label={t("Discount Percentage")}
            rules={[
              {
                required: true,
                message: t("Please input the discount percentage!"),
              },
            ]}
          >
            <InputNumber min={0} max={100} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="rating"
            label={t("Rating")}
            rules={[{ required: true, message: t("Please input the rating!") }]}
          >
            <InputNumber min={0} max={5} step={0.1} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="comments"
            label={t("Comments")}
            rules={[{ required: true, message: t("Please input comments!") }]}
          >
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item
            name="images"
            label={t("Images")}
            rules={[
              { required: true, message: t("Please input the image URLs!") },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
