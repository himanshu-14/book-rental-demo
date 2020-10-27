const SearchBox = (props) => {
    return (
        <div className="container">
            <input type="text" name="queryText" onChange={props.textChangeHandler} value={props.queryText} />
            <button className="btn btn-success" onClick={props.buttonClickHandler}>Search</button>
            <h3>Search By</h3>
    <input type="radio" name="searchCriteria" value="author" checked={props.searchCriteria === "author"} onChange={props.radioButtonHandler}/>Author
    <input type="radio" name="searchCriteria" value="title" checked={props.searchCriteria === "title"} onChange={props.radioButtonHandler}/>Title
    <input type="radio" name="searchCriteria" value="year_released" checked={props.searchCriteria === "year_released"} onChange={props.radioButtonHandler}/>Year
    <input type="radio" name="searchCriteria" value="publisher" checked={props.searchCriteria === "publisher"} onChange={props.radioButtonHandler}/>Publisher
        </div>
    );
}
export default SearchBox;