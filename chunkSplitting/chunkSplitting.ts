import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
console.log(`${__filename}.txt`);
const fileDescriptor = fs.openSync(`${__filename}.txt`, "w");

//* writeFile function automatically opens and close the file , no need to explicitly close the file.

fs.writeFile(`${__filename}.txt` , "srajan saxena" , (err) => {
    if(err){
        console.log("Error in writing the file");
    }
})
