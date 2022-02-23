import React, { useEffect, useRef, useState } from "react";
import SimpleButton from "./SimpleButton";
import SquareBox from "./SquareBox";
import classes from "./HomePage.module.css";
const HomePage = () => {
    const [boxList, setBoxList] = useState([{ key: 1 }]); //By Default one box is placed
    const [isKeyboardControl, setKeyBoardControl] = useState("enable");
    const [fencingDimensions, setFencingDimensions] = useState({
        height: 0,
        width: 0,
    });
    const boxContainerRef = useRef(null);
    const createBoxHandler = () => {
        let id = fetchKey();
        if (id) {
            let key = Number(id);
            key++;
            localStorage.setItem("key", key.toString());
            setBoxList((value) => [...value, { key }]);
        }
        else {
            addKey(1);
            createBoxHandler();
        }
    };
    const onDelete = (id) => {
        setBoxList((value) => value.filter((box) => box.key !== Number(id)));
    };
    const fetchKey = () => {
        return localStorage.getItem("key");
    };
    const addKey = (key) => {
        localStorage.setItem("key", key.toString());
    };
    useEffect(() => {
        localStorage.removeItem("key");
        setFencingDimensions({
            height: boxContainerRef.current.offsetHeight,
            width: boxContainerRef.current.offsetWidth,
        });
    }, []);
    const renderBoxes = () => {
        if (boxList.length)
            return boxList.map((box) => {
                return (<SquareBox id={box.key} key={box.key} onDelete={onDelete} enableKeyboardControls={isKeyboardControl === "enable"} fencing={fencingDimensions}/>);
            });
        return <></>;
    };
    const handleKeyBoardControls = (event) => {
        setKeyBoardControl(event.currentTarget.value);
    };
    return (<div className={classes.pd10}>
      <div className={classes.navDisplay}>
        <SimpleButton onClick={createBoxHandler}/>

        <div className={classes.marLeftAuto}>
          Keyboard Controls
          <label>
            <input type={"radio"} name={"controls"} value={"enable"} onClick={handleKeyBoardControls} checked={isKeyboardControl === "enable"}/>{" "}
            Enable
          </label>
          <label>
            <input type={"radio"} name={"controls"} value={"disabled"} onClick={handleKeyBoardControls} checked={isKeyboardControl === "disabled"}/>{" "}
            Disable
          </label>
        </div>
      </div>
      <div className={classes.boxContainer} ref={boxContainerRef}>
        {renderBoxes()}
      </div>
    </div>);
};
export default HomePage;
