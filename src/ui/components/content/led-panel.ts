import Simulator from '../simulator';
import {selectProps} from '../../../utils/props-selector';

const props = [
    'margin',
    'glow',
    'animated',
     {pixelSize: ['pixelWidth', 'pixelHeight']}
    ];

export default selectProps('ledStore')(...props)(Simulator);