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