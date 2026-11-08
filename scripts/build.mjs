import fs from 'node:fs/promises';
import path from 'node:path';
import foundations from '../src/content/guides-foundations.mjs';
import practice from '../src/content/guides-practice.mjs';
import {site,copy,page,home,guideIndex,article,infoPage,urlFor,escape} from '../src/site.mjs';
import {labMarkup} from '../src/labs.mjs';
import {advertising} from '../src/advertising.mjs';
const guides=[...foundations,...practice].sort((a,b)=>a.number.localeCompare(b.number));
if(guides.length!==6||new Set(guides.map(g=>g.id)).size!==6)throw Error('Expected six unique, complete guides.');
const origin=(process.env.SITE_ORIGIN||site.origin).replace(/\/$/,'');
const dist=path.resolve('dist');
await fs.mkdir(dist,{recursive:true});
await fs.cp('src/assets',path.join(dist,'assets'),{recursive:true});
const pages=[];
async function write(lang,route,title,description,content,active='',noindex=false){
  const routeURL=urlFor(lang,route);
  const file=path.join(dist,routeURL,'index.html');
  await fs.mkdir(path.dirname(file),{recursive:true});
  await fs.writeFile(file,page({lang,path:route,title,description,content,active,guides,origin,noindex}));
  pages.push({url:routeURL,lang,noindex});
}
for(const lang of ['zh','en']){
  const t=copy[lang];
  await write(lang,'',`${t.brandSub} — ${lang==='zh'?'做出值得使用的网页':'Make something worth using'}`,t.heroDek,home(lang,guides));
  await write(lang,'guides/',t.guideTitle,t.guideDek,guideIndex(lang,guides),'guides/');
  for(const g of guides){
    if(!g[lang]?.sections?.length||!g.sources?.length)throw Error(`Incomplete guide: ${g.id}/${lang}`);
    await write(lang,`guides/${g.id}/`,g[lang].title,g[lang].dek,article(lang,g,guides),'guides/');
  }
  for(const kind of ['workshop','checklist']){
    const checklist=kind==='checklist';
    const title=checklist?t.checklist:t.laboratory,dek=checklist?t.checklistDek:t.laboratoryDek;
    const content=`<section class="page-intro page-width"><p class="eyebrow">${checklist?'A CAREFUL RELEASE':'THE HANDS-ON WORKSHOP'}</p><h1>${title}</h1><p>${dek}</p></section><section class="workshop-section"><div class="page-width">${labMarkup(lang,checklist?'launch':'data')}<div class="workshop-guide-note"><span>${lang==='zh'?'把例子放回实际任务：':'Connect the exercise to a real task:'}</span><a href="${urlFor(lang,'guides/readable-data/')}">${guides[0][lang].title}</a><a href="${urlFor(lang,'guides/image-budget/')}">${guides.find(g=>g.id==='image-budget')[lang].title}</a></div></div></section>`;
    await write(lang,`${kind}/`,title,dek,content,`${kind}/`);
  }
  for(const kind of ['about','privacy','contact']){const info=infoPage(lang,kind);await write(lang,`${kind}/`,info.title,info.description,info.content,kind==='about'?'about/':'');}
}
const t=copy.zh;
await fs.writeFile(path.join(dist,'404.html'),page({lang:'zh',path:'404.html',title:t.notFound,description:t.notFoundDek,content:`<section class="not-found page-width"><div class="error-404" aria-hidden="true">404</div><h1>${t.notFound}</h1><p>${t.notFoundDek}</p><a class="button button-primary" href="/guides/">${t.back} →</a> <a class="text-link" href="/en/guides/" lang="en">Browse the guide in English ↗</a></section>`,guides,origin,noindex:true}));
const xml=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.filter(p=>!p.noindex).map(p=>`<url><loc>${escape(origin+p.url)}</loc><lastmod>${site.date}</lastmod></url>`).join('\n')}\n</urlset>\n`;
await fs.writeFile(path.join(dist,'sitemap.xml'),xml);
await fs.writeFile(path.join(dist,'robots.txt'),`User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
await fs.writeFile(path.join(dist,'ads.txt'),`google.com, ${advertising.seller}, DIRECT, f08c47fec0942fa0\n`);
await fs.writeFile(path.join(dist,'.nojekyll'),'');
await fs.writeFile(path.join(dist,'_headers'),`/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n`);
console.log(JSON.stringify({pages:pages.length,guides:guides.length,languages:['zh','en'],dist,origin}));
