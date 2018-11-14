const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  return new Promise((resolve,reject)=>{
    fs.readFile(file,'utf8',function(err,data){
      sleep.sleep(2)
      if(err){
        reject({
          message: "terjadi error pada proses pembacaan data",
          error: err
        })
      } else {
        resolve(JSON.parse(data))
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName)
  .then((data)=>{ //data parent
    let data_parent = data
    return readFilePromise(childrenFileName)
  .then((data)=>{ //data children
    let data_children = data
    
    data_parent.forEach(function(element){
      let childrenFamily = data_children.filter(data => data.family === element.last_name)
      element.childrens = childrenFamily.map(function(element2){
        return element2.full_name
      })
      
      // element.childrens = []
      // childrenFamily.forEach(function(element2){
      //   element.childrens.push(element2.full_name)
      // })
    })
    console.log(data_parent) 
  })
  })
  .catch((err)=>{
    console.log(err)
  })

  
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');