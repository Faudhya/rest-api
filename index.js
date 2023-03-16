const express = require("express");
const PORT = 2000;
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let products = [
    {
        id: 1,
        name: "ayam goreng",
        price: 12000,
    },
    {
        id: 2,
        name: "sate ayam",
        price: 15000,
    },
];

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

//get method
app.get("/api", (req, res) => {
    // res.send("get method");
    res.json({
        status: "ok",
        data: products,
    });
});

//post method
app.post("/api", (req, res) => {
    console.log("POST", req.body);
    const addProduct = req.body;

    const productsId = products.map((product) => product["id"]);
    const newId = Math.max(...productsId) + 1;

    products.push({
        id: newId,
        ...addProduct,
    });
    res.json({
        status: "ok",
        message: "data successfully added",
    });
});

//put method
app.put("/api", (req, res) => {
    console.log("PUT", req.body);
    const replacedProduct = req.body;
    const productsId = products.map((product) => product["id"]);
    const index = productsId.indexOf(replacedProduct["id"]);

    if (index === -1) {
        res.json({
            status: "error",
            message: "product ID does not exist",
        });
    } else {
        products[index] = replacedProduct;
        res.json({
            status: "ok",
            message: "data successfully replaced",
        });
    }
});

//patch method
app.patch("/api", (req, res) => {
    console.log("PATCH", req.body);
    const updatedProduct = req.body;
    const productsId = products.map((product) => product["id"]);
    const index = productsId.indexOf(updatedProduct["id"]);

    if (index === -1) {
        res.json({
            status: "error",
            message: "product ID not exist",
        });
    } else {
        products[index] = updatedProduct;
        res.json({
            status: "ok",
            message: "data successfully updated",
        });
    }
});

app.delete("/api", (req, res) => {
    console.log("DELETE", req.body);

    const deletedProduct = req.body;
    const productsId = products.map((product) => product["id"]);
    const index = productsId.indexOf(deletedProduct["id"]);

    if (index === -1) {
        res.json({
            status: "error",
            message: "product ID not exist",
        });
    } else {
        products.splice(index, 1);
        res.json({
            status: "ok",
            message: "data successfully deleted",
        });
    }
});
