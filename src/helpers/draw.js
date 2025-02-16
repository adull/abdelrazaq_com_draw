import { paper } from 'paper'

export const initBrush = ({ scope, layer, style }) => {
    const path = new paper.Path({
        strokeColor: style.strokeColor,
        strokeWidth: style.strokeWidth
    })
    layer.addChild(path)
}
export const brushDraw = ({ path, point }) => {
    if(!path) return;
    path.add(point);
}

export const initRectangle = ({ layer, style, point }) => {
    const rectangle = new paper.Path.Rectangle(point.x, point.y, 0, 0);
    const rectPath = new paper.Path.Rectangle(rectangle)
    rectPath.strokeColor = style.strokeColor;
    rectPath.strokeWidth = style.strokeWidth;
    rectPath.data.origin = point;
    layer.addChild(rectPath)
}

export const initCustomBrush = ({ layer, customBrush, point }) => {
    layer.addChild(customBrush);
    customBrush.position = point;
    
}

export const customBrushDraw = ({ layer, customBrush, point }) => {
    // console.log(point)
    // console.log({customBrush})
    // layer.addChild(customBrush);
    // customBrush.position = point;
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