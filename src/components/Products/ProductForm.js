import { useState, useEffect } from "react";
import axios from "axios";

import { Input } from "antd";

import { useCompaniesContext } from "../../hooks/useCompaniesContext";
import { useProductsContext } from "../../hooks/useProductsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const ProductForm = ({ data = null, cancelModal }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [amountUnit, setAmountUnit] = useState("");
  const [company, setCompany] = useState("");

  const [editId, setEditId] = useState("");

  const [errors, setErrors] = useState(null);

  const { companies } = useCompaniesContext();
  const { dispatch } = useProductsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    if (data) {
      setEditId(data._id);
      setName(data.name);
      setCategory(data.category);
      setAmount(data.amount);
      setAmountUnit(data.amountUnit);
      setCompany(data.company._id);
    }
  }, [data]);

  useEffect(() => {
    if (!company && !data) {
      setCompany(companies[0]);
    }
  }, [companies]);

  const resetForm = () => {
    setEditId("");

    setName("");
    setCategory("");
    setAmount("");
    setAmountUnit("");
    setCompany("");
    setErrors(null);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const data = { name, category, amount, amountUnit, company };

    let response;

    try {
      if (data && editId) {
        response = await axios.patch(
          "http://localhost:5000/products/" + editId,
          {
            ...data,
          },
          {
            headers: { token: user.token },
          }
        );

        //key added for table
        response.data.key = response.data._id;

        if (response.data) {
          dispatch({ type: "EDIT_PRODUCT", payload: response.data });
        }
      } else {
        response = await axios.post(
          "http://localhost:5000/products",
          {
            ...data,
          },
          {
            headers: { token: user.token },
          }
        );

        //key added for table
        response.data.key = response.data._id;

        if (response.data) {
          dispatch({ type: "CREATE_PRODUCT", payload: response.data });
        }
      }

      resetForm();
      cancelModal();
    } catch (err) {
      setErrors({ ...err.response.data });
    }
  };

  return (
    <div className="pt-5">
      <form onSubmit={submitForm}>
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="font-semibold" htmlFor="name">
              Name
            </label>
            <Input
              status={errors && errors.name ? "error" : ""}
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors && errors.name && (
              <span className="text-xs text-red-500">{errors.name}</span>
            )}
          </div>
          <div className="w-1/2">
            <label className="font-semibold" htmlFor="category">
              Category
            </label>
            <Input
              status={errors && errors.legalNumber ? "error" : ""}
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            {errors && errors.category && (
              <span className="text-xs text-red-500">{errors.category}</span>
            )}
          </div>
        </div>
        <div className="flex gap-4 pt-5">
          <div className="w-1/2">
            <label className="font-semibold" htmlFor="amount">
              Amount
            </label>
            <Input
              status={errors && errors.amount ? "error" : ""}
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {errors && errors.amount && (
              <span className="text-xs text-red-500">{errors.amount}</span>
            )}
          </div>
          <div className="w-1/2">
            <label className="font-semibold" htmlFor="amountUnit">
              Amount Unit
            </label>
            <Input
              status={errors && errors.amountUnit ? "error" : ""}
              name="amountUnit"
              value={amountUnit}
              onChange={(e) => setAmountUnit(e.target.value)}
            />
            {errors && errors.amountUnit && (
              <span className="text-xs text-red-500">{errors.amountUnit}</span>
            )}
          </div>
        </div>
        <div className="flex gap-4 pt-5">
          <div className="w-1/2">
            <label className="font-semibold" htmlFor="company">
              Company
            </label>
            <select
              className="block w-full rounded border-2 leading-8 py-1.5 px-1 border-gray-200"
              name="company"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
              }}
            >
              {companies &&
                companies.map((company) => (
                  <option key={company._id} value={company._id}>
                    {company.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-1/2"></div>
        </div>

        <div className="pt-5 flex justify-end">
          <button
            type="submit"
            className="bg-themeColor-500 text-white font-semibold text-sm py-2 px-4 rounded flex hover:bg-themeColor-800 items-center"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
