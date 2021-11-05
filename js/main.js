const grid = document.getElementById("grid");
const submit = document.getElementById("submit");

class CardComponent {
	constructor(
		id = "",
		title = "",
		author = "",
		publisher = "",
		isbn = "",
		edition = "",
		year = "",
		downloadUrl = "",
		coverUrl = "",
		fileExtension = "",
		numberOfPages = "",
		language = "",
		fileSize = 0,
		md5 = ""
	) {
		this.id = id;
		this.title = title;
		this.author = author;
		this.publisher = publisher;
		this.isbn = isbn;
		this.edition = edition;
		this.year = year;
		this.downloadUrl = downloadUrl;
		this.coverUrl = `http://library.lol/covers/${coverUrl}`;
		this.fileExtension = fileExtension;
		this.numberOfPages = numberOfPages;
		this.language = language;
		this.fileSize = fileSize;
		this.md5 = md5;

		for (let prop in this) {
			if (this[prop] === "") this[prop] = "---";
		}
	}

	getFileSize() {
		return this.fileSize;
	}
	draw() {
		return `
        <a href="${this.coverUrl}">
            <div class="book-card text-left">
                <div class="book-title">
                    <span class="text-light lead">
                        ${this.title}
                    </span>
                </div>
                <div class="book-field">
                    <h6>Author:</h6>
                    <p>
                        ${this.author}
                    </p>
                </div>

                <div class="book-field">
                    <h6>Publisher:</h6>
                    <p>${this.publisher}</p>
                </div>

                <div class="book-field">
                    <h6>ISBN</h6>
                    <p>${this.isbn}</p>
                </div>

                <div class="book-info">
                    <div class="book-info-item download-button">
                        <a href=${this.downloadUrl} >
                            <h3><i class="bi bi-download"></i></h3>
                        </a>
                    </div>

                    <div class="book-info-item">
                        <h6>Book type:</h6>
                        <p>${this.fileExtension}</p>
                    </div>
                    <div class="book-info-item">
                        <h6>Edition:</h6>
                        <p>${this.edition}</p>
                    </div>
                    <div class="book-info-item">
                        <h6>Year:</h6>
                        <p>${this.year}</p>
                    </div>
                    <div class="book-info-item">
                        <h6>Pages:</h6>
                        <p>${this.numberOfPages}</p>
                    </div>
                    <div class="book-info-item">
                        <h6>Language:</h6>
                        <p>${this.language}</p>
                    </div>
                    <div class="book-info-item">
                        <h6>File Size:</h6>
                        <p>${this.getFileSize()}</p>
                    </div>
                    <div class="book-info-item">
                        <h6>ID:</h6>
                        <p>${this.id}</p>
                    </div>
                </div>
            </div>
        </a>`;
	}
}

function clearElementInnerHTML(element) {
	element.innerHTML = "";
}

function getMessageCard(message, icon) {
	return `
                <div class="book-card text-left">
					<div class="book-title center-text">
						<span class="text-light lead">
                            ${icon}
						    ${message}
                            
						</span>
					</div>
                </div>`;
}

function startLoadingScreen() {
	grid.innerHTML = `
        <h2 class='text-center text-light lead'>LOADING...</h2>
        <div class="loading-icon">
            <div class="spinner-grow text-primary" role="status">
                <span class="sr-only"></span>
            </div>
            <div class="spinner-grow text-secondary" role="status">
                <span class="sr-only"></span>
            </div>
            <div class="spinner-grow text-success" role="status">
                <span class="sr-only"></span>
            </div>
            <div class="spinner-grow text-danger" role="status">
                <span class="display-1 sr-only"></span>
            </div>
            <div class="spinner-grow text-warning" role="status">
                <span class="sr-only"></span>
            </div>
           
        </div>`;
}

submit.addEventListener("click", async () => {
	const searchBox = document.getElementById("search");
	const searchStr = searchBox.value;

	if (searchStr.trim().length >= 4) {
		clearElementInnerHTML(grid);
		startLoadingScreen();
	} else {
		const message =
			"Your search text is too short. Your search text should be at least 4 characters long.";
		const icon = '<i class="bi bi-info-circle"></i>';
		return (grid.innerHTML = getMessageCard(message, icon));
	}

	fetch(
		`https://lesdocode-libgen-api.herokuapp.com/api/find-books/${searchStr}`
	)
		.then((response) => response.json())
		.then((data) => {
			clearElementInnerHTML(grid);

			if (!data.length) {
				grid.innerHTML += getMessageCard(
					`No results were found for "${searchStr}"`,
					`<i class="bi bi-exclamation-triangle"></i>`
				);
			}
			for (let book of data) {
				grid.innerHTML += new CardComponent(
					book.id,
					book.title,
					book.author,
					book.publisher,
					book.identifierwodash,
					book.edition,
					book.year,
					`http://library.lol/main/${book.md5}`,
					book.coverurl,
					book.extension,
					book.pages,
					book.language,
					book.filesize,
					book.md5
				).draw();
			}
		})
		.catch((err) => console.error(err));

	//console.log(data);
});
