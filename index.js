const fs = require('fs');
// var sleep = require('sleep');

function readFilePromise(parentData) {
  return new Promise((resolve, reject) => {
    fs.readFile(parentData, "utf8", (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(JSON.parse(data))
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  let dataParent = []
  readFilePromise(parentFileName)
    .then(function(dataParents){
      dataParent = dataParents
      return readFilePromise(childrenFileName)
    })
    .then(function (dataChild) {
      for(let i = 0; i < dataParent.length; i++) {
        dataParent[i].childrens = [];
        for(let j = 0; j < dataChild.length; j++) {
         if(dataChild[j].family === dataParent[i].last_name) {
          dataParent[i].childrens.push(dataChild[j].full_name)
         }
        } 
      }
      console.log(dataParent)
    })
    .catch(function(err) {
      console.log(err)
    })
}
// your code here... (p.s. readFilePromise function(s) should be around here..)
matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');


      // readFilePromise(childrenFileName).then(function(childData) {
      // })