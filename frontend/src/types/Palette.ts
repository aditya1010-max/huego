
export interface Color {
  hex: string;
}

export interface Palette {
  filter(arg0: (p: unknown) => boolean): unknown;
  _id: string;
  name: string;
  colors: Color[];
  likes: number;
  likedBy: string[]; 
  category: string;
  createdAt: string;
  updatedAt: string;
}

