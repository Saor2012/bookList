class Book {
  constructor(title, author, isbn) {
    this.title = title
    this.author = author
    this.isbn = isbn
  }
}

class UI {
  addBookToList(book) {
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

  deleteBook(target) {
    target.parentElement.parentElement.remove()
  }

  clearFields() {
    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('isbn').value = ''
  }

  showAlert(message, className) {
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
}

// Local Storage Class

class Store {
  static getBooks() {
    let books
    if (localStorage.getItem('books') === null) {
      books = []
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    }

    return books
  }

  static displayBooks() {

  }

  static addBook(book) {
    const books = Store.getBooks()
    books.push(book)

    localStorage.setItem('books', JSON.stringify(books))
  }

  static removeBook() {

  }
}

// Event listeners

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

    // Add to LocalStorage
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
    ui.showAlert('Book removed!', 'success')
  }
  e.preventDefault()
})
