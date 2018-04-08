export  { baseObservable, dispatch } from './base-observable';

import  { baseObservable, dispatch } from './base-observable';

export const debugStream$ = baseObservable.filter(m => m.type === 'debug');

export const processImageStream$ = baseObservable.filter(
  m => m.type === 'process-img'
);

export const refreshPreview$ = baseObservable
  .filter(o => o.type === 'refresh-preview')
  .map(o => ({ type: o.type,  data: o.data[0] }));

export const togglePreviewStream$ = baseObservable.filter(
  m => m.type === 'toggle-preview'
);

export const editorStateChange$ = baseObservable.filter(
  o => o.type === 'editor-state-change'
);

export const rasterizedContent$ = baseObservable.filter(
  o => o.type === 'rasterized-content'
);

export const areaCapture$ = baseObservable
  .filter(o => o.type === 'capture-area')
  .map(o => ({ type: o.type, rect: o.data[0] }));

export const dispatchRefreshPreview = dispatch('refresh-preview');

