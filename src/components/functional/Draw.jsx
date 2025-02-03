import { h } from 'preact';
import { useState } from 'preact/hooks';
import { colors } from '../../const/colors.const'
import MainCanvas from './MainCanvas'
import CustomBrushes from './CustomBrushes'
import Controls from './Controls'
import CustomBrushToo from './CustomBrushToo'
import Webcam from './Webcam'
import WebcamControls from './WebcamControls'
import Text from './Text'
import Piano from './Piano'

const Draw = () => {
    const [color, setColor] = useState(colors.BLACK)
    const [thickness, setThickness] = useState(1)

    // const setColor = (color) => {
    //     console.log({ color })
    // }
    return (
        <div class="container mx-auto">
            <div class="flex flex-wrap w-3/5">
                <div class="flex flex-wrap flex-col">
                    <MainCanvas color={color} thickness={thickness} />
                    <div class="flex flex-wrap">
                        <Controls colors={ colors } setColor={(color) => setColor(color)} />
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
