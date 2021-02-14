import React from 'react';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { sync } from 'rimraf';
import { renderToStaticMarkup } from 'react-dom/server';
import { template } from 'lodash';
import { indexTemplatePath, distFolderPath } from './config';
import Template from '../template/postTemplate';
import { IFileContent } from "./fetchFile";
import { minifyHTML } from './utils';

const recreateFolder = (path: string) => {
	if (existsSync(path)) sync(path);
	mkdirSync(path);
};

export const writeTemplate = async (contents: IFileContent[]) => {

	const indexTemplate = readFileSync(indexTemplatePath, 'utf-8');
	const inject = template(indexTemplate);

	recreateFolder(distFolderPath);

	await Promise.all(contents.map(async content => {
		writeFileSync(
			`${distFolderPath}/${content.key}.html`, 
			minifyHTML(inject({ content: renderToStaticMarkup(<Template content={content.content} />) }))
		);
	}));
};