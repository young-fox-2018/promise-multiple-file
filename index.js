const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  // psst, the promise should be around here...
  return new Promise ((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      // sleep.sleep(5);
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(data))
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  let parent_data = []
  readFilePromise(parentFileName)
  .then((data) => {
    parent_data = data
    return readFilePromise(childrenFileName)
    })
    .then((data) => {
      parent_data.forEach(parent => {
        parent.childrens = []
        data.forEach(child => {
          if (parent.last_name === child.family) {
            parent.childrens.push(child.full_name)
          }
        });
      });
      console.log(parent_data);
    })
    .catch((err) => {
      console.log(`Terjadi error pada proses pembacaan data..`);
      console.log(err);
    })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');