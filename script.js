
const container = document.querySelector("div")
container.setAttribute("class", "container")


async function getData() {
    try {
      const response = await fetch("http://localhost:3000/products")
      const data = await response.json()
      data.forEach(element => {
        const div = document.createElement("div")
        div.setAttribute("class", "product")
        const description = document.createElement("h4");
        const name = document.createElement("p");
        const price = document.createElement("p");
        const button = document.createElement("button")
        button.setAttribute("class", "deleteBtn")
        button.setAttribute("method", "delete")
        button.addEventListener("click", deleteProduct(element.id))
        description.innerHTML=element.description
        name.innerHTML=element.name
        price.innerHTML=element.price
        button.innerHTML = "Ta bort"
        div.append(description, name, price, button)
        container.append(div)
      });
      
    } catch (error) {
      console.log(error);
    }
  }
  
  getData();

  async function getId() {
    try {
      const number = document.getElementById("number").value
      console.log(number);
      const response = await fetch(`http://localhost:3000/products/${number}`)
      const data = await response.json()
      console.log(data);
      container.innerHTML = ""
      const div = document.createElement("div")
      div.setAttribute("class", "product")
      // const button = document.createElement("button")
      // button.setAttribute("class", "deleteBtn")
      const description = document.createElement("h4");
        const name = document.createElement("p");
        const price = document.createElement("p");
        description.innerHTML=data.description
        name.innerHTML=data.name
        price.innerHTML=data.price
        // button.innerHTML = "Ta bort"
        div.append(description, name, price, /*button*/)
        container.append(div)
      
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProduct(id) {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`)
      const data = await response.json()
      console.log(data);
      
    } catch (error) {
      console.log(error);
    }
  }
  