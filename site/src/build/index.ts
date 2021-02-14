import { readFileContent } from './fetchFile';
import { writeTemplate } from './writeTemplate';

const mainTask = async () => {
	const content = readFileContent();
	writeTemplate(content);
};

mainTask();