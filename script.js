
const container = document.querySelector(".container")

// ----- GET -----
async function getData() {
  try {
    container.innerHTML = ""
    const header = document.createElement("h4");
    header.setAttribute("class", "header4")
    header.innerHTML = "Befintliga produkter"
    const response = await fetch("http://localhost:3000/products")
    const data = await response.json()
    data.forEach(element => {
      const product = document.createElement("div")
      product.setAttribute("class", "product")
      const description = document.createElement("h4");
      const name = document.createElement("p");
      name.addEventListener("click",  () => { getProductById(element.id) })
      name.addEventListener('mouseenter', function() {
        name.style.color = 'red';
        name.style.fontSize= "larger";
      name.addEventListener('mouseleave', function() {
        name.style.color = 'black';
        name.style.fontSize= "";
        });
      });
      const price = document.createElement("p");
      const deleteBtn = document.createElement("button")
      deleteBtn.setAttribute("class", "deleteBtn")
      deleteBtn.setAttribute("method", "delete")
      deleteBtn.addEventListener("click", () => { deleteProduct(element.id) })
      const changeBtn = document.createElement("button")
      changeBtn.setAttribute("class", "changeBtn")
      changeBtn.setAttribute("method", "put")
      changeBtn.addEventListener("click", () => { changeProduct(element, product) })
      description.innerHTML = element.description
      name.innerHTML = element.name
      price.innerHTML = element.price + ":-"
      deleteBtn.innerHTML = "Ta bort"
      changeBtn.innerHTML = "Ändra"
      product.append(description, name, price, deleteBtn, changeBtn)
      container.append(header, product)
    });

  } catch (error) {
    console.log(error);
  }
}
getData();


// ----- GET BY ID -----
async function getProductById(id) {
  try {
    const response = await fetch(`http://localhost:3000/products/${id}`,
    {
      method: 'GET',
    })
    const data = await response.json()
    container.innerHTML = ""
    const product = document.createElement("product")
    product.setAttribute("class", "product")
    const description = document.createElement("h4");
    const ID = document.createElement("p");
    const name = document.createElement("p");
    const price = document.createElement("p");
    const returnBtn = document.createElement("button");
    returnBtn.setAttribute("class", "returnBtn")
    returnBtn.addEventListener("click", getData)
    description.innerHTML = `<p>Beskrivning: ${data.description}</p>`
    ID.innerHTML = `<p>Id: ${data.id}</p>`
    name.innerHTML = `<p>Namn: ${data.name}</p>`
    price.innerHTML = `<p>Pris: ${data.price}</p>`
    returnBtn.innerHTML = "tillbaka"
    product.append(description, ID, name, price, returnBtn)
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
    const response = await fetch("http://localhost:3000/products",
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
    const data = await response.json()
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

// ----- PUT -----
function changeProduct(element, product) {
  try {
    product.innerHTML = ""
    const descriptionInput = document.createElement("input")
    descriptionInput.setAttribute("class", "descriptionInput")
    descriptionInput.setAttribute("value", element.description)
    const idInput = document.createElement("input")
    idInput.setAttribute("class", "idInput")
    idInput.setAttribute("value", element.id)
    idInput.setAttribute("type", "number")
    const nameInput = document.createElement("input")
    nameInput.setAttribute("class", "nameInput")
    nameInput.setAttribute("value", element.name)
    const priceInput = document.createElement("input")
    priceInput.setAttribute("class", "priceInput")
    priceInput.setAttribute("value", element.price)
    priceInput.setAttribute("type", "number")
    const submitChangeBtn = document.createElement("button")
    submitChangeBtn.setAttribute("class", "submitChangeBtn")
    submitChangeBtn.innerHTML = "Ändra"
    product.append(descriptionInput, nameInput, priceInput, idInput, submitChangeBtn)
    submitChangeBtn.addEventListener("click", async () => {
      const response = await fetch(`http://localhost:3000/products/${element.id}`,
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
      const data = await response.json()
      console.log(data);
    })
  } catch (error) {
    console.log(error);
  }
}


// ----- DELETE -----
async function deleteProduct(id) {
  try {
    const response = await fetch(`http://localhost:3000/products/${id}`,
      {
        method: 'DELETE',
      })
    const data = await response.json()
    console.log(data);

  } catch (error) {
    console.log(error);
  }
}


