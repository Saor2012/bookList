// Book constructor
function Book(title, author, isbn) {
  this.title = title
  this.author = author
  this.isbn = isbn
}

// UI Constructor

function UI() {}

UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('book-list')

  // Create tr
  const row = document.createElement('tr')

  // Insert cols

  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><button>X</button></td>
  `

  list.appendChild(row)
}

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

  e.preventDefault()
})