// fetch("http://localhost:3000/products",{ mode: 'no-cors' })
// .then(response => response.json())
// .then(data => {
//   data.forEach(element => {
//     const p = document.createElement("p")
//     p.append(element)
//     body.append(p)
//   });
    
  
// });



async function getData() {
    try {
      const response = await fetch("http://localhost:3000/products",{ mode: 'no-cors' });
      const data = await response.json()
      console.log(data);
    //   data.forEach(element => {
    //     const p = document.createElement("p")
    //     p.append(element)
    //     body.append(p)
    //   });
      
    } catch (error) {
      console.log(error);
    }
  }
  
  getData();