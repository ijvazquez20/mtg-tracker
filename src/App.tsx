import { useState } from "react";
import CardTile from "./components/CardTile";
import type { Card } from "./types";

function App() {
  const [searchText, setSearchText] = useState("");
  const [card, setCard] = useState<Card | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [collection, setCollection] = useState<Card[]>([]);

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

  function handleAddToCollection() {
    if (card === null) {
      return;
    }
    setCollection([...collection, card]);
    setCard(null);
    setSearchText("");
  }

  function handleRemove(id: string) {
    const updatedCollection = collection.filter((c) => c.id !== id);
    setCollection(updatedCollection);
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
      {card && <button onClick={handleAddToCollection}>Add to Collection</button>}

      <h2>My Collection</h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px"
      }}>
        {collection.map((c, index) => (
          <CardTile key={index} card={c}  onRemove={handleRemove}/>
        ))}
      </div>
    </div>
  );
}

export default App;