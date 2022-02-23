import React, { useRef } from "react";
import classes from "./SquareBox.module.css"; //FOR OFFSET IN BOX ON MOVE OPERATION
import { KEYBOARD_CONTROLS } from "./keyboardControl";
const OFFSET = 200;
const colorArray = ["#FF6633","#FFB399","#FFFF99","#00B3E6","#E6B333","#3366E6","#999966","#99FF99","#B34D4D","#80B300","#809900","#E6B3B3","#6680B3","#66991A","#FF99E6","#CCFF1A","#FF1A66","#E6331A","#33FFCC",];
const SquareBox = (props) => {
    const { id, onDelete, enableKeyboardControls, fencing } = props;
    const boxRef = useRef(null);
    const handleKeyPress = (event) => {
        if (!enableKeyboardControls)
            return;
        let viewPortData = boxRef.current.getBoundingClientRect();
        let currentLeftPosition = Number(boxRef.current.style.left.split("px")[0]);
        let currentTopPosition = Number(boxRef.current.style.top.split("px")[0]);
        let newPosition = 0;
        switch (event.key) {
            case KEYBOARD_CONTROLS.MOVE_LEFT:
                newPosition = currentLeftPosition - OFFSET;
                if (newPosition >= 0) {
                    boxRef.current.style.left = newPosition + "px";
                }
                return;
            case KEYBOARD_CONTROLS.MOVE_RIGHT:
                newPosition = currentLeftPosition + OFFSET;
                if (newPosition >= 0 &&
                    newPosition + viewPortData.width < fencing.width) {
                    boxRef.current.style.left = newPosition + "px";
                }
                return;
            case KEYBOARD_CONTROLS.MOVE_UP:
                newPosition = currentTopPosition - OFFSET;
                if (newPosition >= 0) {
                    boxRef.current.style.top = newPosition + "px";
                }
                return;
            case KEYBOARD_CONTROLS.MOVE_DOWN:
                newPosition = currentTopPosition + OFFSET;
                if (newPosition >= 0 &&
                    newPosition + viewPortData.height < fencing.height) {
                    boxRef.current.style.top = newPosition + "px";
                }
                return;
            case KEYBOARD_CONTROLS.BACKSPACE:
            case KEYBOARD_CONTROLS.DELETE:
                onDelete(event.target.id);
                return;
            default:
                console.warn("Unhandled keyCode", event.key);
                break;
        }
    };
    const handleOnClick = () => {
        boxRef.current.style.border = "1px solid blue";
    };
    const handleOnBlur = () => {
        boxRef.current.style.border = "1px solid black";
    };
    return (<div id={id} tabIndex={0} ref={boxRef} onBlur={handleOnBlur} onSelect={handleOnClick} onKeyUp={handleKeyPress} onKeyPressCapture={handleKeyPress} className={classes.boxContainer} style={{ zIndex: Number(id),backgroundColor: colorArray[id % 48]  }}>
      ID:{id}
    </div>);
};
export default SquareBox;
