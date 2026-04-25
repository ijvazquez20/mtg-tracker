import { useState } from "react";
import type { Card } from "../types";



interface SearchBarProps {
  onCardFound: (card: Card | Card[]) => void;
}

function SearchBar({ onCardFound }: SearchBarProps) {

  const [searchText, setSearchText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSearch() {
    setErrorMessage("");

    const response = await fetch(
      `https://api.scryfall.com/cards/named?fuzzy=${searchText}`
    );

    if (!response.ok) {
      const searchResponse = await fetch(
        `https://api.scryfall.com/cards/search?q=${searchText}`
      );

      if (!searchResponse.ok){
        setErrorMessage("Card not found. Please try another name.");
        return;
      }

      const searchData = await searchResponse.json();
      onCardFound(searchData.data)
      return;
    }

    const data = await response.json();
    if (data.object === "card") {
      onCardFound(data);
    } else {
      console.log(data)
    }
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
