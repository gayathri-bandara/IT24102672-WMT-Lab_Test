import { useEffect, useState } from "react";
import ItemList from "../components/ItemList";
import Navbar from "../components/Navbar";
import { getItems } from "../api/itemApi";

function HomePage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data } = await getItems();
      setItems(data);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Item Manager</h1>
        <ItemList items={items} onRefresh={fetchItems} />
      </div>
    </>
  );
}

export default HomePage;