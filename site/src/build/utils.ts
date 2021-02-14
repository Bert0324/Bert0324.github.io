import marked from 'marked';
import { readFileSync, existsSync } from 'fs';
import { markdownUrl, projectRootPath, remoteResourceUrl } from './config';
import { IFileContent } from './fetchFile';

export const minifyHTML = (html: string) => html;

export const processMarkdown = (markdown: string) => {	
	return `<article class="markdown-body">${
		minifyHTML(
			marked(
				markdown
				.replace(/\[(.*)\]\((.*)\/([^\/]*)\.md\)/g, (all, $1, $2, $3) => ``)
				.replace(new RegExp(`(${markdownUrl})(.*)\/([^\.]*)\.md`, 'g'), '/blog/$3.html')
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
			try {
				item.content = processMarkdown(readFileSync(`${projectRootPath}${map[item.key]}`, 'utf-8'));
			} catch (e) {
				console.log(e);
			}
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