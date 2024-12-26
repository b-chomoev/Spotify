export interface ILink {
    id: string;
    shortUrl: string;
    originalUrl: string;
}

export interface ILinkMutation {
    shortUrl: string;
    originalUrl: string;
}