import React from "react";

import { PaginationPropType } from "../types"
import { pageSize, paginationSize } from "../globals";

const Pagination: React.SFC<PaginationPropType> = ({ changePage, page, total }) => {
  const totalPages = Math.ceil(total/pageSize);
  let startIndex = Math.floor(page/paginationSize);
  startIndex = page%paginationSize === 0 ? startIndex-1 : startIndex;
  const startPage = startIndex * paginationSize + 1;
  let endPage = startPage + paginationSize;
  endPage = endPage > totalPages ? totalPages + 1 : endPage;

  return (
    <div id="pagination">
      {
        startPage > 1 &&
        <a id="prev" onClick={() => changePage(startPage -1)}>«</a>
      }
      <ul>
        {
          (() => {
            const pills = [];
            for (let i = startPage; i < endPage; i++) {
              pills.push(
                <li
                  className={i === page ? "active" : ""}
                  key={i}
                  onClick={() => changePage(i)}
                >
                  {i}
                </li>
              )}
            return pills;
          })()
        }
      </ul>
      {
        endPage <= totalPages &&
        <a id="next" onClick={() => changePage(endPage)}>»</a>
      }
    </div>
  );
}

export default React.memo(Pagination);
