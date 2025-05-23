import WebFont from 'webfontloader';

export function loadFont(fontFamily: string) {
  WebFont.load({
    google: {
      families: [fontFamily],
    },
  });
}
