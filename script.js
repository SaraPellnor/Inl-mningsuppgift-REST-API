
const container = document.querySelector(".container")

// ----- GET -----
async function getData() {
  try {
    container.innerHTML = ""

    const header = document.createElement("h2");
    header.setAttribute("class", "header4")
    header.innerHTML = "Befintliga produkter"

    const response = await fetch("http://localhost:3000/products")
    const data = await response.json()

    data.forEach(element => {
      const product = document.createElement("div")
      product.setAttribute("class", "product")

      const name = document.createElement("h4");
      name.setAttribute("class", "name")
      name.addEventListener("click", () => { getProductById(element, element.id, changeBtn) })
      name.innerHTML = element.name

      const price = document.createElement("p");
      price.innerHTML = element.price + ":-"

      const deleteBtn = document.createElement("button")
      deleteBtn.setAttribute("class", "deleteBtn")
      deleteBtn.setAttribute("method", "delete")
      deleteBtn.addEventListener("click", () => { deleteProduct(element.id) })
      deleteBtn.innerHTML = "Ta bort"

      const changeBtn = document.createElement("button")
      changeBtn.setAttribute("class", "changeBtn")
      changeBtn.setAttribute("method", "put")
      changeBtn.addEventListener("click", () => { changeProduct(element, product) })
      changeBtn.innerHTML = "Ändra"

      product.append(name, price, deleteBtn, changeBtn)
      container.append(header, product)
    });

  } catch (error) {
    console.log(error);
  }
}
getData();

// ----- GET BY ID -----
async function getProductById(element, id, changeBtn) {
  try {
    const response = await fetch(`http://localhost:3000/products/product/${id}`,
      {
        method: 'GET',
      })
    const data = await response.json()

    container.innerHTML = ""

    const product = document.createElement("product")
    product.setAttribute("class", "product")

    const description = document.createElement("p");
    description.innerHTML = `<p><b>Beskrivning:</b> <br> ${data.description}</p>`

    const ID = document.createElement("p");
    ID.innerHTML = `<p><b>Id:</b> <br> ${data.id}</p>`

    const name = document.createElement("p");
    name.innerHTML = `<p><b>Namn:</b> <br> ${data.name}</p>`

    const price = document.createElement("p");
    price.innerHTML = `<p><b>Pris:</b> <br> ${data.price}</p>`

    const returnBtn = document.createElement("button");
    returnBtn.setAttribute("class", "returnBtn")
    returnBtn.addEventListener("click", getData)
    returnBtn.innerHTML = "tillbaka"

    changeBtn.addEventListener("click", () => { changeProduct(element, product) })

    product.append(description, ID, name, price, changeBtn, returnBtn)
    container.append(product)

  } catch (error) {
    console.log(error);
  }
}

// ----- POST -----
async function createProduct() {
  try {
    const createDesInput = document.querySelector(".createDesInput")
    const createNameInput = document.querySelector(".createNameInput")
    const createPriceInput = document.querySelector(".createPriceInput")

    const response = await fetch("http://localhost:3000/products/post/",
      {
        method: 'POST',
        body: JSON.stringify(
          {
            "description": createDesInput.value,
            "id": Math.floor(Math.random() * 1000),
            "name": createNameInput.value,
            "price": createPriceInput.value
          }
        ),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    await response.json()

  } catch (error) {
    console.log(error);
  }
}

// ----- PUT -----
function changeProduct(element, product) {
  try {
    product.innerHTML = ""

    const description = document.createElement("p")
    description.innerHTML = "Beskrivning: "

    const descriptionInput = document.createElement("textarea")
    descriptionInput.setAttribute("class", "descriptionInput")
    descriptionInput.value = element.description

    const id = document.createElement("p")
    id.innerHTML = "Id: "

    const idInput = document.createElement("input")
    idInput.setAttribute("class", "idInput")
    idInput.setAttribute("value", element.id)
    idInput.setAttribute("type", "number")

    const name = document.createElement("p")
    name.innerHTML = "Namn: "

    const nameInput = document.createElement("input")
    nameInput.setAttribute("class", "nameInput")
    nameInput.setAttribute("value", element.name)

    const price = document.createElement("p")
    price.innerHTML = "Pris: "

    const priceInput = document.createElement("input")
    priceInput.setAttribute("class", "priceInput")
    priceInput.setAttribute("value", element.price)
    priceInput.setAttribute("type", "number")

    const submitChangeBtn = document.createElement("button")
    submitChangeBtn.setAttribute("class", "submitChangeBtn")
    submitChangeBtn.innerHTML = "Ändra"

    const returnBtn = document.createElement("button");
    returnBtn.setAttribute("class", "returnBtn")
    returnBtn.addEventListener("click", getData)
    returnBtn.innerHTML = "tillbaka"

    product.append(description, descriptionInput, id, idInput, name, nameInput, price, priceInput, submitChangeBtn, returnBtn)

    submitChangeBtn.addEventListener("click", async () => {
      const response = await fetch(`http://localhost:3000/products/put/${element.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(
            {
              "description": descriptionInput.value,
              "id": idInput.value,
              "name": nameInput.value,
              "price": priceInput.value
            }
          ),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      await response.json()
    })
  } catch (error) {
    console.log(error);
  }
}

// ----- DELETE -----
async function deleteProduct(id) {
  try {
    const response = await fetch(`http://localhost:3000/products/delete/${id}`,
      {
        method: 'DELETE',
      })
    await response.json()
  } catch (error) {
    console.log(error);
  }
}


