import fs from "fs";

(() => {
  fs.open("./test.txt", "w", (err, fd: number) => {
    if (err) {
      console.log(err);
      return;
    }
    console.time("callbackWriting");
    for (let i = 0; i < 1000000; i++) {
        fs.write(fd, "a", () => {
        });
    }
    console.timeEnd("callbackWriting");
    fs.close(fd , () => {
        console.log("Closed file...")
    })
  });
})();
