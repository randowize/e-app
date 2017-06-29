import {requireTaskPool} from 'electron-remote';

const Tasks = requireTaskPool(require.resolve('../tasks/image-processing.ts'));

export default  Tasks;
