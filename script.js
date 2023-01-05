
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
      const div = document.createElement("div")
      div.setAttribute("class", "product")
      const description = document.createElement("h4");
      const name = document.createElement("p");
      const price = document.createElement("p");
      const deleteBtn = document.createElement("button")
      deleteBtn.setAttribute("class", "deleteBtn")
      deleteBtn.setAttribute("method", "delete")
      deleteBtn.addEventListener("click", () => {deleteProduct(element.id)} )
      const changeBtn = document.createElement("button")
      changeBtn.setAttribute("class", "changeBtn")
      changeBtn.setAttribute("method", "put")
      changeBtn.addEventListener("click", () => {changeProduct(element.id)})
      description.innerHTML=element.description
      name.innerHTML=element.name
      price.innerHTML=element.price
      deleteBtn.innerHTML = "Ta bort"
      changeBtn.innerHTML = "Ändra"
      div.append(description, name, price, deleteBtn, changeBtn)
      container.append(div)
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

async function changeProduct(id) {
  try {
    const response = await fetch(`http://localhost:3000/products/${id}`)
    const data = await response.json()
    console.log(data);
    
  } catch (error) {
    console.log(error);
  }
}
  
  