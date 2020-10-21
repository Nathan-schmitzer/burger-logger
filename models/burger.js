const orm = require("../config/orm");






// export function that will be in this folder
const burgers = {
//    function calling on orm to run the sql function querying all 
    all: (cb) => {
        orm.all("burgers", (results) => {
            cb(results);
        });
    },
    create: (cols, vals, cb) => {
        orm.create("burgers", cols, vals, (results) => {
        cb(results);
        });
    },
    update: (objColVals, condition, cb) => {
        orm.update("burgers", objColVals, condition, (results) => {
        cb(results);
        });
    },
    delete: (condition, cb) => {
        orm.delete("burgers", condition, (results) => {
        cb(results);
        });
    }
};

module.exports = burgers;