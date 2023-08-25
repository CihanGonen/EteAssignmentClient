import axios from "axios";
import { useProductsContext } from "../../hooks/useProductsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const DeleteApproval = ({ data, cancelModal }) => {
  const { dispatch } = useProductsContext();
  const { user } = useAuthContext();

  const deleteCompany = async () => {
    let response = await axios.delete(
      "http://localhost:5000/products/" + data._id,
      {
        headers: { token: user.token },
      }
    );
    if (response.data) {
      dispatch({ type: "DELETE_PRODUCT", payload: response.data });
    }
    cancelModal();
  };

  return (
    <div className="py-5">
      <h2 className="text-xl text-red-600 font-semibold">
        Are you sure you want to delete {data.name}
      </h2>
      <h2 className="text-sm pt-3">Deleted products can not be recovered!</h2>
      <div className="pt-5 flex justify-end">
        <button
          onClick={deleteCompany}
          type="button"
          className="bg-red-500 text-white font-semibold text-sm py-2 px-4 rounded flex hover:bg-red-600 items-center"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteApproval;
