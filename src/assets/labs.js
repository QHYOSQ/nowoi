export const COPY = {
  zh: {
    tabs: { data: '数据工作台', form: '表单反馈', budget: '传输预算', launch: '发布清单' },
    tabLabel: '选择实验',
    dataTitle: '让一份 CSV 成为可用的数据',
    dataIntro: '把网站文件清单转换成有表头的表格，再带走 JSON 或独立 HTML。处理只发生在当前页面。',
    csvLabel: 'CSV 内容', csvHelp: '第一行是表头。支持双引号、引号内逗号和换行；用两个双引号表示一个双引号。最多 1 MB、5,000 条记录（含表头）。',
    fileLabel: '或选择 UTF-8 CSV 文件', sample: '载入示例', convert: '生成表格', json: '下载 JSON', html: '下载 HTML 表格',
    caption: '网站文件清单', previewEmpty: '生成后，这里会显示可访问的表格预览。',
    dataNote: '所有值按文本保留。预览最多显示 100 条数据，下载文件包含全部数据。下载的 HTML 会转义单元格内容。',
    dataChanged: '内容已更改，请重新生成表格。',
    dataReady: (rows, shown) => `已解析 ${rows} 条数据，${shown < rows ? `预览前 ${shown} 条` : '已全部显示'}。`,
    fileLoaded: name => `已载入 ${name}。`, fileEncoding: '无法读取文件。请选择有效的 UTF-8 CSV 文件。',
    lineAt: (line, column) => `（第 ${line} 行，第 ${column} 列）`, recordAt: record => `（第 ${record} 条记录，含表头）`,
    csvErrors: { empty: '请先输入 CSV 内容。', size: '内容超过 1 MB，请缩小文件后重试。', rows: '记录超过 5,000 条（包含表头），请拆分数据。', quote: '未加引号的字段中出现了双引号。请用双引号包住整个字段。', afterQuote: '闭合双引号后只能跟逗号或换行。', unclosed: '有一个双引号字段尚未闭合。', header: '表头不能留空，请为每一列命名。', duplicate: '表头名称重复，请为每一列使用不同的名称。', width: '某条记录的字段数量与表头不一致。请检查逗号和双引号。', noData: '请在表头后至少添加一条数据。' },
    formTitle: '错误应该帮助人完成下一步',
    formIntro: '先尝试空白提交，再修正输入。错误只在第一次提交后出现，并与对应字段建立可访问关联。',
    email: '联系邮箱', emailHelp: '例如 name@example.com。这里只检查格式，不验证邮箱是否存在。',
    project: '项目说明', projectHelp: '用 10–1,000 个字符说明你想制作什么。',
    submit: '提交演示', formReset: '清空演示', formNote: '这是本地交互演示，输入不会发送到服务器。',
    emailEmpty: '请填写联系邮箱。', emailInvalid: '请使用 name@example.com 这样的邮箱格式。',
    projectEmpty: '请填写项目说明。', projectInvalid: '请用 10–1,000 个字符说明你想制作什么。',
    summary: count => `有 ${count} 项需要修正`, formSuccess: '本地验证完成，没有发送任何数据。',
    budgetTitle: '先给页面一个传输预算',
    budgetIntro: '调整各类资源的大小和网络速率，观察理想传输时间。图片占用多少，通常比直觉更容易在数字里看清。',
    budgetNames: { html: 'HTML', js: 'JavaScript', css: 'CSS', fonts: '字体', images: '图片' },
    speed: '网络速率（Mbps）', total: '资源总量', transfer: '理想传输时间', seconds: '秒', reset: '恢复默认',
    budgetHelp: '资源按 KB 计，1 KB = 1,000 字节；1 Mbps = 每秒 1,000,000 比特。时间 = 总 KB × 8 ÷（Mbps × 1,000）。',
    budgetNote: '这不是网络测速，也不预测 LCP。计算不包含请求延迟、连接开销、资源执行、解码、缓存或并行加载的影响。',
    budgetInvalid: '各类资源请填写 0–1,000,000 KB；网络速率请填写 0.1–10,000 Mbps。所有输入都不能为空。',
    launchTitle: '把发布前的最后一遍检查做完',
    launchIntro: '逐项实际检查，再勾选。这里记录你的判断，不会自动扫描网站；未勾选保存时，进度只保留在当前页面。',
    groups: { content: '内容', experience: '体验', release: '发布' },
    save: '在此设备保存', saveHelp: '仅保存勾选状态。取消勾选会删除这份本地记录；这不是云端同步。',
    export: '导出 Markdown', launchReset: '重置清单', progressLabel: '发布检查完成进度',
    progress: n => `已完成 ${n} / 12 项`, saved: '进度已保存在此设备。', removed: '已删除设备上的保存记录。',
    restored: '已恢复此设备保存的进度。', resetDone: '清单已重置，设备上的保存记录已删除。',
    storageError: '此浏览器无法保存进度。勾选状态仍可在当前页面使用。',
    removalError: '浏览器未能删除保存记录，请在浏览器的网站数据设置中删除本站数据。',
    markdownTitle: 'NOWOI 发布清单', markdownNote: '手动检查记录；不代表自动测试或发布保证。',
  },
  en: {
    tabs: { data: 'Data workbench', form: 'Form feedback', budget: 'Transfer budget', launch: 'Launch checklist' },
    tabLabel: 'Choose an experiment',
    dataTitle: 'Turn a CSV into usable data',
    dataIntro: 'Convert a website asset list into a table with column headers, then take away JSON or a standalone HTML table. Processing stays on this page.',
    csvLabel: 'CSV content', csvHelp: 'The first record contains column headers. Quoted fields support commas and line breaks; two double quotes represent one double quote. Limit: 1 MB and 5,000 records, including the header.',
    fileLabel: 'Or choose a UTF-8 CSV file', sample: 'Load example', convert: 'Build table', json: 'Download JSON', html: 'Download HTML table',
    caption: 'Website asset list', previewEmpty: 'Build the table to see an accessible preview here.',
    dataNote: 'All values stay as text. The preview shows up to 100 data records; downloads include every record. Cell content is escaped in the downloaded HTML.',
    dataChanged: 'Content changed. Build the table again to update the result.',
    dataReady: (rows, shown) => `${rows} data records parsed. ${shown < rows ? `Showing the first ${shown}.` : 'Showing all records.'}`,
    fileLoaded: name => `Loaded ${name}.`, fileEncoding: 'The file could not be read. Choose a valid UTF-8 CSV file.',
    lineAt: (line, column) => ` (line ${line}, column ${column})`, recordAt: record => ` (record ${record}, including the header)`,
    csvErrors: { empty: 'Enter some CSV content first.', size: 'The content exceeds 1 MB. Use a smaller file.', rows: 'There are more than 5,000 records, including the header. Split the data into smaller files.', quote: 'A double quote appears inside an unquoted field. Put the entire field in double quotes.', afterQuote: 'A closing double quote must be followed by a comma or a line break.', unclosed: 'A quoted field has no closing double quote.', header: 'Column headers cannot be empty. Give every column a name.', duplicate: 'Column headers repeat. Use a different name for every column.', width: 'A record has a different number of fields from the header. Check its commas and double quotes.', noData: 'Add at least one data record after the header.' },
    formTitle: 'An error should help someone move forward',
    formIntro: 'Try submitting empty fields, then correct them. Errors appear only after the first submission and are programmatically linked to each field.',
    email: 'Contact email', emailHelp: 'For example, name@example.com. This checks format only, not whether the address exists.',
    project: 'Project description', projectHelp: 'Use 10–1,000 characters to explain what you want to build.',
    submit: 'Try submission', formReset: 'Clear demo', formNote: 'This is a local interaction demo. Your input is not sent to a server.',
    emailEmpty: 'Enter a contact email.', emailInvalid: 'Use an email format such as name@example.com.',
    projectEmpty: 'Enter a project description.', projectInvalid: 'Use 10–1,000 characters to explain what you want to build.',
    summary: count => `${count} ${count === 1 ? 'item needs' : 'items need'} attention`, formSuccess: 'Local validation completed. No data was sent.',
    budgetTitle: 'Give the page a transfer budget first',
    budgetIntro: 'Change resource sizes and network speed to explore ideal transfer time. Numbers make the share taken by images easier to see.',
    budgetNames: { html: 'HTML', js: 'JavaScript', css: 'CSS', fonts: 'Fonts', images: 'Images' },
    speed: 'Network speed (Mbps)', total: 'Total resources', transfer: 'Ideal transfer time', seconds: 'seconds', reset: 'Restore defaults',
    budgetHelp: 'Sizes use KB: 1 KB = 1,000 bytes. 1 Mbps = 1,000,000 bits per second. Time = total KB × 8 ÷ (Mbps × 1,000).',
    budgetNote: 'This is not a speed test or an LCP prediction. It excludes request latency, connection overhead, execution, decoding, caching, and the effects of parallel loading.',
    budgetInvalid: 'Enter 0–1,000,000 KB for each resource type and 0.1–10,000 Mbps for network speed. No field can be empty.',
    launchTitle: 'Finish the last checks before publishing',
    launchIntro: 'Check the actual site before ticking each item. This records your judgment and does not scan the site. Without device saving, progress lasts only on this page.',
    groups: { content: 'Content', experience: 'Experience', release: 'Release' },
    save: 'Save on this device', saveHelp: 'Saves checked items only. Turning this off deletes the local record. This is not cloud sync.',
    export: 'Export Markdown', launchReset: 'Reset checklist', progressLabel: 'Launch checklist progress',
    progress: n => `${n} of 12 items completed`, saved: 'Progress saved on this device.', removed: 'The saved device record was deleted.',
    restored: 'Restored progress saved on this device.', resetDone: 'Checklist reset. The saved device record was deleted.',
    storageError: 'This browser cannot save progress. You can still use the checklist on this page.',
    removalError: 'The browser could not delete the saved record. Remove this site’s data in your browser settings.',
    markdownTitle: 'NOWOI launch checklist', markdownNote: 'A manual review record, not an automated test or a publishing guarantee.',
  },
};

