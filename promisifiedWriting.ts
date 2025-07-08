import fs from "fs/promises";

//* By default promisified fs take longer execution time than callbacks

//**
//& Execution time : 9s
//& CPu usage : 100%
//  */
(async () => {
  const handler = await fs.open("./test.txt", "w");
  try {
    console.time("promisifiedWriting");
    for (let i = 0; i < 1000000; i++) {
      await handler.write(" a ");
    }
    console.timeEnd("promisifiedWriting");
  } catch (error) {
    console.log(error);
  } finally {
    handler.close();
  }
})();
