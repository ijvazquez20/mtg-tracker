import { useState } from "react";
import CardTile from "./components/CardTile";
import SearchBar from "./components/SearchBar";
import type { Card } from "./types";


function App() {
  const [card, setCard] = useState<Card | null>(null);
  const [collection, setCollection] = useState<Card[]>([]);

  function handleCardFound(foundCard: Card | null) {
    setCard(foundCard);
  }

  function handleAddToCollection() {
    if (card === null) {
      return;
    }
    setCollection([...collection, card]);
    setCard(null);
    //setSearchText("");
  }

  function handleRemove(id: string) {
    const updatedCollection = collection.filter((c) => c.id !== id);
    setCollection(updatedCollection);
  }

  return (
    <div style={{ padding: "32px" }}>
      <h1>MTG Collection Tracker</h1>

      <SearchBar onCardFound={handleCardFound} />

      {card && <CardTile card={card} />}
      {card && <button onClick={handleAddToCollection}>Add to Collection</button>}

      <h2>My Collection</h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px"
      }}>
        {collection.map((c) => (
          <CardTile key={c.id} card={c} onRemove={handleRemove}/>
        ))}
      </div>
    </div>
  );
}

export default App;
