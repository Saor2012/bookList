// Book constructor
function Book(title, author, isbn) {
  this.title = title
  this.author = author
  this.isbn = isbn
}

function Store() {}
Store.getBooks = function() {
  let books
  if (localStorage.getItem('books') === null) {
    books = []
  } else {
    books = JSON.parse(localStorage.getItem('books'))
  }

  return books
}

Store.displayBooks = function() {
  const books = Store.getBooks()
  books.forEach(function(book) {
    const ui = new UI()
    ui.addBookToList(book)
  })
}

Store.addBook = function(book) {
  const books = Store.getBooks()
  books.push(book)

  localStorage.setItem('books', JSON.stringify(books))
}

Store.removeBook = function(isbn) {
  const books = Store.getBooks()
  books.forEach((book, index) => {
    if (book.isbn === isbn) {
      books.splice(index, 1)
    }
  });
  localStorage.setItem('books', JSON.stringify(books))
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
    <td><button class="delete">X</button></td>
  `

  list.appendChild(row)
}

UI.prototype.deleteBook = function(target) {
  target.parentElement.parentElement.remove()
}

// Show Alert
UI.prototype.showAlert = function(message, className) {
  // Create div
  const div = document.createElement('div')
  // Add classes
  div.className = `alert ${className}`
  // Add text
  div.appendChild(document.createTextNode(message))
  // Get parent
  const container = document.querySelector('.container')
  // Get form
  const form = document.querySelector('#book-form')
  // Insert form
  container.insertBefore(div, form)

  setTimeout(function() {
    document.querySelector('.alert').remove()
  }, 3000)
}

// Clear Fields
UI.prototype.clearFields = function() {
  document.getElementById('title').value = ''
  document.getElementById('author').value = ''
  document.getElementById('isbn').value = ''
}

// Event listeners

// DOM Load Event

document.addEventListener('DOMContentLoaded', function() {
  Store.displayBooks()
})

// Event listener for Add
document.getElementById('book-form').addEventListener('submit', function(e) {
  // Get form values
  const title = document.getElementById('title').value
  const author = document.getElementById('author').value
  const isbn = document.getElementById('isbn').value


  // Instanciate book
  const book = new Book(title, author, isbn)

  // Instanciate UI
  const ui = new UI()

  // Validate

  if (title === '' || author === '' || isbn === '') {
    // Error Alert
    ui.showAlert('Please fill in all fields', 'error')
  } else {
    // Add book to list
    ui.addBookToList(book)
    Store.addBook(book)

    // Show Success
    ui.showAlert('Book added', 'success')
    // Clear fields
    ui.clearFields()
  }


  e.preventDefault()
})

// Event listener for Delete

document.getElementById('book-list').addEventListener('click', function(e) {
  if (e.target.className === 'delete') {
    const ui = new UI()

    ui.deleteBook(e.target)
    // Remove from LocalStorage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    ui.showAlert('Book removed!', 'success')
  }
  e.preventDefault()
})