import React, { useEffect, useState } from "react";
const Suduko = () => {
  const [Grid, setGrid] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const handleClear = () => {
    setGrid([
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  }
  const handleClick = async () => {
    let puzzz = "";
    for (let rindex = 0; rindex < Grid.length; rindex++) {
      for (let cindex = 0; cindex < Grid[rindex].length; cindex++) {
          
        const val = Grid[rindex][cindex]
        
        puzzz+= val===0?".":val

      }
    }

    const url = "http://127.0.0.1:5000";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sudoku: [puzzz],
      }),
    };

    const response = await fetch(url, options);
    const result = await response.json();
    const sol = result.data[0].solution;

    const temp = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    for (let rindex = 0; rindex < temp.length; rindex++) {
      for (let cindex = 0; cindex < temp[rindex].length; cindex++) {
        temp[rindex][cindex] = sol.charAt(parseInt(rindex * 9 + cindex));
      }
    }

    console.log(temp);
    setGrid([...temp]);
  };
  const handleinput = (num, rowindex, colindex) => {
    console.log(num, rowindex, colindex);
    const newgrid = [...Grid];
    newgrid[rowindex][colindex] = num;
    // for (let rindex = 0; rindex < newgrid.length; rindex++) {
    //     for (let cindex = 0; cindex < newgrid[rindex].length; cindex++) {

    //   }
    // }

    setGrid(newgrid);
  };
  const fetchdata = async () => {
    const data = await fetch("https://sudoku-api.vercel.app/api/dosuku");
    const json = await data.json()
    console.log("sudu", json.newboard.grids[0]);
    setGrid([...json.newboard.grids[0].value]);
  }

  useEffect(() => {
     fetchdata()
  },[])
  return (
    <>
      <div className="Grid">
        {Grid.map((row, rowindex) => {
          return row.map((col, colindex) => {
            return (
              <div className="cell">
                <input
                  type="text"
                  value={col}
                  onChange={(e) => {
                    handleinput(e.target.value, rowindex, colindex);
                  }}
                />
              </div>
            );
          });
        })}
      </div>
      <button
        onClick={() => {
          fetchdata();
        }}
      >
        GetNewSudu 
      </button>
      <button
        onClick={() => {
          handleClick();
        }}
      >
        Solve
      </button>
      <button
        onClick={() => {
          handleClear();
        }}
      >
        Clear
      </button>
    </>
  );
};

export default Suduko;
