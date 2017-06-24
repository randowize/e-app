import { observable, computed, action, reaction } from 'mobx';
import {groupBy} from 'lodash';
import {
  extractPanel,
  initializeGrouping,
  scaledExtraction,
  extractBytesColumn,
  extractByte,
  extractBlockOfFourBytes
} from '../../utils';
import allfonts from '../fonts';
import { LedDrawerManager } from '../../utils/led-matrix/led/store';
import { selectImage } from '../../utils/electron';
import { getRGBA } from '../../utils/led-matrix/led/color';

// let satir_1 = [12, 8, 4, 0, 13, 9, 5, 1, 14, 10, 6, 2, 15, 11, 7, 3];

class LedStore {
  //body
  lines = [
    '',
    ' "horizontal length": 5 ->',
    '',
    '  React is >>> Angular',
    '',
    ' "vertical length": 4'
  ];
  @observable text: string = this.lines.join('\n');
  @observable activeFont: string = 'fivebyfive';
  @observable rowScale: number = 2; // should be 4;
  @observable colScale: number = 2; // should be 5
  @observable color: string = '#0feffe';
  @observable margin: number = 1;
  @observable glow: boolean = false;
  @observable animated: boolean = false;
  @observable pixelWidth: number = 10;
  @observable pixelHeight: number = 10;
  @observable pixelSize: number = 10;
  @observable matrix: any = [];
  @observable matrixP: any = [];

  private drawerManager: LedDrawerManager;

  constructor() {
    this.drawerManager = new LedDrawerManager(this.cols, this.rows);
    this.paint();
    this.matrix = this.drawerManager.matrix;
    reaction(this.selectFields, this.repaint, { context: this });
  }

  private selectFields = () => ({
    rowScale: this.rowScale,
    colScale: this.colScale,
    activeFont: this.activeFont,
    margin: this.margin,
    pixelWidth: this.pixelWidth,
    pixelHeight: this.pixelHeight,
    color: this.color,
    glow: this.glow,
    pixelSize: this.pixelSize,
    animated: this.animated,
    text: this.text
  })

  private repaint = (values: any) => {
    this.drawerManager = new LedDrawerManager(this.cols, this.rows);
    this.paint();
  }

  private paint = () => {
    this.drawerManager.fillScreen(null);
    this.drawerManager.write(
      this.filteredText,
      allfonts[this.activeFont],
      this.color
    );
    // this.drawerManager.refresh();
    this.matrix = this.drawerManager.matrix;
  }

  @computed
  get filteredText() {
    // keep ascii codes 0 - 127
    return this.text.replace(/[^\x00-\x7F]/g, '');
  }
  @action setText = (text: string) => {
    this.text = text;
  }

  @action toggleGlow = () => {
    this.glow = !this.glow;
  }

  @action toggleAnimation = () => {
    this.animated = !this.animated;
  }

  @action setMargin = (margin: number) => {
    this.margin = margin;
  }
  @action increasePixelWidth = () => {
    this.pixelWidth += 1;
  }

  @action setPixelSize = (size: number) => {
    this.pixelSize = size;
  }
  @action propModifier = (propName: string) => (ds: number) => () => {
    this[propName] += ds;
  }

  @action setFont = (fontInfo: any) => (this.activeFont = fontInfo.value);

  @action setRowScale = (rowScale: number) => {
    this.rowScale = rowScale;
  }

  @action setColScale = (colScale: number) => {
    this.colScale = colScale;
  }

  @action setColor = (color: any) => {
    this.color = color.hex;
  }

  @action choosePic = async () => {
    try {
      const data: any = await selectImage();
      this.colScale = data.width / 32;
      this.rowScale = data.height / 16;
      this.matrix = data.matrix.map(o => ({
        ...o,
        color: getRGBA(this.color)
      }));
      this.getMatrices();
    } catch (e) {
      console.log(e);
    }
  }

