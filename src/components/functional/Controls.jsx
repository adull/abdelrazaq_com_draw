import { h } from 'preact';
import { colors } from '../../const/colors.const';
import { useState, useEffect } from 'preact/hooks'

const Controls = ({ colors, setColor }) => { 
    const colorStyle = ( color ) => { 
        const style = { backgroundColor: color, width: 65, height: 20 };
        return style;
    }
    const colorArr = Object.keys(colors).map(item => colors[item])
    
    const colorItems = colorArr.map((color) => 
        <div style={ colorStyle(color) } onClick={() => setColor(color) }></div>
    )
    return (
        <div class="controls">
            <div class="colors flex flex-wrap" style={{width: 260}}>
                {colorItems}
            </div>
        </div>
    );
}

export default Controls;
