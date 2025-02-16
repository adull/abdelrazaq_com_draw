import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { modes } from '../const/modes.const';

import { paper } from 'paper'
import { findLayerFromMode, createLayerFromMode } from '../helpers/layer';
import { brushDraw, 
         rectangleDraw, 
         customBrushDraw,
         initBrush, 
         initRectangle, 
         initCustomBrush 
       } from '../helpers/draw';

import { getSizeWithLayers } from '../helpers/layer';

const Canvas = ({ w = 0, 
                  h = 0, 
                  offsetX = 0,
                  offsetY = 0, 
                  setCustomBrush, 
                  mode,
                  customBrushGroup,
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
    const customBrushRef = useRef(customBrushGroup);

    const canvasId = useRef(`paper-${randomId()}`);

    colorRef.current = color;
    modeRef.current = mode;
    thicknessRef.current = brushThickness;
    customBrushRef.current = customBrushGroup;

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
                    initRectangle({ layer, point, style })
                    break;
                case modes.CUSTOM_BRUSH.name:
                    if(isCustomBrush) {
                        initBrush({ layer, style });
                    } else {
                        const customBrush = new paper.Group();
                        customBrushRef.current.forEach(stroke => {
                            stroke._children.forEach(child => {
                                customBrush.addChild(child)
                            })
                        });
                        initCustomBrush({ layer, customBrush, point });
                    }
                    break;
                default:
                    console.log(`mousedown -- invalid mode name`)


            }
            const tempLayers = layers.push(layer)
            setLayers(tempLayers)
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
                case modes.CUSTOM_BRUSH.name:
                    if(isCustomBrush) {
                        // if we're in a custom brush just do a normal draw
                        brushDraw({ path, point })

                    } else {
                        const customBrush = new paper.Group();
                        customBrushRef.current.forEach(stroke => {
                            stroke._children.forEach(child => {
                                customBrush.addChild(child)
                            })
                        });
                        customBrushDraw({ layer, customBrush, point });

                    }
                    break;
                default: 
                    console.log(`drag -- no valid mode`)
                    
            }
        });

        view.onMouseUp = ((event) => {
            updateState(`layers`, layers)
            // console.log({layers})
            if(isCustomBrush) {
                // console.log(view.element)
                // const raster = view.element.toDataURL();
                // const size = getSizeWithLayers({layers});
                setCustomBrush(layers);
            } else {
                console.log({ isCustomBrush})
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
