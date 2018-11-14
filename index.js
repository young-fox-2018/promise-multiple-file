const fs = require('fs');
// var sleep = require('sleep');


function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, function(err, data){
      if(err){
        reject({msg: 'Err di pembacaan data', error:err})
      } else {
        resolve(JSON.parse(data))
      }
    })
  })
}


function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // return new Promise((resolve, reject)=>{
  //   if(err){
  //     reject({msg:'error dalem match!', error:err})
  //   } else {
      readFilePromise(parentFileName)
      .then((parent)=> {
        console.log('Generate Parent')
        sleep(2000)
        readFilePromise(childrenFileName)
        .then((child)=> {
          parent.forEach(element => {
            element.childrens = child.filter((children)=> children.family === element.last_name)
                .map((fullname)=> fullname.full_name)
          });
          console.log(parent)
        })
      })
      .catch((err)=> {
        console.log({msg: 'error di match', error:err})
      })
  
  // })
  
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');