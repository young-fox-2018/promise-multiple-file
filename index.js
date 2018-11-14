const fs = require('fs');
// var sleep = require('sleep');
var parentsFile = "/Users/Kevin/Documents/Hacktiv8/Phase-1/Excercise/week3/day4/promise-multiple-file/parents.json";
const childrenFile = "/Users/Kevin/Documents/Hacktiv8/Phase-1/Excercise/week3/day4/promise-multiple-file/children.json";


function readFilePromise(file) {
  // psst, the promise should be around here...

  return new Promise((resolve, reject) => {

    fs.readFile(file,"utf-8", function(err,data){
      if(err){
        reject(err)
      }
      else{
        resolve(JSON.parse(data))
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  
  return new Promise((resolve, reject)=>{
    let parentData = [];
    readFilePromise(parentFileName)
      .then((data) => {
        parentData = data
        return readFilePromise(childrenFileName)
      })
      .then((childrenData)=> {

        const data = parentData.map((element) =>{
          const obj = {
            id : element.id,
            first_name: element.first_name,
            last_name: element.last_name,
            childrens: []
          }

          obj.childrens = childrenData.filter((datum) => datum.family === obj.last_name)
          return obj
        })


        resolve(data)

      })
      .catch((err) =>{
        reject(err)
    })

  })
}

matchParentsWithChildrens('./parents.json', './childrens.json')
.then((data)=>{
  console.log(data)
})
.catch((err)=>{
  console.log(err)
});
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');


[
  {
    id: '1',
    firstName: '',
    lastName: '',
    childrens: []
  }
]