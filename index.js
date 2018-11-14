const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(path) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path, 'utf8', function(err, data){
      if(err){
        sleep.sleep(2)
        reject(err)
      }else{
        sleep.sleep(2)
        resolve(JSON.parse(data))
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  Promise.all([readFilePromise(parentFileName), readFilePromise(childrenFileName)])
  .then(function(values) {
    let parentData = values[0]
    let childrenData = values[1]
    parentData.forEach(item => {
      item.children = []
      childrenData.forEach(element => {
        if(item.last_name === element.family){
          item.children.push(element.full_name)
        }
      })
    })
    console.log(parentData)
  })
  .catch(function(err) {
    console.log("-------ERROR OCCUR--------")
    console.log(err)
  })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');