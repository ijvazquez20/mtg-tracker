import type { Card } from "../types";

// "props" are how you pass data INTO a component
// Think of them like parameters of a function
interface CardTileProps {
  card: Card;
  onRemove?: (id: string) => void;
}

function CardTile({ card, onRemove }: CardTileProps) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "16px", width: "300px", borderRadius: "8px" }}>
      {card.image_uris && <img src={card.image_uris.normal} alt={card.name} style={{ width: "100%", borderRadius: "14px" }} />}
      <h2>{card.name}</h2>
      {card.mana_cost && <p><strong>Mana Cost:</strong> {card.mana_cost}</p>}
      <p><strong>Type:</strong> {card.type_line}</p>
      {card.oracle_text && <p><strong>Text:</strong> {card.oracle_text}</p>}
      <p><strong>Rarity:</strong> {card.rarity}</p>
      <p><strong>Set:</strong> {card.set_name}</p>
      {onRemove && <button onClick={() => onRemove(card.id)}>Remove</button>}
    </div>
  );
}

export default CardTile;
