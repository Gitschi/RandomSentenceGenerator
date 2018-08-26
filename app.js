var input = require("./input");     // Requires other file
var inputSentence = input.words[0]; // Pulls input sentence from other file
var cutWords = [];                  // Holds cut words
var finishedSentences = [];         // Holds finished sentences

var requestedAmount = 100;          // How many sentences
var minLength = 30;                 // Min length of sentence
var maxLength = 50;                 // Max length of sentence

SeparateWords(); 
for(let i = 0; i < requestedAmount; i++){
  BuildSentenceBlock(); 
}
PrintSentences();

// Separate words and push them to array
function SeparateWords(){
  for(let i = 0; i < inputSentence.length; i++){
    cutWords = inputSentence.split(" ")
  }
}

// Build a sentence block
function BuildSentenceBlock(){
  let sentenceParts = [];
  let newSentence = "";
  let partNumber = GetPartNumber();

  // Loops 1-3 times depending on random generated part number
  for(let i = 0; i <= partNumber; i++){
    do{
      // Has a 20% chance to cut sentence short if over 30 chars
      if(newSentence.length >= minLength && GetRandom(10) <= 1){
        break;
      }

      // Adds random word and space to sentence
      newSentence += cutWords[GetRandom(cutWords.length)];
      newSentence += " ";
    }
    while(newSentence.length <= maxLength); // stops when sentence is longer than maxLength

    // Slices off last space
    newSentence = newSentence.slice(0, -1)
   
    // Capitalizes first Letter of first sentence
    if(i === 0){
      newSentence = capitalizeFirstLetter(newSentence);
    }

    // Executed when not the last sentence
    if(i !== partNumber){
      // 50% chance to add comma 
      if(GetRandom(2) === 0){
        newSentence += ",";
      }
      newSentence += "[y] ";
    }

    // Adds dot and [x] on last sentence
    if(i === partNumber){
      newSentence += ".";
      newSentence += "[x]";
    }

    // pushes sentence into sentenceParts array
    sentenceParts.push(newSentence)
    newSentence = "";
  }

  // Puts all sentences of one block together
  for(let j = 0; j < sentenceParts.length; j++){
    newSentence += sentenceParts[j];
  }

  finishedSentences.push(newSentence);
}

// Prints all Sentences
function PrintSentences(){
  for(let i = 0; i < finishedSentences.length ; i++){
    console.log(finishedSentences[i]);
  }
}

// Returns a random number within certain range
function GetRandom(maxVal){
  return Math.floor(Math.random() * Math.floor(maxVal));
}

// Decides how many parts the sentence will have
function GetPartNumber(){
  num = GetRandom(20);

  if(num <= 1){
    return 0;
  }
  else if(num <= 8){
    return 1;
  }
  else{
    return 2;
  }
}

// Capitalizes first letter of string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}