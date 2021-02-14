import React from 'react';
import { setOptions, Renderer } from 'marked';
import { readFileSync, existsSync } from 'fs';
import { highlight, getLanguage } from 'highlight.js';
import { markdownUrl, projectRootPath, remoteResourceUrl } from './config';
import { IFileContent } from './fetchFile';
import { renderToStaticMarkup } from 'react-dom/server';
import { TOC } from '../template/components/toc';

export interface IToc {
	text: string;
	level: number;
}

export const minifyHTML = (html: string) => html;

const markToHTML = (markdown: string, createToc?: boolean) => {
	const renderer = new Renderer();
	const toc: IToc[] = [];
	renderer.heading = function(text, level, raw) {
		const id = this.options.headerPrefix + raw.toLowerCase().replace(/[^\w\\u4e00-\\u9fa5]]+/g, '-');
		toc.push({ text: id, level });
		return `
			<h${level} id='${id}'>
				${text}
			</h${level}>
		`;
	};
	const html = setOptions({ 
		highlight: (code, lang) => {
			const validLang = !!(lang && getLanguage(lang));
			return highlight(validLang ? lang || 'text' : 'text', code).value;
		},
		renderer
	})(markdown);
	
	return `
		<div>
			${createToc ? renderToStaticMarkup(<TOC data={toc} />) : ''}
			<div>${html}</div>
		</div>
	`;
};

export const processMarkdown = (markdown: string, createToc?: boolean) => {	
	return `<article class="markdown-body">${
		minifyHTML(
			markToHTML(
				markdown
				.replace(new RegExp(`(${markdownUrl})(.*)\/([^\.]*)\.md`, 'g'), '/blog/$3.html')
				.replace(/src\=["|'](.*)[\/]?assets\/([^\"^']*)["|']/g, `src='${remoteResourceUrl}/assets/$2'`),
				createToc
			)
		)
	}</article>`;
};

export const generateHTMLFiles = (index: string, about: string) => {
	const ret: IFileContent[] = [];
	const map: any = {};
	const content = processMarkdown(index.replace(/\[(.*)\]\((.*)\/([^\/]*)\.md\)/g, (all, $1, $2, key) => {
		if (key) {
			ret.push({
				key,
				content: ''
			});
			map[key] = `${$2}/${key}.md`;
			return `[${$1}](/blog/${key}.html)`;
		}
		return '';
	}));
	ret.forEach((item => {
		if (item.content) return item;
		if (existsSync(`${projectRootPath}${map[item.key]}`)) {
			item.content = processMarkdown(readFileSync(`${projectRootPath}${map[item.key]}`, 'utf-8'), true);
		}
		return item;
	}))
	return [
		...ret, 
		{
			key: 'index',
			content
		},
		{
			key: 'about',
			content: processMarkdown(about)
		}
	];
}