import React from "react";
import BookItem from "./BookItem";

const BooksList = ({books}) => {
    return (
            <div className="wrap">
                {books.map((book) =>
                    <BookItem props={book} key={book.id}/>
                )}
                <BookItem/>
                <BookItem/>
            </div>
    )
}

export default BooksList;