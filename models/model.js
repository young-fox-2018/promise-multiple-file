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
    static sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }
    static matchParentsWithChildren() {
        console.log('Notifikasi: Data sedang Di proses!!')
        Model.sleep(5000)
        return Promise.all([Model.readFilePromise('./parents.json'), Model.readFilePromise('./childrens.json')])
    }

}

module.exports = Model