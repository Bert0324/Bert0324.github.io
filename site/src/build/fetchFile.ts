import { readFileSync } from 'fs';
import { documentsPath, projectRootPath } from './config';
import { generateHTMLFiles } from './utils';

export interface IFileContent {
	key: string;
    content: string;
};

export const readFileContent = (): IFileContent[] => {

	const indexes = readFileSync(`${projectRootPath}/README.md`, 'utf-8');
	const about = readFileSync(`${documentsPath}/about.md`, 'utf-8');

	return generateHTMLFiles(indexes, about);
};