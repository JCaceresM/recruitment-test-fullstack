function reverseWithSpecialCharacters(input) {
  // Convert the input to an array of characters if it's a string
  const arr = typeof input === 'string' ? input.split('') : input;
  if (!Array.isArray(arr)) {
    return "input allowed (string, array)"
  }
  // Create an array to store the special character positions and characters
  const specialChars = [];

  // Loop through the characters and identify special characters
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].toString().match(/[a-zA-Z0-9]/)) {
      specialChars.push({ index: i, char: arr[i] });
    }
  }

  // Remove special characters from the array
  const filteredArr = arr.filter(char => char.toString().match(/[a-zA-Z0-9]/));

  // Reverse the filtered array
  filteredArr.reverse();

  // Insert the special characters back into their original positions
  specialChars.forEach(({ index, char }) => {
    filteredArr.splice(index, 0, char);
  });

  // Convert the character array back to a string if the input was a string
  const reversed = typeof input === 'string' ? filteredArr.join('') : filteredArr;

  return reversed;
}
// Test the function

const inputArray = ['n', 2, '&', 'a', 'l', 9, '$', 'q', 47, 'i', 'a', 'j', 'b', 'z', '%', 8];
const resultArray = reverseWithSpecialCharacters(inputArray);
console.log(resultArray); // Output: [8, 'z', '&', 'b', 'j', 'a', '$', 'i', 47, 'q', 9, 'l', 'a', 2, '%', 'n']

const inputString = 33;
const result = reverseWithSpecialCharacters(inputString);
console.log(result); // Output: "c,b$a"
