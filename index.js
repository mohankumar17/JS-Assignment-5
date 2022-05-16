// Drag and Drop Functionality

function allowDrop(ev) {
    ev.preventDefault();
}

var price = 0;
var title = "";
var itemId = "";

const tableItems = [{}, {}, {}]; //for three tables

// Drag
function drag(ev) {

    let className = ev.target.classList[1]; //class="item item-1", so target is: classList[1]->item-1
    //console.log(className);

    let selectorElement = document.querySelectorAll("." + className)[0];  //Eg: item-1 class

    itemId = className;
    title = selectorElement.firstChild.nextElementSibling.innerHTML;
    price = selectorElement.firstChild.nextElementSibling.nextElementSibling.innerHTML.substring(4,); //Eg. Rs. 350 (price start from index 4)

    price = Number.parseInt(price);

    //console.log(itemId + " " + title + " " + price);

}

function addOrUpdateItem(tableNum) {
    if (tableItems[tableNum][itemId] === undefined) {
        tableItems[tableNum][itemId] = { itemTitle: title, itemPrice: price, itemQty: 1 };
    }
    else {
        let existQty = tableItems[tableNum][itemId].itemQty;
        let existPrice = tableItems[tableNum][itemId].itemPrice;

        tableItems[tableNum][itemId].itemPrice = price + existPrice;
        tableItems[tableNum][itemId].itemQty = existQty + 1;
    }
}

// Drop
function drop(ev) {
    ev.preventDefault();
    let targetElement = ev.target;
    let targetClass = targetElement.classList[0];
    //console.log(targetClass);

    switch (targetClass) {
        case "t1-drop":
            addOrUpdateItem(0);
            break;
        case "t2-drop":
            addOrUpdateItem(1);
            break;
        case "t3-drop":
            addOrUpdateItem(2);
            break;
        default: alert("Drag on Table");
            return;
    }

    //console.log(tableItems);

    updatePriceAndItems(targetClass)
}

// Update Total Price and Item Quantity of each table on card.
function updatePriceAndItems(targetClass) {

    let tableNum = targetClass[1]; //Get Table Number

    let totItems = 0;
    let totPrice = 0;

    for (let eachItem in tableItems[tableNum - 1]) {
        totPrice += tableItems[tableNum - 1][eachItem].itemPrice;
        totItems += tableItems[tableNum - 1][eachItem].itemQty;
    }

    document.querySelectorAll("." + targetClass)[2].innerHTML = "Rs. " + totPrice;  //price
    document.querySelectorAll("." + targetClass)[3].innerHTML = "Total Items: " + totItems;  //items

}

// Search Bar Functionality

function search_box(inputTextElement, itemElementClass) {
    let inputText = document.getElementById(inputTextElement).value
    inputText = inputText.toLowerCase();
    let itemElements = document.getElementsByClassName(itemElementClass);

    for (let eachElement = 0; eachElement < itemElements.length; eachElement++) {

        if (!itemElements[eachElement].innerHTML.toLowerCase().includes(inputText)) {
            itemElements[eachElement].style.display = "none";
        }
        else {
            itemElements[eachElement].style.display = "block";
        }
    }
}

function search_table() {
    search_box('searchbar-table', 'table');
}

function search_item() {
    search_box('searchbar-menu', 'item');
}


//Modal - Pop-Up Card Functionality

function removeTableHighlight() {
    for (let num = 1; num <= 3; num++) {
        document.getElementsByClassName("t" + num + "-drop")[0].classList.remove("highlight");
    }
}

function highlightTable(tableNum) {
    removeTableHighlight();

    document.getElementsByClassName("t" + tableNum + "-drop")[0].classList.add("highlight");
}

