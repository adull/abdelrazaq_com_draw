import { paper } from 'paper'

export const initBrush = ({ scope, layer, style }) => {
    // console.log({ scope })
    // scope.activate();
    const path = new paper.Path({
        strokeColor: style.strokeColor,
        strokeWidth: style.strokeWidth
    })
    layer.addChild(path)
    console.log({ layer })
}
export const brushDraw = ({ scope, path, point }) => {
    if(!path) return;
    path.add(point);
}

export const initRectangle = ({ project, layer, style, point }) => {
    const rectangle = new project.Rectangle(point.x, point.y, 0, 0);
    const rectPath = new project.Path.Rectangle(rectangle)
    rectPath.strokeColor = style.strokeColor;
    rectPath.strokeWidth = style.strokeWidth;
    rectPath.data.origin = point;
    layer.addChild(rectPath)
}

export const initCustomBrush = ({ layer, customBrush }) => {
    console.log({ customBrush })
}

export const customBrushDraw = ({ layer, customBrush, point }) => {
    console.log({ size: customBrush.size })
    console.log(layer)
    const raster = new paper.Raster({
        source: customBrush.raster,
        // position: point,
        // size: customBrush.size
    })
    raster.position.x = point.x;
    raster.position.y = point.y;
    const size = new paper.Size(customBrush.size.w, customBrush.size.h)
    // console.log({ size })
    raster.size = size;
    // console.log({ raster})
    layer.addChild(raster)
}

export const rectangleDraw = ({ layer, path, style, point}) => {
    if(!path) return;

    const origin = path.data.origin;

    path.remove();

    const newRectangle = new paper.Rectangle(
        origin.x, origin.y,
        point.x - origin.x,
        point.y - origin.y
    )

    const newPath = new paper.Path.Rectangle(newRectangle);
    newPath.strokeColor = style.strokeColor;
    newPath.strokeWidth = style.strokeWidth;
    newPath.data.origin = origin;

    layer.addChild(newPath);
}