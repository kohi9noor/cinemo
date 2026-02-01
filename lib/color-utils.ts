export const getRandomLightColor = (seed?: string): string => {
  const colors = [
    "#A8D5BA", // Soft Mint
    "#B8E0D2", // Seafoam
    "#D6EADF", // Pale Sage
    "#F4C2C2", // Soft Rose
    "#FFD3B6", // Peach
    "#FFAAA5", // Coral
    "#C9A9E3", // Lavender
    "#B4A7D6", // Soft Purple
    "#A8DADC", // Powder Blue
    "#BED9E4", // Sky Blue
    "#F1E3C4", // Cream
    "#E8D5B7", // Sand
    "#FFB5A7", // Salmon
    "#F6BD60", // Golden
    "#FFD6BA", // Apricot
    "#D4A5A5", // Dusty Rose
    "#C5E3BF", // Pale Green
    "#B0D9D1", // Teal
  ];

  if (seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }

  return colors[Math.floor(Math.random() * colors.length)];
};

export const getLighterShade = (color: string): string => {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const lighter = (c: number) => Math.min(255, Math.floor(c + (255 - c) * 0.2));

  const newR = lighter(r).toString(16).padStart(2, "0");
  const newG = lighter(g).toString(16).padStart(2, "0");
  const newB = lighter(b).toString(16).padStart(2, "0");

  return `#${newR}${newG}${newB}`;
};
