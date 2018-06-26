const plimit= require('./promiseLimit');
const fs = require('fs');

const taskFun = async function(para){
  const file = para.toString();
  return new Promise((resolve, reject) => {
    fs.access(file, fs.constants.F_OK, (err) => {
      // return `${file} ${err ? 'does not exist' : 'exists'}`;
      return resolve(para);
    })
  });
}

// task = { func:async_function, para:parameter_object }

// startTime toTime paralizeLimit
const script = async function(from, to, paralize){
  let tasks = [];

  for(let i = 0; i < 10; ++i){
    tasks.push({'func':taskFun, 'para':i});
  }
  
  console.log('taskLimit');
  const result = await plimit.taskLimit(tasks, 4);

  console.log(result);
}

const script1 = async function(from, to, paralize){
  let tasks = [];

  for(let i = 100; i < 110; ++i){
    tasks.push(i);
  }
  
  console.log('parasLimit');
  const result = await plimit.parasLimit(tasks, 2, taskFun);

  console.log(result);
}

const script2 = async function(from, to, paralize){
  const result = await taskFun(1);
  console.log(result);
}



script();

script1();
