// Assignment code here
var promptCharNumIsValid = function (promptCharNum) {
  // validate prompt response
  if (promptCharNum === "" || promptCharNum === null) {
    return false;
  }
  // convert prompt response to lowercase
  promptCharNum = promptCharNum.toLowerCase().trim();
  var validChoices = ["numbers", "special", "both"];
  if (!validChoices.includes(promptCharNum)) {
    // return to prompt
    return false;
  }
  return true;
};

var letterPromptIsValid = function (promptLetter) {
  // validate prompt response
  if (promptLetter === "" || promptLetter === null) {
    return false;
  }
  // convert prompt response to lowercase
  promptLetter = promptLetter.toLowerCase().trim();
  var validChoices = ["upper", "lower", "mixed"];
  if (!validChoices.includes(promptLetter)) {
    // return to prompt
    return false;
  }
  return true;
};

// prompt to check what case letters the user wants
var letterPrompt = function () {
  var promptLetter = "";
  var isValid = false;
  while (!isValid) {
    promptLetter = window.prompt('Would you like your password to include UPPER case letters, LOWER case letters, or MIXED case letters?  Enter "UPPER" "LOWER" or "MIXED" to choose.');
    isValid = letterPromptIsValid(promptLetter);
    if (!isValid) {
      window.alert("Please provide a valid answer!");
    }
  }
  return promptLetter;
};

// prompt to check if user wants numbers or special characters
var charNumPrompt = function () {
  var promptCharNum = "";
  var isValid = false;
  while (!isValid) {
    promptCharNum = window.prompt('Would you like your password to include numbers and/or special characters? Enter "NUMBERS" "SPECIAL" or "BOTH" to choose.');
    isValid = promptCharNumIsValid(promptCharNum);
    if (!isValid) {
      window.alert("Please provide a valid answer!");
    }
  }

  return promptCharNum;
};

var lengthPrompt = function () {
  var passwordLength = "";
  var isValid = false;
  while (!isValid) {
    passwordLength = window.prompt('How many characters do you want your password to have?  Enter a number between 8 and 128.');
    if (passwordLength === "" || passwordLength === null || passwordLength < 8 || passwordLength > 128) {
      isValid = false;
    }
    else {
      isValid = true;
    }
  }
  return passwordLength;
};



function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function generateUpper() {
  min = "A".charCodeAt();
  max = "Z".charCodeAt();
  x = getRandomInt(min, max + 1);
  return String.fromCharCode(x);
}
function generateLower() {
  min = "a".charCodeAt();
  max = "z".charCodeAt();
  x = getRandomInt(min, max + 1);
  return String.fromCharCode(x);
}

function generateNumber() {
  x = getRandomInt(0, 10);
  return x.toString();
}

function generateSpecial() {
  category = getRandomInt(0, 2);
  var min, max;
  if (category === 0) {
    min = "!".charCodeAt();
    max = "/".charCodeAt();
  } else {
    min = ":".charCodeAt();
    max = "@".charCodeAt();
  }
  x = getRandomInt(min, max + 1);
  return String.fromCharCode(x);
}
function generateChar(letters, numberCharacters) {
  // charTypes = ["upper", "lower", "special", "numbers"]
  charTypes = [];

  switch (letters) {
    case "upper":
      charTypes.push("upper");
      break;

    case "lower":
      charTypes.push("lower");
      break;

    default:
      charTypes.push("upper");
      charTypes.push("lower");
  }
  switch (numberCharacters) {
    case "numbers":
      charTypes.push("numbers");
      break;

    case "special":
      charTypes.push("special");
      break;

    default:
      charTypes.push("numbers");
      charTypes.push("special");
  }
  var x = getRandomInt(0, charTypes.length);
  var charType = charTypes[x];
  switch (charType) {
    case "upper":
      return generateUpper();
    case "lower":
      return generateLower();
    case "numbers":
      return generateNumber();
    case "special":
      return generateSpecial();
  }
}

function generatePassword() {
  letters = letterPrompt();
  numberCharacters = charNumPrompt();
  passwordLength = lengthPrompt();
  var password = "";
  for (i = 0; i < passwordLength; i++) {
    password += generateChar(letters, numberCharacters);
  }

  return password;
}



// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

window.alert("Click Generate Password to begin.")