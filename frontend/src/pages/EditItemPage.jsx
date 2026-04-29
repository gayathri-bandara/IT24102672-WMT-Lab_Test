import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemForm from "../components/ItemForm.jsx";
import Navbar from "../components/Navbar.jsx";
import { getItemById, updateItem } from "../api/itemApi.js";

function EditItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { data } = await getItemById(id);
        setItem(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch item", error);
        setError("Failed to load item");
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      console.log("Updating item with data:", formData);
      const response = await updateItem(id, {
        ...formData,
        discountPercentage: Number(formData.discountPercentage)
      });
      console.log("Item updated successfully:", response.data);
      alert("Item updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Failed to update item", error);
      alert(`Failed to update item: ${error.response?.data?.message || error.message}`);
    }
  };

  if (loading) return <div><Navbar /><p>Loading item details...</p></div>;
  if (error) return <div><Navbar /><p>{error}</p></div>;
  if (!item) return <div><Navbar /><p>Item not found</p></div>;

  return (
    <>
      <Navbar />
      <div className="container">
        <ItemForm
          initialValues={item}
          submitText="Update Item"
          onSubmit={handleUpdate}
        />
      </div>
    </>
  );
}

export default EditItemPage;