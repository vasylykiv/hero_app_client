function U_paginationGenerate(currentPage: number, totalPages: number, siblingCount = 1) {
  const totalNumbers = siblingCount * 2 + 5; // 5 = first + last + current + 2 dots
  const pages: (number | string)[] = [];

  if (totalPages <= totalNumbers) {
    // If there are few pages, we show all
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    const left = Math.max(currentPage - siblingCount, 2);
    const right = Math.min(currentPage + siblingCount, totalPages - 1);

    pages.push(1); // first page

    if (left > 2) pages.push("..."); // left dots between pages

    for (let i = left; i <= right; i++) pages.push(i); // pages around the current one

    if (right < totalPages - 1) pages.push("..."); // right dots between pages

    pages.push(totalPages); // остання сторінка
  }

  return pages;
}

// console.log(paginationGenerate(5, 10));
// [1, "...", 4, 5, 6, "...", 10]

export default U_paginationGenerate;
