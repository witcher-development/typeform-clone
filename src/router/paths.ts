type PathParam = string;


type HomePagePath = '/home';
type GamePagePath = `/game/${PathParam}`;

export type Paths = HomePagePath | GamePagePath;
