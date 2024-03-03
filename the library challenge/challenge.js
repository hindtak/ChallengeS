const books = require("./books.json");

function priceOfBook(bookName) {
  // write your code here
  for(i = 0; i <books.length; i++){
    if(books[i].title === bookName ){
      console.log("The price is" + books[i].price);
    }else {
      console.log("The book does excit");
    }
  }
}

function affordableBooks(budget) {
  // write your code here
  for(i= 0; i < books.length; i++){
    if(books[i].price <= budget){
      

    }
  }
}

function findBookByGenre(genre) {
  // write your code here
}

function groupByGenre() {
  // write your code here
}

function sortBooksByPrice() {
  // write your code here
}

(function main() {
  try {
    if (priceOfBook("The Alchemist") !== 9.49) {
      throw new Error("priceOfBook is not working properly.");
    }
    if (affordableBooks(10).length !== 6) {
      throw new Error("affordableBooks is not working properly.");
    }
    if (findBookByGenre("Fiction").length !== 7) {
      throw new Error("findBookByGenre is not working properly.");
    }
    if (Object.keys(groupByGenre()).length !== 30) {
      throw new Error("groupByGenre is not working properly.");
    }
    if (sortBooksByPrice()[0].price !== 5.99) {
      throw new Error("sortBooksByPrice is not working properly.");
    }
    console.log("All tests passed successfully.");
  } catch (error) {
    console.log(error);
  }
})();
