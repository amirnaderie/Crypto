import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}

export function sortItems(items,columnName,sortType )
{
  let ordersItems = items;

  ordersItems = _.orderBy(ordersItems, columnName,sortType); // Use Lodash to sort array by 'name'

  return ordersItems;
}
