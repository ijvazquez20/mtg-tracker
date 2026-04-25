import { useState, useEffect, useRef } from "react";
import CardTile from "./components/CardTile";
import SearchBar from "./components/SearchBar";
import type { Card, CollectionCard } from "./types";


function App() {
  const [card, setCard] = useState<Card | null>(null);
  const [collection, setCollection] = useState<CollectionCard[]>([]);
  const isFirstRender = useRef(true);

  // Loads the collection
  useEffect(() => {
    const saved = localStorage.getItem("mtg-collection");
    if (saved) {
        setCollection(JSON.parse(saved));
    }
  }, []);

  // Saves the collection
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    localStorage.setItem("mtg-collection", JSON.stringify(collection));
  }, [collection])

  function handleCardFound(foundCard: Card | null) {
    setCard(foundCard);
  }

  function handleAddToCollection() {
    if (card === null) {
      return;
    }

    const existingCard = collection.find((c) => c.id === card.id);
    if (existingCard) {
      setCollection(collection.map((c) => {
        if (c.id === card.id) {
          const newCard = {...c, quantity: c.quantity + 1};
          return newCard;
        } else {
        return c;
        }
      }))
    } else {
        const newCard = {...card, quantity: 1};
        setCollection([...collection, newCard]);
    }

    setCard(null);
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
          <CardTile key={c.id} card={c} onRemove={handleRemove} quantity={c.quantity}/>
        ))}
      </div>
    </div>
  );
}

export default App;
