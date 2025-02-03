import { h } from 'preact';
import { useEffect } from 'preact/hooks'
import Canvas from '../Canvas';

const MainCanvas = ({ state, updateState }) => {
    useEffect(() => {
        console.log(state)
    }, [])
    const setImage = () => {
        
        console.log(`set image`)
    }
    return (
    <div>
       <Canvas w={ 700 } 
               h={354} 
               setImage={setImage} 
               mode={ state.mode }
               brushThickness={ 1 } 
               color={ state.color }
               layers={ state.layers }
        />
    </div>
    )
};

export default MainCanvas;
