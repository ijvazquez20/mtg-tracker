import { useState } from "react";

function App() {
  const [searchText, setSearchText] = useState("");

  async function handleSearch() {
    console.log("Searching for:", searchText);
  }

  return (
    <div style={{ padding: "32px" }}>
      <h1>MTG Collection Tracker</h1>
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Type a card name..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default App;