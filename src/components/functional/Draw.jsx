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
        color: colors.BLACK,
        mode: modes.BRUSH,
        thickness: 1,
        layers: []
    });

    const updateState = (key, val) => {
        setState((prevState) => ({ ...prevState, [key]: val }))
    }

    return (
        <div class="container mx-auto">
            <div class="flex flex-wrap w-3/5">
                <div class="flex flex-wrap flex-col">
                    <MainCanvas state={state} updateState={updateState} />
                    <div class="flex flex-wrap">
                        <Controls state={state}
                                  updateState={updateState} 
                        />
                    </div>
                </div>
                <div class="flex flex-wrap">
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
