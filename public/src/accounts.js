function findAccountById(accounts, id) {
  return accounts.find((item) => item.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) =>
    a.name.last.toUpperCase() > b.name.last.toUpperCase() ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  const id = account.id;
  let count = 0;
  for (let book in books) {
    let currentBookLog = books[book].borrows;
    let matchingLog = currentBookLog.filter((item) => item.id == id);
    count += matchingLog.length;
  }
  return count;
}

function getBooksPossessedByAccount(account, books, authors) {
  const neededId = account.id;

  const matchingBooks = books.reduce((acc, book) => {
    let ourBook = book.borrows.find(
      (count) => count.id === neededId && count.returned === false
    );

    if (ourBook) {
      acc.push(book);
    }

    return acc;
  }, []);

  const combinedResults = matchingBooks.map((book) => {
    book["author"] = authors.find((author) => author.id === book.authorId);
    return book;
  });

  return combinedResults;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
