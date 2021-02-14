import { resolve } from 'path';

const rootPath = resolve('./');
export const projectRootPath = (() => {
	const arr = rootPath.split('/');
	arr.pop();
	return arr.join('/');
})();
export const indexTemplatePath = `${rootPath}/src/template/index.html`;
export const documentsPath = `${rootPath}/documents`;
export const distFolderPath = `${projectRootPath}/blog`;
export const remoteResourceUrl = 'https://raw.githubusercontent.com/Bert0324/code-playground/master';