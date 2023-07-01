export default function Item({ item, onDeleteItem, onToogleItem }) {
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