  @computed
  get fontOptions() {
    const keys = Object.keys(allfonts);
    const result: any[] = [];
    return keys.reduce((acc, key) => {
      acc.push({ value: key, label: key, className: 'option' });
      return acc;
    }, result);
  }
  @computed
  get cols() {
    return this.colScale * 32;
  }
  @computed
  get rows() {
    return this.rowScale * 16;
  }
  @computed
  get data() {
    return this.matrix;
  }
  @computed
  get dataP() {
    return this.matrixP;
  }

  /** utils for panel extraction */

  getPanelAt = (x: number, y: number) => {
    const matrixXY = extractPanel(this.colScale)(x, y)(
      // this.drawerManager.matrix
      this.matrix
    );

    const matrixXYBits = matrixXY.map(o => (o.on ? 0 : 1));
    const columns = groupBy(matrixXYBits, initializeGrouping(0)(this.cols));

    return Object.keys(columns).map(key => {
      //return columns[key].reduce((acc, bit) => 2 * acc + bit, 0);
      return parseInt(columns[key].join(''), 2);
    });
  }

  getLedMatrixHex = (x, y) => {
    return this.getPanelAt(x, y).map(code => code.toString(16)).map(hex => {
      return hex.length < 4
        ? `0x${'0'.repeat(4 - hex.length)}${hex}`
        : `0x${hex}`;
    });
  }

  /** new utils for panels extraction */
  @action getPanelsAtRow = (rowNum: number) => {
    let matrix = scaledExtraction(this.colScale)(1)(1, rowNum)(
      //this.drawerManager.matrix
      this.matrix
    );
    this.xm = Math.floor(Math.random() * this.colScale) + 1;
    this.ym = Math.floor(Math.random() * this.rowScale) + 1;
    const col = Math.floor(Math.random() * 4) + 1;
    const columns = this.getPanel(1, matrix);
    this.onePanel = [...columns];
    this.matrixP = [...columns[col - 1]];
    return matrix;
  }
  @observable xm: number = 0;
  @observable ym: number = 0;
  @observable onePanel: any[] = [];

  getPanel = (num: number, matrix: any[]) => {
    const columns: any[] = [];
    const panel = extractPanel(this.colScale)(num, 1)(matrix);
    for (let i = 1; i <= 4; i++) {
      columns.push(extractBytesColumn(i, 1)(panel));
    }
    // this.splitPanel(columns);
    return columns;
  }
  splitPanel = (panel: any[]) => {
    // let temp = [...panel].reverse();
    let temp = [...panel];
    let res: any[] = [];
    temp.forEach((arr, ind) => {
      for (let i = 1; i <= 4; i++) {
        res.push(extractBlockOfFourBytes(1, i)(arr));
      }
    });
    const _finalResult = res.map(v => {
      const r: any[] = [];
      for (let i = 1; i <= 4; i++) {
        r.push(extractByte(1, i)(v));
      }
      return (
        r
          .map(arr => arr.map(o => (o.on ? 0 : 1)))
          .map(o => {
            return o;
          })
          //.map(o => weirdConversion(o));
          .map(o => parseInt(o.reverse().join(''), 2))
      );
    });
    // console.log(_finalResult);
    return _finalResult;
  }
  @action getMatrices = () => {
    const result: any = {};
    let panels: any[], panel: any[];
    const rowScale = this.rowScale;
    const colScale = this.colScale;
    for (let i = 1; i <= rowScale; i++) {
      result[rowScale] = {};
      panels = this.getPanelsAtRow(rowScale);
      for (let j = 1; j <= colScale; j++) {
        panel = this.splitPanel(this.getPanel(j, panels));
        result[rowScale][j] = {
          1: [],
          2: [],
          3: [],
          4: []
        };
        for (let block_num = 0; block_num < panel.length; block_num++) {
          let block = panel[block_num];
          for (let t = 0; t < block.length; t++) {
            result[rowScale][j][t + 1].push(block[t]);
          }
        }
      }
    }
    console.log(result);
    return result;
  }

}

export default LedStore;
