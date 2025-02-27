export interface ClientSoundDefinitions {
    format_version: string;
    sound_definitions: {
        [key: string]: SoundDefinition;
    }
}

type SoundCategory = "ambient"|"block"|"bottle"|"bucket"|"hostile"|"music"|"neutral"|"player"|"record"|"ui"|"weather";

interface SoundDefinition {
    category: SoundCategory;
    max_distance?: number|null;
    min_distance?: number|null;
    __use_legacy_max_distance?: boolean|string;
    volume?: number;
    pitch?: number;
    sounds: ({
        name: string;
        volume?: number;
        pitch?: number;
        load_on_low_memory?: boolean;
    }|string)[];
}