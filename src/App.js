import { useState } from "react";

export default function App() {
  //Lifting up the state as now form will these state data to the packinglist to show the items on the screen
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToogleItems(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItems}
        onToogleItem={handleToogleItems}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1> 👜 Far Away 🌴</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    // This will prevent reload when form submitted
    e.preventDefault();

    // to prevent user entering without the item name
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };

    console.log(newItem);

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip 💼</h3>
      <select
        value={quantity}
        onChange={(e) => {
          // By default e.target.value returns string value so explicitly converting to number
          setQuantity(Number(e.target.value));
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      {/* Controlled elements  */}
      <input
        type="text"
        placeholder="Item Name..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToogleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToogleItem={onToogleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToogleItem }) {
  return (
    <li>
      <input type="checkbox" onChange={() => onToogleItem(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>
        You have X items on your list, and you have already packed X (X% )
      </em>
    </footer>
  );
}
