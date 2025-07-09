import fs from "fs";

let i = 0;
let ok = true;
const MAX_WRITES = 1000000; // Added a limit for demonstration

const writeStream = fs.createWriteStream("./test.txt", {
  highWaterMark: 500,
});

const startWriting = () => {
  while (i < MAX_WRITES) {
    if (!ok) break;
    ok = writeStream.write(Buffer.from("hello my name is srajan", "utf-8"));
    console.log(i);
    i++;
    
    // Check if we've reached the end
    if (i === MAX_WRITES) {
      console.log("Writing complete, closing stream...");
      closeStream();
      break;
    }
  }
};

// Implement close function
const closeStream = () => {
  writeStream.close((err) => {
    if (err) {
      console.error("Error closing stream:", err);
      return;
    }
    console.log("Stream closed successfully");
  });
};

writeStream.on("drain", () => {
  console.log("drain triggered............");
  ok = true;
  startWriting();
});

// Add close event handler
writeStream.on("close", () => {
  console.log("Stream has been closed");
});

// Add error handler
writeStream.on("error", (error) => {
  console.error("Error in stream:", error);
  closeStream(); // Close stream on error
});

startWriting();
