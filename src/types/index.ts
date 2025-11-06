export interface Photo {
  id: string;
  url: string;
  thumbnailUrl: string;
}

export interface Performance {
  id: string;
  name: string;
  date: string;
  photos: Photo[];
}
