import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks'
import Canvas from '../Canvas';

const CustomBrushes = ({ state, setImage, updateState }) => {
    const [activeCustomBrush, setActiveCustomBrush] = useState(null);

    return (
        <div class="flex">
            <Canvas w={150} 
                    h={150} 
                    setImage={setImage} 
                    mode={ state.mode }
                    brushThickness={ state.thickness } 
                    color={ state.color }
                    layers={ state.customBrushes.one.layers }
                    updateState={updateState}
                    isCustomBrush={true}
                />
                <Canvas w={150} 
                    h={150} 
                    offsetX={10}
                    offsetY={8}
                    setImage={setImage} 
                    mode={ state.mode }
                    brushThickness={ state.thickness } 
                    color={ state.color }
                    layers={ state.customBrushes.one.layers }
                    updateState={updateState}
                    isCustomBrush={true}
                />
            </div>
    );
}

export default CustomBrushes;
