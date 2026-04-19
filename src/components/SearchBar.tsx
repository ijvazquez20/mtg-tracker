import { useState } from "react";
import type { Card } from "../types";
import CardTile from "./CardTile";



interface SearchBarProps {
  onCardFound: (card: Card) => void;
}

function SearchBar({ onCardFound }: SearchBarProps) {

  const [card, setCard] = useState<Card | null>(null);
  const [searchText, setSearchText] = useState("");
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
    <div>
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Type a card name..."
      />
      <button onClick={handleSearch}>Search</button>
      {card && <CardTile card={card} />}
      {card && <button onClick={() => {
        onCardFound(card);
        setCard(null);
        setSearchText("");
        }}>Add to Collection</button>}

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  )
}

export default SearchBar;



