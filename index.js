const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(filename) {
  // psst, the promise should be around here...
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf8", (err, data) => {
      if(err){
        let objErr = 
        {
          Message: "Terjadi error pada proses pembacaan data.",
          Details: err
        }
        reject(objErr)
      }
      else{
        resolve(JSON.parse(data))
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  let newParentsData = null
  
  readFilePromise(parentFileName)
    .then(dataParents => {
      newParentsData = dataParents
      return readFilePromise(childrenFileName)
    })
    .then(dataChildren => {
      sleep.sleep(5)
      dataChildren.forEach(child => {
        newParentsData.map(parent => {
          if(child.family === parent.last_name){
            if(!parent.children){
              parent.children = [child.full_name]
            }
            else{
              parent.children.push(child.full_name)
            }
          }
        })
      })
      console.log(newParentsData)   
    })
    .catch(err => {
      console.log(err)
    })
}

// matchParentsWithChildrens('./parents.json', './childrens.json');
// console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');