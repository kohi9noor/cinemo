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

export const getRandomGradient = (seed?: string): string => {
  const gradients = [
    "linear-gradient(135deg, rgba(168, 213, 186, 0.25) 0%, rgba(184, 224, 210, 0.12) 100%)", // Mint to Seafoam
    "linear-gradient(135deg, rgba(244, 194, 194, 0.25) 0%, rgba(255, 211, 182, 0.12) 100%)", // Rose to Peach
    "linear-gradient(135deg, rgba(201, 169, 227, 0.25) 0%, rgba(180, 167, 214, 0.12) 100%)", // Lavender to Purple
    "linear-gradient(135deg, rgba(168, 218, 220, 0.25) 0%, rgba(190, 217, 228, 0.12) 100%)", // Powder to Sky Blue
    "linear-gradient(135deg, rgba(241, 227, 196, 0.25) 0%, rgba(232, 213, 183, 0.12) 100%)", // Cream to Sand
    "linear-gradient(135deg, rgba(255, 181, 167, 0.25) 0%, rgba(246, 189, 96, 0.12) 100%)", // Salmon to Golden
    "linear-gradient(135deg, rgba(197, 227, 191, 0.25) 0%, rgba(176, 217, 209, 0.12) 100%)", // Pale Green to Teal
    "linear-gradient(135deg, rgba(255, 170, 165, 0.25) 0%, rgba(212, 165, 165, 0.12) 100%)", // Coral to Dusty Rose
    "linear-gradient(135deg, rgba(214, 234, 223, 0.25) 0%, rgba(168, 213, 186, 0.12) 100%)", // Sage to Mint
    "linear-gradient(135deg, rgba(255, 214, 186, 0.25) 0%, rgba(255, 181, 167, 0.12) 100%)", // Apricot to Salmon
  ];

  if (seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    return gradients[Math.abs(hash) % gradients.length];
  }

  return gradients[Math.floor(Math.random() * gradients.length)];
};

export const colorToGradient = (color: string): string => {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const lighter = (c: number, factor: number) =>
    Math.min(255, Math.floor(c + (255 - c) * factor));

  const r2 = lighter(r, 0.3);
  const g2 = lighter(g, 0.3);
  const b2 = lighter(b, 0.3);

  return `linear-gradient(135deg, rgba(${r}, ${g}, ${b}, 0.25) 0%, rgba(${r2}, ${g2}, ${b2}, 0.12) 100%)`;
};
