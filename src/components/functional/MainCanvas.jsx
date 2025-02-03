import { h } from 'preact';
import { useEffect } from 'preact/hooks'
import Canvas from '../Canvas';
import { mode } from '../../const/mode.const';

const MainCanvas = ({ color, brushThickness}) => {
    useEffect(() => {
        console.log({ b: mode.BRUSH })
    }, [])
    const setImage = () => {
        
        console.log(`set image`)
    }
    return (
    <div>
       <Canvas w={ 700 } 
               h={354} 
               setImage={setImage} 
               m={ mode.BRUSH }
               brushThickness={ 1 } 
               color={ color }
        />
    </div>
    )
};

export default MainCanvas;
