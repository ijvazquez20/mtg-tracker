// We first define the shape of the data this component expects to receive
interface Card {
  name: string;
  mana_cost: string;
  type_line: string;
  oracle_text: string;
  rarity: string;
  set_name: string;
  image_uris: {
    normal: string;
  };
}

// "props" are how you pass data INTO a component
// Think of them like parameters of a function
interface CardTileProps {
  card: Card;
}

function CardTile({ card }: CardTileProps) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "16px", width: "300px", borderRadius: "8px" }}>
      <img src={card.image_uris.normal} alt={card.name} style={{ width: "100%", borderRadius: "14px"}} />
      <h2>{card.name}</h2>
      <p><strong>Mana Cost:</strong> {card.mana_cost}</p>
      <p><strong>Type:</strong> {card.type_line}</p>
      <p><strong>Text:</strong> {card.oracle_text}</p>
      <p><strong>Rarity:</strong> {card.rarity}</p>
      <p><strong>Set:</strong> {card.set_name}</p>
    </div>
  );
}

export default CardTile;