export const CHECKLIST_ITEMS = [
  { id: 'purpose', group: 'content', zh: '首页清楚说明网站为谁服务，以及访客可以做什么。', en: 'The home page explains who the site serves and what visitors can do.' },
  { id: 'pages', group: 'content', zh: '主要页面齐全，导航名称与目标页面一致。', en: 'Essential pages exist, and navigation labels match their destinations.' },
  { id: 'links', group: 'content', zh: '校对正文、日期和链接，删除占位文字。', en: 'Proofread copy, dates, and links; remove placeholder text.' },
  { id: 'rights', group: 'content', zh: '联系渠道可用，图片与字体的使用授权已确认。', en: 'Contact details work, and image and font usage rights are confirmed.' },
  { id: 'mobile', group: 'experience', zh: '用手机宽度查看页面，正文没有意外的横向滚动。', en: 'Check a phone-sized viewport: body content has no unexpected horizontal scroll.' },
  { id: 'keyboard', group: 'experience', zh: '只用键盘完成主要任务，焦点清晰且顺序合理。', en: 'Complete the main task by keyboard, with visible focus and a sensible order.' },
  { id: 'labels', group: 'experience', zh: '为有意义的图片提供替代文字，为输入框提供明确标签。', en: 'Provide useful alternative text for meaningful images and clear labels for inputs.' },
  { id: 'assets', group: 'experience', zh: '压缩图片，声明图片尺寸，并检查字体与脚本体积。', en: 'Compress images, declare image dimensions, and review font and script sizes.' },
  { id: 'https', group: 'release', zh: '正式网址使用 HTTPS，主要页面没有混合内容错误。', en: 'The production URL uses HTTPS, with no mixed-content errors on key pages.' },
  { id: 'metadata', group: 'release', zh: '每页标题、描述和网站图标都与实际内容相符。', en: 'Page titles, descriptions, and the site icon match the real content.' },
  { id: 'forms', group: 'release', zh: '测试真实表单的成功与失败路径，确认前端代码中没有私密密钥。', en: 'Test success and failure paths for real forms, and check that frontend code contains no secret keys.' },
  { id: 'recovery', group: 'release', zh: '测试失效网址与重定向，并保留可恢复的上一个发布版本。', en: 'Test missing pages and redirects, and keep a previous release that can be restored.' },
];

