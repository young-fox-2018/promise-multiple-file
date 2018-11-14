const fs = require('fs')

class Model {
    static readFilePromise(data) {
        return new Promise(function (resolve, reject) {
            fs.readFile(data, function (err, result) {
                if (err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(result))
                }
            })
        })

    }
    static matchParentsWithChildren() {
        return Promise.all([Model.readFilePromise('./parents.json'), Model.readFilePromise('./childrens.json')])
    }

}

module.exports = Model