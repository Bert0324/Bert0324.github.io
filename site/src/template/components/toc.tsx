import React from 'react';
import { IToc } from '../../build/utils';

export const TOC = ({ data }: { data: IToc[] }) => {

	return (
		<div id='toc'>
			<div id='toc-body'>
				<p><strong>Table of Content</strong></p>
				<ul>
					{data.filter(({ level }) => level > 1).map(item => <li key={item.text}><a href={`#${item.text}`}>{item.text}</a></li>)}
				</ul>
			</div>
		</div>
	)
}