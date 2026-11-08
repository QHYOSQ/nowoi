import fs from 'node:fs/promises';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const root=path.resolve('dist');
async function walk(dir){return(await Promise.all((await fs.readdir(dir,{withFileTypes:true})).map(d=>d.isDirectory()?walk(path.join(dir,d.name)):path.join(dir,d.name)))).flat();}
const files=await walk(root), all=new Set(files.map(f=>path.relative(root,f).split(path.sep).join('/'))), errors=[];
let htmlCount=0;
for(const f of files){
  const rel=path.relative(root,f).split(path.sep).join('/');
  if(f.endsWith('.js')){const result=spawnSync(process.execPath,['--check',f],{encoding:'utf8'});if(result.status!==0)errors.push(`${rel}: invalid JavaScript ${result.stderr}`);}
  if(!f.endsWith('.html'))continue;
  htmlCount++;
  const html=await fs.readFile(f,'utf8');
  if((html.match(/<h1(?:\s|>)/g)||[]).length!==1)errors.push(`${rel}: expected exactly one h1`);
  if(!/<html lang="(?:zh-CN|en)"/.test(html))errors.push(`${rel}: missing language`);
  if(/(?:TODO|lorem ipsum|undefined|\[object Object\])/i.test(html))errors.push(`${rel}: unfinished content marker`);
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  if(new Set(ids).size!==ids.length)errors.push(`${rel}: duplicate IDs`);
  const navigableHTML=html.replace(/<pre\b[\s\S]*?<\/pre>/g,'');
  for(const m of navigableHTML.matchAll(/\b(?:href|src)="([^"]+)"/g)){
    const value=m[1].replace(/&amp;/g,'&');
    if(/^(?:https?:|mailto:|tel:|data:)/.test(value))continue;
    const u=new URL(value,'https://local.test/'+rel.replace(/index\.html$/,''));
    let dest=decodeURIComponent(u.pathname).replace(/^\//,'');
    if(dest.endsWith('/'))dest+='index.html';
    if(dest==='')dest='index.html';
    if(!all.has(dest)){errors.push(`${rel}: missing local destination ${value}`);continue;}
    if(u.hash&&dest.endsWith('.html')){const target=await fs.readFile(path.join(root,dest),'utf8');if(!target.includes(`id="${decodeURIComponent(u.hash.slice(1))}"`))errors.push(`${rel}: missing anchor ${value}`);}
  }
}
if(htmlCount!==27)errors.push(`Expected 27 HTML pages, found ${htmlCount}`);
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}else console.log(`PASS: ${htmlCount} pages; bilingual routes, local links, anchors, unique IDs, headings, and browser JavaScript.`);
