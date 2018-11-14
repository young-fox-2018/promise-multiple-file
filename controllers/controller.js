const Model = require('../models/model')
const View = require('../views/view')

class Controller {
    static match() {
        Model.matchParentsWithChildren()
            .then(function (data) {
                let parentData = data[0]
                let childrenData = data[1]
                parentData.forEach(function (element, i) {
                    parentData[i].childrens = []
                    childrenData.forEach(function (element, j) {
                        if (childrenData[j].family === parentData[i].last_name)
                            parentData[i].childrens.push(`${element.full_name}`)
                    })
                })
                View.showData(parentData)
            })
            .catch(function (err) {
                View.showErr(err)
            })

    }
}

module.exports = Controller