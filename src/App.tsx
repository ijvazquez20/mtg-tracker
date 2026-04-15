import { useState } from "react";
import CardTile from "./components/CardTile";

function App() {
  const [searchText, setSearchText] = useState("");
  const [card, setCard] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSearch() {
    setErrorMessage("");

    const response = await fetch(
      `https://api.scryfall.com/cards/named?exact=${searchText}`
    );

    if (!response.ok) {
      setErrorMessage("Card not found. Please try another name.");
      return;
    }

    const data = await response.json();
    setCard(data);
    console.log(data);
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

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {card && <CardTile card={card} />}
    </div>
  );
}

export default App;