export interface ClientSounds {
    block_sounds?: {
        [key: string]: Sound;
    };
    entity_sounds?: {
        [key: string]: Sound;
    };
    individual_event_sounds?: {
        [key: string]: Sound;
    };
    individual_named_sounds?: {
        [key: string]: Sound;
    };
    interactive_sounds?: {
        [key: string]: Sound;
    };
}

interface Sound {
    events: {
        [key: string]: SoundEvent|string;
    }
    pitch?: number|[number, number];
    volume?: number|[number, number];
}

interface SoundEvent {
    pitch?: number|[number, number];
    volume?: number|[number, number];
    sound: string;
}