import ItemCard from './ItemCard';
import { deleteItem } from '../api/itemApi';

function ItemList({ items, onRefresh }) {
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteItem(id);
        onRefresh();
      } catch (error) {
        alert('Error deleting item: ' + error.message);
      }
    }
  };

  return (
    <div className="grid">
      {items.length === 0 ? (
        <p>No items yet. Add one to get started!</p>
      ) : (
        items.map((item) => (
          <ItemCard key={item._id} item={item} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
}

export default ItemList;
