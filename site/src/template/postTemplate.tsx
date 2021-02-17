import React from 'react';
import { Container } from './components/layout';

export default ({ content }: { content: string }) => {
	return (
		<Container Content={() => (
			<div className='post-container'>
				<div id="particles-js" style={{ position: 'fixed', height: '100vh', width: '100vw', zIndex: -99 }} />
				<div className='post-article' dangerouslySetInnerHTML={{ __html: content }} />
			</div>
		)} />
	)
};