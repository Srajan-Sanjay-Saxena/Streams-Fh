import fs from "fs";
//^No need to open the file , while using streams , it will automatically be handled by them
// const readFileDescriptor = fs.openSync("./test.txt" , "r");
// const writeFileDescriptor = fs.openSync("./write.txt" , "w");
const readableStream = fs.createReadStream("./read.txt");
const writable = fs.createWriteStream("./streamWrite.txt");

// Pipe the readable stream directly to the writable stream
readableStream
  .pipe(writable)
  // Optionally, handle the 'finish' event on the writable
  .once("finish", () => {
    console.log("File copied successfully.");
  })
  .on("data", (chunk) => {
    console.log("Chunk of data : ", chunk);
  })
  // Also handle stream errors for reliability
  .once("error", (error) => {
    console.error("Stream error:", error);
  });

// It's also recommended to handle errors separately:
readableStream.on("error", (error) => {
  console.error("readableStream error:", error);
});
writable.once("error", (error) => {
  console.error("Writable error:", error);
});

const isReadablePaused = readableStream.isPaused()

console.log(isReadablePaused);
console.log(readableStream.readable);