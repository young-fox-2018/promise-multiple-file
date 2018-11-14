const fs = require('fs');
//ar sleep = require('sleep');
const childrenFile = 'childrens.json'
const parentFile = 'parents.json'

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(data))
      }
    })
  })
}

const matchParentsWithChildrens = (parentFileName, childrenFileName) => {
  console.log('Data sedang diproses')

  return new Promise((resolve, reject) => {
    let parent = null

    readFilePromise(parentFileName)
      .then(parentData => {
        parent = parentData
        return readFilePromise(childrenFileName)
      })
      .then(childrenData => {
          const data = parent.map((element) => {
            const childrens = childrenData.filter(child=> child.family === element.last_name)
                              .map(el => el.full_name)

            element.childrens = childrens

            return element
          })

          resolve(JSON.stringify(data, null ,4))
        })
      .catch(err => {
          reject(err)
        })
  })
}


matchParentsWithChildrens('./parents.json', './childrens.json')
  .then(data =>  {
    console.log(data)
  })
  .catch(err => {
    console.log(err)
  })

//for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json')
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.log(err)
  })

matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json')
  .then(data => {
        console.log(data)
  })
  .catch(err => {
        console.log(err)
  })