function showModal(event) {
    let targetClass = event.target.classList[0];
    if (targetClass === "table-body") {
        alert("Click on the table card");
        return;
    }

    //Highlight the table with colour
    let tableNum = targetClass[1];  //t1-drop -> index 1 will the table number 1.

    let totUniqueItems = 0;
    for (let eachItem in tableItems[tableNum - 1]) {
        totUniqueItems += 1;
    }

    if (totUniqueItems === 0) {
        alert("Add Items to the table");
        return;
    }

    //adding attribute to show the modal
    document.getElementsByClassName(targetClass)[0].setAttribute("data-toggle", "modal");
    document.getElementsByClassName(targetClass)[0].setAttribute("data-target", "#exampleModalCenter");

    highlightTable(tableNum);

    //Displaying table number on modal header
    document.getElementsByClassName("table-num")[0].innerHTML = tableNum;

    showItemListOnModel(tableNum);

    document.getElementsByClassName("bill-gen")[0].addEventListener("click", () => {
        generateBill(tableNum);
    });

}



// Show Item List on Modal of each Table
function showItemListOnModel(tableNum) {

    let totUniqueItems = 0;
    for (let eachItem in tableItems[tableNum - 1]) {
        totUniqueItems += 1;
    }

    let str = "<tr>";
    let i = 0;
    for (let eachItem in tableItems[tableNum - 1]) {

        //console.log(eachItem);
        let itemDetail = tableItems[tableNum - 1][eachItem];

        str += "<th scope = 'row' > " + (i + 1) + "</th > ";
        str += "<td>" + itemDetail.itemTitle + "</td>";
        str += "<td>" + itemDetail.itemPrice + "</td>";

        str += "<td> <input type='number' value=" + itemDetail.itemQty +
            " name='servings' class='itemServing-" + eachItem + "' min='1' max='10' placeholder='Enter Qty. (1-10)'> </td>";

        str += "<td class='img-td'> <img class='delete-img " + eachItem + " " + tableNum +
            "' src='images/delete.png' alt='delete-icon' onclick='deleteItemFromTable(event)'> </td>";

        str += "</tr>";

        document.getElementsByTagName("tbody")[0].innerHTML = str;

        i++;
    }

    let resultStr = "<button type='button' class='bill-gen btn btn-secondary'>Generate Bill</button>";

    document.getElementsByClassName("modal-footer")[0].innerHTML = resultStr;

}


// Delete item from the table
function deleteItemFromTable(event) {

    //console.log(event.target.classList[1]);

    let item = event.target.classList[1];  //item-1
    let tableNum = event.target.classList[2];

    //console.log(tableItems[tableNum - 1][item]);
    delete tableItems[tableNum - 1][item];

    updatePriceAndItems("t" + tableNum + "-drop");  //tables are selected as t1-drop, t2-drop, d3-drop..  

    return;

}

const totBill = [0, 0, 0];


// Generate Bill
function generateBill(tableNum) {
    //console.log(tableNum);

    let totItems = 0;
    for (let eachItem in tableItems[tableNum - 1]) {
        totItems += 1;
    }

    totBill[tableNum - 1] = 0;
    for (let eachItem in tableItems[tableNum - 1]) {

        qty = document.getElementsByClassName("itemServing-" + eachItem)[0].value;

        totBill[tableNum - 1] += (tableItems[tableNum - 1][eachItem].itemPrice) * qty;
    }

    //console.log("Table - " + tableNum + ", Total Bill is: " + totBill);
    showTotalBill(tableNum);

}

function showTotalBill(tableNum) {

    let resultStr = "<div class='output'> Total Bill for Table - " + tableNum + " is: <span> Rs. " +
        totBill[tableNum - 1] + "</span> </div>"

    //resultStr += "<p> Session Closed. (<em>Please Refresh the page</em>)</p>"
    resultStr += "<button type='button' class='bill-gen btn btn-secondary' " +
        "onclick='generateBill(" + tableNum + ")' >Re-Generate Bill</button>";


    document.getElementsByClassName("modal-footer")[0].innerHTML = resultStr;

}