import { readFileSync } from 'fs';
import { documentsPath, projectRootPath } from './config';
import { generateHTMLFiles, processMarkdown } from './utils';

export interface IFileContent {
	key: string;
	content: string;
};

export const readFileContent = (): IFileContent[] => {

	const index = readFileSync(`${projectRootPath}/README.md`, 'utf-8');
	const about = readFileSync(`${documentsPath}/about.md`, 'utf-8');
	const code = readFileSync(`${projectRootPath}/code/code.md`, 'utf-8');
	const leetcode = readFileSync(`${projectRootPath}/leetcode/leetcode.md`, 'utf-8');
	const essay = readFileSync(`${projectRootPath}/essay/essay.md`, 'utf-8');

	return [
		{
			key: 'about',
			content: processMarkdown(about),
		},
		...generateHTMLFiles(index, 'index'),
		...generateHTMLFiles(code, 'code'), 
		...generateHTMLFiles(leetcode, 'leetcode'),
		...generateHTMLFiles(essay, 'essay'),
	];
};