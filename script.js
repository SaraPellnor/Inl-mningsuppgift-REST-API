
const container = document.querySelector(".container")

// async function generateId () {
//   const response = await fetch("http://localhost:3000/products")
//   const data = await response.json()

//   let num = Math.floor(Math.random() * 10000000);
//   if (!(data.find(element => element.id == num))) {
//     console.log(num);
//     return num;

//   } else {
//       generateId()
//     }
// }
// generateId()
// console.log("nummer" + generateId());


async function getData() {
  try {
    const response = await fetch("http://localhost:3000/products")
    const data = await response.json()
    data.forEach(element => {
      const product = document.createElement("product")
      product.setAttribute("class", "product")
      const description = document.createElement("h4");
      const name = document.createElement("p");
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
      price.innerHTML = element.price
      deleteBtn.innerHTML = "Ta bort"
      changeBtn.innerHTML = "Ändra"
      product.append(description, name, price, deleteBtn, changeBtn)
      container.append(product)
    });

  } catch (error) {
    console.log(error);
  }
}

getData();

async function getId() {
  try {
    let number = document.getElementById("number").value
    console.log(number);
    if (number.value == undefined) {
      number = "x"
      console.log(number);
    }
    const response = await fetch(`http://localhost:3000/products/${number}`)
    const data = await response.json()
    console.log(data);
    container.innerHTML = ""
    const product = document.createElement("product")
    product.setAttribute("class", "product")
    // const button = document.createElement("button")
    // button.setAttribute("class", "deleteBtn")
    const description = document.createElement("h4");
    const name = document.createElement("p");
    const price = document.createElement("p");
    description.innerHTML = data.description
    name.innerHTML = data.name
    price.innerHTML = data.price
    // button.innerHTML = "Ta bort"
    product.append(description, name, price, /*button*/)
    container.append(product)

  } catch (error) {
    console.log(error);
  }
}

async function deleteProduct(id) {
  try {
    const response = await fetch(`http://localhost:3000/products/${id}`,
      {
        method: 'DELETE',
        // body: JSON.stringify({
        //   id: id,
        //   title: 'My New Post',
        //   content: 'This is the content of my new post'
        // }),
        // headers: {
        //   'Content-Type': 'application/json'
        // }
      })
    const data = await response.json()
    console.log(data);

  } catch (error) {
    console.log(error);
  }
}

function changeProduct(element, product) {
  try {
    product.innerHTML = ""
    const descriptionInput = document.createElement("input")
    descriptionInput.setAttribute("class", "descriptionInput")
    const nameInput = document.createElement("input")
    nameInput.setAttribute("class", "nameInput")
    const priceInput = document.createElement("input")
    priceInput.setAttribute("class", "priceInput")
    const submitChangeBtn = document.createElement("button")
    submitChangeBtn.setAttribute("class", "submitChangeBtn")
    submitChangeBtn.innerHTML = "Ändra"
    product.append(descriptionInput, nameInput, priceInput, submitChangeBtn)
    console.log(element.id);
    submitChangeBtn.addEventListener("click", async () => {
      const response = await fetch(`http://localhost:3000/products/${element.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(
            {
              "description": descriptionInput.value,
              "id": 100,
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

