const { response } = require("express");
const express = require("express");
const burgers = require("../models/burger");
const burgerData = require("../models/burger");

const router = express.Router();

// Read function
router.get("/", (req, res) => {
    burgerData.all((data) => {
        const viewData = {
            burgers: data
        };
        console.log(viewData);
        res.render("index", viewData);
    });
});

// Create function
router.post("/api/burgers", (req, res) => {
    burgerData.create(
        ["burger_name", "devoured"],
        [req.body.burger_name, req.body.devoured],
        (result) => {
            res.json({ id: result.insertID})
        }
    );
});

// Update function
router.put("/api/burgers/:id", (req, res) => {

    const condition = `id = ${req.params.id}`;

    console.log("Condition:", condition);

    burgerData.update({ devoured: req.body.devoured }, condition, (result) => {
        if (result.changedRows == 0) {
            return res.status(404).end();
        }
        res.status(200).end();
    });
});

router.delete("/api/burgers/:id", (req, res) => {
    
    console.log(req.params);
    const condition = `id = ${req.params.id}`;

    
    console.log("Condition:", condition);

    burgerData.delete(condition, (result) => {
        if(result.affectedRows == 0) {
            return res.status(404).end();
        }
        res.status(200).end();
    })
})

module.exports = router;