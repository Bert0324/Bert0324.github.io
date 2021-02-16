import { readFileContent } from './fetchFile';
import { writeTemplate } from './writeTemplate';

const mainTask = async () => {
	const content = await readFileContent();
	writeTemplate(content);
};

mainTask();