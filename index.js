const fs = require('fs');
//var sleep = require('sleep');

function readFilePromise(file) {
    return new Promise(function(resolve, reject) {
      fs.readFile(file, "utf8", function(err, data) {
        if (err) reject(err)
        else {
          let parse_data = JSON.parse(data)
          resolve(parse_data)
        }
     })
    })
}
var parentData = null
function matchParentsWithChildrens(parentFileName, childrenFileName) {
      return new Promise(function(resolve, reject) {
            readFilePromise(parentFileName)
                .then(function(parentFile) {
                    parentData = parentFile
                    return readFilePromise(childrenFileName)
                })
                .then(function(childrenData) {
                    let output = []
                        for (let i = 0; i < parentData.length; i++) {
                            let parentChild = childrenData.filter(childrenData => childrenData.family == parentData[i].last_name)
                            let parentChildArr = parentChild.map(obj => obj.full_name)
                            parentData[i].children = parentChildArr
                            output.push(parentData[i])
                        }
                    resolve(output)
                })
                .catch(function(err) {
                    reject(err)
                })
      })
}




matchParentsWithChildrens('./parents.json', './childrens.json')
    .then (function(data) {
        console.log(data)
    })
    .catch (function(err) {
        console.log(err)
    })
console.log("Notification : Data sedang diproses !");
console.log("DATA PARENT CHILDREN NYA ADALAH:")

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json')
    .then (function(data) {
        console.log(data)
    })
    .catch (function(err) {
        console.log(err)
    })
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json')
    .then (function(data) {
        console.log(data)
    })
    .catch (function(err) {
        console.log(err)
    })