export const SAMPLE_CSV = {
  zh: '文件,类型,大小（KB）,用途\r\nindex.html,HTML,18,首页\r\nassets/styles.css,CSS,24,"布局、颜色, 与排版"\r\nassets/reading.woff2,字体,48,"正文使用的“阅读”字体"\r\nassets/cover.avif,图片,180,"首页封面\r\n移动端使用裁剪版本"\r\nassets/app.js,JavaScript,32,"按钮显示 ""已完成"""',
  en: 'File,Type,Size (KB),Purpose\r\nindex.html,HTML,18,Home page\r\nassets/styles.css,CSS,24,"Layout, color, and typography"\r\nassets/reading.woff2,Font,48,Body text font\r\nassets/cover.avif,Image,180,"Home page cover\r\nCropped for smaller screens"\r\nassets/app.js,JavaScript,32,"Button says ""Done"""',
};

export const BUDGET_DEFAULTS = Object.freeze({ html: 18, js: 32, css: 24, fonts: 48, images: 180, speed: 10 });
export const STORAGE_KEY = 'nowoi:launch-checklist:v1';
const TABS = ['data', 'form', 'budget', 'launch'];

export class CsvError extends Error {
  constructor(code, input = '', index = 0) {
    super(code);
    this.name = 'CsvError';
    this.code = code;
    const lines = input.slice(0, index).split(/\r\n|\r|\n/);
    this.line = lines.length;
    this.column = lines.at(-1).length + 1;
  }
}

