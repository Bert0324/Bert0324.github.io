import React, { FC } from 'react';
import moment from 'moment';
import { IToc } from '../../build/utils';

const build = (data: IToc[], k: number, level: number, ctx: string[]) => {
    if (k >= data.length || data[k].level <= level) return k;
    const node = data[k];
	ctx.push(`<li><a href='#${escape(node.text)}'>${node.text}</a></li>`)
    k++;
    const childCtx = [];
    k = build(data, k, node.level, childCtx);
    if (childCtx.length > 0) {
        ctx.push('<ul>');
        childCtx.forEach(idm => ctx.push(idm));
        ctx.push('</ul>');
    }
    ctx.push('</li>');
    k = build(data, k, level, ctx);
    return k;
}

const parseToTree = (data: IToc[]): string => {
	const ctx: string[] = [];
	build(data, 0, 0, ctx);
	return [...ctx, '</ul>'].join('');
};

export const TOC = ({ data, time }: { data: IToc[], time: Date }) => {	
	return (
		<div id='toc'>
			<div className='last-edit'>
				<p>Last Commit: {moment(time).format('YYYY-MM-DD HH:mm:ss')}</p>
				<p id="busuanzi_container_page_pv">views: <span id="busuanzi_value_page_pv"></span></p>
			</div>
			<div id='toc-body'>
				<p><strong>Table of Content</strong></p>
				<ul dangerouslySetInnerHTML={{ __html: parseToTree(data.filter(({ level }) => level > 1)) }} />
			</div>
		</div>
	)
}