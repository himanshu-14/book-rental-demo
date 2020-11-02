const SearchBox = (props) => {
    return (
        <div className="container">
            <div className="d-flex">
            <input className="form-control" type="text" onChange={props.textChangeHandler} value={props.queryText} />
            <button className="btn btn-success ml-2" onClick={props.buttonClickHandler}>Search</button>
            </div>
            <input className="m-2" type="radio" name="searchCriteria" value="author" checked={props.searchCriteria === "author"} onChange={props.radioButtonHandler} />Author
            <input className="m-2" type="radio" name="searchCriteria" value="title" checked={props.searchCriteria === "title"} onChange={props.radioButtonHandler} />Title
            <input className="m-2" type="radio" name="searchCriteria" value="year_released" checked={props.searchCriteria === "year_released"} onChange={props.radioButtonHandler} />Year
            <input className="m-2" type="radio" name="searchCriteria" value="publisher" checked={props.searchCriteria === "publisher"} onChange={props.radioButtonHandler} />Publisher
        </div>
    );
}
export default SearchBox;