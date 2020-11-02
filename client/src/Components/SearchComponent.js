import { Component } from 'react';
import SearchBox from './SearchBox';
import axios from 'axios';
import Book from './Book';
const URL = "http://localhost:8080/api/books/search";
class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queryText: '',
            searchCriteria:'title',
            rows: [
                // {
                //     book_id:1,
                //     title: 'test book',
                //     author: 'test author',
                //     year: '2019',
                //     publisher:'Penguin',
                // }
            ]
        }
        this.buttonClickHandler = this.buttonClickHandler.bind(this);
        this.textChangeHandler = this.textChangeHandler.bind(this);
    }


    // const [rows,setRows]=useState([]);
    async buttonClickHandler(event) {
        console.log("buttonClickHandler called" + JSON.stringify(this.state));
        let response = await axios.get(URL, {
            params: {
                for: this.state.queryText,
                by: this.state.searchCriteria
            }
        });
        console.log(response.data);
        this.setState({rows:response.data});

    }
    textChangeHandler(event) {
        this.setState({
            queryText: event.target.value            
        });
    }

    radioButtonHandler=(event) =>{
        this.setState({
            searchCriteria: event.target.value            
        });
        console.log(JSON.stringify(this.state));
    }

    render() {
        return (
            <div className="container mt-3 text-center">
                <h2>Search for Books</h2>
                <SearchBox buttonClickHandler={this.buttonClickHandler} textChangeHandler={this.textChangeHandler} queryText={this.state.queryText} searchCriteria={this.state.searchCriteria} radioButtonHandler={this.radioButtonHandler}/>
                <div className="container">
                    <h2>Results</h2>
                    {(this.state.rows.length > 0) ?
                        (
                            <table className="table"><thead><tr><td>Book ID</td><td>Title</td><td>Author</td><td>Released in Year</td><td>Publisher</td><td>Number Of Copies</td></tr></thead><tbody>
                                {
                                    this.state.rows.map((row) => {
                                        return <Book book={row} key={row.book_id} />
                                    })
                                }
                                </tbody>
                            </table>
                        ) :
                        "No results to display"
                    }
                </div>
            </div>);
    }

}
export default SearchComponent;