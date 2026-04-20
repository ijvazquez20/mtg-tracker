export interface Card {
    id: string;
    name: string;
    mana_cost?: string; // Lands don't have mana costs
    type_line: string;
    oracle_text?: string; // Some cards lack text
    rarity: string;
    set_name: string;
    image_uris?: { // Double-faced cards handle images differently
        normal: string;
    };
}
