const Book=(props)=>{
    return (
        <tr >
             <td>{props.book.book_id}</td>             
            <td>{props.book.title}</td>
            <td>{props.book.author}</td>
            <td>{props.book.year_released}</td>
            <td>{props.book.publisher}</td>
    
    </tr>)
    ;
}
export default Book;