import { setOptions, Renderer } from 'marked';
import { readFileSync, existsSync } from 'fs';
import { getLanguage, highlight } from 'highlight.js';
import { markdownUrl, projectRootPath, remoteResourceUrl } from './config';
import { IFileContent } from './fetchFile';

export const minifyHTML = (html: string) => html;

const markToHTML = (markdown: string) => {
	const renderer = new Renderer();
	renderer.code = (code, language) => {
		const validLang = !!(language && getLanguage(language));
		const highlighted = highlight(validLang ? language || 'text' : 'text', code).value
		return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
	};
	return setOptions({ renderer })(markdown);
};

export const processMarkdown = (markdown: string) => {	
	return `<article class="markdown-body">${
		minifyHTML(
			markToHTML(
				markdown
				.replace(new RegExp(`(${markdownUrl})(.*)\/([^\.]*)\.md`, 'g'), '/blog/$3.html')
				.replace(/src\=["|'](.*)[\/]?assets\/([^\"^']*)["|']/g, `src='${remoteResourceUrl}/assets/$2'`)
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
			item.content = processMarkdown(readFileSync(`${projectRootPath}${map[item.key]}`, 'utf-8'));
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