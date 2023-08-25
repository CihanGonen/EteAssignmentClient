import { useEffect, useState } from "react";
import { Table, Space, Modal } from "antd";
import {
  LoadingOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  FilterOutlined,
} from "@ant-design/icons";

import { useProductsContext } from "../hooks/useProductsContext";

import ProductForm from "../components/Products/ProductForm";
import DeleteApproval from "../components/Products/DeleteApproval";

const columnsData = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Amount Unit",
    dataIndex: "amountUnit",
    key: "amountUnit",
  },
  {
    title: "Company",
    dataIndex: "company",
    key: "company",
    render: (item) => item.name,
  },
];

const Products = () => {
  const [columns, setColumns] = useState(columnsData);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);

  const { products, productLoading } = useProductsContext();

  const showModal = (modal) => {
    if (modal === "edit") {
      setIsEditModalOpen(true);
    } else if (modal === "add") {
      setIsAddModalOpen(true);
    } else if (modal === "delete") {
      setIsDeleteModalOpen(true);
    }
  };

  const handleCancel = (modal) => {
    if (modal === "edit") {
      setEditProduct(null);
      setIsEditModalOpen(false);
    } else if (modal === "add") {
      setIsAddModalOpen(false);
    } else if (modal === "delete") {
      setIsDeleteModalOpen(false);
    }
  };

  const onEditClick = (record) => {
    setEditProduct({ ...record });
    showModal("edit");
  };

  const onDeleteClick = (record) => {
    setDeleteProduct({ ...record });
    showModal("delete");
  };

  useEffect(() => {
    // added this later because we use method onclick
    setColumns((prevState) => [
      ...prevState,
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <span>
              <EditOutlined onClick={() => onEditClick(record)} />
            </span>
            <span>
              <DeleteOutlined onClick={() => onDeleteClick(record)} />
            </span>
          </Space>
        ),
      },
    ]);
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto pt-5">
      <Modal
        title="Add New Product"
        open={isAddModalOpen}
        footer={null}
        onCancel={() => handleCancel("add")}
      >
        <ProductForm cancelModal={() => handleCancel("add")} />
      </Modal>
      <Modal
        title="Edit Product"
        open={isEditModalOpen}
        footer={null}
        onCancel={() => handleCancel("edit")}
      >
        <ProductForm
          data={editProduct}
          cancelModal={() => handleCancel("edit")}
        />
      </Modal>
      <Modal
        title="Delete Product"
        open={isDeleteModalOpen}
        footer={null}
        onCancel={() => handleCancel("delete")}
      >
        <DeleteApproval
          data={deleteProduct}
          cancelModal={() => handleCancel("delete")}
        />
      </Modal>
      <h2 className="text-themeColor-700 text-xl font-semibold">Products</h2>
      <div className="pt-5 flex gap-4">
        <button
          className="bg-themeColor-700 text-white font-semibold text-sm py-2 px-4 rounded flex hover:bg-themeColor-800 items-center gap-2"
          onClick={() => showModal("add")}
        >
          <PlusOutlined style={{ fontSize: "14px", color: "inherit" }} /> Add
          new
        </button>
        <button className="border-2 border-themeColor-700 text-themeColor-700 hover:text-themeColor-800 hover:border-themeColor-800 font-semibold text-sm py-2 px-4 rounded flex items-center gap-2">
          <FilterOutlined style={{ fontSize: "14px", color: "inherit" }} />{" "}
          Filter
        </button>
      </div>
      <div className="pt-5 flex justify-center items-center">
        {productLoading ? (
          <LoadingOutlined />
        ) : (
          <Table
            style={{ width: "100%" }}
            dataSource={products}
            columns={columns}
          />
        )}
      </div>
    </div>
  );
};

export default Products;
