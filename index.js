const fs = require('fs');
var sleep = require('./sleep');

function readFilePromise(path) {
  // psst, the promise should be around here...
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
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
  Promise.all([readFilePromise(parentFileName), readFilePromise(childrenFileName)])
    .then(data => {
      data[0].forEach(parent => {
        parent.children = []
        data[1].forEach(children => {
          if (parent.last_name === children.family) {
            parent.children.push(children.full_name)
          }
        })
      })
      console.log(data[0])
    })
    .catch(err => {
      console.log(`Terjadi error pada saat proses pembacaan data!`)
    })
  // sleep.sleep(5)
}


matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');