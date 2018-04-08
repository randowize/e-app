'use strict';

let supportsCSSText = getComputedStyle(document.body).cssText !== '';

function copyCSS(elem, origElem, log = 0) {
  let computedStyle = getComputedStyle(origElem);

  if (supportsCSSText) {
    elem.style.cssText = computedStyle.cssText;
  } else {
    // Really, Firefox?
    for (let prop in computedStyle) {
      if (
        isNaN(parseInt(prop, 10)) &&
        typeof computedStyle[prop] !== 'function' &&
        !/^(cssText|length|parentRule)$/.test(prop)
      ) {
        elem.style[prop] = computedStyle[prop];
      }
    }
  }
}

function inlineStyles(elem, origElem) {
  let children = elem.querySelectorAll('*');
  let origChildren = origElem.querySelectorAll('*');

  // copy the current style to the clone
  copyCSS(elem, origElem, 1);

  // collect all nodes within the element, copy the current style to the clone
  Array.prototype.forEach.call(children, function(child, i) {
    copyCSS(child, origChildren[i]);
  });

  // strip margins from the outer element
  elem.style.margin = elem.style.marginLeft = elem.style.marginTop = elem.style.marginBottom = elem.style.marginRight =
    '';
}
type IMGBLOB = {
  src;
  blob;
};

const canvas: HTMLCanvasElement = document.createElement('canvas');
const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');

const StylesTime = 'styles computation';

export const domvas = {
  _toImage: function(origElem, callback, width?, height?, left?, top?) {
    left = left || 0;
    top = top || 0;

    let elem = origElem.cloneNode(true);

    // inline all CSS (ugh..)
    console.time(StylesTime);
    inlineStyles(elem, origElem);
    console.timeEnd(StylesTime);
    // unfortunately, SVG can only eat well formed XHTML
    elem.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');

    width = (width || origElem.offsetWidth) + left;
    height = (height || origElem.offsetHeight) + top;

    // serialize the DOM node to a String
    let serialized = new XMLSerializer().serializeToString(elem);

    canvas.width = width;
    canvas.height = height;

    // Create well formed data URL with our DOM string wrapped in SVG
    let dataUri =
      'data:image/svg+xml,' +
      "<svg xmlns='http://www.w3.org/2000/svg' width='" +
      width +
      "' height='" +
      height +
      "'>" +
      "<foreignObject width='100%' height='100%' x='" +
      left +
      "' y='" +
      top +
      "'>" +
      serialized +
      '</foreignObject>' +
      '</svg>';

    // create new, actual image
    let img = new Image();
    img.src = dataUri;

    // when loaded, fire onload callback with actual image node
    img.onload = function() {
      if (callback) {
        callback.call(this, this);
      }
    };
  },
  toImage(origElem, width?, height?, left?, top?) {
    return new Promise<IMGBLOB>(res => {
      this._toImage(
        origElem,
        async (img: HTMLImageElement) => {
          ctx.drawImage(img, 0, 0);
          const blobResponse = await fetch(canvas.toDataURL());

          const blob = await blobResponse.blob();
          console.time('toblob');
          const src = URL.createObjectURL(blob);
          console.timeEnd('toblob');
          res({ src, blob });
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        },
        width,
        height,
        left,
        top
      );
    });
  }
};

export function convertBlobToDataURI(blob: Blob) {
  const reader = new FileReader();
  return new Promise(res => {
    if (!!!blob) return res('');
    reader.readAsDataURL(blob);
    reader.onloadend = function() {
      res(reader.result);
    };
    reader.onload = ev => {
      console.log(ev);
    };
  });
}
