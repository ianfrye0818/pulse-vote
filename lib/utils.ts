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
  backgroundColor = backgroundColor.trim().toUpperCase();
  if (!backgroundColor || typeof backgroundColor !== 'string') {
    throw new Error(`Invalid background color: ${backgroundColor}`);
  }

  const luminance = calculateLuminance(backgroundColor);
  return luminance > 0.5 ? 'black' : 'white';
}

export function generateAccessCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  const codeLength = 4;

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  return code;
}

export function calculateHeight(percentage: number) {
  const maxHeight = 400;
  return `${(percentage / 100) * maxHeight}px`;
}

export function setRandomNonWhiteBackgroundColor() {
  let randomColor;

  do {
    randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  } while (isTooLight(randomColor));

  return randomColor;
}

export function isTooLight(color: string) {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 200; // Adjust this threshold as needed
}
