import fs from "fs"

const readFileDescriptor = fs.openSync("./test.txt" , "r");
const writeFileDescriptor = fs.openSync("./write.txt" , "w");


