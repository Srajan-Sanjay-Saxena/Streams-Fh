//* Here the order of the data is preserved , because we are using writeSync here.
//**
// execution time : 1.2s
//  */
import fs from "fs"

(() => {
    fs.open("./test.txt" , "w" , (err , fd : number) => {
        if(err){
            console.log(err);
            return;
        }
        console.time("syncWriting");
        for(let i = 0 ; i < 1000000 ; i++){
            fs.writeSync(fd , "a");
        }
        console.timeEnd("syncWriting");
        fs.close(fd , () => {
            console.log("Closed file...")
        })
    })
})()