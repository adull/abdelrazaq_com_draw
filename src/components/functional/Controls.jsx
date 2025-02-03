import { h } from 'preact';
import { colors } from '../../const/colors.const';
import { modes } from '../../const/modes.const';
import { useState, useEffect } from 'preact/hooks'

const Controls = ({ state, updateState }) => { 
    const colorStyle = ( color ) => { 
        const style = { backgroundColor: color, width: 65, height: 20 };
        return style;
    };
    const colorArr = Object.keys(colors).map(item => colors[item]);
    const colorItems = colorArr.map((color) => 
        <div style={ colorStyle(color) } onClick={() => updateState(`color`, color) }></div>
    );

    const modeArr = Object.keys(modes).map(item => modes[item]);

    const modeItems = modeArr.map((mode) => {
        const click = (e) => {
            e.preventDefault();
            updateState(`mode`, mode);
        };
        return (
            <a href="#" onClick={(e) => click(e)}
                style={{fontWeight: state.mode.name === mode.name ? 'bold' : 'normal'}}>
                {mode.title}
            </a>
        )
    })

    return (
        <div class="controls">
            <div class="colors flex flex-wrap" style={{width: 260}}>
                {colorItems}
            </div>
            <div class="modes flex flex-col">
                {modeItems}
            </div>
        </div>
    );
}

export default Controls;
