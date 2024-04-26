import React from "react";
import BookItem from "./BookItem";

const BooksList = ({books}) => {
    return (
        <div className="content">
            <div className="wrap">
                {books.map((book) =>
                    <BookItem props={book} key={book.id}/>
                )}
                <BookItem/>
                <BookItem/>
            </div>
        </div>
    )
}

export default BooksList;