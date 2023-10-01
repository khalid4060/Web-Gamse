import { useState } from "react";

const useGenpass = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const generatePassword = (checkboxData, length) => {
    let charset = "",
      generatedPassword = "";
    
    const selectedOption = checkboxData.filter((checkbox) => checkbox.state);
    console.log("llllllllllll", selectedOption);
    if (selectedOption.length === 0) {
      setErrorMessage("Select at least one option.");
      setPassword("");
      return;
    }

    selectedOption.forEach((option) => {
      switch (option.title) {
        case "Upper case":
          charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "Lower case":
          charset += "abcdefghijklmnopqrstuvwxyz";
          break;
        case "Numbers":
          charset += "0123456789";
          break;
        case "Symbols":
          charset += "!@#$%^&*()";
          break;
        default:
          break;
      }
    });
      
      

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }

    setPassword(generatedPassword);
      setErrorMessage("");
      
  };
  console.log("sssss", password, generatePassword);
  return { password, errorMessage, generatePassword };
};

export default useGenpass;
