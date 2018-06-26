// tasks = array of tasks { func:async_function, para:parameter_object }
// limit
const taskLimit = async function(tasks, limit) {
  console.log(`taskLimit start, total:${tasks.length}, limit:${limit}`);
  return new Promise((resolve, reject) => {
    let result = new Array(tasks.length);
    let remainTask = tasks.length;
    let running = 0;
    async function run(n) {
      // console.log(`n ${n} running`);
      remainTask--;
      running++;
      try{
        const ret = await tasks[n].func(tasks[n].para);
        result[n]={succ:ret};
      } catch (e) {
        result[n] = {err : e};
      }
      running--;
      // console.log(`n ${n} finished, remainTask=${remainTask}, running=${running}`);
      if(remainTask  > 0){
        return run(tasks.length - remainTask);
      }
      if(running == 0){
        return resolve(result);
      }
    }
    if(!limit) {
      limit = 1;
    } else if(limit > tasks.length){
      limit = tasks.length;
    }
    for(let i = 0; i < limit; ++i) {
      run(i);
    }
  });
}

// paras = array of paras
// limit
const parasLimit = async function(paras, limit, asyncFunc) {
  let tasks = [];
  for(let i = 0; i < paras.length; ++i) {
    tasks.push({'func':asyncFunc, 'para':paras[i]});
  }
  return taskLimit(tasks, limit);
}

module.exports = {taskLimit, parasLimit};