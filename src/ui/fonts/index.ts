import { prepareFont } from '../../utils/led-matrix';
import * as AllFonts  from './allfonts';

let fonts = {};

Object.keys(AllFonts).forEach(key => {
    fonts[key] = prepareFont(AllFonts[key]);
});

export default fonts;