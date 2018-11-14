const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  return new Promise ((resolve, reject) => {
    fs.readFile(file, 'utf8', function(err, data) {
      sleep.sleep(1)
      if (err) {
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
    .then((dataParents) => {
      // console.log(dataParent)
      dataParent = dataParents
      return readFilePromise(childrenFileName)
    })
    .then((dataChild) => {

      dataParent.forEach(element => {
        element.childrens = dataChild.filter((elementChild) => element.last_name === elementChild.family)
        .map((datum) => datum.full_name)
      });

      console.log(dataParent)

    })
    .catch((err) => {
      console.log({
        message: 'Terjadi error pada proses pembacaan data',
        err:err
      })
    })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');