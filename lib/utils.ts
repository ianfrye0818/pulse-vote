import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function hexToRgb(hex: string) {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '');

  // Parse the r, g, b values
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  return [r, g, b];
}

function calculateLuminance(color: string) {
  let rgb;

  if (color.startsWith('#')) {
    rgb = hexToRgb(color);
  } else {
    const matched = color.match(/\d+/g);
    if (matched === null) {
      throw new Error(`Invalid color format: ${color}`);
    }
    rgb = matched.map(Number);
  }

  const [r, g, b] = rgb.map((value) => {
    value /= 255;
    return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function getContrastingTextColor(backgroundColor: string) {
  const luminance = calculateLuminance(backgroundColor);
  return luminance > 0.5 ? 'black' : 'white';
}
