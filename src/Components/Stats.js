export default function Stats({ items }) {
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
