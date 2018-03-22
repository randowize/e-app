const fonts = [
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Times',
  'Courier New',
  'Courier',
  'Verdana',
  'Georgia',
  'Palatino',
  'Garamond',
  'Comic Sans MS',
  'Trebuchet MS',
  'Impact',
  'Palatino Linotype',
  'Book Antiqua',
  'monospace',
  'Arial Black',
  'Gadget',
  'Charcoal',
  'Lucida Sans Unicode',
  'Lucida Grande',
  'Tahoma', 'Geneva',
  'Lucida Console',
  'Monaco',
  'monospace'
].map( f => `${f.charAt(0).toUpperCase()}${f.substr(1)}`)
.sort();
export default fonts;
