import Item from "../models/Item.js";

// CREATE item
export const createItem = async (req, res) => {
  try {
    const { name, category, price, description, imageUrl, discountPercentage } = req.body;

    // Validate required fields
    if (!name || !category || !price || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const item = new Item({
      name,
      category,
      price: Number(price),
      description,
      imageUrl: imageUrl || "",
      discountPercentage: discountPercentage || 0
    });

    const savedItem = await item.save();
    console.log("Item created successfully:", savedItem);
    res.status(201).json(savedItem);
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET all items
export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single item by ID
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE item
export const updateItem = async (req, res) => {
  try {
    const { name, category, price, description, imageUrl, discountPercentage } = req.body;
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { name, category, price, description, imageUrl, discountPercentage },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE item
export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};