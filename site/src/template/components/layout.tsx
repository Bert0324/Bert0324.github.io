import React, { FC } from 'react';
import { SearchBar } from './search';
import { SideBar } from './sideBar';

export const Container = ({ Content }: { Content: FC  }) => {
	return (
		<div className='container'>
			<SideBar />
			<div className='post-content'>
				<SearchBar />
				<Content />
				<div id='reminder' style={{ display: 'none' }}>
					Facebook Comments Service is unavailable
				</div>
			</div>
		</div>
	)
};