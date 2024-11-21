import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const navigate = useNavigate();

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        if (searchTerm) {
            navigate(`/products/search?query=${searchTerm}`);
        }
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Tìm kiếm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="searchButton" title="Search">
                <FontAwesomeIcon icon={faSearch} className="iconSearch" />
            </button>
        </form>
    );
};

export default SearchBar;
