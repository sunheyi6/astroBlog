const pinyin = require('pinyin');
const fs = require('fs');
const path = require('path');

function generateSlug(title) {
  return pinyin(title, {
    style: pinyin.STYLE_NORMAL,
    segment: true,
    heteronym: false
  }).map((word) => word[0])
    .join('-')
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function createMarkdownFile(title) {
  const slug = generateSlug(title);
  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  const frontmatter = `
---
title: "${title}"
slug: "${slug}"
author: 孙贺毅
pubDatetime: "${date}"
featured: false
ogImage: 
description: ""
---
`;

  const fileName = `${slug}.md`;
  const directoryPath = path.join(__dirname, 'src/content', 'blog'); // Make sure this directory exists
  const filePath = path.join(directoryPath, fileName);

  fs.writeFileSync(filePath, frontmatter);
  console.log(`Markdown file '${fileName}' has been created.`);
}

function main (){
  createMarkdownFile("新建文章");
}
ma