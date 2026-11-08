import { COPY, CHECKLIST_ITEMS, SAMPLE_CSV, BUDGET_DEFAULTS, escapeHtml } from './assets/labs.js';

let nextLabId = 0;
const tabs = ['data', 'form', 'budget', 'launch'];

export function labMarkup(lang = 'zh', initialTab = 'data') {
  const language = lang === 'en' ? 'en' : 'zh';
  const copy = COPY[language];
  const initial = tabs.includes(initialTab) ? initialTab : 'data';
  const id = `nowoi-lab-${++nextLabId}`;
  const e = escapeHtml;
  const panel = (key, content) => `<section class="lab-panel" id="${id}-panel-${key}" role="tabpanel" aria-labelledby="${id}-tab-${key}" data-lab-panel="${key}" tabindex="0"${key === initial ? '' : ' hidden'}>${content}</section>`;
  const header = key => `<h2>${copy[`${key}Title`]}</h2><p>${copy[`${key}Intro`]}</p>`;
  const field = (key, type) => {
    const inputId = `${id}-${key}`;
    const control=key==='email'?`<input class="lab-input" id="${inputId}" type="email" data-form-field="email" aria-describedby="${inputId}-help" autocomplete="email" inputmode="email" required>`:`<textarea class="lab-input" id="${inputId}" data-form-field="project" aria-describedby="${inputId}-help" rows="4" minlength="10" maxlength="1000" required></textarea>`;
    return `<div class="field"><label class="label" for="${inputId}">${copy[key]}</label>${control}<p class="lab-note" id="${inputId}-help">${copy[`${key}Help`]}</p><p class="error" id="${inputId}-error" data-form-error="${key}" hidden></p></div>`;
  };
  const dataPanel = `${header('data')}
    <div class="field"><label class="label" for="${id}-csv">${copy.csvLabel}</label><textarea class="lab-input" id="${id}-csv" rows="10" spellcheck="false" data-csv-input aria-describedby="${id}-csv-help">${e(SAMPLE_CSV[language])}</textarea><p class="lab-note" id="${id}-csv-help">${copy.csvHelp}</p></div>
    <div class="field"><label class="label" for="${id}-csv-file">${copy.fileLabel}</label><input class="lab-input lab-file" id="${id}-csv-file" type="file" accept=".csv,text/csv" data-csv-file aria-describedby="${id}-csv-help"></div>
    <div class="button-row"><button class="button button-primary" type="button" data-csv-build>${copy.convert}</button><button class="button button-secondary" type="button" data-csv-sample>${copy.sample}</button></div>
    <p class="status" role="status" aria-live="polite" data-csv-status></p>
    <div class="lab-output lab-table-wrap" data-csv-result role="region" aria-label="${copy.caption}" tabindex="0"><p class="lab-empty">${copy.previewEmpty}</p></div>
    <div class="button-row"><button class="button button-secondary" type="button" data-csv-export="json" disabled>${copy.json}</button><button class="button button-secondary" type="button" data-csv-export="html" disabled>${copy.html}</button></div><p class="lab-note">${copy.dataNote}</p>`;
  const formPanel = `${header('form')}
    <form data-demo-form novalidate>
      <div class="lab-summary error" role="alert" data-form-summary hidden></div>
      <div class="lab-grid">${field('email', 'email')}${field('project', 'text')}</div>
      <div class="button-row"><button class="button button-primary" type="submit">${copy.submit}</button><button class="button button-quiet" type="button" data-form-reset>${copy.formReset}</button></div>
      <p class="status success" role="status" data-form-success></p>
    </form><p class="lab-note">${copy.formNote}</p>`;
  const budgetFields = ['html', 'js', 'css', 'fonts', 'images'].map(key => `<div class="field"><label class="label" for="${id}-budget-${key}">${copy.budgetNames[key]} (KB)</label><input class="lab-input" type="number" min="0" max="1000000" step="any" id="${id}-budget-${key}" value="${BUDGET_DEFAULTS[key]}" data-budget-input="${key}" aria-describedby="${id}-budget-help ${id}-budget-status"></div>`).join('');
  const budgetPanel = `${header('budget')}<div class="lab-grid">${budgetFields}<div class="field"><label class="label" for="${id}-budget-speed">${copy.speed}</label><input class="lab-input" type="number" min="0.1" max="10000" step="any" id="${id}-budget-speed" value="${BUDGET_DEFAULTS.speed}" data-budget-input="speed" aria-describedby="${id}-budget-help ${id}-budget-status"></div></div>
    <p class="lab-note" id="${id}-budget-help">${copy.budgetHelp}</p>
    <div class="lab-output lab-grid" aria-live="polite"><div class="lab-stat"><span>${copy.total}</span><p class="number-result"><output data-budget-total>302</output> <span>KB</span></p></div><div class="lab-stat"><span>${copy.transfer}</span><p class="number-result"><output data-budget-seconds>0.242</output> <span>${copy.seconds}</span></p></div></div>
    <p class="status error" id="${id}-budget-status" role="status" data-budget-status></p><button class="button button-secondary" type="button" data-budget-reset>${copy.reset}</button><p class="lab-note">${copy.budgetNote}</p>`;
  const groups = ['content', 'experience', 'release'].map(group => `<fieldset class="checklist-group"><legend>${copy.groups[group]}</legend>${CHECKLIST_ITEMS.filter(item => item.group === group).map(item => `<label class="checklist-item" for="${id}-check-${item.id}"><input id="${id}-check-${item.id}" type="checkbox" data-check-item="${item.id}"><span>${e(item[language])}</span></label>`).join('')}</fieldset>`).join('');
  const launchPanel = `${header('launch')}
    <p class="lab-progress-text" aria-live="polite" data-check-count>${copy.progress(0)}</p><div class="progress-track" role="progressbar" aria-label="${copy.progressLabel}" aria-valuemin="0" aria-valuemax="12" aria-valuenow="0" data-check-progress><span class="progress-fill" style="width:0%" data-check-fill></span></div>
    <div class="lab-checklist">${groups}</div>
    <div class="lab-save"><label class="checklist-item" for="${id}-save"><input id="${id}-save" type="checkbox" data-check-save aria-describedby="${id}-save-help"><span>${copy.save}</span></label><p class="lab-note" id="${id}-save-help">${copy.saveHelp}</p></div>
    <div class="button-row"><button class="button button-primary" type="button" data-check-export>${copy.export}</button><button class="button button-quiet" type="button" data-check-reset>${copy.launchReset}</button></div><p class="status" role="status" data-check-status></p>`;
  return `<div class="lab" id="${id}" data-lab data-lang="${language}" data-initial="${initial}"><div class="lab-tabs" role="tablist" aria-label="${copy.tabLabel}">${tabs.map(key => `<button class="lab-tab" type="button" role="tab" id="${id}-tab-${key}" aria-controls="${id}-panel-${key}" aria-selected="${key === initial}" tabindex="${key === initial ? '0' : '-1'}" data-lab-tab="${key}">${copy.tabs[key]}</button>`).join('')}</div>${panel('data', dataPanel)}${panel('form', formPanel)}${panel('budget', budgetPanel)}${panel('launch', launchPanel)}</div>`;
}
