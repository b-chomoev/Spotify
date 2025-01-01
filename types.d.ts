export interface Artist {
    _id: string;
    name: string;
    description: string;
    image: string | null;
}

export interface Album {
    _id: string;
    artistId: string;
    date: string;
    image: string | null;
}

export interface Track {
    _id: string;
    albumId: string;
    duration: string;
}