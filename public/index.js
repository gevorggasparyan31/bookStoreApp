document.addEventListener("DOMContentLoaded", () => {
    const registerButton = document.getElementById("register-button");
    const loginButton = document.getElementById("login-button");
    const bookList = document.getElementById("book-items");

    // Register a new user
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

    // Login as a user
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
                loadBooks();
            } else {
                alert("Login failed.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred.");
        }
    });

    // Load books for the logged-in user
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

    // Render the list of books
    const renderBooks = (books) => {
        const bookItems = document.getElementById("book-items");
        bookItems.innerHTML = "";

        books.forEach((book) => {
            const li = document.createElement("li");
            li.textContent = book.title;
            bookItems.appendChild(li);
        });
    };

    // Check if the user is already logged in and load their books
    const token = localStorage.getItem("token");
    if (token) {
        loadBooks();
    }
});
