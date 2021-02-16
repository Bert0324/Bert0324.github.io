import gitlog from 'gitlog';
import { projectRootPath } from './config';

const commits = gitlog({
	repo: projectRootPath
});
export const getFileHistory = async (filePath: string) => {
	const currentCommits = commits.filter(({ files }) => files.includes(filePath.replace(`${projectRootPath}/`, '')));
	const date = currentCommits?.[0]?.authorDate;
	return date ? new Date(date) : new Date();
}