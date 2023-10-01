import { useRef } from "react";
import { useEffect, useState } from "react";

const Grid = () => {
  const ans = "HOUSE";
  const [Gridinput, setGridinput] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
    const [Color, setColor] = useState([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ]);
  
  const handleOnchange = (event, rowindex, colindex) => {
    const newSate = [...Gridinput];
    newSate[rowindex][colindex] = event.target.value.toUpperCase();

    setGridinput(newSate);
  };
  const checkans = (colindex, rowindex) => {
    console.log(inputRef.current[rowindex][colindex],colindex,rowindex);
    if (rowindex<4) inputRef.current[rowindex+1][0].focus();
    const rowvalue = [...Gridinput[rowindex]];
    const userans = rowvalue.reduce((acc, curr) => {
      return acc + curr;
    });
    console.log(userans);
    const newcolor = [...Color]
    if (userans === ans) {
     newcolor[rowindex] = ["Green", "Green", "Green", "Green", "Green"];
      
    } else {
      for (let i = 0; i < userans.length; i++) {
        if (userans[i] === ans[i]) {
          newcolor[rowindex][i] = "Green"
        } else if (userans[i] != ans[i] && ans.includes(userans[i])) {
          newcolor[rowindex][i] = "Gray"
        } else if (!ans.includes(userans[i])) {
          newcolor[rowindex][i] = "Yellow"

        }

      }
    }
     console.log(newcolor)
    setColor(newcolor)
  };

  const handleKeyPress = (e) => {};
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);
   const inputRef = useRef([
     [0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0],
   ]);
  //console.log(inputRef.current)
  const handlefocus = (e, rowindex, colindex) => {
    console.log(inputRef,e.target)
    if(colindex<=3)inputRef.current[rowindex][colindex+1].focus()

 
    
  }

  return (
    <>
      <div className="GridContainer">
        {Gridinput.map((row, rowindex) => {
          return row.map((col, colindex) => {
            return (
              <div className={Color[rowindex][colindex]?Color[rowindex][colindex]:"cell"}>
                <input
                  ref={(ref) => (inputRef.current[rowindex][colindex] = ref)}
                  onInput={(e) => {
                    handlefocus(e, rowindex, colindex);
                  }}
                  maxlength="1"
                  onKeyDown={(e) => {
                    
                    if (e.key === "Enter" && colindex === 4 &&col)
                     
                      checkans(colindex, rowindex);
                  }}
                  className={Color[rowindex][colindex]}
                  value={col}
                  onChange={(e) => {
                    handleOnchange(e, rowindex, colindex);
                  }}
                />
              </div>
            );
          });
        })}
      </div>
    </>
  );
};
export default Grid;
