const lang=document.body.dataset.lang;
const zh=lang==='zh';
const notify=message=>{document.querySelector('#announcement').textContent=message;};
const menu=document.querySelector('.mobile-menu');
const nav=document.querySelector('#main-nav');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){menu.setAttribute('aria-expanded','false');nav.classList.remove('is-open');menu.focus();}});

const dialog=document.querySelector('#search-dialog');
const searchInput=document.querySelector('#site-search');
const results=document.querySelector('.search-results');
const summary=document.querySelector('.search-summary');
const searchData=JSON.parse(document.querySelector('#search-data').textContent);
let opener;
function renderSearch(){
  const query=searchInput.value.trim().toLocaleLowerCase();
  const words=query.split(/\s+/).filter(Boolean);
  const matches=searchData.filter(item=>words.every(word=>`${item.title} ${item.dek} ${item.topic}`.toLocaleLowerCase().includes(word)));
  results.replaceChildren();
  summary.textContent=zh?`${matches.length} 篇指南`:`${matches.length} ${matches.length===1?'guide':'guides'}`;
  if(!matches.length){const empty=document.createElement('p');empty.className='search-empty';empty.textContent=zh?'没有找到相关指南，换一个关键词试试。':'No matching guides. Try another keyword.';results.append(empty);return;}
  for(const item of matches){const a=document.createElement('a');a.className='search-result';a.href=item.url;const topic=document.createElement('span');topic.textContent=item.topic;const title=document.createElement('strong');title.textContent=item.title;const dek=document.createElement('p');dek.textContent=item.dek;a.append(topic,title,dek);results.append(a);}
}
document.querySelector('.search-open')?.addEventListener('click',event=>{opener=event.currentTarget;renderSearch();dialog.showModal();searchInput.focus();});
searchInput?.addEventListener('input',renderSearch);
document.querySelector('.search-close')?.addEventListener('click',()=>dialog.close());
dialog?.addEventListener('click',event=>{if(event.target===dialog){const b=dialog.getBoundingClientRect();if(event.clientX<b.left||event.clientX>b.right||event.clientY<b.top||event.clientY>b.bottom)dialog.close();}});
dialog?.addEventListener('close',()=>opener?.focus());
dialog?.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();event.stopPropagation();dialog.close();}});

const filters=[...document.querySelectorAll('[data-filter]')];
function setFilter(topic){
  if(!filters.some(button=>button.dataset.filter===topic))topic='all';
  for(const button of filters)button.setAttribute('aria-pressed',String(button.dataset.filter===topic));
  let count=0;
  for(const row of document.querySelectorAll('.guide-list [data-topic]')){const show=topic==='all'||row.dataset.topic===topic;row.hidden=!show;if(show)count++;}
  const status=document.querySelector('#filter-status');if(status)status.textContent=zh?`显示 ${count} 篇指南`:`Showing ${count} guides`;
}
if(filters.length){setFilter(new URL(location.href).searchParams.get('topic')||'all');for(const button of filters)button.addEventListener('click',()=>{const topic=button.dataset.filter;setFilter(topic);const url=new URL(location.href);topic==='all'?url.searchParams.delete('topic'):url.searchParams.set('topic',topic);history.replaceState(null,'',url);});}

for(const pre of document.querySelectorAll('.article-body pre')){
  const button=document.createElement('button');button.className='code-copy';button.type='button';button.textContent=zh?'复制代码':'Copy code';
  button.addEventListener('click',async()=>{const text=pre.querySelector('code')?.textContent||pre.textContent;try{await navigator.clipboard.writeText(text);button.textContent=zh?'已复制':'Copied';notify(button.textContent);setTimeout(()=>button.textContent=zh?'复制代码':'Copy code',1800);}catch{notify(zh?'未能复制，请选择文本后复制。':'Could not copy. Select the text to copy it manually.');}});
  pre.prepend(button);
}
if(document.querySelector('.article-page')){
  const progress=document.querySelector('.reading-progress i');
  const update=()=>{const height=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${Math.min(100,Math.max(0,scrollY/Math.max(height,1)*100))}%`;};
  addEventListener('scroll',update,{passive:true});addEventListener('resize',update);update();
  const sections=[...document.querySelectorAll('.article-section,.sources-section')];
  if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){for(const a of document.querySelectorAll('.article-toc a[href^="#"]'))a.setAttribute('aria-current',String(a.hash===`#${entry.target.id}`));}}},{rootMargin:'-10% 0px -65% 0px',threshold:0});sections.forEach(section=>observer.observe(section));}
}
