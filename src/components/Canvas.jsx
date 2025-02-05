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

    const [layers, setLayers] = useState([]);
    const modeRef = useRef(mode);
    const layerRef = useRef(null);
    const canvasRef = useRef(null);
    const paperScopeRef = useRef(null);
    const colorRef = useRef(color);
    const thicknessRef = useRef(brushThickness);

    useEffect(() => {
        colorRef.current = color;
        modeRef.current = mode
        thicknessRef.current = brushThickness; 
    }, [color, mode, brushThickness]);

    useEffect(() => {
        if (!canvasRef.current) return;

        const scope = new paper.PaperScope();
        paperScopeRef.current = scope;

        scope.setup(canvasRef.current);
        const { view, project } = scope;

        console.log({ view, project })
        scope.activate();
        
        view.onMouseDown = ((event) => {
            console.log(`BRUHHH`)
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
                // case modes.CUSTOM_BRUSH.name:
                //     console.log(`down custom`)
                //     initCustomBrush({ layer, raster });
                //     break;
                default:
                    console.log(`mousedown -- invalid mode name`)


            }
            layers.push(layer)
        })

        view.onMouseDrag = ((event) => {
            console.log(view)
            console.log(`dd`)
            const mode = modeRef.current;

            const point = event.point;

            // console.log({ layers })
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
            console.log(`u[p]`)
            updateState(`layers`, layers)
            if(isCustomBrush) {
                const raster = view.element.toDataURL();
                console.log(setImage)
                setImage(raster);
            }
        })

        return () => {
            view.remove();
            project.clear();

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
