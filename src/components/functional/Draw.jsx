import { h } from 'preact';
import { useState } from 'preact/hooks';
import { colors } from '../../const/colors.const'
import { modes } from '../../const/modes.const';
import MainCanvas from './MainCanvas'
import CustomBrushes from './CustomBrushes'
import Controls from './Controls'
import CustomBrushToo from './CustomBrushToo'
import Webcam from './Webcam'
import WebcamControls from './WebcamControls'
import Text from './Text'
import Piano from './Piano'

const Draw = () => {
    const [state, setState] = useState({
        trace: 0,
        color: colors.BLACK,
        mode: modes.BRUSH,
        thickness: 1,
        layers: [],
        lastDims: { width: 0, height: 0 },
        lastRot: 0,
        customBrushRaster: ``,
        customBrushes: {
            one: {
                layers: [],
            },
            two: {
                layers: [],
            },
            three: {
                layers: [],
            },
            four: {
                layers: [],
            },
            too: {
                layers: [],
            }
        }
    });

    const [lastDims, setLastDims] = useState({
        width: 0,
        height: 0
    })

    const updateState = (key, val) => {
        setState((prevState) => ({ ...prevState, [key]: val }))
    }

    const updateStateAndSetLastDims = async (key, val) => {
        updateState(key, val)
        const last = val[val.length - 1];
        const bounds = last.bounds;
        updateState(`lastDims`, { width: bounds.width, height: bounds.height });
    }

    const scaleLast = (e) => {
        e.preventDefault();
        const val = e.target.value;
        const layers = state.layers;

        const lastLayer = layers[layers.length - 1];
        if(!lastLayer) return;

        const scaleAmt = val * 0.02 + 0.01

        lastLayer.bounds.width = state.lastDims.width * scaleAmt;
        lastLayer.bounds.height = state.lastDims.height * scaleAmt;
    }

    const rotLast = (e) => {
        const val = parseInt(e.target.value);
        const layers = state.layers;

        const lastLayer = layers[layers.length - 1];
        if(!lastLayer) return;

        const diff = val -  state.lastRot;
        lastLayer.rotation = diff;
        updateState('lastRot', val)
    }

    const skewLast = (val) => {
        // console.log(val)
    }

    const setCustomBrush = (image) => {
        updateState(`customBrushRaster`, image)
    }

    return (
        <div class="container mx-auto">
            <div class="flex flex-wrap w-3/5">
                <div class="flex flex-wrap flex-col">
                    <MainCanvas state={state} updateState={updateStateAndSetLastDims} />
                    <div class="flex flex-wrap">
                        <Controls state={state}
                                  updateState={updateState} 
                                  scaleLast={scaleLast}
                                  rotLast={rotLast}
                                  skewLast={skewLast}
                        />
                    </div>
                </div>
                <div class="flex flex-wrap">
                    <CustomBrushes state={state} setImage={setCustomBrush} updateState={updateState}/>
                    <CustomBrushToo />
                </div>
            </div>
            <div class="flex flex-wrap">
                <Webcam />
                <WebcamControls />
                <Text />
            </div>
            <div class="flex flex-wrap">
                <Piano />
            </div>
        </div>
    )
};

export default Draw;
