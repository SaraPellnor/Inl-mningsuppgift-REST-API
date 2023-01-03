// Hämtar "express-api-functionen" som sparas i "const app"
const express = require("express")
// const cors = require("cors")
const app = express()
const fs = require("fs");
const port = 3000

app.use(express.json())
// app.use(cors({ origin: ["http://localhost:3000/products"] }))

// ----- Hämtar alla product i json-filen -----
app.get('/products', (req, res) => {
  fs.readFile("products.jon", (err, data) => {
    if (err) {
      return res.status(404).send(err)
    }

    try {
      const products = JSON.parse(data)
      return res.status(200).send(products)
      // return products
    } catch (error) {
      
      return res.status(404).send(error + ". <br><h1>Felkod: 404</h1>")
      
    }
  })
})

// ----- Hämta en specifik produkt från json-filen -----
app.get('/products/:id', (req, res) => {
  fs.readFile("products.json", (err, data) => {
    if (err) {
      res.status(404).send(err)
    }

    try {
      const products = JSON.parse(data)
      const id = req.params.id
      for (const product of products) {
        if (id == product.id) {
          return res.status(200).send(product)
        } else if (id > products.length) {
          return res.status(404).send("Produkten finns inte...")
        }
      }
    } catch (error) {
      res.status(404).send(error + ". <br><h1>Felkod: 404</h1>")
    }
  })
})

// ----- Lägg till en produkt till json-filen -----
app.post("/products", (req, res) => {

  fs.readFile("products.json", (err, data) => {
    if (err) {
      res.status(404).send(err)
    }
    try {
      const products = JSON.parse(data)
      let newProduct =
      {
        "description": "Matta",
        "id": 6,
        "name": "ELSAFORM",
        "price": 1699
      }
      for (const product of products) {
        if (product.id == newProduct.id) {
          return res.status(404).send("Produktren finns redan i listan...")
        }
      }
      products.push(newProduct)
      fs.writeFile("products.json", JSON.stringify(products, null, 2), function (err) {
        if (err) {
          res.status(404).send(err)
        }
      })
      return res.status(201).json(products)
    } catch (error) {
      res.status(404).send(error + ". <br><h1>Felkod: 404</h1>")
    }

  })
})

// ----- Ändra en specifik produkt i json-filen -----
app.put('/products/:id', (req, res) => {

  fs.readFile("products.json", (err, data) => {
    if (err) {
      res.status(404).send(err)
    }
    try {
      const products = JSON.parse(data)
      const id = req.params.id

      for (const product of products) {
        if (product.id == id) {
          const newArr = products.map(item => {
            if (item.id == product.id) {
              return { ...item, price: "Det är gratis idag!" }
            }
            return item
          })

          fs.writeFile("products.json", JSON.stringify(newArr, null, 2), function (err) {
            if (err) {
              res.status(404).send(err)
            }
          })
          return res.status(200).json(newArr)
        } else if (id > JSON.stringify(products.length)) {
          return res.status(404).send("Produkten finns inte...")
        }
      }
    } catch (error) {
      res.status(404).send(error + ". <br><h1>Felkod: 404</h1>")
    }
  })
})

// ----- Ta bort en specifik produkt från json-filen
app.delete('/products/:id', (req, res) => {

  fs.readFile("products.json", (err, data) => {
    if (err) {
      res.status(404).send(err)
    }
    try {
      const products = JSON.parse(data)
      const id = req.params.id

      for (const product of products) {
          if (id == product.id) {
            const index = products.indexOf(product)
            products.splice(index, 1)
            fs.writeFile("products.json", JSON.stringify(products, null, 2), function (err) {
              if (err) {
                res.status(404).send(err)
              }
            })
            res.status(200).json(products)
            return
        } else if (!(products.find(element => element.id == id))) {
          return res.status(404).send("Produkten finns inte...")
        }
      }
    } catch (error) {
      res.status(404).send(error + ". <br><h1>Felkod: 404</h1>")
    }
  })
})

// Lyssnar på localhost: 3000 i webbläsaren och consoleloggar detta i consollen om man skriver in node följt av index.js
app.listen(port, () => {
  console.log("lyssnar på port 3000...")
})

