interface ratio{
    pxPerx: number;
    pxPery: number;
}

interface viewport{
    width: number;
    height: number;
    Scaling: ratio;
}

interface camera{
    originX: number;
    originY: number;
    Viewport: viewport;
}

export {camera, viewport, ratio}