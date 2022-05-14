//Drag and Drop Functionality

function allowDrop(ev) {
  ev.preventDefault();
}

var price = 0;

const tableBillItems = {
  tableOne: [0, 0],
  tableTwo: [0, 0],
  tableThree: [0, 0],
}

function drag(ev) {
  
  let className = ev.target.classList[1];
  //console.log(className);

  let selectorText = document.querySelectorAll("." + className)[0].innerText;
  price = selectorText.substring(selectorText.indexOf("Rs."),);
  price = price.substring(4,);
  price = Number.parseInt(price);
  //console.log(price);
}

function drop(ev) {
  ev.preventDefault();
  let targetElement = ev.target;
  let targetClass = targetElement.classList[0];
  //console.log(targetClass);
  let totItems = 0, totPrice = 0;

  switch (targetClass) {
    case "t1-drop":
      tableBillItems.tableOne[0] += price;
      tableBillItems.tableOne[1] += 1;

      totPrice = tableBillItems.tableOne[0];
      totItems = tableBillItems.tableOne[1];
      break;
    case "t2-drop":
      tableBillItems.tableTwo[0] += price;
      tableBillItems.tableTwo[1] += 1;

      totPrice = tableBillItems.tableTwo[0];
      totItems = tableBillItems.tableTwo[1];
      break;
    case "t3-drop":
      tableBillItems.tableThree[0] += price;
      tableBillItems.tableThree[1] += 1;

      totPrice = tableBillItems.tableThree[0];
      totItems = tableBillItems.tableThree[1];
      break;
    default: console.log("Drag across each table");
    return;
  }

  document.querySelectorAll("." + targetClass)[1].innerHTML = "Rs. " + totPrice;  //price
  document.querySelectorAll("." + targetClass)[2].innerHTML = "Total Items: " + totItems;  //items

}


// Search Bar Functionality

function search_item() {
  let inputText = document.getElementById('searchbar-menu').value
  inputText = inputText.toLowerCase();
  let itemElements = document.getElementsByClassName('item');
    
  for (let eachElement = 0; eachElement < itemElements.length; eachElement++) { 
    
      if (!itemElements[eachElement].innerHTML.toLowerCase().includes(inputText)) {
          itemElements[eachElement].style.display="none";
      }
      else {
          itemElements[eachElement].style.display="list-item";                 
      }
  }
}

function search_table() {
  let inputText = document.getElementById('searchbar-table').value
  inputText = inputText.toLowerCase();
  let itemElements = document.getElementsByClassName('table');
    
  for (let eachElement = 0; eachElement < itemElements.length; eachElement++) { 
    
      if (!itemElements[eachElement].innerHTML.toLowerCase().includes(inputText)) {
          itemElements[eachElement].style.display="none";
      }
      else {
          itemElements[eachElement].style.display="list-item";                 
      }
  }
}