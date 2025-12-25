import { HexColorPicker } from "react-colorful";

interface ColorPickerProps {
    color: string;
    setColor: (color: string) => void;
    onAdd: (color: string) => void;
}

const ColorPickerPanel: React.FC<ColorPickerProps> = ({
    color,
    setColor,
    onAdd,
}) => {
    return (
        <div>
            <HexColorPicker color="{color}" onChange={setColor}/>

            <div>
                <input 
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="hexInput"
                    maxLength={7}
                />
                <button className="addColorBtn" onClick={() => onAdd(color)} >
                    + Add
                </button>
            </div>
        </div>
    )
}


export default ColorPickerPanel;