import fs from "fs";

//* Opensync returns the fileDescriptor --> number
const fileHandler = fs.openSync("../info.txt", "a"); // "a" for append

let i = 0;

while (i < 100000) {
  const data = ` ${i} `;
  fs.writeSync(fileHandler, data);
  i++;
}

fs.closeSync(fileHandler);
console.log("Done appending!");
