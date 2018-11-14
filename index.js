const fs = require('fs');
var sleep = require('sleep');
const pathParent  = '/home/aandroomeedaa/Desktop/hacktiv8/rePhase-1/WEEK-3/day-3/promise-multiple-file/models/parents.json'
const pathChild   = '/home/aandroomeedaa/Desktop/hacktiv8/rePhase-1/WEEK-3/day-3/promise-multiple-file/models/childrens.json'
function readFilePromise(path) {
  // psst, the promise should be around here...
  // let path = ''
  return new Promise(function(resolve,reject){

    fs.readFile(path , function(err,data){
      if (err) reject(err)
      else resolve(JSON.parse(data));
          // console.log(JSON.parse(data))}
    })
  })
}


function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  return Promise.all([readFilePromise(parentFileName),readFilePromise(childrenFileName)])
  .then(values=>{
      // console.log(values)
      let parents= values[0]
      let childs = values[1]
      sleep.sleep(2)
      console.log(parents)
      sleep.sleep(2)
      console.log(childs)
      for(let i=0; i<parents.length;i++){
        parents[i].childs=[]
        // console.log(parents[i])
        for(let j=0;j<childs.length;j++){
          if(parents[i].last_name===childs[j].family){
            parents[i].childs.push(childs[j].full_name)
          }
        }
      }
      sleep.sleep(1)
      console.log(parents)

  })
  .catch(err=>{
      console.log(err)
  })

    // console.log(values)

}
// matchParentsWithChildrens(pathParent)
console.log("Notification : Data sedang diproses !");
matchParentsWithChildrens(pathParent,pathChild)


// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
