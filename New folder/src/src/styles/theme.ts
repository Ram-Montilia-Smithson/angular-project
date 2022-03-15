import { ThemePalette } from '@angular/material/core';

export declare type Theme = 'dark'

export declare type Palette =
  | ThemePalette
  | 'paper'
  | 'default'
  | 'disable'
  | 'table'
  | 'text'
  | 'success'
  | 'successLight';

export type Color = { [color in Palette]: string };

export const palette: Color = {
  primary: '#37c566',
  accent: '#448ecd',
  warn: '#d83020',
  paper: '#fff',
  default: '#bababa',
  disable: ' rgba(0, 0, 0, 0.26)',
  table: '#F8F8F8',
  text: '#000000',
  success: '#59a437',
  successLight: '#E6F7EC',
};

