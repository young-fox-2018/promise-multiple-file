const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  return new Promise(function(resolve, reject) {
    fs.readFile(file, 'utf8', function(err,data) {
      if (err) {
        reject({message: "Terjadi error pada proses pembacaan data", Error: err})
      }
      else {
        resolve(JSON.parse(data))
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  let parentData = []
  readFilePromise(parentFileName)
    .then(function(dataParent) {
      parentData = dataParent
      return readFilePromise(childrenFileName)
    })
    .then(function(dataChildren) {
      for (let i = 0; i < parentData.length; i++) {
        parentData[i].childrens = []
        for (let j = 0; j < dataChildren.length; j++) {
          if (dataChildren[j].family === parentData[i].last_name) {
            parentData[i].childrens.push(dataChildren[j].full_name)
          }
        }
      }
      console.log(parentData);
    })
    .catch(function(err) {
      console.log(err);
    })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');