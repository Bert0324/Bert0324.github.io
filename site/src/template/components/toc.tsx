import React from 'react';
import moment from 'moment';
import { IToc } from '../../build/utils';

export const TOC = ({ data, time }: { data: IToc[], time: Date }) => {
	return (
		<div id='toc'>
			<div className='last-edit'>
				<span>Last Commit: {moment(time).format('YYYY-MM-DD HH:mm:ss')}</span>
			</div>
			<div id='toc-body'>
				<p><strong>Table of Content</strong></p>
				<ul>
					{data.filter(({ level }) => level > 1).map(item => <li key={item.text}><a href={`#${item.text}`}>{item.text}</a></li>)}
				</ul>
			</div>
		</div>
	)
}