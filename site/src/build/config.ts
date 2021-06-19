import isWindows from 'is-windows';
import { resolve } from 'path';

interface IConfig {
	key: string;
    path: string;
}

const rootPath = resolve('./');
export const projectRootPath = (() => {
	const separator = isWindows() ? '\\' : '/';
	const arr = rootPath.split(separator);
	arr.pop();
	return arr.join(separator);
})();
export const indexTemplatePath = `${rootPath}/src/template/index.html`;
export const documentsPath = `${projectRootPath}/documents`;
export const distFolderPath = `${projectRootPath}/blog`;
export const searchPath = `${projectRootPath}/blog/search.json`;
export const markdownUrl = 'https://github.com/Bert0324/code-playground/blob/master';
export const remoteResourceUrl = 'https://raw.githubusercontent.com/Bert0324/code-playground/master';
export const singlePage: IConfig[] = [
	{
		key: 'about',
		path: `${documentsPath}/about.md`
	}
];
export const seriesPages: IConfig[] = [
	{
		key: 'index',
		path: `${projectRootPath}/README.md`
	},
	{
		key: 'code',
		path:`${documentsPath}/code/code.md`
	},
	{
		key: 'leetcode',
		path: `${documentsPath}/leetcode/leetcode.md`
	},
	{
		key: 'essay',
		path: `${documentsPath}/essay/essay.md`
	},
];