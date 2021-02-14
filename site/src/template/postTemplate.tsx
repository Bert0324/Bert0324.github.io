import React from 'react';
import { Container } from './components/layout';

export default ({ content }: { content: string }) => {
	return (
		<Container Content={() => <div dangerouslySetInnerHTML={{ __html: content }} />} />
	)
};