const fs = require('fs');
// var sleep = require('sleep');

function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) reject(err)

      else resolve(JSON.parse(data))
    })
  })
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  console.log("Notification : Data sedang diproses !");
  sleep(5000)
  Promise.all([readFilePromise(parentFileName), readFilePromise(childrenFileName)])
    .then((data) => {
      let data_parents = data[0]
      let data_childs = data[1]
      for (let i = 0; i < data_parents.length; i++) {
        data_parents[i].childrens = []
        for (let j = 0; j < data_childs.length; j++) {
          if (data_parents[i].last_name === data_childs[j].family) {
            data_parents[i].childrens.push(data_childs[j].full_name)
          }
        }

        console.log(data_parents);
      }
    })
    .catch(function (err) {
      console.log(err);
    })
}

matchParentsWithChildrens('./parents.json', './childrens.json');


// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');