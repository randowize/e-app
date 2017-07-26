interface IPFont {
  name: string;
  psize: number;
  minsize?: number;
}
export const PreferredFonts: IPFont[] = [
  {
    name: 'Monospace',
    psize: 90,
    minsize: 60
  }
];