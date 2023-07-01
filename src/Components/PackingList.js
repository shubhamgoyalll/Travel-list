import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDeleteItem,
  onToogleItem,
  handleClearList,
}) {
  //using controlled element concept
  const [sortBy, setSortBy] = useState("input");

  //using derived state concept
  let sortedItems;

  //As by default item list would be input type
  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    //a.description.localeCompare(b.description) - to compare first and second item in a list by alphabitcal order
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToogleItem={onToogleItem}
          />
        ))}
      </ul>

      <div className="actions">
        {/* select has value and onChange which is 2nd and 3rd step for controlled elements concept */}
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by Input Order</option>
          <option value="description">Sort by Description</option>
          <option value="packed">Sort by Packed Status</option>
        </select>
        <button onClick={handleClearList}>Clear list</button>
      </div>
    </div>
  );
}
