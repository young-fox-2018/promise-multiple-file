const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  return new Promise((resolve, reject) => {
    //TODO:

    fs.readFile(`${file}`, 'utf8', (err, data) => {
      err ? reject(err) : resolve(data)
    })
  })
}

function matchData(parentfile, childrenfile) {
  let dataParent = JSON.parse(parentfile)
  let dataChildren = JSON.parse(childrenfile)

  for (let i = 0; i < dataParent.length; i++) {
    dataParent[i].children = []
    for (let j = 0; j < dataChildren.length; j++) {
      if (dataChildren[j].family == dataParent[i].last_name) {
        dataParent[i].children.push(dataChildren[j].full_name)
      }
    }
  }

  console.log(dataParent);
  
}


function matchParentsWithChildrens(parentFileName, childrenFileName) {
  let parent_data = undefined
  let children_data = undefined
  readFilePromise(parentFileName).then((data) => {
    parent_data = data
    return readFilePromise(childrenFileName)
  }).then((data1) => {
    children_data = data1
    matchData(parent_data, children_data)
  })
  

}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');