/** Parse strict comma-separated records. Limits include the header record. */
export function parseCsv(input, { maxBytes = 1_048_576, maxRows = 5000 } = {}) {
  if (typeof input !== 'string') throw new TypeError('CSV input must be a string');
  if (new TextEncoder().encode(input).byteLength > maxBytes) throw new CsvError('size');
  const source = input.replace(/^\uFEFF/, '');
  if (!source.length) throw new CsvError('empty');
  const records = [];
  let record = [], field = '', quoted = false, closed = false, endedRecord = false;
  const pushField = () => { record.push(field); field = ''; closed = false; };
  const pushRecord = index => {
    pushField();
    records.push(record);
    if (records.length > maxRows) throw new CsvError('rows', source, index);
    record = [];
    endedRecord = true;
  };
  for (let i = 0; i < source.length; i++) {
    const char = source[i];
    endedRecord = false;
    if (quoted) {
      if (char === '"') {
        if (source[i + 1] === '"') { field += '"'; i++; }
        else { quoted = false; closed = true; }
      } else field += char;
      continue;
    }
    if (char === ',') { pushField(); continue; }
    if (char === '\r' || char === '\n') {
      pushRecord(i);
      if (char === '\r' && source[i + 1] === '\n') i++;
      continue;
    }
    if (closed) throw new CsvError('afterQuote', source, i);
    if (char === '"') {
      if (field.length) throw new CsvError('quote', source, i);
      quoted = true;
    } else field += char;
  }
  if (quoted) throw new CsvError('unclosed', source, source.length);
  if (!endedRecord) pushRecord(source.length);
  return records;
}

export function csvDataset(input, options) {
  const records = parseCsv(input, options);
  const headers = records[0].map(value => value.trim());
  if (headers.some(value => !value)) throw new CsvError('header');
  if (new Set(headers).size !== headers.length) throw new CsvError('duplicate');
  if (records.length < 2) throw new CsvError('noData');
  const rows = records.slice(1);
  const mismatch = rows.findIndex(row => row.length !== headers.length);
  if (mismatch !== -1) {
    const error = new CsvError('width');
    error.record = mismatch + 2;
    throw error;
  }
  return { headers, rows };
}

export function datasetJson({ headers, rows }) {
  return JSON.stringify(rows.map(row => Object.fromEntries(headers.map((key, i) => [key, row[i]]))), null, 2);
}

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

export function datasetHtml({ headers, rows }, lang = 'zh') {
  const language = lang === 'en' ? 'en' : 'zh';
  const title = COPY[language].caption;
  const cells = (values, tag) => values.map(value => `<${tag}${tag === 'th' ? ' scope="col"' : ''}>${escapeHtml(value)}</${tag}>`).join('');
  return `<!doctype html>\n<html lang="${language === 'zh' ? 'zh-CN' : 'en'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><style>body{font:16px/1.6 system-ui,sans-serif;margin:2rem;color:#17231e}table{border-collapse:collapse}caption{text-align:left;font-weight:700;margin-bottom:1rem}th,td{border:1px solid #c7d1cb;padding:.65rem;text-align:left;vertical-align:top;white-space:pre-wrap}th{background:#edf3ef}</style></head><body><table><caption>${title}</caption><thead><tr>${cells(headers, 'th')}</tr></thead><tbody>${rows.map(row => `<tr>${cells(row, 'td')}</tr>`).join('')}</tbody></table></body></html>\n`;
}

