// src/utils/colorExtractor.ts

export type RGBColor = {
  r: number;
  g: number;
  b: number;
};

export type ExtractedColor = {
  rgb: RGBColor;
  hex: string;
};

/**
 * Convert RGB → HEX
 */
function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")
  );
}

/**
 * Simple color distance (Euclidean)
 */
function colorDistance(a: RGBColor, b: RGBColor): number {
  return Math.sqrt(
    Math.pow(a.r - b.r, 2) +
    Math.pow(a.g - b.g, 2) +
    Math.pow(a.b - b.b, 2)
  );
}

/**
 * Extract 4 dominant colors from an image
 */
export async function extractColorsFromImage(
  imageSrc: string,
  colorCount: number = 4
): Promise<ExtractedColor[]> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject("Canvas not supported");
        return;
      }

      // Resize for performance
      const MAX_SIZE = 200;
      const scale = Math.min(
        MAX_SIZE / img.width,
        MAX_SIZE / img.height,
        1
      );

      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      ).data;

      const pixels: RGBColor[] = [];

      // Collect pixels (skip transparent & near-white)
      for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const a = imageData[i + 3];

        if (a < 125) continue;
        if (r > 245 && g > 245 && b > 245) continue;

        pixels.push({ r, g, b });
      }

      if (pixels.length === 0) {
        resolve([]);
        return;
      }

      // Simple clustering
      const clusters: RGBColor[] = [];

      pixels.forEach((pixel) => {
        let matched = false;

        for (const cluster of clusters) {
          if (colorDistance(pixel, cluster) < 40) {
            cluster.r = Math.round((cluster.r + pixel.r) / 2);
            cluster.g = Math.round((cluster.g + pixel.g) / 2);
            cluster.b = Math.round((cluster.b + pixel.b) / 2);
            matched = true;
            break;
          }
        }

        if (!matched && clusters.length < colorCount * 3) {
          clusters.push({ ...pixel });
        }
      });

      const finalColors = clusters
        .slice(0, colorCount)
        .map((c) => ({
          rgb: c,
          hex: rgbToHex(c.r, c.g, c.b),
        }));

      resolve(finalColors);
    };

    img.onerror = () => reject("Failed to load image");
  });
}
