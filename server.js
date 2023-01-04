// Hämtar "express-api-functionen" som sparas i "const app"
const express = require("express")
const cors = require("cors")

const app = express()

const fs = require("fs");
const port = 3000

app.use(express.json())
app.use(cors())

// ----- Hämtar alla product i json-filen -----
app.get('/products', (req, res) => {

  fs.readFile("products.json", (err, data) => {
    if (err) {
      return res.status(404).send(err)
    }

    try {
      const products = JSON.parse(data)
      return res.status(200).send(products)
    } catch (error) {
      return res.status(404).send(error.message)
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
      const product = products.find(product => product.id == id)

      if (!product) {
        return res.status(404).send(`Produkten med id: ${id} finns inte...`)
      }

      return res.status(200).send(product)

    } catch (error) {
      res.status(404).send(error.message)
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
      const id = req.params.id

      let newProduct =
      {
        "description": "Matta",
        "id": 6,
        "name": "ELSAFORM",
        "price": 1699
      }

      if (products.find(product => product.id == newProduct.id)) {
        return res.status(404).send(`Produkten med id: ${newProduct.id} finns redan i listan...`)
      }

      products.push(newProduct)

      fs.writeFile("products.json", JSON.stringify(products, null, 2), function (err) {
        if (err) {
          res.status(404).send(err)
        }
      })
      return res.status(201).json(products)
    } catch (error) {
      res.status(404).send(error.message)
    }

  })
})

// ----- Ändra en specifik produkt i json-filen -----
app.put('/products/:id', (req, res) => {

  fs.readFile("products.json", (err, data) => {
    if (err) {
      log
      res.status(404).send(err)
    }
    try {
      const products = JSON.parse(data)
      const id = req.params.id
      const product = products.find(product => product.id == id)

      if (!product) {
        return res.status(404).send(`Produkten med id: ${id} finns inte...`)
      }

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
        return res.status(200).json(newArr)
      })
    } catch (error) {
      res.status(404).send(error.message)
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
      const product = products.find(product => product.id == id)

      if (!product) {
        return res.status(404).send(`Produkten med id: ${id} finns inte...`)
      }

      const index = products.indexOf(product)
      products.splice(index, 1)
      fs.writeFile("products.json", JSON.stringify(products, null, 2), function (err) {
        if (err) {
          res.status(404).send(err)
        }
      })
      res.status(200).json(products)
      return
    } catch (error) {
      res.status(404).send(error.message)
    }
  })
})

// Lyssnar på localhost: 3000 i webbläsaren och consoleloggar detta i consollen om man skriver in node följt av index.js
app.listen(port, () => {
  console.log("lyssnar på port 3000...")
})

