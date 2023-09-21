ex 1:
function checkOddOrEven(number) {
    if (number % 2 === 0) {
        return 'Even';
      } else {
        return 'Odd';
      }
    }
console.log(`${thisnumber} is ${result}.`);

const thisNumber = 8;
const result = checkOddOrEven(thisNumber);
but we try arrow function;
 ex 2:

 Implement a program to find the maximum of two numbers.

 let a = 10;
 let b = 6;
 function showMax(a,b){
    if (a>b)
       return a;
    } else {
        return b;
 }
 

  and we try the arrow function here also






  ex 3:
  Write a function to calculate the factorial of a given positive integer.
  
  let number= 4;
  function factorialOfPositiveInteger{
    number = 1*2*3*4;
  }





ex 4:
we create a function that check if letters of a string are = if we reverse them 
lets go 



let readInReverse = (str) => str.split('').reverse().join('');
// split('') to convert the string into an array of characters;
// reverse() to reverse the array;
// join('') to convert it back into a string;

let reversedWord = readInReverse(word);
console.log(reversedWord); // Outputs 'radar'


the other Option


ex 5:

Write a program to calculate the area of a rectangle.

let a = number;
let b = number;
 const areaofrectangle = (a,b) => {
  return a * b;
 }
console.log(a * b);




ex1 18 9 2023

function countOccurrences(arr, element) {
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === element) {
      count++;
    }
  }

  return count;
}


const myArray = [1, 2, 2, 3, 4, 2, 5];
const elementToCount = 2;
const result = countOccurrences(myArray, elementToCount);
console.log(`The element ${elementToCount} appears ${result} times.`);

ex 2


function findMaxMin(arr) {
  if (arr.length === 0) {
    return null;
  }

  let max = arr[0];
  let min = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
    if (arr[i] < min) {
      min = arr[i];
    }
  }

  return { max, min };
}

// Example usage:
const myArray = [4, 2, 7, 1, 9, 3, 8];
const result = findMaxMin(myArray);
console.log(`Maximum number: ${result.max}`);
console.log(`Minimum number: ${result.min}`);



ex 3 
function analyzeSentence(sentence) {
  let sentenceLength = sentence.length;
  let wordCount = sentence.split(/\s+/).filter(Boolean).length; // Filter out empty strings
  let vowelCount = 0;

  const vowels = 'aeiouAEIOU';

  for (let i = 0; i < sentenceLength; i++) {
    if (vowels.includes(sentence[i])) {
      vowelCount++;
    }
  }

  return { sentenceLength, wordCount, vowelCount };
}

// Example usage:
const inputSentence = "This is an example sentence.";
const analysis = analyzeSentence(inputSentence);

console.log(`Length of the sentence: ${analysis.sentenceLength}`);
console.log(`Number of words: ${analysis.wordCount}`);
console.log(`Number of vowels: ${analysis.vowelCount}`);


ex 4

function findDistinctSum(set1, set2) {
  const distinctElements = new Set([...set1, ...set2]);
  let sum = 0;

  distinctElements.forEach(element => {
    sum += element;
  });

  return sum;
}

// Example usage:
const set1 = [3, 1, 7, 9];
const set2 = [2, 4, 1, 9, 3];
const result = findDistinctSum(set1, set2);

console.log(`Output: ${result}`);









Challenge day 22:

part 1:

// We Initialize an empty array to store contacts

let contacts = [];

// We create a Function to add a contact
function addContact() {
  let name = prompt("Enter the name:");
  let phoneNumber = prompt("Enter the phone number:");


 // We Create an object to represent the contact
 let contact = {
  name: name,
  phoneNumber: phoneNumber
};

 // We add the contact to the contacts array
 contacts.push(contact);

 console.log(`Contact ${name} with phone number ${phoneNumber} has been added.`);
}

// Call the function to add a contact
addContact();

part 2

// Assuming you have some contacts stored in the 'contacts' array
let contacts = [
  { name: "faty", phoneNumber: "6 53 87 65 99" },
  { name: "koki", phoneNumber: "6 53 87 65 94" },
  { name: "zhiro", phoneNumber: "6 53 87 65 96" }
];

function viewAllContacts() {
  // Loop through the contacts and display each one
  contacts.forEach(contact => {
      console.log(`Name: ${contact.name}, Phone Number: ${contact.phoneNumber}`);
  });
}

// Call the function to view all contacts
viewAllContacts();


part 3:

let contacts = [
  { name: "faty", phoneNumber: "6 53 87 65 99" },
  { name: "koki", phoneNumber: "6 53 87 65 94" },
  { name: "zhiro", phoneNumber: "6 53 87 65 96" }
];

function searchContact() {
  let searchName = prompt("Enter the name you want to search for:");
  let found = false;

  for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].name.toLowerCase() === searchName.toLowerCase()) {
          console.log(`Name: ${contacts[i].name}, Phone Number: ${contacts[i].phoneNumber}`);
          found = true;
          break;
      }
  }

  if (!found) {
      console.log(`Contact with name "${searchName}" was not found.`);
  }
}

// Call the function to search for a contact
searchContact();




part 3:

let contacts = [
  { name: "John Doe", phoneNumber: "555-555-5555" },
  { name: "Jane Doe", phoneNumber: "555-555-5556" },
  { name: "Bob Smith", phoneNumber: "555-555-5557" }
];

function addContact() {
  let name = prompt("Enter the name:");
  let phoneNumber = prompt("Enter the phone number:");

  let contact = {
      name: name,
      phoneNumber: phoneNumber
  };

  contacts.push(contact);

  console.log(`Contact ${name} with phone number ${phoneNumber} has been added.`);
}

function viewAllContacts() {
  contacts.forEach(contact => {
      console.log(`Name: ${contact.name}, Phone Number: ${contact.phoneNumber}`);
  });
}

function searchContact() {
  let searchName = prompt("Enter the name you want to search for:");
  let found = false;

  for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].name.toLowerCase() === searchName.toLowerCase()) {
          console.log(`Name: ${contacts[i].name}, Phone Number: ${contacts[i].phoneNumber}`);
          found = true;
          break;
      }
  }

  if (!found) {
      console.log(`Contact with name "${searchName}" was not found.`);
  }
}

function exitApp() {
  console.log("Exiting application. Goodbye!");
  // Optionally, you can add additional cleanup code here if needed
}

function showMenu() {
  let choice = prompt(
      
