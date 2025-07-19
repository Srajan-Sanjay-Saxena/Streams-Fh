//! Issue is that , say we have to read a 9gb file , and we want manual way of reading the file in chunks . The main issue that arises is that say at the close end of the file we have to just read 10bytes and our buffer size is 20bytes  , then what will happen is that after reading 10bytes , during consoling the data , we will get first 10bytes correct and next 10bytes wrong..........Solution to this is -->

import fs from "fs/promises";

const readFileHandler = await fs.open("./read.txt", "r");
const writeFileHandler = await fs.open("./write.txt", "w");
const chunkBuff = Buffer.alloc(20); // chunk size: 20 bytes

//* we might have concern of reading the stat of 10gb file will block the thread, but no , stat only reads the metadata of the file , don't roll through the whole content.

const fileSize = (await readFileHandler.stat()).size;
let read = 0;

while (read < fileSize) {
  const { bytesRead, buffer } = await readFileHandler.read(
    chunkBuff,
    0,
    chunkBuff.length,
    read
  );

  if (bytesRead === 0) break; // EOF
  console.log(chunkBuff.toString("utf-8", 0, bytesRead));
  const writeBuff = chunkBuff.subarray(0, bytesRead);
  await writeFileHandler.write(writeBuff);
  console.log(writeBuff);
  console.log(chunkBuff);
  read += bytesRead;
}

await readFileHandler.close();
