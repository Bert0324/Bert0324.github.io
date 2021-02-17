import gitlog from 'gitlog';
import { projectRootPath } from './config';

const commits = gitlog({ repo: projectRootPath });

export const getFileHistory = async (filePath: string) => {
	const currentCommits = commits.filter(({ files }) => files.includes(filePath.replace(`${projectRootPath}/`, '')));
	if (filePath.includes('leetcode.md')) console.log(commits.filter(({ files }) => files.find(file => file.includes('leetcode.md'))))
	const list = currentCommits?.sort(({ authorDate: authorDateA }, { authorDate: authorDateB }) => Number(new Date(authorDateB)) - Number(new Date(authorDateA)));
	const date = list?.[0]?.authorDate;
	return date ? new Date(date) : new Date();
}