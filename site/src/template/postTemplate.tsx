import React from 'react';

export default ({ content }: { content: string }) => {
	return (
		<div>
			<div dangerouslySetInnerHTML={{ __html: content }} />
		</div>
	)
};