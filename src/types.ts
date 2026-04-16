export interface Card {
    id: string
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