export interface Artist {
    _id: string;
    name: string;
    description: string;
    image: string | null;
}

export interface Album {
    _id: string;
    artist: string;
    date: number;
    image: string | null;
}

export interface Track {
    _id: string;
    album: string;
    duration: string;
}

export interface UserField {
    username: string;
    password: string;
    token: string;
}

export interface TrackHistory {
    _id: string;
    track: string;
    datetime: string;
}