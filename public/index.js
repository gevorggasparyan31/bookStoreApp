const bookContainer = document.getElementById('book-container');
const bookForm = document.getElementById('book-form');
const deleteBookForm = document.getElementById('delete-book-form');
async function fetchBooks() {
    try {
        const response = await fetch('/books');
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        const books = await response.json();
        renderBooks(books);
    } catch (error) {
        console.error(error);
    }
}

function renderBooks(books) {
    bookContainer.innerHTML = '';
    books.forEach((book) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
                    <img src="${book.image}" alt="Book Cover">
                    <h2>${book.title}</h2>
                    <p>${book.description}</p>
                `;
        bookContainer.appendChild(card);
    });
}

bookForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').value;

    try {
        const response = await fetch('/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, author, description, image }),
        });
        if (!response.ok) {
            throw new Error('Failed to add a new book');
        }
        bookForm.reset();
        await fetchBooks();
    } catch (error) {
        console.error(error);
    }
});

deleteBookForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const bookNameToDelete = encodeURIComponent(document.getElementById('delete-id').value); // Encode the book name

    try {
        const response = await fetch(`/books/${bookNameToDelete}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete the book');
        }
        deleteBookForm.reset();
        await fetchBooks();
    } catch (error) {
        console.error(error);
    }
});

fetchBooks();