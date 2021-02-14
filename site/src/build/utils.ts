import { minify } from 'html-minifier';
import marked from 'marked';
import { readFileSync } from 'fs';
import { projectRootPath, remoteResourceUrl } from './config';
import { IFileContent } from './fetchFile';

export const minifyHTML = (html: string) => minify(html, {
	collapseInlineTagWhitespace: true,
	collapseWhitespace: true,
	removeAttributeQuotes: true
});

export const processMarkdown = (markdown: string) => {	
	return `<article class="markdown-body">${
		minifyHTML(
			marked(
				markdown.replace(/src\=["|'](.*)[\/]?assets\/([^\"^']*)["|']/g, `src='${remoteResourceUrl}/assets/$1'`)
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
		try {
			item.content = readFileSync(`${projectRootPath}${map[item.key]}`, 'utf-8');
		} catch (e) {
			console.log(e);
			item.content = '';
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