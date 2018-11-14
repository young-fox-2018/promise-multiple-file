const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  // psst, the promise should be around here...
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, rows) => {
      if(err) {
        reject({
          message: 'Error di Read File',
          detais: err
        })
      } else {
        resolve(JSON.parse(rows))
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName)
  .then((parent_data) => {
    sleep.sleep(1);         
    return readFilePromise(childrenFileName)
      .then((children) => {
        sleep.sleep(1);
        parent_data.forEach(data => {
          data.childrens = children.filter(child => child.family === data.last_name).map(child => child.full_name);            
          return data.childrens;
        }
        );          
        console.log(parent_data);
      })
  })
  .catch((err) => {
    console.log(err);
  })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');