export function validateForm(values, lang = 'zh', nativeEmailInvalid) {
  const copy = COPY[lang === 'en' ? 'en' : 'zh'];
  const email = String(values.email || '').trim();
  const project = String(values.project || '').trim();
  const errors = {};
  if (!email) errors.email = copy.emailEmpty;
  else if (typeof nativeEmailInvalid==='boolean' ? nativeEmailInvalid : !/^[^\s@]+@[^\s@]+$/.test(email)) errors.email = copy.emailInvalid;
  if (!project) errors.project = copy.projectEmpty;
  else if (project.length < 10 || project.length > 1000) errors.project = copy.projectInvalid;
  return errors;
}

export function calculateBudget(values) {
  const resources = ['html', 'js', 'css', 'fonts', 'images'].map(key => {
    if (values[key] === '' || values[key] == null) return NaN;
    return Number(values[key]);
  });
  const speed = values.speed === '' || values.speed == null ? NaN : Number(values.speed);
  if (resources.some(value => !Number.isFinite(value) || value < 0 || value > 1_000_000) || !Number.isFinite(speed) || speed < 0.1 || speed > 10_000) return null;
  const totalKB = resources.reduce((sum, value) => sum + value, 0);
  return { totalKB, seconds: totalKB * 8 / (speed * 1000) };
}

function download(content, name, type) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function initData(root, lang, copy) {
  const input = root.querySelector('[data-csv-input]');
  const file = root.querySelector('[data-csv-file]');
  const result = root.querySelector('[data-csv-result]');
  const status = root.querySelector('[data-csv-status]');
  const exports = [...root.querySelectorAll('[data-csv-export]')];
  let dataset = null, fileReadId = 0;
  const invalidate = () => {
    dataset = null;
    exports.forEach(button => { button.disabled = true; });
    result.replaceChildren();
    const empty = document.createElement('p');
    empty.className = 'lab-empty';
    empty.textContent = copy.previewEmpty;
    result.append(empty);
  };
  const render = () => {
    invalidate();
    try {
      dataset = csvDataset(input.value);
      const table = document.createElement('table');
      const caption = table.createCaption();
      caption.textContent = copy.caption;
      const headerRow = table.createTHead().insertRow();
      dataset.headers.forEach(label => {
        const cell = document.createElement('th');
        cell.scope = 'col';
        cell.textContent = label;
        headerRow.append(cell);
      });
      const body = table.createTBody();
      dataset.rows.slice(0, 100).forEach(values => {
        const row = body.insertRow();
        values.forEach(value => { const cell = row.insertCell(); cell.textContent = value; });
      });
      result.replaceChildren(table);
      status.className = 'status success';
      status.textContent = copy.dataReady(dataset.rows.length, Math.min(100, dataset.rows.length));
      exports.forEach(button => { button.disabled = false; });
    } catch (error) {
      status.className = 'status error';
      status.textContent = copy.csvErrors[error.code] || copy.fileEncoding;
      if (['quote', 'afterQuote', 'unclosed', 'rows'].includes(error.code)) status.textContent += copy.lineAt(error.line, error.column);
      if (error.code === 'width') status.textContent += copy.recordAt(error.record);
    }
  };
  input.addEventListener('input', () => {
    fileReadId++;
    invalidate();
    status.className = 'status';
    status.textContent = copy.dataChanged;
  });
  root.querySelector('[data-csv-build]').addEventListener('click', render);
  root.querySelector('[data-csv-sample]').addEventListener('click', () => {
    fileReadId++;
    file.value = '';
    input.value = SAMPLE_CSV[lang];
    render();
  });
  file.addEventListener('change', async () => {
    const selected = file.files?.[0];
    if (!selected) return;
    const readId = ++fileReadId;
    invalidate();
    if (selected.size > 1_048_576) {
      status.className = 'status error';
      status.textContent = copy.csvErrors.size;
      return;
    }
    try {
      const text = new TextDecoder('utf-8', { fatal: true }).decode(await selected.arrayBuffer());
      if (readId !== fileReadId) return;
      input.value = text;
      render();
      if (dataset) status.textContent = `${copy.fileLoaded(selected.name)} ${status.textContent}`;
    } catch {
      if (readId !== fileReadId) return;
      status.className = 'status error';
      status.textContent = copy.fileEncoding;
    }
  });
  exports.forEach(button => button.addEventListener('click', () => {
    if (!dataset) return;
    if (button.dataset.csvExport === 'json') download(datasetJson(dataset), 'nowoi-data.json', 'application/json;charset=utf-8');
    else download(datasetHtml(dataset, lang), 'nowoi-table.html', 'text/html;charset=utf-8');
  }));
  render();
}

