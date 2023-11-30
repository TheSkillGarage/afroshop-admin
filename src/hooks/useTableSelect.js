import React, { useEffect, useState } from "react";

const useTableSelect = (params) => {
  const [selectedItems, setSelectedItems] = useState([]);

  function handleSelectItem(id) {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((s) => s !== id));
      return;
    }
    setSelectedItems([...selectedItems, id]);
  }

  function handleSelectAllItems() {
    if (selectedItems.length === params.rows.length) {
      setSelectedItems([]);
      return;
    }
    setSelectedItems(params.rows.map((r) => r.id));
  }

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
