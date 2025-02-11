import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { modes } from '../const/modes.const';

import { paper } from 'paper'
import { findLayerFromMode, createLayerFromMode } from '../helpers/layer';
import { brushDraw, 
         rectangleDraw, 
         initBrush, 
         initRectangle, 
         initCustomBrush 
       } from '../helpers/draw';

const Canvas = ({ w = 0, 
                  h = 0, 
                  offsetX = 0,
                  offsetY = 0, 
                  setImage, 
                  mode,
                  brushThickness,
                  color,
                  updateState,
                  isCustomBrush=false }) => {    

    const randomId = () => Math.random().toString(36).slice(2, 8);

    const [layers, setLayers] = useState([]);
    const modeRef = useRef(mode);
    const layerRef = useRef(null);
    const canvasRef = useRef(null);
    const paperScopeRef = useRef(null);
    const colorRef = useRef(color);
    const thicknessRef = useRef(brushThickness);

    const canvasId = useRef(`paper-${randomId()}`);

    useEffect(() => {
        colorRef.current = color;
        modeRef.current = mode
        thicknessRef.current = brushThickness; 
    }, [color, mode, brushThickness]);

    useEffect(() => {
        if (!canvasRef.current) return;

        const scope = new paper.PaperScope(canvasId);
        paperScopeRef.current = scope;

        scope.setup(canvasRef.current);
        const { view, project } = scope;
        
        view.onMouseDown = ((event) => {
            scope.activate();
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
                    initRectangle({ project, layer, point, style })
                    break;
                case modes.CUSTOM_BRUSH.name:
                    initCustomBrush({ layer, image });
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
                    rectangleDraw({ layer, path, style, point })
                    break;
                default: 
                    console.log(`drag -- no valid mode`)
                    
            }
        });

        view.onMouseUp = ((event) => {
            console.log({ layers })
            updateState(`layers`, layers)
            if(isCustomBrush) {
                const raster = view.element.toDataURL();
                console.log(setImage)
                setImage(raster);
            }
        })

        return () => {
            view.onMouseDown = null;
            view.onMouseDrag = null;
        }
    }, [])

    return (
        <canvas id={canvasId.current}
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
