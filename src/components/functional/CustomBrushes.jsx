import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks'
import Canvas from '../Canvas';

const CustomBrushes = ({ state, setImage, updateState }) => {
    const [activeCustomBrush, setActiveCustomBrush] = useState(null);

    return (
        <div>
            <Canvas w={150} 
                    h={150} 
                    setImage={setImage} 
                    mode={ state.mode }
                    brushThickness={ state.thickness } 
                    color={ state.color }
                    layers={ state.customBrushes.one.layers }
                    updateState={updateState}
                />
            </div>
    );
}

export default CustomBrushes;
