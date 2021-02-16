import React from 'react';
import { Container } from './components/layout';

export default ({ content }: { content: string }) => {
	return (
		<Container Content={() => (
			<div className='post-container'>
				<div className='post-article' dangerouslySetInnerHTML={{ __html: content }} />
			</div>
		)} />
	)
};