const fs = require('fs');
sleep = require('./sleep');

function readFilePromise(file, parent) {
  return new Promise(function (resolve, reject) {
    fs.readFile(`${file}`, function (err, data) {
      if (err) {
        reject(err)
      }
      else {
        if (!parent) {
          resolve(JSON.parse(data))
        } else {
          let child = JSON.parse(data)
          parent.forEach(data => {
            data.children = []
            child.forEach(dataChild => {
              if (data.last_name === dataChild.family) {
                data.children.push(dataChild.full_name)
              }
            })
          })
          resolve(parent)
        }
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  readFilePromise(parentFileName)
    .then(function (read_data_parent) {
      return readFilePromise(childrenFileName, read_data_parent)
    })
    .then(function (parent) {
      sleep(5)
      console.log(parent)
    })
    .catch(function (err) {
      console.log("terjadi error pada proses pembacaan data")
    })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');