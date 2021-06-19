import React from 'react';

export const SearchBar = () => {
	return (
		<div className="search-field">
            <input className="search-input" placeholder='search' />
            <div style={{ position: 'absolute' }}>
                <div className="search-dropdown">
                    <div className="dropdown-container" />
                </div>
            </div>
		</div>
	);
};