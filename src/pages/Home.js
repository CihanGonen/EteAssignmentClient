import {
  LoadingOutlined,
  LaptopOutlined,
  InsertRowBelowOutlined,
} from "@ant-design/icons";
import { Table } from "antd";

import { useCompaniesContext } from "../hooks/useCompaniesContext";
import { useProductsContext } from "../hooks/useProductsContext";
import { useEffect } from "react";

const companyColumns = [
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
const productColumns = [
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

const Home = () => {
  const { companies, companyLoading } = useCompaniesContext();
  const { products, productLoading } = useProductsContext();

  const getLastlyAdded3Items = (data) => {
    data.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return data.slice(0, 3);
  };

  return (
    <div className="max-w-screen-xl mx-auto py-5">
      {!companies || !products ? (
        <LoadingOutlined />
      ) : (
        <div>
          <div className="flex gap-5 w-full">
            <div className="w-4/12 bg-white rounded flex flex-col items-center justify-center gap-4">
              <h2 className="text-xl">
                There are{" "}
                <span className="text-themeColor-700 text-5xl">
                  {companies.length}
                </span>{" "}
                companies in the system.
              </h2>
              <LaptopOutlined style={{ fontSize: "50px", color: "inherit" }} />
            </div>
            <div className="w-8/12">
              <h2 className="text-xl pb-2 text-themeColor-800">
                3 Lastly Added Companies
              </h2>{" "}
              <Table
                style={{ width: "100%" }}
                dataSource={getLastlyAdded3Items(companies)}
                columns={companyColumns}
                pagination={false}
              />
            </div>
          </div>
          <div className="flex gap-5 w-full pt-5">
            <div className="w-4/12 bg-white rounded flex flex-col items-center justify-center gap-4">
              <h2 className="text-xl">
                There are{" "}
                <span className="text-themeColor-700 text-5xl">
                  {products.length}
                </span>{" "}
                products in the system.
              </h2>
              <InsertRowBelowOutlined
                style={{ fontSize: "50px", color: "inherit" }}
              />
            </div>
            <div className="w-8/12">
              <h2 className="text-themeColor-800 text-xl pb-2">
                3 Lastly Added Products
              </h2>{" "}
              <Table
                style={{ width: "100%" }}
                dataSource={getLastlyAdded3Items(products)}
                columns={productColumns}
                pagination={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
