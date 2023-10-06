const bookList = document.getElementById("book-items");

document.addEventListener("DOMContentLoaded", () => {
    const registerButton = document.getElementById("register-button");
    const loginButton = document.getElementById("login-button");

    const loadBooks = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            return;
        }

        try {
            const response = await fetch("/books", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                const books = await response.json();
                renderBooks(books);
            } else {
                alert("Failed to load books.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred.");
        }
    };

    registerButton.addEventListener("click", async () => {
        const username = document.getElementById("register-username").value;
        const password = document.getElementById("register-password").value;

        try {
            const response = await fetch("/users/newUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.status === 201) {
                alert("User registered successfully.");
            } else {
                alert("Failed to register user.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred.");
        }
    });

    const renderBooks = (books) => {
        const bookItems = document.getElementById("book-items");
        bookItems.innerHTML = "";

        books.forEach((book) => {
            const li = document.createElement("li");
            li.textContent = book.title;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("delete-button");
            deleteButton.dataset.title = book.title;

            li.appendChild(deleteButton);
            bookItems.appendChild(li);
        });
    };

    loginButton.addEventListener("click", async () => {
        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;

        try {
            const response = await fetch("/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.status === 200) {
                const { token } = await response.json();
                localStorage.setItem("token", token);
                alert("Logged in successfully.");
                await loadBooks();
            } else {
                alert("Login failed.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred.");
        }
    });

    const addBook = async (bookData) => {
        const token = localStorage.getItem("token");

        if (!token) {
            return;
        }

        try {
            const response = await fetch("/books/newBook", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookData),
            });

            if (response.status === 201) {
                alert("Book added successfully.");
                const newBook = await response.json();
                console.log("New Book Data:", newBook);
                await loadBooks();
            } else {
                alert("Failed to add the book.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred.");
        }
    };

    const addBookForm = document.getElementById("add-book-form");
    addBookForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const bookTitle = document.getElementById("book-title").value;
        const bookAuthor = document.getElementById("book-author").value;
        const bookDescription = document.getElementById("book-description").value;
        const bookImage = document.getElementById("book-image").value;
        const userId = document.getElementById("userId").value;

        if (bookTitle.trim() === "") {
            alert("Please enter a book title.");
            return;
        }

        const bookData = {
            title: bookTitle,
            author: bookAuthor,
            description: bookDescription,
            image: bookImage,
            userId: userId
        };

        await addBook(bookData);

        document.getElementById("book-title").value = "";
        document.getElementById("book-author").value = "";
        document.getElementById("book-description").value = "";
        document.getElementById("book-image").value = "";
        document.getElementById("userId").value = "";
    });

    const token = localStorage.getItem("token");
    if (token) {
        loadBooks().then(r => {
            console.log("token is saved in local storage",r)});
    }
});

const deleteBook = async (bookTitle) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return;
    }

    try {
        const response = await fetch(`/books/${bookTitle}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            alert("Book deleted successfully.");
        } else if (response.status === 404) {
            alert("Book not found.");
        } else {
            alert("Failed to delete the book.");
        }
    } catch (error) {
        console.error(error);
        alert("An error occurred.");
    }
};

bookList.addEventListener("click", async (event) => {
    if (event.target.classList.contains("delete-button")) {
        const bookTitle = event.target.dataset.title;
        const confirmDelete = confirm(`Are you sure you want to delete "${bookTitle}"?`);

        if (confirmDelete) {
            await deleteBook(bookTitle);
        }
    }
});

