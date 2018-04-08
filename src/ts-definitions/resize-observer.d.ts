declare class ResizeObserver {
    constructor(callback: ResizeObserverCallback);
    observe(target: Element): void;
    unobserve(target: Element): void;
    disconnect(): void;
}

declare interface ResizeObserverCallback {
    (entries: ResizeObserverEntry[], observer: ResizeObserver): void;
}

declare class ResizeObserverEntry {
    constructor(target: Element);
    target: Element;
    clientWidth: number;
    clientHeight: number;
    readonly contentRect: DOMRectReadOnly;
}

interface DOMRectReadOnly {
    // abstract static fromRect(other: DOMRectInit | undefined): DOMRectReadOnly;
  
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    readonly top: number;
    readonly right: number;
    readonly bottom: number;
    readonly left: number;
  
    toJSON: () => any;
  }