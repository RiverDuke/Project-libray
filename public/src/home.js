function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let count = 0;
  let bList = [];
  for (let book in books) {
    bList.push(...books[book].borrows);
  }
  for (let val in bList) {
    if (bList[val].returned === false) count++;
  }
  return count;
}

function getMostCommonGenres(books) {
  let genreList = books.reduce((acc, book) => {
    acc.push(book.genre);
    return acc;
  }, []);

  let counted = genreList.reduce((acc, genre) => {
    if (acc[genre]) {
      acc[genre] += 1;
    } else {
      acc[genre] = 1;
    }
    return acc;
  }, {});

  let mostCommon = [];
  for (const [key, values] of Object.entries(counted)) {
    mostCommon.push({ name: key, count: values });
  }
  mostCommon.sort((a, b) => b.count - a.count);

  return mostCommon.slice(0, 5);
}

function getMostPopularBooks(books) {
  let bookList = books.map((book) => ({
    name: book.title,
    count: book.borrows.length,
  }));
  bookList.sort((a, b) => b.count - a.count);
  return bookList.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  let counted = books.reduce((acc, book) => {
    if (acc[book.authorId]) {
      acc[book.authorId] += book.borrows.length;
    } else {
      acc[book.authorId] = book.borrows.length;
    }
    return acc;
  }, {});

  const poplist = Object.keys(counted).map((authorId) => {
    let author = authors.find((author) => {
      return author.id == authorId;
    });

    return {
      name: `${author.name.first} ${author.name.last}`,
      count: counted[authorId],
    };
  });

  poplist.sort((a, b) => b.count - a.count);
  const top5 = poplist.slice(0, 5);
  return top5;
}

//for (let item in books)

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
