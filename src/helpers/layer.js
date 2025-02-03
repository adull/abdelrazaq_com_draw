import { paper } from 'paper'

export const findLayerFromMode = (layers, mode) => {
    const layer = layers.find((item) => item.name === mode)
    return layer;
}

export const createLayerFromMode = (layers, mode) => {
    const layer = new paper.Group({ name: mode});
    layers.push(layer);
    return layers;
}