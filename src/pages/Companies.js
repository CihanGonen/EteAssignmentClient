import { useEffect, useState } from "react";
import { Table, Space, Modal } from "antd";
import {
  LoadingOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  FilterOutlined,
} from "@ant-design/icons";

import { useCompaniesContext } from "../hooks/useCompaniesContext";

import CompanyForm from "../components/Companies/CompanyForm";
import DeleteApproval from "../components/Companies/DeleteApproval";

const columnsData = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Legal Number",
    dataIndex: "legalNumber",
    key: "legalNumber",
  },
  {
    title: "Country",
    dataIndex: "incorporationCountry",
    key: "incorporationCountry",
  },
  {
    title: "Website",
    dataIndex: "website",
    key: "website",
  },
];

const Companies = () => {
  const [columns, setColumns] = useState(columnsData);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [editCompany, setEditCompany] = useState(null);
  const [deleteCompany, setDeleteCompany] = useState(null);

  const { companies, companyLoading } = useCompaniesContext();

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
      setEditCompany(null);
      setIsEditModalOpen(false);
    } else if (modal === "add") {
      setIsAddModalOpen(false);
    } else if (modal === "delete") {
      setIsDeleteModalOpen(false);
    }
  };

  const onEditClick = (record) => {
    setEditCompany({ ...record });
    showModal("edit");
  };

  const onDeleteClick = (record) => {
    setDeleteCompany({ ...record });
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
        title="Add New Company"
        open={isAddModalOpen}
        footer={null}
        onCancel={() => handleCancel("add")}
      >
        <CompanyForm cancelModal={() => handleCancel("add")} />
      </Modal>
      <Modal
        title="Edit Company"
        open={isEditModalOpen}
        footer={null}
        onCancel={() => handleCancel("edit")}
      >
        <CompanyForm
          data={editCompany}
          cancelModal={() => handleCancel("edit")}
        />
      </Modal>
      <Modal
        title="Delete Company"
        open={isDeleteModalOpen}
        footer={null}
        onCancel={() => handleCancel("delete")}
      >
        <DeleteApproval
          data={deleteCompany}
          cancelModal={() => handleCancel("delete")}
        />
      </Modal>
      <h2 className="text-themeColor-700 text-xl font-semibold">Companies</h2>
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
        {companyLoading ? (
          <LoadingOutlined />
        ) : (
          <Table
            style={{ width: "100%" }}
            dataSource={companies}
            columns={columns}
          />
        )}
      </div>
    </div>
  );
};

export default Companies;
