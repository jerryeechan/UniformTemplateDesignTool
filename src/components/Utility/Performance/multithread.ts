// declare var Multithread;
// var num_threads = 2;
// export var MT = new Multithread(num_threads);
const spawn = require("threads").spawn;
class MThread {
  setUpFunc() {
    return () => {};
  }
  run(func: Function, inputValue) {
    return new Promise((resovle, reject) => {
      const thread = spawn(func);
      thread
        .send(inputValue)
        // The handlers come here: (none of them is mandatory)
        .on("message", function(response) {
          console.log("Sum Result", response.result);
          resovle(response);
          thread.kill();
        })
        .on("error", function(error) {
          reject(error);
          console.error("Worker errored:", error);
        })
        .on("exit", function() {
          console.log("Worker has been terminated.");
        });
    });
  }
}

// function(input, done) {
//   // Everything we do here will be run in parallel in another execution context.
//   // Remember that this function will be executed in the thread's context,
//   // so you cannot reference any value of the surrounding code.
//   var array = input.value as Array<number>;
//   var sum = 0;
//   array.forEach(a => {
//     sum += a;
//   });
//   done({ result: sum });
// }

// const threads = require("threads");
// const spawn = threads.spawn;
// const thread = spawn(function() {});

// thread
//   .run(function(input, done, progress) {
//     setTimeout(done, 1000);
//     setTimeout(function() {
//       progress(25);
//     }, 250);
//     setTimeout(function() {
//       progress(50);
//     }, 500);
//     setTimeout(function() {
//       progress(75);
//     }, 750);
//   })
//   .send()
//   .on("progress", function(progress) {
//     console.log(`Progress: ${progress}%`);
//   })
//   .on("done", function() {
//     console.log(`Done.`);
//     thread.kill();
//   });
