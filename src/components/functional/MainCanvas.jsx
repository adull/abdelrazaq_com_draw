import { h } from 'preact';
import { useEffect } from 'preact/hooks'
import Canvas from '../Canvas';

const MainCanvas = ({ state, updateState }) => {
    useEffect(() => {
        console.log(state)
    }, [state])
    const setCustomBrush = (raster) => {
        
        console.log(`set image`)
    }
    return (
    <div>
       <Canvas w={ 700 } 
               h={354} 
               setCustomBrush={setCustomBrush} 
               customBrushGroup={state.customBrushGroup}
               mode={ state.mode }
               brushThickness={ state.thickness } 
               color={ state.color }
               layers={ state.layers }
               updateState={updateState}
               isCustomBrush={false}
        />
    </div>
    )
};

export default MainCanvas;
