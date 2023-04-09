let myLibrary = [];
let bookId = 0;

const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const inputPages = document.querySelector('#pages');
const inputReadYes = document.querySelector('#book-read-yes');
const inputReadNo = document.querySelector('#book-read-no');


//Book constructor
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//Adds the created book Object to the myLibrary Array
function addBookToLibrary(book) {
    myLibrary.push(book);
}

// Creates a new Book with the Book Constructor
function createBook(title, author, pages, read){
    const newBook = new Book(title, author, pages, read);
    newBook.bookId = bookId;
    bookId++;
    addBookToLibrary(newBook);
}

//Creates a div that shows the Object values of the book
const bookRow = document.querySelector('.book-row');
function showBooksOnSite(index){
    const newBookDiv = document.createElement('div');
    const newBookTitle = document.createElement('h1');
    const newBookAuthor = document.createElement('h1');
    const newBookPages = document.createElement('h1');
    const newBookRead = document.createElement('h1');

    newBookDiv.classList.add(`book-div`);
    newBookTitle.classList.add(`book-title`);
    newBookAuthor.classList.add(`book-author`);
    newBookPages.classList.add(`book-pages`);
    newBookRead.classList.add(`book-read`);

    newBookTitle.textContent = `${myLibrary[index].title}`;
    newBookAuthor.textContent = `By ${myLibrary[index].author}`;
    newBookPages.textContent = `Pages ${myLibrary[index].pages}`;
    if(myLibrary[index].read === true){
        newBookRead.textContent = `Read: Yes`;
    } else {
        newBookRead.textContent = `Read: No`;
    }

    bookRow.appendChild(newBookDiv);
    newBookDiv.appendChild(newBookTitle);
    newBookDiv.appendChild(newBookAuthor);
    newBookDiv.appendChild(newBookPages);
    newBookDiv.appendChild(newBookRead);
}

//Toggles the style display value from 'none' to 'block' and vice versa
const bookButton = document.querySelector('#create-book-btn');
const formDiv = document.querySelector('form');
bookButton.addEventListener('click', (e) => {
    if(formDiv.style.display === 'none'){
        formDiv.style.display = 'block';
        e.currentTarget.textContent = 'Cancel';
    } else {
        formDiv.style.display = 'none';
        e.currentTarget.textContent = 'Create Book';
    }
});

//Submits the data to the createBook function
const submitButton = document.querySelector('#submit-book-btn');
submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    createBook(inputTitle.value, inputAuthor.value, inputPages.value, inputReadYes.checked);
    clearInput();
    formDiv.style.display = 'none';
    showBooksOnSite(bookId - 1);
    bookButton.textContent = 'Create Book';
});

//Clears the input fields
function clearInput(){
    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = 0;
    inputReadYes.checked = false;
}
