export interface Skins {
	serialize_name: string;
	localization_name: string;
	skins: Skin[];
}

interface Skin {
    localization_name: string;
    geometry: string;
    texture: string;
    type: "free" | "paid";
}