/**
 * to get today's date in the format of DATE datatype of Postrgres
 */
function getTodaysDate(inputDate) {
    if (!inputDate)
        inputDate = new Date();
    return (
        inputDate.getFullYear() +
        "-" +
        (inputDate.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        inputDate.getDate().toString().padStart(2, "0")
    );
}

function createInClauseArg(book_copies) {
    let inClauseArg = "(";
    for (let i = 0; i < book_copies.length; i++) {
        book_copies[i] = parseInt(book_copies[i]); //for security against sql injection
        inClauseArg += book_copies[i];
        if (i === book_copies.length - 1)
            inClauseArg += ")";
        else
            inClauseArg += ", ";
    }
    return inClauseArg;
}
exports.getTodaysDate = getTodaysDate;
exports.createInClauseArg = createInClauseArg;