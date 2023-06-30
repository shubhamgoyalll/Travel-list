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
      <Stats items={items} />
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

function Stats({ items }) {
  // Early return if no item has been added in the start
  if (!items.length)
    return (
      <p className="stats">
        <em>Start entering some items to the list 🙂</em>
      </p>
    );
  // Using derived state rather than creating another piece of state in app component to get number of items
  const itemsLength = items.length;
  // Again derived state rather than creating another piece of state for packed items
  const itemsPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((itemsPacked / itemsLength) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything ! Ready to go ✈️✈️"
          : `You have ${itemsLength} items on your list, and you have already packed ${" "}
          ${itemsPacked} Item (${percentage}%)`}
      </em>
    </footer>
  );
}
