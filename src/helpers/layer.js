import { paper } from 'paper'
import { getAllSegments } from './group'

export const findLayerFromMode = (layers, mode) => {
    const layer = layers.find((item) => item.name === mode)
    return layer;
}

export const createLayerFromMode = (layers, mode) => {
    const layer = new paper.Group({ name: mode});
    layers.push(layer);
    return layers;
}

export const getSizeWithLayers = ({ layers }) => {
    const segments = getAllSegments(layers)

    const [xArr, yArr] = [segments.map(item => item._point._x), segments.map(item => item._point._y)]
    const [minX, maxX] = [Math.min(...xArr), Math.max(...xArr)]
    const [minY, maxY] = [Math.min(...yArr), Math.max(...yArr)]

    // console.log({minX, maxX, minY, maxY })

    // console.log({ xArr, yArr})
    console.log( {
        w: maxY - minY,
        h: maxX - minX
    })
    return {
        w: maxY - minY,
        h: maxX - minX
    }
}