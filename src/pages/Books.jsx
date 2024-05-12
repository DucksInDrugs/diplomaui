import React from "react";
import StickyNavbar from "../components/UI/stickyNavbar/StickyNavbar";
import BooksList from "../components/BooksList";

function Books() {
    const books = []
    return (
        <div className="content">
            {/* <StickyNavbar/> */}
            <BooksList books={books} />
        </div>
    )
}

export default Books;