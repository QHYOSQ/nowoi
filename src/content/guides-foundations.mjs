export default [
  {
    id: 'readable-data',
    topic: 'build',
    number: '01',
    minutes: 8,
    zh: {
      title: '把 CSV 变成真正可读的数据页',
      dek: '从带逗号的名称开始，处理引号、空值与表头，让数据既读得懂，也不会变成可执行页面。',
      lead: '社区工作坊的负责人发来一份报名表，希望你把剩余名额放到网页上。三个活动，看起来只要把逗号换成表格线。但名称里也有逗号，备注占了两行，零个名额与尚未填写不能混为一谈。先把这些小边界说明白，才能做出值得相信的数据页。',
      sections: [
        {
          id: 'agree-on-the-data',
          title: '01 / 先约定每一列代表什么',
          html: `<p>这次页面只回答三个问题：活动是什么、在哪里、还有多少位置。保留四列：活动名称、房间、剩余名额、备注。用下面的虚构样本试验；它有一个表头和三条记录。最后一条记录的两个空单元格必须保留下来。</p>
<pre><code>session,room,seats,note
"Maps, without jargon",A,12,"Bring a laptop"
"Design ""office hours""",B,0,"Waitlist
opens Monday"
"Open studio",C,,</code></pre>
<p>第二条记录的备注虽然换了行，仍然属于同一格。活动名中的两个双引号表示一个实际的双引号。剩余名额为 <code>0</code> 表示已经满员；空字符串表示尚未提供数字。先保留这些原始区别，再决定如何显示，别用 <code>value || 'Unknown'</code> 抹掉合法的零值。</p>
<p>把列名写给读者看：将 <code>seats</code> 显示为“剩余名额”，而不是默认所有人都懂内部字段。没有数据来源或更新时间时，就不要自行补上一个看似可信的日期。</p>`,
        },
        {
          id: 'parse-records-not-lines',
          title: '02 / 解析记录，不是切开每一行',
          html: `<p><code>text.split('\\n').map(line =&gt; line.split(','))</code> 无法处理这个样本：第一项名称会被拆成两列，多行备注会被错认成下一条记录。换一个正则表达式也不等于已经覆盖这些组合。小型解析器需要记住当前是否处于引号内，以及字段是否已经关闭。</p>
<ol><li>只有引号外的逗号才结束一个字段；只有引号外的换行才结束一条记录。</li><li>引号内遇到连续两个双引号时，加入一个双引号；遇到关闭引号后，只接受分隔符或记录结束。</li><li>同时接受常见的 LF 与 CRLF 行结束。不要把引号内的换行删掉，也不要随手修剪每个字段的首尾空格。</li><li>文件结束时保存最后一个字段；结尾的逗号意味着还有一个空字段。若引号未关闭，则报告错误，别显示半张“成功”表格。</li></ol>
<p>在本页的数据实验室粘贴样本，先确认得到三条数据记录、每条四列。再删掉备注的关闭引号：预期结果是清晰的解析错误，而不是一张悄悄错位的表。对上线项目，可选择支持这些边界的成熟解析库；无论选哪种实现，都保留这组验收样本。</p>`,
        },
        {
          id: 'render-a-table',
          title: '03 / 用表格语义承载数据',
          html: `<p>解析成功后，再检查每条记录的列数是否与表头一致。发现三列或五列的记录时，指出第几条记录出错；不要自动把后面的内容挤到最后一列。记录编号与文件行号可能不同，因为一个字段内部可以换行。</p>
<p>用 <code>table</code>、<code>thead</code> 和 <code>tbody</code> 组织结果。第一行用 <code>th scope="col"</code> 标明列标题，普通值用 <code>td</code>。表格上方给出名称和简短说明；做完整页面时，用表格标题关联这份数据。屏幕阅读器需要的是可辨认的表头关系，视觉上的粗体不能代替这些关系。</p>
<pre><code>const cell = document.createElement('td');
cell.textContent = rawValue;
row.append(cell);</code></pre>
<p>手机端可以让表格区域横向滚动，但别把整张网页撑出屏幕。保留完整活动名，并给备注使用保留换行的显示方式。空值可以显示“未提供”，同时在页面说明这个约定；不要在原始数据中把空值改成零。</p>`,
        },
        {
          id: 'treat-input-as-text',
          title: '04 / 输入内容始终是文本',
          html: `<p>把第一条活动名称换成 <code>&lt;img src=x onerror=alert(1)&gt;</code>，重新生成预览。合格结果是单元格原样显示这一串字符，没有图片，也没有执行事件。这个练习只需要字符串，不需要真的触发弹窗。</p>
<p>原因在于 <code>textContent</code> 写入文本，而 <code>innerHTML</code> 会把字符串交给 HTML 解析器。不要用拼接的表格模板包住用户输入，也不要把“数据来自我自己的表格”当成安全边界。如果以后增加网址列，应单独校验允许的协议和链接目标，不能把所有单元格一起升级为 HTML。</p>
<p>本地预览只适合不含真实个人信息的练习样本。是否上传、保存或记录原始 CSV，取决于你实际部署的系统；页面承诺必须与实现一致。文件选择后在浏览器读取，并不自动代表整个网站没有外部请求。</p>`,
        },
        {
          id: 'verify-and-set-limits',
          title: '05 / 给预览明确的能力范围',
          html: `<p>分别试验空输入、只有表头、缺一列、引号未关闭和完整样本。空输入应提示粘贴数据；只有表头应说明暂无记录；格式不一致应中止预览并指出问题。不要把这些状态全部写成“无效数据”。</p>
<p>本例约定首条记录是表头、分隔符是英文逗号，不负责识别分号文件、电子表格公式或其他字符编码。文件可以用 <code>await file.text()</code> 读取，这条路径按 UTF-8 解码。若支持文件导入，先展示可接受的编码、大小与行数范围。数据量增长后应限制一次渲染的数量，并告诉用户当前显示了多少条，别让一份文件冻结整个页面。</p>
<p>最后把结果交给另一个人：只看表格，能否区分“满员”和“未提供”，能否找到自己想参加的活动？解析正确只是开始；读者能根据结果做决定，数据页才算完成。</p>`,
        },
      ],
      takeaways: [
        '引号中的逗号和换行属于字段，不能用按行切分代替 CSV 解析。',
        '保留空字符串与零值的区别，先验证结构，再格式化显示。',
        '用表头语义和 textContent 呈现结果，并把格式错误说清楚。',
      ],
      lab: 'data',
    },
    en: {
      title: 'Turn a CSV into a readable data page',
      dek: 'Handle quoted fields, empty cells, and meaningful headers before you turn rows into a trustworthy interface.',
      lead: 'A community organizer sends you workshop availability for a small website. Three sessions sound straightforward, until one name contains a comma, one note spans two lines, and an empty seat count means something different from zero. Build around those distinctions before choosing a table style.',
      sections: [
        {
          id: 'agree-on-the-data',
          title: '01 / Agree on what each column means',
          html: `<p>The page should answer three questions: what is the session, where is it, and are places available? Keep four columns: session, room, seats, and note. Use this fictional fixture. It contains one header record and three data records, including two empty cells at the end.</p>
<pre><code>session,room,seats,note
"Maps, without jargon",A,12,"Bring a laptop"
"Design ""office hours""",B,0,"Waitlist
opens Monday"
"Open studio",C,,</code></pre>
<p>The doubled quotes represent one literal quotation mark. Zero means the session is full; an empty seat count means the organizer has not supplied it. Preserve that distinction instead of using a truthiness fallback that replaces zero. Translate internal field names into useful column labels. Do not invent a source or update date to make the page look authoritative.</p>`,
        },
        {
          id: 'parse-records-not-lines',
          title: '02 / Parse records, not separate lines',
          html: `<p>Splitting on newlines and then commas breaks this fixture twice: it divides a session name and turns part of a note into another record. A small parser needs state: whether a quoted field is open and whether its closing quote has been reached.</p>
<ol><li>Outside quotes, a comma finishes a field and a line ending finishes a record.</li><li>Inside quotes, commas and line endings are content. Two consecutive quotes contribute one literal quote.</li><li>After a closing quote, accept a delimiter or record ending. Reject unexpected characters rather than guessing.</li><li>At the end, preserve the final field, including an empty field after a trailing comma. An unclosed quoted field must produce an error.</li></ol>
<p>Accept ordinary LF and CRLF record endings without stripping meaningful field whitespace. Paste the fixture into the data lab and check for three records with four cells each. Remove the note's closing quote and expect an explicit parsing error. A maintained parser library is a reasonable production choice; keep these fixtures whichever implementation you choose.</p>`,
        },
        {
          id: 'render-a-table',
          title: '03 / Give the result table semantics',
          html: `<p>After parsing, compare every record's width with the header. Report a short or extra record instead of pushing overflow into the final cell. A record number may differ from a physical line number because quoted fields can span lines.</p>
<p>Use a table with separate header and body sections. Mark column headings with <code>th scope="col"</code>; use ordinary data cells for values. Provide a table title and explain any display conventions. Bold styling alone cannot establish the relationships that assistive technology needs.</p>
<pre><code>const cell = document.createElement('td');
cell.textContent = rawValue;
row.append(cell);</code></pre>
<p>On a narrow screen, allow the table region to scroll without widening the entire page. Preserve complete session names and meaningful note breaks. Display an empty value as “Not supplied” if helpful, but leave the underlying value empty. Formatting should explain the data, not quietly rewrite it.</p>`,
        },
        {
          id: 'treat-input-as-text',
          title: '04 / Keep input as text',
          html: `<p>Replace a session name with <code>&lt;img src=x onerror=alert(1)&gt;</code>. The expected preview displays those exact characters in a cell. It must not create an image or execute an event. This acceptance check only requires text; there is no need to trigger a popup.</p>
<p><code>textContent</code> inserts text. <code>innerHTML</code> asks the browser to parse markup. Avoid interpolating imported values into an HTML table string. If a future version supports links, validate permitted protocols and destinations separately; that does not justify treating every cell as HTML.</p>
<p>Use fictional data in a public demonstration. Browser-side reading does not itself prove that an entire website makes no external requests. Describe whether your actual deployment uploads, retains, or logs imported data before asking people to trust it with private records.</p>`,
        },
        {
          id: 'verify-and-set-limits',
          title: '05 / State the limits of the preview',
          html: `<p>Try empty input, headers only, a missing cell, an unclosed quote, and the complete fixture. Each needs a useful response: a request for input, a no-records message, or an error identifying the structural problem. “Invalid data” is too broad to help someone repair a file.</p>
<p>This exercise assumes a header record and comma separators. It does not detect semicolon dialects, interpret spreadsheet formulas, or repair unknown encodings. Read a selected file with <code>await file.text()</code>, which decodes as UTF-8. State size, encoding, and row limits before processing. Larger datasets need bounded rendering and an honest count of visible records.</p>
<p>Finally, ask another person to distinguish a full session from an unknown count and choose a workshop using only the result. Successful parsing is necessary; a readable decision is the outcome you are building.</p>`,
        },
      ],
      takeaways: [
        'Quoted commas and line endings belong to fields; line splitting is not CSV parsing.',
        'Preserve empty values and zero, validate record width, then format for readers.',
        'Use meaningful table headers and textContent, with repairable error messages.',
      ],
      lab: 'data',
    },
    sources: [
      { title: 'WAI · Tables with one header', url: 'https://www.w3.org/WAI/tutorials/tables/one-header/' },
      { title: 'MDN · Node.textContent', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent' },
      { title: 'MDN · Reading text from a Blob', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Blob/text' },
    ],
  },
  {
    id: 'useful-form-errors',
    topic: 'experience',
    number: '02',
    minutes: 8,
    zh: {
      title: '让表单错误告诉人下一步',
      dek: '从一封发不出去的咨询邮件出发，把标签、原生校验、错误说明与恢复路径放在同一条流程里。',
      lead: '一个小型工作室只需要回复潜在客户的咨询。访客认真写了项目背景，提交后却看到一句“发生错误”。他不知道是地址写错、说明太短，还是网络出了问题。表单校验的任务，是保住这份已经付出的努力，并给出一个能完成的下一步。',
      sections: [
        {
          id: 'define-a-real-task',
          title: '01 / 先写下表单真正需要什么',
          html: `<p>这个练习需要两个字段：用于回复的邮箱，以及项目说明。邮箱必填；说明至少十个字符，最多一千个字符。这只是本例的业务约定，不是所有网站都应照搬的标准。用一行提示提前解释长度和用途，比等用户提交后才公布规则更公平。</p>
<p>给每个控件一个可见的 <code>label</code>，并用 <code>for</code> 对上输入框的 <code>id</code>。占位文字会在输入后消失，不能承担字段名称。邮箱使用 <code>type="email"</code>、<code>autocomplete="email"</code> 和 <code>required</code>；说明使用原生的 <code>minlength</code> 与 <code>maxlength</code> 表达约束。</p>
<pre><code>&lt;label for="email"&gt;回复邮箱&lt;/label&gt;
&lt;input id="email" name="email" type="email"
  autocomplete="email" required
  aria-describedby="email-hint email-error"&gt;
&lt;p id="email-hint"&gt;我们用它回复这次咨询。&lt;/p&gt;
&lt;p id="email-error"&gt;&lt;/p&gt;</code></pre>
<p>这里先不要求手机号、预算和公司名称。每增加一个必填项，都应该能说明它如何影响这次回复。</p>`,
        },
        {
          id: 'separate-error-types',
          title: '02 / 别让“格式不对”包办一切',
          html: `<p>空邮箱的错误是“请填写用于回复的邮箱”；填写 <code>maya@</code> 后，应提示“请检查邮箱地址，例如 name@example.com”。不要使用“非法输入”这样的责备口吻，也不要把示例当成唯一允许的格式。</p>
<p>借助输入框的 <code>validity.valueMissing</code> 与 <code>validity.typeMismatch</code> 区分原因。不要叠加一个只允许英文字母、只允许某个后缀或拒绝加号的简陋正则。<code>maya+notes@example.com</code> 是值得保留的测试输入；语法看上去合理，并不证明这个地址存在、能收信或归访客所有。</p>
<p>检查说明长度时，把下一步写明白：“请至少写十个字符，说明你想制作什么。”保留已经填写的内容。若暂时不能完成网络请求，应说“暂时未发送，请稍后重试”，不要把连接失败标在邮箱旁边，让人徒劳地修改地址。</p>`,
        },
        {
          id: 'connect-errors-to-controls',
          title: '03 / 让提示与输入框建立关系',
          html: `<p>第一次打开页面时，空字段不是需要立刻批评的错误。提交后检查必要字段，在有问题的控件旁显示文字，并把 <code>aria-invalid</code> 设为 <code>true</code>。修正成功后，移除无效状态和旧错误，但保留正常的帮助说明。</p>
<p><code>aria-describedby</code> 可以同时引用提示与错误元素；对应的 <code>id</code> 必须真实存在且保持唯一。这样输入框获得焦点时，辅助技术才有机会读到相关说明。红边可以帮助定位，文字负责解释原因；不要只依赖颜色或一个无名的感叹号。</p>
<p>两个字段出错时，在表单开头提供简短摘要，并把焦点送到第一个无效字段，或采用可聚焦且包含字段链接的摘要模式。选定一种一致的方式，避免多个实时区域与焦点移动同时抢着播报。若使用 <code>setCustomValidity()</code>，问题修复后必须传入空字符串清除错误，否则浏览器会继续阻止提交。</p>`,
        },
        {
          id: 'run-the-repair-path',
          title: '04 / 试验一次完整的修正过程',
          html: `<ol><li>不填写任何内容，直接提交。应能知道哪些字段缺失，并立即找到第一个问题。</li><li>邮箱输入 <code>maya@</code>，说明写“我想做网站”。再次提交，观察邮箱错误与说明长度提示是否各自准确。</li><li>将邮箱改成 <code>maya+notes@example.com</code>，说明改成一段超过十个字符的完整需求。错误应消失，之前的内容不应被清空。</li><li>只用键盘完成同一过程。标签、帮助文字和错误之间的关系，不应该依赖鼠标悬停才能发现。</li></ol>
<p>本页的表单实验用于观察校验反馈，不会真的发送咨询。实验里的完成状态，只说明样本符合本地规则。生产表单只有在服务器确认接收后，才能告诉用户“已发送”；点击按钮本身不构成成功。</p>
<p>还要故意制造一次失败：断开网络或模拟服务器拒绝，然后确认用户可以保留内容并重试。这个恢复路径经常比漂亮的成功动画更有价值。</p>`,
        },
        {
          id: 'keep-the-server-boundary',
          title: '05 / 浏览器校验之外，还要做什么',
          html: `<p>原生约束让常见错误更容易被发现，但客户端规则可以被绕过。服务器仍要独立检查字段是否必填、类型与长度是否符合约定，并处理请求频率、滥用和存储安全。别把“按钮已经禁用”当成服务端保护。</p>
<p>若业务需要确认邮箱归属，应设计确认邮件，而不是编写越来越长的正则。国际化地址、输入法和不同浏览器的表现，也需要按目标用户单独验证。本例没有承诺识别所有真实邮箱，更没有验证可投递性。</p>
<p>上线前再读一遍每条提示：它是否指出具体问题，说明一种修正方法，并让人继续完成原来的任务？能回答这三个问题的错误说明，才真正减少了提交阻力。</p>`,
        },
      ],
      takeaways: [
        '先用可见标签与原生约束说明要求，再为具体错误补充修正路径。',
        '通过 aria-describedby 关联提示，修正后清除旧错误并保留输入。',
        '本地校验不能证明邮箱归属，也不能代替服务器校验或发送确认。',
      ],
      lab: 'form',
    },
    en: {
      title: 'Write form errors people can fix',
      dek: 'Connect labels, native constraints, and specific feedback so a failed submission becomes a recoverable step.',
      lead: 'A visitor writes a careful project inquiry to a small studio, presses Send, and receives “Something went wrong.” They cannot tell whether the address, the message, or the connection caused it. Useful validation preserves that effort and gives them one practical way forward.',
      sections: [
        {
          id: 'define-a-real-task',
          title: '01 / Define the actual task',
          html: `<p>This exercise needs a reply email and a project description. Require an email; ask for a description between ten and one thousand characters. Those limits are decisions for this example, not universal rules. Explain the requirements before submission, including why you need the address.</p>
<p>Give each control a visible label whose <code>for</code> matches its <code>id</code>. A placeholder disappears during typing and cannot replace that label. Use <code>type="email"</code>, <code>autocomplete="email"</code>, and <code>required</code> for the address. Express message limits with native length attributes.</p>
<pre><code>&lt;label for="email"&gt;Reply email&lt;/label&gt;
&lt;input id="email" name="email" type="email"
  autocomplete="email" required
  aria-describedby="email-hint email-error"&gt;
&lt;p id="email-hint"&gt;We use this to reply to your inquiry.&lt;/p&gt;
&lt;p id="email-error"&gt;&lt;/p&gt;</code></pre>
<p>Leave phone numbers and company details optional unless this workflow genuinely needs them. Every required field should have a reason beyond filling a layout.</p>`,
        },
        {
          id: 'separate-error-types',
          title: '02 / Separate different failures',
          html: `<p>An empty address needs “Enter an email address for our reply.” An entry such as <code>maya@</code> needs “Check the email address, for example name@example.com.” The example illustrates a format; it is not the only permitted pattern.</p>
<p>Distinguish missing input with <code>validity.valueMissing</code> and a syntax mismatch with <code>validity.typeMismatch</code>. Avoid adding a simplistic expression that bans plus signs, unfamiliar domain endings, or legitimate punctuation. Keep <code>maya+notes@example.com</code> among your fixtures. Plausible syntax does not establish that an address exists, receives mail, or belongs to this visitor.</p>
<p>For a short description, state an action: “Write at least ten characters describing what you want to build.” Keep the text already entered. A failed network request needs a retry message, not an email error that sends someone into unnecessary editing.</p>`,
        },
        {
          id: 'connect-errors-to-controls',
          title: '03 / Connect feedback to its control',
          html: `<p>A fresh, empty form should not immediately criticize the visitor. After submission, show text beside invalid controls and set <code>aria-invalid="true"</code>. Once the problem is corrected, remove the invalid state and old error while retaining ordinary help text.</p>
<p><code>aria-describedby</code> can reference both help and error elements. Their IDs must exist and remain unique. This association lets assistive technology provide relevant context when the input receives focus. A colored border can aid location; words explain the problem. Do not rely on red alone.</p>
<p>For multiple failures, add a short summary and focus the first invalid field, or use a focusable summary with links to the fields. Choose a consistent approach rather than several competing announcements. If you use <code>setCustomValidity()</code>, clear it with an empty string after correction; an old custom message otherwise continues blocking submission.</p>`,
        },
        {
          id: 'run-the-repair-path',
          title: '04 / Rehearse the entire repair path',
          html: `<ol><li>Submit with both fields empty. Check that you can identify each missing value and reach the first problem immediately.</li><li>Enter <code>maya@</code> and a description shorter than ten characters. Submit again and check that each message explains its own field.</li><li>Change the address to <code>maya+notes@example.com</code> and write a complete, longer request. Old errors should clear without erasing either value.</li><li>Repeat with only a keyboard. Finding instructions must not depend on hovering a pointer.</li></ol>
<p>The form lab demonstrates local feedback; it does not send an inquiry. Its completion state means the sample satisfies local rules. A production form may claim delivery only after its server confirms acceptance, not merely because a button was pressed.</p>
<p>Also simulate a failed request and verify that the visitor can retry with the original message intact. Recovery matters as much as a polished success state.</p>`,
        },
        {
          id: 'keep-the-server-boundary',
          title: '05 / Keep the server boundary clear',
          html: `<p>Native constraints catch common mistakes, but client-side rules can be bypassed. A receiving server still needs its own required-field, type, and length checks, plus suitable abuse controls and safe storage. A disabled button is not a server-side safeguard.</p>
<p>If the workflow requires address ownership, use a confirmation process rather than an increasingly ambitious regular expression. Internationalized addresses, input methods, and browser differences need checks against your actual audience. This example does not promise universal address recognition or verify deliverability.</p>
<p>Before release, read every error aloud. Does it identify a specific problem, offer a correction, and let the person continue their original task? Those three properties turn validation from a rejection into useful assistance.</p>`,
        },
      ],
      takeaways: [
        'Use visible labels and native constraints, then explain the specific repair.',
        'Associate help and errors, clear stale invalid states, and preserve input.',
        'Local validation cannot establish email ownership or replace server checks.',
      ],
      lab: 'form',
    },
    sources: [
      { title: 'WAI · Validating input', url: 'https://www.w3.org/WAI/tutorials/forms/validation/' },
      { title: 'MDN · Email inputs', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/email' },
      { title: 'MDN · Constraint validation', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation' },
    ],
  },
  {
    id: 'keyboard-first',
    topic: 'experience',
    number: '03',
    minutes: 9,
    zh: {
      title: '只用键盘，走完一张网页',
      dek: '从原生按钮到焦点返回，沿着一次完整任务检查每个可以操作、看见和退出的位置。',
      lead: '你做了一张工作室网站：顶部有导航，中间有筛选和咨询入口，底部有确认弹窗。鼠标点起来很顺，但访客用 Tab 走到筛选卡片时，焦点突然消失了。与其事后给每张卡片补键盘事件，不如从用户要走完的路线重新安排控件。',
      sections: [
        {
          id: 'pick-the-right-element',
          title: '01 / 先分清链接与动作',
          html: `<p>去另一个页面或某个页面位置，用带有效 <code>href</code> 的链接；展开筛选、打开对话框或清空输入，用 <code>button</code>。在表单里的普通动作按钮，明确写 <code>type="button"</code>，避免意外提交。真正的提交按钮则使用 <code>type="submit"</code>。</p>
<pre><code>&lt;a href="/en/guides/readable-data/"&gt;Read the data guide&lt;/a&gt;
&lt;button type="button"&gt;Open filters&lt;/button&gt;</code></pre>
<p>原生控件已经带有角色、焦点和键盘行为。链接通常由 Enter 激活，按钮支持 Enter 与空格。给一个 <code>div</code> 增加点击事件，甚至加上 <code>role="button"</code>，都不会自动获得完整的按钮行为。只有确实需要定制控件时，才承担额外的状态与操作设计。</p>
<p>不要为了让整张卡片可点击，在链接里面再放按钮。将卡片标题作为明确的链接入口，其他动作独立出现。这样读者知道自己要跳转还是改变当前页面。</p>`,
        },
        {
          id: 'follow-document-order',
          title: '02 / 让路线跟着内容走',
          html: `<p>先安排合理的文档顺序，再用布局把它呈现出来。若视觉上从左到右的控件，在 Tab 顺序里却不断跳行，问题通常出在结构或视觉重排。不要用一串正数 <code>tabindex</code> 给某几个元素插队；它会让后续维护和全站导航更难预测。</p>
<p>从浏览器重新载入页面，把鼠标移到一边。第一次按 Tab 时，最好能看到跳到正文的入口，略过每页重复的导航。之后应按合理顺序经过导航、主要操作、表单和页脚。普通说明段落不需要为了“可访问”全部变成 Tab 停靠点。</p>
<p>打开本页的发布检查清单，用 Tab 找到第一项，按空格改变选中状态，再按 Shift + Tab 返回。确认操作后焦点仍然在可预期的位置。检查清单用于演练这条路线，不会因为勾完几项就替你证明网站符合某项完整标准。</p>`,
        },
        {
          id: 'make-focus-visible',
          title: '03 / 让当前焦点持续可见',
          html: `<p>每次按 Tab，都应该看得出下一次按键会作用在哪里。保留浏览器默认轮廓，或者提供同样清晰的替代样式。仅有鼠标悬停效果不够；选中的导航项，也不是当前键盘焦点的代替品。</p>
<pre><code>a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 3px solid #126b52;
  outline-offset: 4px;
}</code></pre>
<p>这是一段起点样式，不是自动达标的凭证。检查轮廓在浅色、深色和图片背景上是否可辨，是否被圆角容器裁掉，以及固定导航是否盖住获得焦点的输入框。输入文字时若键盘挡住控件，也应调整滚动与布局。</p>
<p>焦点提示不应该几秒后淡出，也不要因为动画结束就把焦点移到页面顶部。屏幕上的当前位置，必须能跟得上用户真实的操作位置。</p>`,
        },
        {
          id: 'give-dialogs-an-exit',
          title: '04 / 弹窗要有入口，也要能原路返回',
          html: `<p>如果你的项目真的需要模态对话框，可以优先考虑原生 <code>dialog</code> 与 <code>showModal()</code>。仅设置一个名为 dialog 的角色，并不会自动锁住背景操作或管理焦点。让对话框有清楚的标题、可见的关闭按钮和 Escape 退出方式。</p>
<p>打开时，把焦点放到内容上合理的位置。简短确认框可以先放在安全的取消动作上；很长的说明可能更适合先聚焦标题或开头的静态文字。Tab 与 Shift + Tab 应留在打开的模态区域内，背景暂时不可交互。</p>
<pre><code>let returnTo;
openButton.addEventListener('click', () =&gt; {
  returnTo = openButton;
  dialog.showModal();
});
dialog.addEventListener('close', () =&gt; {
  if (returnTo?.isConnected) returnTo.focus();
});</code></pre>
<p>原生对话框已有部分返回焦点行为；这段代码明确了本例的返回目标。关闭后通常回到打开它的按钮。若按钮已被移除，就为后续任务选择合理位置，不要把焦点丢到无法辨认的页面背景。不要在没有模态需求的区域设置键盘陷阱。</p>`,
        },
        {
          id: 'write-an-acceptance-route',
          title: '05 / 留下一条可重复的验收路线',
          html: `<ol><li>从重新载入开始，只用 Tab 与 Shift + Tab 经过主要页面，记下任何看不见焦点或顺序跳跃的位置。</li><li>用 Enter 打开导航链接，用空格操作按钮和复选框，确认没有意外的页面滚动或重复提交。</li><li>填写一个表单，故意触发错误，再修正并继续。核对焦点是否落在能完成修正的位置。</li><li>若有模态对话框，试验打开、向前遍历、反向遍历、Escape 关闭，以及返回打开按钮。</li><li>在较窄窗口和放大页面后重走一次，留意被遮挡的控件与裁切的轮廓。</li></ol>
<p>记录“在哪个页面、哪个控件、哪次按键后发生什么”，比写“键盘支持不好”更容易修复。键盘验收也不能代替屏幕阅读器、触屏或其他辅助技术的检查。它的作用，是让一条具体任务路线真实地走得通，并在修改界面后仍然可以重走。</p>`,
        },
      ],
      takeaways: [
        '导航用链接，当前页动作使用原生按钮，避免正数 tabindex 排队。',
        '焦点必须持续可见，且不能被布局遮挡或裁掉。',
        '模态对话框要管理进入、关闭与返回焦点，并用完整任务路线验收。',
      ],
      lab: 'launch',
    },
    en: {
      title: 'Finish a page using only a keyboard',
      dek: 'Choose native controls, keep focus visible, and give every interaction a predictable entrance and exit.',
      lead: 'Your studio page has navigation, filters, an inquiry form, and a confirmation dialog. Everything works with a pointer, but focus disappears when a visitor tabs toward a filter card. Start with the route someone needs to finish, then choose the controls that make that route dependable.',
      sections: [
        {
          id: 'pick-the-right-element',
          title: '01 / Separate navigation from actions',
          html: `<p>Use a link with a real <code>href</code> to navigate to another page or location. Use a button to open filters, clear input, or show a dialog. Inside a form, give ordinary action buttons <code>type="button"</code> so they do not accidentally submit it. Reserve <code>type="submit"</code> for submission.</p>
<pre><code>&lt;a href="/en/guides/readable-data/"&gt;Read the data guide&lt;/a&gt;
&lt;button type="button"&gt;Open filters&lt;/button&gt;</code></pre>
<p>Native controls bring established roles, focus behavior, and activation keys. Links typically activate with Enter; buttons support Enter and Space. A clickable <code>div</code>, even with a button role, does not inherit the complete behavior. Avoid nesting buttons inside clickable card links. Give navigation and local actions distinct, understandable targets.</p>`,
        },
        {
          id: 'follow-document-order',
          title: '02 / Follow the logic of the document',
          html: `<p>Arrange a sensible document order before styling the layout. If Tab jumps unpredictably across a visually orderly grid, inspect its structure and visual reordering. Positive <code>tabindex</code> values make selected controls jump the queue and become difficult to maintain. Ordinary explanatory paragraphs do not all need tab stops.</p>
<p>Reload and put the pointer aside. The first Tab should ideally reveal a way to skip repeated navigation. Continue through navigation, primary actions, form controls, and the footer. The route should match the task, with no hidden interactive stops.</p>
<p>Open the launch checklist on this page. Tab to an item, use Space to change it, and move backward with Shift + Tab. Focus should remain somewhere predictable after the change. Completing a checklist is practice, not evidence that an entire site meets an accessibility standard.</p>`,
        },
        {
          id: 'make-focus-visible',
          title: '03 / Keep the current target visible',
          html: `<p>At every step, someone should be able to see where their next keypress will act. Preserve the browser's focus outline or provide a clear replacement. Hover styling is insufficient, and an active navigation marker does not identify keyboard focus.</p>
<pre><code>a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 3px solid #126b52;
  outline-offset: 4px;
}</code></pre>
<p>This is a starting style, not a compliance certificate. Inspect it against light, dark, and image backgrounds. Check that containers do not clip the outline and fixed navigation does not cover a focused input. A mobile keyboard may also obscure the field being edited.</p>
<p>Do not fade the indicator after a few seconds or move focus to the top when an animation finishes. The visible location must continue to match the visitor's actual interaction.</p>`,
        },
        {
          id: 'give-dialogs-an-exit',
          title: '04 / Give dialogs a return route',
          html: `<p>If the project genuinely needs a modal dialog, consider native <code>dialog</code> with <code>showModal()</code>. Adding a dialog role alone does not make the background inert or manage focus. Provide a clear title, a visible close control, and an Escape exit.</p>
<p>Place initial focus somewhere appropriate: often a safe cancel action for a short confirmation, or a heading or introductory text for longer content. While the modal is open, Tab and Shift + Tab should remain within it, and background controls should be unavailable.</p>
<pre><code>let returnTo;
openButton.addEventListener('click', () =&gt; {
  returnTo = openButton;
  dialog.showModal();
});
dialog.addEventListener('close', () =&gt; {
  if (returnTo?.isConnected) returnTo.focus();
});</code></pre>
<p>Native dialogs already provide some focus restoration; this snippet makes the intended destination explicit. Usually return to the opener. If it was removed, choose a logical next task location. Do not create a keyboard trap in an ordinary, non-modal section.</p>`,
        },
        {
          id: 'write-an-acceptance-route',
          title: '05 / Leave a repeatable acceptance route',
          html: `<ol><li>Reload, then traverse the main page forward and backward. Record invisible focus or unexpected ordering.</li><li>Activate links with Enter and buttons or checkboxes with Space. Check for unintended scrolling and duplicate submissions.</li><li>Complete a form, trigger an error, repair it, and continue. Focus must support that correction.</li><li>If a modal exists, open it, traverse both directions, close with Escape, and verify the return target.</li><li>Repeat in a narrow window and at an enlarged zoom level. Look for obscured controls and clipped outlines.</li></ol>
<p>Describe failures as a page, control, keypress, and observed result. That is actionable; “keyboard support is bad” is not. Keyboard checks do not replace screen-reader, touch, or other assistive-technology checks. They establish one concrete task route you can repeat after the interface changes.</p>`,
        },
      ],
      takeaways: [
        'Use links for navigation and native buttons for actions; avoid positive tabindex.',
        'Keep focus visible, persistent, and clear of clipping or fixed content.',
        'Check dialog entry, exit, and focus return within a complete task route.',
      ],
      lab: 'launch',
    },
    sources: [
      { title: 'MDN · The button element', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button' },
      { title: 'WAI APG · Modal dialog pattern', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/' },
      { title: 'WAI · Understanding focus visible', url: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html' },
    ],
  },
];
