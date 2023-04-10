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
    bookId++;
}

// Creates a new Book with the Book Constructor
function createBook(title, author, pages, read){
    const newBook = new Book(title, author, pages, read);
    newBook.bookId = bookId;
    addBookToLibrary(newBook);
}

//Creates a div that shows the Object values of the book
const bookRow = document.querySelector('.book-row');
function showBooksOnSite(){
    for(let i = 0; i < myLibrary.length; i++){

        //DOM variables
        const newBookDiv = document.createElement('div');
        const newBookTitle = document.createElement('h1');
        const newBookAuthor = document.createElement('h1');
        const newBookPages = document.createElement('h1');
        const newBookRead = document.createElement('h1');
        const newDeleteButton = document.createElement('button');
        const newToggleReadButton = document.createElement('button');
        const newButtonDiv = document.createElement('div');

        //Add class
        newBookDiv.classList.add('book-div');
        newBookTitle.classList.add(`book-title`);
        newBookAuthor.classList.add(`book-author`);
        newBookPages.classList.add(`book-pages`);
        newBookRead.classList.add(`book-read`);
        newButtonDiv.classList.add('book-button-div');
        newDeleteButton.classList.add('btn');
        newToggleReadButton.classList.add('btn');

        //Add id
        newDeleteButton.setAttribute('id', `delete-btn-${i}`);
        newToggleReadButton.setAttribute('id', `toggle-read-btn-${i}`);

        //Change text content
        newBookTitle.textContent = `${myLibrary[i].title}`;
        newBookAuthor.textContent = `By: ${myLibrary[i].author}`;
        newBookPages.textContent = `Pages: ${myLibrary[i].pages}`;
        if(myLibrary[i].read === true){
            newBookRead.textContent = `Read: Yes`;
        } else {
            newBookRead.textContent = `Read: No`;
        }
        newDeleteButton.textContent = "Delete";
        newToggleReadButton.textContent = "Change Status";

        //adds the nodes as the last child of the parent element
        bookRow.appendChild(newBookDiv);
        newBookDiv.appendChild(newBookTitle);
        newBookDiv.appendChild(newBookAuthor);
        newBookDiv.appendChild(newBookPages);
        newBookDiv.appendChild(newBookRead);
        newBookDiv.appendChild(newButtonDiv);
        newButtonDiv.appendChild(newDeleteButton);
        newButtonDiv.appendChild(newToggleReadButton);

    }

    //Delete Book and change status button EventListener
    const bookDivButtons = document.querySelectorAll('.book-button-div > button');
    bookDivButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            for(let i = 0; i < myLibrary.length; i++){
                if(e.target.matches(`#delete-btn-${i}`)){
                    deleteBook(i);
                } else if(e.target.matches(`#toggle-read-btn-${i}`)){
                    if(myLibrary[i].read){
                        myLibrary[i].read = false;
                        e.target.parentElement.parentElement.children[3].innerText = 'Read: No'
                    }else {
                        myLibrary[i].read = true;
                        e.target.parentElement.parentElement.children[3].innerText = 'Read: Yes'
                    }
                }
            }
        })
    })
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
})

//Submits the data to the createBook function and displays it on the page
const submitButton = document.querySelector('#submit-book-btn');
submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    createBook(inputTitle.value, inputAuthor.value, inputPages.value, inputReadYes.checked);
    clearInput();
    formDiv.style.display = 'none';
    bookButton.textContent = 'Create Book';
    deleteDiv();
    showBooksOnSite();
})

//Clears the input fields
function clearInput(){
    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = "";
    inputReadNo.checked = true;
}

//Deletes every child inside the div 'book-row'
function deleteDiv(){
    if(myLibrary.length < 1){
        let delChildren = bookRow.lastChild;
        bookRow.removeChild(delChildren);
    }
    for(let i = 0; i < myLibrary.length; i++){
        let delChildren = bookRow.lastChild;
        while(delChildren){
            bookRow.removeChild(delChildren);
            delChildren = bookRow.lastChild;
        }
    }
}

function deleteBook(index){
    myLibrary.splice(index, 1);
    deleteDiv();
    showBooksOnSite();
}