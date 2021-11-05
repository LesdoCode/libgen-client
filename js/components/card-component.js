class CardComponent {
	constructor(id, title, author, publisher, isbn, edition, year, downloadUrl) {
		this.id = id;
		this.title = title;
		this.author = author;
		this.publisher = publisher;
		this.isbn = isbn;
		this.edition = edition;
		this.year = year;
		this.downloadUrl = downloadUrl;
	}

	draw() {
		return `
        <a href='${this.downloadUrl}'>
            <div class="book-card text-left">
                <div class="book-field">
                    <b class="text-light lead ow">
                        ${this.title}
                    </b>
                </div>
                <hr />

                <p class="book-field">
                    <b>Author:</b>
                    <br />
                    ${this.author}
                </p>
                <p class="book-field">
                    <b>Publisher:</b><br />
                    ${this.publisher}
                </p>
                <p class="book-field">
                    <b>ISBN</b>
                    <br />
                    ${this.isbn}
                </p>
                <p class="book-field">
                    <b>Book Info:</b><br />
                    Edition: ${this.edition}
                    <br />
                    Year: ${this.year}
                </p>
            </div>
        </a>`;
	}
}

module.exports = CardComponent;
