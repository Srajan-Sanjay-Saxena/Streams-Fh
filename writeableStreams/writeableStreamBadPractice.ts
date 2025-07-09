import fs, { write } from "fs"
import { Buffer } from "buffer";

//* Note that batching is done automatically , by the os .

const writeStream = fs.createWriteStream("./test.txt" , {
    highWaterMark : 500
});

//* tells about the high-water-mark
console.log(writeStream.writableHighWaterMark);

// //* tells about the amounts of byte of data filled in the internal buffer.
console.log(writeStream.writableLength);

//! Below we are not taking care of highwatermark , we can met memory leaks or error while running the code , because there are billions of iteration.
for(let i =0; i< 10000000000 ; i++){
    writeStream.write(Buffer.from("hello my name is srajan" , 'utf-8'))
}


console.log(writeStream.writableLength);
