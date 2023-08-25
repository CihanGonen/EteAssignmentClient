import { useState, useEffect } from "react";
import axios from "axios";

import { Input } from "antd";

import { useCompaniesContext } from "../../hooks/useCompaniesContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const CompanyForm = ({ data = null, cancelModal }) => {
  const [name, setName] = useState("");
  const [legalNumber, setLegalNumber] = useState("");
  const [incorporationCountry, setIncorporationCountry] = useState("");
  const [website, setWebsite] = useState("");
  const [editId, setEditId] = useState("");

  const [errors, setErrors] = useState(null);

  const { dispatch } = useCompaniesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    if (data) {
      setEditId(data._id);
      setName(data.name);
      setLegalNumber(data.legalNumber);
      setIncorporationCountry(data.incorporationCountry);
      setWebsite(data.website);
    }
  }, [data]);

  const resetForm = () => {
    setEditId("");

    setName("");
    setLegalNumber("");
    setIncorporationCountry("");
    setWebsite("");
    setErrors(null);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const data = { name, legalNumber, incorporationCountry, website };

    let response;
    try {
      if (data && editId) {
        response = await axios.patch(
          "http://localhost:5000/companies/" + editId,
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
          dispatch({ type: "EDIT_COMPANY", payload: response.data });
        }
      } else {
        response = await axios.post(
          "http://localhost:5000/companies",
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
          dispatch({ type: "CREATE_COMPANY", payload: response.data });
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
            <label className="font-semibold" htmlFor="legalNumber">
              Legal Number
            </label>
            <Input
              status={errors && errors.legalNumber ? "error" : ""}
              name="legalNumber"
              value={legalNumber}
              onChange={(e) => setLegalNumber(e.target.value)}
            />
            {errors && errors.legalNumber && (
              <span className="text-xs text-red-500">{errors.legalNumber}</span>
            )}
          </div>
        </div>
        <div className="flex gap-4 pt-5">
          <div className="w-1/2">
            <label className="font-semibold" htmlFor="incorporationCountry">
              Incorporation Country
            </label>
            <Input
              status={errors && errors.incorporationCountry ? "error" : ""}
              name="incorporationCountry"
              value={incorporationCountry}
              onChange={(e) => setIncorporationCountry(e.target.value)}
            />
            {errors && errors.incorporationCountry && (
              <span className="text-xs text-red-500">
                {errors.incorporationCountry}
              </span>
            )}
          </div>
          <div className="w-1/2">
            <label className="font-semibold" htmlFor="website">
              Website
            </label>
            <br />
            <Input
              status={errors && errors.website ? "error" : ""}
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
            {errors && errors.website && (
              <span className="text-xs text-red-500">{errors.website}</span>
            )}
          </div>
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

export default CompanyForm;
