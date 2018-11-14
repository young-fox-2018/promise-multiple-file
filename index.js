const fs = require('fs');
// var sleep = require('sleep');

function readFilePromise(file) {
  // psst, the promise should be around here...
  return new Promise ((resolve, reject) => {
    fs.readFile(file, 'utf8', function(err, data) {
      if(err) {
        reject(err)
      } else {
        resolve(JSON.parse(data))
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  return new Promise ((resolve, reject) => {
    readFilePromise(childrenFileName)
    .then((data) => {
      let dataChildren = data
        readFilePromise(parentFileName)
          .then((data) => {
            let dataParent = data
            for(let i = 0; i < dataParent.length; i++) {
              dataParent[i].childrens = []
              for(let j = 0; j < dataChildren.length; j++) {
                if(dataChildren[j].family === dataParent[i].last_name) {
                  dataParent[i].childrens.push(dataChildren[j].full_name)
                }
              }
            }
            resolve(dataParent)
          })
          .catch((err) => {
            console.log(err)
          })
    })
    .catch((err) => {
      console.log(err)
    })
  })
}

matchParentsWithChildrens('./parents.json', './childrens.json')
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  })
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');