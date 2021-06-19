import React from 'react';
import { setOptions, Renderer } from 'marked';
import { readFileSync, existsSync } from 'fs';
import { highlight, getLanguage } from 'highlight.js';
import { minify } from 'html-minifier';
import removeMd from 'remove-markdown';
import { markdownUrl, projectRootPath, remoteResourceUrl } from './config';
import { IFileContent } from './fetchFile';
import { renderToStaticMarkup } from 'react-dom/server';
import { TOC } from '../template/components/toc';
import { getFileHistory } from './gitHistory';

export interface IToc {
	text: string;
	level: number;
}

export const minifyHTML = (html: string) => minify(html, {
	minifyCSS: true,
	minifyJS: true,
	collapseWhitespace: true
});

const getLastCommitTime = async (filePath: string) => {
	return getFileHistory(filePath);
};

const markToHTML = async (markdown: string, filePath?: string) => {
	const renderer = new Renderer();
	const toc: IToc[] = [];
	renderer.heading = function(text, level, raw) {
		const id = this.options.headerPrefix + raw.toLowerCase().replace(/[^\w\\u4e00-\\u9fa5]]+/g, '-');
		toc.push({ text: id, level });
		return `
			<h${level} id='${escape(id)}'>
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
			${!!filePath ? renderToStaticMarkup(<TOC data={toc} time={await getLastCommitTime(filePath)} />) : ''}
			<div>${html}</div>
		</div>
	`;
};

export const searchJson: Record<string, any> = {};
export const processMarkdown = async (markdown: string, filePath?: string, key?: string) => {
	const content = removeMd(markdown);
	const fileKey = `${key || 'index'}.html`;
	searchJson[fileKey] = {
		content,
		title: content.match(/^(.*)[\n]/)?.[1] || ''
	};
	return `<article class="markdown-body">${
		await markToHTML(
			markdown
			.replace(new RegExp(`(${markdownUrl})(.*)\/([^\.]*)\.md`, 'g'), '/blog/$3.html')
			.replace(/src\=["|'](.*)[\/]?assets\/([^\"^']*)["|']/g, `src='${remoteResourceUrl}/assets/$2'`),
			filePath
		)
	}</article>`;
};

export const generateHTMLFiles = async (markdown: string, key: string) => {
	const ret: IFileContent[] = [];
	const map: Record<string, any> = {};
	let fileKey= '';
	const content = await processMarkdown(markdown.replace(/\[(.*)\]\((.*)\/([^\/]*)\.md\)/g, (all, $1, $2, key) => {
		if (key) {
			fileKey = key;
			ret.push({
				key,
				content: '',
			});
			map[key] = `${$2}/${key}.md`;
			return `[${$1}](/blog/${key}.html)`;
		}
		return '';
	}), undefined, fileKey);
	await Promise.all(
		ret.map((async item => {
			if (item.content) return item;
			if (existsSync(`${projectRootPath}${map[item.key]}`)) {
				const filePath = `${projectRootPath}${map[item.key]}`;
				const text = readFileSync(filePath, 'utf-8');
				item.content = await processMarkdown(text, filePath, item.key);
			}
			return item;
		}))
	);
	return [
		...ret, 
		{
			key,
			content
		},
	];
}