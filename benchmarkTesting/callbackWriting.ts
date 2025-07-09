import fs from "fs";

//! Note that in the callback implementation order of the data is not preserved , because execution of these callbacks are not ordered ,....

//**
// execution time : 600s
//  */
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
