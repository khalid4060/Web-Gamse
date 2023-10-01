import React, { useState } from "react";
import useGenpass from "./useGenpass";

const Password = () => {
    const [charecter, setCharecter] = useState(4);
    const [copystatus, setcopystatus] = useState("Copy");
  const [condition, setCondition] = useState([
    {
      title: "Upper case",
      state: false,
    },
    {
      title: "Lower case",
      state: false,
    },
    {
      title: "Numbers",
      state: false,
    },
    {
      title: "Symbols",
      state: false,
    },
  ]);
    
   

  const handleChange = (index) => {
    const updateddata = [...condition];
    
    updateddata[index].state = !updateddata[index].state;
    console.log("dasddasd", updateddata);
    setCondition(updateddata);
  };
    const copytoclip = (pass) => {
        setcopystatus("Copied");
        navigator.clipboard.writeText(pass)

        setTimeout(() => {
            setcopystatus("Copy")
        },5000)
        

    }

   const { password, errorMessage, generatePassword } = useGenpass();
   console.log("hhhhhhh", password, generatePassword);
  return (
    <div className="header">
      {/* password and copy button */}
      { password &&
        <div className="Pass-copy-btn">
          <div>{password}</div>
          <button
            onClick={() => {
              copytoclip(password);
            }}
          >
            {copystatus}
          </button>
        </div>
      }
      {/* chareter lenght */}
      <div className="charector-length">
        <span>Charector lenght</span>
        <span>{charecter}</span>
      </div>
      {/* slider */}

      <div className="slider">
        <input
          type="range"
          max={20}
          min={4}
          value={charecter}
          onChange={(e) => setCharecter(e.target.value)}
        />
      </div>
      {/* options */}
      <div className="condition">
        {condition.map((i, index) => {
          return (
            <div className="check">
              <input
                type="checkbox"
                checked={i.state}
                onClick={() => handleChange(index)}
              />
              <label>{i.title}</label>
            </div>
          );
        })}
      </div>
      {/* genrate btn */}

      <div className="gen-btn">
        <button
          onClick={() => {
            generatePassword(condition, charecter);
          }}
        >
          Genrate Password
        </button>
      </div>
    </div>
  );
};

export default Password;
