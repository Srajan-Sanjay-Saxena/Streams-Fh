import fs, { write } from "fs";

let i = 0;
let ok = true;

const writeStream = fs.createWriteStream("./test.txt", {
  highWaterMark: 500,
});

const startWriting = () => {
  while (i < 100000000000000000000) {
    if (!ok) break;
    ok = writeStream.write(Buffer.from("hello my name is srajan", "utf-8"));
    console.log(i)
    i++;
  }
};

writeStream.on("drain", () => {
  console.log("drain triggered............");
  ok = true
  startWriting();
});

startWriting();
