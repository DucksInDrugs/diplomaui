import React from "react";

const BookItem = ({props}) => {
    return (
        <div className="box">
            <div className="box-top">
                <img className="box-image" src="https://images.unsplash.com/photo-1622219809260-ce065fc5277f?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYyMzMwNjYxOQ&ixlib=rb-1.2.1&q=85" alt="Girl Eating Pizza"/>
                <div className="title-flex">
                    <h3 className="box-title">Kelsie Meyer</h3>
                </div>
                <p className="description">Whipped steamed roast cream beans macchiato skinny grinder café. Iced grinder go mocha steamed grounds cultivar panna aroma.</p>
            </div>
            <a href="#" className="button">Follow Kelsie</a>
        </div>
    )
}

export default BookItem;