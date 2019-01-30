// Book constructor
function Book(title, author, isbn) {
  this.title = title
  this.author = author
  this.isbn = isbn
}

// UI Constructor

function UI() {}


// Event listeners

document.getElementById('book-form').addEventListener('submit', function(e) {
  // Get form values
  const title = document.getElementById('title').value
  const author = document.getElementById('author').value
  const isbn = document.getElementById('isbn').value


  // Instanciate book
  const book = new Book(title, author, isbn)

  // Instanciate UI
  const ui = new UI()

  // Add book to list
  ui.addBookToList(book)

  console.log(book)
  e.preventDefault()
})