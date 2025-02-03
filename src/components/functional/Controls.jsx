import { h } from 'preact';
import { colors } from '../../const/colors.const';
import { modes } from '../../const/modes.const';
import { useState, useEffect } from 'preact/hooks'

const Controls = ({ state, updateState, scaleLast, rotLast, skewLast }) => { 
    const [rotate, setRotate] = useState(0)
    const [skew, setSkew] = useState(0)
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

    const rot = (e) => {
        e.preventDefault();
        setRotate(e.target.value)
        rotLast(e);
    }

    const sku = (e) => {
        e.preventDefault();
        setSkew(e.target.value);
        skewLast(e);
    }

    return (
        <div class="controls flex flex-wrap">
            <div>
                <div class="colors flex flex-wrap" style={{width: 260}}>
                    {colorItems}
                </div>
                <div class="modes flex flex-col">
                    {modeItems}
                </div>
            </div>
            <div>
                <div>
                    <div>SCALE LAST IN MAIN CANVAS^^^</div>
                    <input type="range" value={50} onInput={scaleLast} />
                    <div>ROTATE</div>
                    <input type="range" value={50} onInput={rot} />
                    <div>SKEW</div>
                    <input type="range" id="groupSkew" min={-100} max={100} onInput={sku} onChange={() => setSkew(0)} />
                </div>
            </div>
        </div>
    );
}

export default Controls;
