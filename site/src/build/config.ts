import isWindows from 'is-windows';
import { resolve } from 'path';

const rootPath = resolve('./');
export const projectRootPath = (() => {
	const separator = isWindows() ? '\\' : '/';
	const arr = rootPath.split(separator);
	arr.pop();
	return arr.join(separator);
})();
export const indexTemplatePath = `${rootPath}/src/template/index.html`;
export const documentsPath = `${rootPath}/documents`;
export const distFolderPath = `${projectRootPath}/blog`;
export const markdownUrl = 'https://github.com/Bert0324/code-playground/blob/master';
export const remoteResourceUrl = 'https://raw.githubusercontent.com/Bert0324/code-playground/master';