function initForm(root, lang, copy) {
  const form = root.querySelector('[data-demo-form]');
  const fields = Object.fromEntries(['email', 'project'].map(key => [key, form.querySelector(`[data-form-field="${key}"]`)]));
  const summary = form.querySelector('[data-form-summary]');
  const success = form.querySelector('[data-form-success]');
  let submitted = false;
  const update = (focus = false) => {
    const errors = validateForm(Object.fromEntries(Object.entries(fields).map(([key, field]) => [key, field.value])), lang, fields.email.validity.typeMismatch);
    summary.replaceChildren();
    const keys = Object.keys(errors);
    for (const [key, field] of Object.entries(fields)) {
      const error = form.querySelector(`[data-form-error="${key}"]`);
      error.hidden = !errors[key];
      error.textContent = errors[key] || '';
      if (errors[key]) {
        field.setAttribute('aria-invalid', 'true');
        field.setAttribute('aria-describedby', `${field.id}-help ${field.id}-error`);
      } else {
        field.removeAttribute('aria-invalid');
        field.setAttribute('aria-describedby', `${field.id}-help`);
      }
    }
    summary.hidden = !keys.length;
    success.textContent = '';
    if (keys.length) {
      const title = document.createElement('p');
      title.textContent = copy.summary(keys.length);
      const list = document.createElement('ul');
      keys.forEach(key => {
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${fields[key].id}`;
        link.textContent = errors[key];
        link.addEventListener('click', event => { event.preventDefault(); fields[key].focus(); });
        item.append(link);
        list.append(item);
      });
      summary.append(title, list);
      if (focus) fields[keys[0]].focus();
    } else if (focus) success.textContent = copy.formSuccess;
    return errors;
  };
  form.addEventListener('submit', event => {
    event.preventDefault();
    submitted = true;
    update(true);
  });
  Object.values(fields).forEach(field => field.addEventListener('input', () => {
    success.textContent = '';
    if (submitted) update();
  }));
  form.querySelector('[data-form-reset]').addEventListener('click', () => {
    form.reset();
    submitted = false;
    summary.hidden = true;
    summary.replaceChildren();
    success.textContent = '';
    Object.entries(fields).forEach(([key, field]) => {
      field.removeAttribute('aria-invalid');
      field.setAttribute('aria-describedby', `${field.id}-help`);
      const error = form.querySelector(`[data-form-error="${key}"]`);
      error.hidden = true;
      error.textContent = '';
    });
    fields.email.focus();
  });
}

function initBudget(root, lang, copy) {
  const inputs = [...root.querySelectorAll('[data-budget-input]')];
  const total = root.querySelector('[data-budget-total]');
  const seconds = root.querySelector('[data-budget-seconds]');
  const status = root.querySelector('[data-budget-status]');
  const formatter = new Intl.NumberFormat(lang === 'zh' ? 'zh-CN' : 'en', { maximumFractionDigits: 3 });
  const update = () => {
    const values = Object.fromEntries(inputs.map(input => [input.dataset.budgetInput, input.value]));
    const result = calculateBudget(values);
    inputs.forEach(input => {
      const value = input.value === '' ? NaN : Number(input.value);
      const min = Number(input.min), max = Number(input.max);
      if (!Number.isFinite(value) || value < min || value > max) input.setAttribute('aria-invalid', 'true');
      else input.removeAttribute('aria-invalid');
    });
    total.textContent = result ? formatter.format(result.totalKB) : '—';
    seconds.textContent = result ? (result.seconds > 0 && result.seconds < 0.001 ? '< 0.001' : formatter.format(result.seconds)) : '—';
    status.textContent = result ? '' : copy.budgetInvalid;
  };
  inputs.forEach(input => input.addEventListener('input', update));
  root.querySelector('[data-budget-reset]').addEventListener('click', () => {
    inputs.forEach(input => { input.value = BUDGET_DEFAULTS[input.dataset.budgetInput]; });
    update();
  });
  update();
}

function initLaunch(root, lang, copy) {
  const items = [...root.querySelectorAll('[data-check-item]')];
  const save = root.querySelector('[data-check-save]');
  const progress = root.querySelector('[data-check-progress]');
  const fill = root.querySelector('[data-check-fill]');
  const count = root.querySelector('[data-check-count]');
  const status = root.querySelector('[data-check-status]');
  let storedPresent = false;
  const message = (text, error = false) => { status.textContent = text; status.className = `status${error ? ' error' : ''}`; };
  const selected = () => items.filter(item => item.checked).map(item => item.dataset.checkItem);
  const update = () => {
    const done = selected().length;
    progress.setAttribute('aria-valuenow', String(done));
    progress.setAttribute('aria-valuetext', copy.progress(done));
    fill.style.width = `${done / items.length * 100}%`;
    count.textContent = copy.progress(done);
  };
  const store = () => {
    if (!save.checked) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, ids: selected() }));
      storedPresent = true;
      message(copy.saved);
    } catch {
      save.checked = storedPresent;
      message(copy.storageError, true);
    }
  };
  const remove = () => {
    try {
      if (storedPresent) localStorage.removeItem(STORAGE_KEY);
      storedPresent = false;
      return true;
    } catch {
      save.checked = true;
      message(copy.removalError, true);
      return false;
    }
  };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw !== null) {
      storedPresent = true;
      const saved = JSON.parse(raw);
      if (saved?.version === 1 && Array.isArray(saved.ids)) {
        const ids = new Set(saved.ids.filter(id => typeof id === 'string'));
        items.forEach(item => { item.checked = ids.has(item.dataset.checkItem); });
        save.checked = true;
        message(copy.restored);
      }
    }
  } catch { /* Device storage is optional; the checklist still works. */ }
  items.forEach(item => item.addEventListener('change', () => { update(); if (save.checked) store(); else message(''); }));
  save.addEventListener('change', () => { if (save.checked) store(); else if (remove()) message(copy.removed); });
  root.querySelector('[data-check-reset]').addEventListener('click', () => {
    items.forEach(item => { item.checked = false; });
    save.checked = false;
    update();
    if (remove()) message(copy.resetDone);
  });
  root.querySelector('[data-check-export]').addEventListener('click', () => {
    const ids = new Set(selected());
    let markdown = `# ${copy.markdownTitle}\n\n${copy.markdownNote}\n\n${copy.progress(ids.size)}\n`;
    for (const group of ['content', 'experience', 'release']) {
      markdown += `\n## ${copy.groups[group]}\n\n`;
      CHECKLIST_ITEMS.filter(item => item.group === group).forEach(item => { markdown += `- [${ids.has(item.id) ? 'x' : ' '}] ${item[lang]}\n`; });
    }
    download(markdown, `nowoi-launch-${lang}.md`, 'text/markdown;charset=utf-8');
  });
  update();
}

export function initLabs(scope = globalThis.document) {
  if (!scope) return;
  scope.querySelectorAll('[data-lab]').forEach(root => {
    if (root.dataset.labReady) return;
    root.dataset.labReady = 'true';
    const lang = root.dataset.lang === 'en' ? 'en' : 'zh';
    const copy = COPY[lang];
    const tabs = [...root.querySelectorAll('[data-lab-tab]')];
    const panels = [...root.querySelectorAll('[data-lab-panel]')];
    const activate = (key, focus = false) => {
      tabs.forEach(tab => {
        const active = tab.dataset.labTab === key;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
        if (active && focus) tab.focus();
      });
      panels.forEach(panel => { panel.hidden = panel.dataset.labPanel !== key; });
      root.dataset.activeTab = key;
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(tab.dataset.labTab));
      tab.addEventListener('keydown', event => {
        let next = index;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = tabs.length - 1;
        else return;
        event.preventDefault();
        activate(tabs[next].dataset.labTab, true);
      });
    });
    const queryTab = new URLSearchParams(globalThis.location?.search || '').get('tab');
    activate(TABS.includes(queryTab) ? queryTab : TABS.includes(root.dataset.initial) ? root.dataset.initial : 'data');
    initData(root, lang, copy);
    initForm(root, lang, copy);
    initBudget(root, lang, copy);
    initLaunch(root, lang, copy);
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => initLabs(document), { once: true });
  else initLabs(document);
}
