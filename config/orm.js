const connection = require("../config/connection");

function printQuestionMarks(num) {
    let arr = [];

    for (let i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
};

function objToSql(obj) {
    let arr = [];

    for (let key in obj) {
        let value = obj[key];

        if(Object.hasOwnProperty.call(obj, key)) {
            if (typeof value === 'string' && value.indexOf(" ") >= 0) {
                value = `'${value}'`;
            }
            arr.push(`${key}=${value}`);
        }
    }
    
    return arr.toString();
}


// orm object to hold sql syntax: functions include selecting all information from
// table, creating a new record, updating a record and deleting a record!
const orm = {
    all: (tableInput, cb) => {
        const queryString = `SELECT * FROM ${tableInput}`;
        connection.query(queryString, (err, result) => {
            if(err) {
                throw err;
            }
            cb(result);
        });
    },
    create: (table, cols, vals, cb) => {
        let queryString = `INSERT INTO ${table}`;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, (err, result) => {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    update: (table, objColVals, condition, cb) => {
        let queryString = `UPDATE ${table}`;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    delete: (table, condition, cb) => {
        let queryString = `DELETE FROM ${table} WHERE ${condition}`;
        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }
            cb(result);
        });
        
    }
};

module.exports = orm;