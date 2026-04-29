import { useNavigate } from "react-router-dom";
import ItemForm from "../components/ItemForm";
import Navbar from "../components/Navbar";
import { createItem } from "../api/itemApi";

function AddItemPage() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      console.log("Submitting form data:", formData);
      const response = await createItem(formData);
      console.log("Item created successfully:", response.data);
      alert("Item added successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error adding item:", err.response?.data || err.message);
      alert(`Failed to add item: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <ItemForm
          initialValues={{
            name: "",
            category: "",
            price: "",
            description: "",
            imageUrl: "",
          }}
          submitText="Add Item"
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}

export default AddItemPage;