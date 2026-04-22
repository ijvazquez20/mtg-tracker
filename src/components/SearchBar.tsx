import { useState } from "react";
import type { Card } from "../types";



interface SearchBarProps {
  onCardFound: (card: Card) => void;
}

function SearchBar({ onCardFound }: SearchBarProps) {

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

    const data: Card = await response.json();
    onCardFound(data);
    setSearchText("");
  }

  return (
    <div>
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Type a card name..."
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button onClick={handleSearch}>Search</button>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  )
}

export default SearchBar;
