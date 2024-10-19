import { useState } from 'react';

export const useSelect = (items: number[]) => {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState<boolean>(false);

    const handleSelectItem = (itemId: number) => {
        setSelectedItems(prevSelected => {
            const newSelected = prevSelected.includes(itemId)
                ? prevSelected.filter(id => id !== itemId)
                : [...prevSelected, itemId];

            console.log(newSelected); // Ghi lại trạng thái mới
            return newSelected;
        });
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);
            // console.log([]);
        } else {
            setSelectedItems(items);
            // console.log(items);
        }
        setSelectAll(!selectAll);
    };

    return { selectedItems, selectAll, handleSelectItem, handleSelectAll };
};
