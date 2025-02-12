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
    console.log(layers )
    const segments = getAllSegments(layers)

    console.log({ segments })

    const xArr = segments.map(item => item._point._x);
    const yArr = segments.map(item => item._point._y);

    const minX = Math.min(...xArr);
    const maxX = Math.max(...xArr);

    const minY = Math.min(...yArr);
    const maxY = Math.max(...yArr);

    console.log({minX, maxX, minY, maxY })

    console.log({ xArr, yArr})
    // console.log(view)
    // const bruh = view.getContext();
    // console.log({ bruh })
    console.log( {
        w: maxY - minY,
        h: maxX - minX
    })
    return {
        w: maxY - minY,
        h: maxX - minX
    }
}