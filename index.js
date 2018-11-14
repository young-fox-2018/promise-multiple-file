const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(path) {
  // psst, the promise should be around here...
  return new Promise((resolve, reject) => {
    fs.readFile(path, function(err, data) {
      sleep.sleep(3)
      if (err) {
        reject(err)
      }
      else {
        resolve(JSON.parse(data))
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  Promise.all([readFilePromise(parentFileName), readFilePromise(childrenFileName)])
    .then(value => {
      let parent = value[0]
      let child = value[1]
      parent.forEach(elementParent => {
        elementParent.child = []
        let fam  = elementParent.last_name
        child.forEach(elementChild => {
          if (elementChild.family == fam) {
            elementParent.child.push(elementChild.full_name)
          }
        })
      });
      console.log(parent)
    })
    .catch(err => {
      console.log(`!!! Terjadi error pada proses pembacaan data !!!`)
      console.log(err)
    })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');