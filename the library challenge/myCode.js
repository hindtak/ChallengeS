
const library = [];
  
 
  function priceOfBook(bookName) {
    for (let i = 0; i < library.length; i++) {
      if (library[i].title === bookName) {
        return library[i].price;
      }
    }
    return "Book not found";
  }
  
//   why library an not books
  function affordableBooks(budget) {
    const affordableBooksList = [];
    for (let i = 0; i < library.length; i++) {
      if (library[i].price <= budget) {
        // arry holds all the offordalebooks list in a new arraty
        affordableBooksList[affordableBooksList.length] = library[i];
      }
    }
    return affordableBooksList;
  }
  
  
  function findBookByGenre(genre) {
    const genreBooks = [];
    for (let i = 0; i < library.length; i++) {
      if (library[i].genres.includes(genre)) {
        genreBooks[genreBooks.length] = library[i];
      }
    }
    return genreBooks;
  }
  
  
  function groupByGenre() {
    const groupedBooks = {};
    for (let i = 0; i < library.length; i++) {
      const genres = library[i].genres;
      for (let j = 0; j < genres.length; j++) {
        const genre = genres[j];
        if (!groupedBooks[genre]) {
          groupedBooks[genre] = [];
        }
        groupedBooks[genre][groupedBooks[genre].length] = library[i];
      }
    }
    return groupedBooks;
  }
  
 
  function sortBooksByPrice() {
    for (let i = 0; i < library.length - 1; i++) {
      for (let j = 0; j < library.length - i - 1; j++) {
        if (library[j].price > library[j + 1].price) {
        
          const temp = library[j];
          library[j] = library[j + 1];
          library[j + 1] = temp;
        }
      }
    }
    return library;
  }
  
 
  console.log(priceOfBook("Pride and Prejudice"));
  console.log(affordableBooks(12));
  console.log(findBookByGenre("Fiction"));
  console.log(groupByGenre());
  console.log(sortBooksByPrice());