import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';

import { paper } from 'paper'
import { Group } from 'paper/dist/paper-core';

const Canvas = ({ w = 0, 
                  h = 0, 
                  offsetX = 0,
                  offsetY = 0, 
                  setImage, 
                  m,
                  brushThickness,
                  color }) => {    

    const [mode, setMode] = useState(m);
    const groupRef = useRef(null);
    const canvasRef = useRef(null);
    const colorRef = useRef(color);
    const thicknessRef = useRef(brushThickness);

    useEffect(() => {
        colorRef.current = color;
        thicknessRef.current = brushThickness; 
    });

    useEffect(() => {
        console.log({ color })
        if (!canvasRef.current) return;

        paper.setup(canvasRef.current);

        groupRef.current = new paper.Group();
        
        const view = paper.view
        

        view.onMouseDown = ((event) => {
            console.log(color)
            const group = groupRef.current
            if(!group) return;
            console.log({ brushThickness})

            const path = new paper.Path({ 
                strokeColor: colorRef.current,
                strokeWidth: thicknessRef.current
            });

            group.addChild(path)
            
        })

        view.onMouseDrag = ((event) => {
            console.log(color)
            const group = groupRef.current;
            const children = group.children;
            if(!group || children.length === 0 ) return;
            const path = children[children.length - 1];
            path.add(event.point);
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
