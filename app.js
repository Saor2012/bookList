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

    // Show Success
    ui.showAlert('Book added', 'success')
    // Clear fields
    ui.clearFields()
  }


  e.preventDefault()
})