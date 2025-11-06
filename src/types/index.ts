export interface Photo {
  id: string;
  url: string;
}

export interface Performance {
  id: string;
  name: string;
  date: string;
  photos: Photo[];
}
