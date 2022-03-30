function findAuthorById(authors, id) {
  const match = authors.find((author) => author.id === id);
  return match;
}

function findBookById(books, id) {
  const match = books.find((book) => book.id === id);
  return match;
}

//Helper Function
function _combine(array1, array2) {
  let combined = [array1, array2];
  return combined;
}

function partitionBooksByBorrowedStatus(books) {
  const outBooks = books.reduce((acc, book) => {
    if (book.borrows.some((count) => count.returned === false)) {
      acc.push(book);
    }
    return acc;
  }, []);

  const inBooks = books.reduce((acc, book) => {
    if (book.borrows.every((count) => count.returned === true)) {
      acc.push(book);
    }
    return acc;
  }, []);

  return _combine(outBooks, inBooks);
}

function getBorrowersForBook({ borrows }, accounts) {
  const borrowedLog = borrows.reduce((acc, item) => {
    let currentAccount = accounts.find((acount) => acount.id === item.id);
    currentAccount.returned = item.returned;

    acc.push(currentAccount);
    return acc;
  }, []);
  return borrowedLog.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
