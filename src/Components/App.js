import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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

  function deleteAll(items) {
    const confirmed = window.confirm(
      "Are you sure you want to delete al items?"
    );
    // setItems((items) => items.splice(0, items.length)); OR easy way
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItems}
        onToogleItem={handleToogleItems}
        handleClearList={deleteAll}
      />
      <Stats items={items} />
    </div>
  );
}
