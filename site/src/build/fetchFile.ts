import { readFileSync } from 'fs';
import { seriesPages, singlePage } from './config';
import { generateHTMLFiles, processMarkdown } from './utils';

export interface IFileContent {
	key: string;
	content: string;
};

export const readFileContent = async (): Promise<IFileContent[]> => {
	return [
		...(await Promise.all(seriesPages.map(({ key, path }) => generateHTMLFiles(readFileSync(path, 'utf-8'), key)))).reduce((acc, crr) => {
			acc.push(...crr);
			return acc;
		}, []),
		...await Promise.all(singlePage.map(async ({ key, path }) => ({
			key,
			content: await processMarkdown(readFileSync(path, 'utf-8')),
		})))
	]
};