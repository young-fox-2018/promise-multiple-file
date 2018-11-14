const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
   return new Promise((resolve, reject)=>{
     fs.readFile(file, 'utf-8', (err,data) =>{
       if(err){
         reject({
           message: 'terjadi error pada proses pembacaan data'
         })
       } else {
         resolve(JSON.parse(data))
       }
     })
   })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  return new Promise((resolve, reject) => {
    let dataParent = null
    readFilePromise(parentFileName)
      .then ( data =>{
        dataParent = data
        readFilePromise(childrenFileName) .then( data2 =>{
          dataParent.forEach(element => {
              let childrens = data2.filter(children => children.family === element.last_name )
              element.children = childrens.map(x => x.full_name)
          });  
          console.log(dataParent)    
        }).catch(err => {
          console.log(err)
        })
      })
      .catch(err => {
            console.log(err)
      })
  })
}

// matchParentsWithChildrens('./parents.json', './childrens.json');
// console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');