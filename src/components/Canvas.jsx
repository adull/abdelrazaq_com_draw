import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { modes } from '../const/modes.const';

import { paper } from 'paper'
import { findLayerFromMode, createLayerFromMode } from '../helpers/layer';
import { brushDraw, rectangleDraw, initBrush, initRectangle } from '../helpers/draw';

const Canvas = ({ w = 0, 
                  h = 0, 
                  offsetX = 0,
                  offsetY = 0, 
                  setImage, 
                  mode,
                  brushThickness,
                  color }) => {    

    const [layers, setLayers] = useState([]);
    const modeRef = useRef(mode);
    const layerRef = useRef(null);
    const canvasRef = useRef(null);
    const colorRef = useRef(color);
    const thicknessRef = useRef(brushThickness);

    useEffect(() => {
        colorRef.current = color;
        modeRef.current = mode
        thicknessRef.current = brushThickness; 
    }, [color, mode, brushThickness]);

    useEffect(() => {
        if (!canvasRef.current) return;

        paper.setup(canvasRef.current);
        const view = paper.view
        
        view.onMouseDown = ((event) => {
            const mode = modeRef.current;
            const layer = new paper.Group({ name: `${mode.name}__${layers.length}` });
            const point = event.point;
            
            const style = {
                strokeColor: colorRef.current,
                strokeWidth: thicknessRef.current
            }

            switch(mode.name) {    
                case modes.BRUSH.name:
                    initBrush({ layer, style });
                    break;
                case modes.RECTANGLE.name:
                    
                    initRectangle({ layer, point, style })
                    break;
                default:
                    console.log(`mousedown -- invalid mode name`)


            }
            layers.push(layer)

            
            
        })

        view.onMouseDrag = ((event) => {
            const mode = modeRef.current;

            const point = event.point;
            const layer = layers[layers.length - 1];
            const path = layer.children[0];

            switch(mode.name) {
                case modes.BRUSH.name:
                    brushDraw({ path, point })
                    break;
                case modes.RECTANGLE.name:
                    const style = {
                        strokeColor: colorRef.current,
                        strokeWidth: thicknessRef.current
                    }
                    rectangleDraw({ layer, path, style, point})
                    break;
                default: 
                    console.log(`drag -- no valid mode`)
                    
            }
            
            // const path = children[children.length - 1];
            // path.add(event.point);
        })

        return () => {
            view.onMouseDown = null;
            view.onMouseDrag = null;
        }
    }, [])

    return (
        <canvas id="paper"
            class="canvas"
            style= {{ 
              position: `relative`, 
              top: offsetX,
              left: offsetY, 
              width: w, 
              height: h 
            }}
            ref={canvasRef}
        >               
        </canvas>
    );
}


export default Canvas;
