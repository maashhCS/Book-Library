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
    addBookToLibrary(newBook);
}

//Creates a div that shows the Object values of the book
const bookRow = document.querySelector('.book-row');
function showBooksOnSite(index){
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
    newDeleteButton.setAttribute('id','delete-btn');
    newToggleReadButton.setAttribute('id','toggle-read-btn');

    //Change text content
    newBookTitle.textContent = `${myLibrary[index].title}`;
    newBookAuthor.textContent = `By ${myLibrary[index].author}`;
    newBookPages.textContent = `Pages ${myLibrary[index].pages}`;
    if(myLibrary[index].read === true){
        newBookRead.textContent = `Read: Yes`;
    } else {
        newBookRead.textContent = `Read: No`;
    }
    newDeleteButton.textContent = "Delete";
    newToggleReadButton.textContent = "Change Status";

    //
    bookRow.appendChild(newBookDiv);
    newBookDiv.appendChild(newBookTitle);
    newBookDiv.appendChild(newBookAuthor);
    newBookDiv.appendChild(newBookPages);
    newBookDiv.appendChild(newBookRead);
    newBookDiv.appendChild(newButtonDiv);
    newButtonDiv.appendChild(newDeleteButton);
    newButtonDiv.appendChild(newToggleReadButton);

    //Delete and change status button EventListener
    const bookDivButtons = document.querySelectorAll('.book-button-div > button');
    bookDivButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if(e.target.matches('#delete-btn')){
                for(let i = 0; i < myLibrary.length; i++){
                    console.log(myLibrary[i]);
                    if(e.target.parentElement.parentElement.children[0].innerText === myLibrary[i].title){
                        const deleteDiv = e.target.parentElement.parentElement;
                        myLibrary.splice(i, 1);
                        deleteDiv.remove(); 
                    }
                }
            } else if(e.target.matches('#toggle-read-btn')){
                for(let i = 0; i < myLibrary.length; i++){
                    if(e.target.parentElement.parentElement.children[0].innerText === myLibrary[i].title){
                        console.log(e);
                        console.log(myLibrary[i].read);
                        if(myLibrary[i].read === true){
                            myLibrary[i].read = false;
                            console.log(myLibrary[i].read);
                            e.target.parentElement.parentElement.children[3].innerText = 'Read: No'
                        } else {
                            myLibrary[i].read = true;
                            console.log(myLibrary[i].read);
                            e.target.parentElement.parentElement.children[3].innerText = 'Read: Yes'
                        }
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

//Submits the data to the createBook function
const submitButton = document.querySelector('#submit-book-btn');
submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    createBook(inputTitle.value, inputAuthor.value, inputPages.value, inputReadYes.checked);
    clearInput();
    formDiv.style.display = 'none';
    showBooksOnSite(bookId);
    bookButton.textContent = 'Create Book';
    bookId++;
})

//Clears the input fields
function clearInput(){
    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = 0;
    inputReadNo.checked = true;
}

//Loops through the myLibrary array and creates a new Book div on the page for every Book Object in the Array
function loopLibrary(){
    for(let i = 0; i < myLibrary.length; i++){
        const deleteBookRowChildren = document.querySelector('.book-row');
        let delChildren = deleteBookRowChildren.lastChild;
        while(delChildren){
            deleteBookRowChildren.removeChild(delChildren);
            delChildren = deleteBookRowChildren.lastChild;
        }
        showBooksOnSite(i);
    }
}