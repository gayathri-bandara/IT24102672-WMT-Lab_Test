import { useState } from "react";

function ItemForm({ initialValues, onSubmit, submitText }) {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.price || formData.price <= 0) newErrors.price = "Price must be greater than 0";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      console.log("Form validation failed:", errors);
      return;
    }

    onSubmit({
      ...formData,
      price: Number(formData.price),
    });
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>{submitText}</h2>

      <label>Item Name *</label>
      <input 
        name="name" 
        value={formData.name} 
        onChange={handleChange}
        placeholder="Enter item name"
      />
      {errors.name && <p className="form-error">{errors.name}</p>}

      <label>Category *</label>
      <input 
        name="category" 
        value={formData.category} 
        onChange={handleChange}
        placeholder="Enter category"
      />
      {errors.category && <p className="form-error">{errors.category}</p>}

      <label>Price *</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Enter price"
        step="0.01"
      />
      {errors.price && <p className="form-error">{errors.price}</p>}

      <label>Description *</label>
      <textarea
        name="description"
        rows="4"
        value={formData.description}
        onChange={handleChange}
        placeholder="Enter description"
      />
      {errors.description && <p className="form-error">{errors.description}</p>}

      <label>Image URL</label>
      <input 
        name="imageUrl" 
        value={formData.imageUrl} 
        onChange={handleChange}
        placeholder="Enter image URL (optional)"
      />

      <button className="btn primary" type="submit">{submitText}</button>
    </form>
  );
}

export default ItemForm;