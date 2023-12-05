import { useEffect, useState } from "react";

/**
 * @description useTableSelect Hook
 * @param {object} params : an object with a key named 'rows' and the value being the table data to be displayed.
 * @returns selectedRows: the row selected with the checkbox
 * @returns handleSelectItem: a function that performs single row selection
 * @returns handleSelectAllItems: a function that performs all rows selection
 */
const useTableSelect = (params) => {
  const [selectedItems, setSelectedItems] = useState([]);

  //Handles the selection of the checkbox of an individual row
  function handleSelectItem(id) {
    if (selectedItems.includes(id)) { 
      setSelectedItems(selectedItems.filter((s) => s !== id));//filters the clicked row id out of the array state when the row is unselected
      return;
    }
    setSelectedItems([...selectedItems, id]); //stores the clicked row id in an array state

    console.log("i'm working: ", selectedItems)
  }

  //Handles the selection of all rows, i.e the checkbox on the table header
  function handleSelectAllItems() {
    //sets the state to an empty array if the length of the selected items is equal to the length of the data passed in as a params i.e the checkbox is unselected
    if (selectedItems.length === params.rows.length) { 
      setSelectedItems([]);
      return;
    }
    setSelectedItems(params.rows.map((r) => r.id));//sets the array state to the ids of all the rows when clicked
  }

  //sets the array state to an empty on initial load
  useEffect(() => {
    setSelectedItems([]);
  }, [params.rows.toLocaleString()]);

  return {
    selectedRows: selectedItems,
    handleSelectRow: handleSelectItem,
    handleSelectAllRows: handleSelectAllItems,
  };
};

export default useTableSelect;
