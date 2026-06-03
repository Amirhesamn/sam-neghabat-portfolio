// Shared layout constants for the journey scene.
// The SVG is drawn in a coordinate space 720 units tall (width is responsive).
export const SCENE_H = 720;
export const GROUND_Y = 552; // the surface line — everything stands here (base y = 0 locally)

// parallax factors per layer (smaller = further away = moves slower)
export const FACTOR = {
  far: 0.3,
  mid: 0.6,
  fg: 1,
};

// where things sit on screen (as a fraction of the responsive viewBox width)
export const FRAC = {
  character: 0.3, // the character stands here
  building: 0.6, // building centre when its station is centred
  sign: 0.8, // roadside sign
};
