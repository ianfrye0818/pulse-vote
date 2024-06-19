import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
function hexToRgb(hex: string) {
  if (!hex || typeof hex !== 'string') {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  hex = hex.replace(/^#/, '');

  if (hex.length !== 6 && hex.length !== 3) {
    throw new Error(`Invalid hex color length: ${hex}`);
  }

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  return [r, g, b];
}

function calculateLuminance(color: string) {
  if (!color || typeof color !== 'string') {
    throw new Error(`Invalid color: ${color}`);
  }

  let rgb = hexToRgb(color);

  const [r, g, b] = rgb.map((value) => {
    value /= 255;
    return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function getContrastingTextColor(backgroundColor: string) {
  if (!backgroundColor || typeof backgroundColor !== 'string') {
    throw new Error(`Invalid background color: ${backgroundColor}`);
  }

  const luminance = calculateLuminance(backgroundColor);
  return luminance > 0.5 ? 'black' : 'white';
}
