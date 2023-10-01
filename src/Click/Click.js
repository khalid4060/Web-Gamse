import React, { useState } from "react";

const Click = () => {
    
    const [points, setpoints] = useState([]);
    const [redo,setredo]=useState([])

    const handleclick = (e) => {
    setpoints([
      ...points,
      {
        x: e.clientX,
        y: e.clientY,
      },
    ]);
    };
    const undohandle = () => {
        if (points.length > 0) {
            setredo([...redo, points.pop()]);
            setpoints([...points])
        }
    }

    const redohandle = () => {
       if(redo.length>0) setpoints([...points,redo.pop()])
    }
    console.log("Points", points)
    console.log("Redo",redo)

    return (
      <>
        <button
          onClick={() => {
            undohandle();
          }}
        >
          undo
        </button>
        <button
          onClick={() => {
            redohandle();
          }}
        >
          Redo
        </button>
        <div
          className="main"
          onClick={(e) => {
            handleclick(e);
          }}
        >
          <div>
            {points.map((p) => {
              return (
                <div
                  className="point"
                  style={{ top: -25 + p.y + "px", left: -5 + p.x + "px" }}
                >
                  O
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
};

export default Click;
