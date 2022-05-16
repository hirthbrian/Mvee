export interface Actor {
  character: string;
  id: number;
  name: string;
  picture: string;
}

export interface Director {
  id: number;
  name: string;
}

export interface Writer {
  id: number;
  name: string;
}

export interface Video {
  id: string;
  name: string;
  thumbnail: string;
  url: string;
}

export interface MovieSimple {
  id: number;
  poster: string;
  title: string;
  year: string;
}

export interface Rating {
  Source: string;
  Value: string;
}

export interface MovieType {
  ratings: Array<Rating>;
  videos: Array<Video>;
  actors: Array<Actor>;
  similar: Array<MovieSimple>;
  synopsis: string;
  backdrop: string;
  title: string;
  poster: string;
  tagline: string;
  date: string;
  runtime: number;
  directors: Array<Director>;
  writers: Array<Writer>;
}
