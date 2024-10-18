import { useState } from 'react';

export const useSelect = (items: number[]) => {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState<boolean>(false);

    const handleSelectItem = (itemId: number) => {
        setSelectedItems(prevSelected =>
            prevSelected.includes(itemId)
                ? prevSelected.filter(id => id !== itemId)
                : [...prevSelected, itemId]
        );
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            setSelectedItems(items);
        }
        setSelectAll(!selectAll);
    };

    return { selectedItems, selectAll, handleSelectItem, handleSelectAll };
};
