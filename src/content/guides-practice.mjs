export default [
  {
    id: 'image-budget',
    topic: 'build',
    number: '04',
    minutes: 8,
    sources: [
      { title: 'MDN · Responsive images', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images' },
      { title: 'web.dev · Optimize Cumulative Layout Shift', url: 'https://web.dev/articles/optimize-cls' },
      { title: 'web.dev · Optimize Largest Contentful Paint', url: 'https://web.dev/articles/optimize-lcp' },
      { title: 'MDN · The img element', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img' },
      { title: 'MDN · ImageData', url: 'https://developer.mozilla.org/en-US/docs/Web/API/ImageData' }
    ],
    zh: {
      title: '图片预算，先于压缩',
      dek: '先决定一张图为什么存在、显示多大、何时需要，再决定把质量滑块拉到哪里。',
      lead: '设想一个介绍社区工作坊的页面：顶部是一张活动照片，下面有两张材料示意图。设计稿很好看，手机上却要等图片加载，文字还会突然往下跳。直接把三张图全部“再压一点”可能损失细节，却没有解决尺寸、加载顺序和预留空间的问题。先给图片分配任务与预算，修改才有方向。下文数字均为教学假设，不是 NOWOI 或某个网站的测速成绩。',
      sections: [
        {
          id: 'give-every-image-a-job',
          title: '01 / 每张图先领一个任务',
          html: `<p>把图片放进页面之前，写出一句理由：这张图帮助读者做什么决定？活动照片让人了解现场环境，材料图帮助辨认要携带的工具，纯装饰背景可能没有必要。预算从删除不需要的请求开始，而不是从选择文件格式开始。</p><p>再记录每张图的最大显示宽度、宽高比和出现位置。假设正文最多宽 680 个 CSS 像素，手机两侧各留 16 像素。照片适合 3:2，示意图里的小字则需要在实际显示尺寸下检查。不要为了得到同一个压缩百分比，给所有图片套同一套尺寸与质量。</p><p>为信息图补充相邻的文字说明。即使图像没有加载，读者仍应能理解材料清单；替代文本则简洁描述图片在当前上下文中的作用。图片存在的理由越清楚，越容易决定哪些细节值得保留。</p>`
        },
        {
          id: 'three-different-sizes',
          title: '02 / 原文件、传输量、解码内存是三件事',
          html: `<p>相机导出的 3.2 MB 原图是制作素材，不必直接发送给访客。假设你另存一张 1440 × 960 像素、110 kB 的网页版本，110 kB 是编码文件大小；实际网络传输还会受到缓存、响应头等因素影响，应在浏览器里查看。这里的 kB 按十进制计算，1 kB 为 1000 字节。</p><table><thead><tr><th>看什么</th><th>这个假设例子</th><th>用于什么判断</th></tr></thead><tbody><tr><td>制作原件</td><td>3.2 MB</td><td>留作以后重新裁切与导出</td></tr><tr><td>网页编码文件</td><td>110 kB</td><td>规划下载成本，再以实际请求核对</td></tr><tr><td>像素数据估算</td><td>1440 × 960 × 4 字节，约 5.27 MiB</td><td>理解小文件也可能需要较多解码内存</td></tr></tbody></table><p>最后一行只是假定每像素四字节 RGBA 的粗略模型，既不是浏览器进程的实测占用，也不包含全部缓存和渲染开销。图像格式、颜色表示与浏览器实现都会影响实际情况。把质量从 80 调到 70 可以减小文件，却不会自动减少像素数量；尺寸过大时，先裁切和缩放往往更有针对性。</p>`
        },
        {
          id: 'reserve-the-shape',
          title: '03 / 图片没到，位置先留好',
          html: `<p>页面开始排版时若不知道图片高度，图片出现后就可能把正在阅读的文字挤下去。这是布局偏移的一种来源。给图片写上准确的 <code>width</code> 与 <code>height</code>，浏览器就能提前推导比例；响应式样式可用 <code>max-width: 100%; height: auto;</code> 让它随容器缩小。</p><p>例如 1440 × 960 的照片在 600 像素宽的容器里应占 400 像素高。它并不需要固定显示成 1440 像素宽。若设计采用裁切容器，则应明确容器的 <code>aspect-ratio</code>，再确认裁切不会丢掉重要人物或信息。</p><p>核对所有候选图的比例是否一致。若手机端换成另一种裁切，就分别考虑对应比例；填一个与文件不符的高度，仍可能在图片出现时纠正布局。预留空间能解决这一类问题，不能保证整个页面的 CLS 一定达标。</p>`
        },
        {
          id: 'offer-real-candidates',
          title: '04 / 把选择交给浏览器，但把条件写准确',
          html: `<p><code>srcset</code> 列出实际存在的候选文件及其像素宽度，<code>sizes</code> 描述图片在不同视口下预计占用的显示宽度。它们不会替你生成文件，也不会改变页面布局。下面的文件名只是示例，必须先导出对应图片再使用。</p><pre><code>&lt;img
  src="workshop-960.webp"
  srcset="workshop-480.webp 480w,
          workshop-960.webp 960w,
          workshop-1440.webp 1440w"
  sizes="(max-width: 720px) calc(100vw - 32px), 680px"
  width="1440" height="960"
  alt="工作坊的长桌旁放着剪刀与彩纸"
  fetchpriority="high"&gt;</code></pre><p>例子假设页面样式确实在窄屏留出共 32 像素边距，宽屏图片显示为 680 像素。若实际布局是双栏卡片，就要重新写条件。浏览器会综合显示宽度、设备像素比等条件选择资源，并不是永远下载最小文件。在开发工具中查看实际请求，再用不同视口和像素比复查。</p>`
        },
        {
          id: 'protect-the-first-view',
          title: '05 / 首屏重要图片不要一律延迟加载',
          html: `<p>位于页面顶部的大图可能成为最大内容绘制，即 LCP 的候选元素。若给它添加 <code>loading="lazy"</code>，就可能额外推迟加载开始。将关键图片直接放在初始 HTML 中，不对它使用懒加载；示例里的 <code>fetchpriority="high"</code> 只是优先级提示，应留给确实重要的图片，而非全站图片。</p><p>较远的正文插图可以考虑懒加载，同时继续保留尺寸。不要仅凭图片位于源码第一行，就认定它一定是 LCP：在另一种视口里，标题文字也可能成为最大元素。用性能记录识别实际元素及等待发生在哪一步，再调整策略。</p><p>只有把资源压小，并不能消除服务器响应慢、资源发现过晚或渲染阻塞造成的延迟。应针对观察到的瓶颈修改，避免把“加载更积极”误写成“加载一定更快”。</p>`
        },
        {
          id: 'turn-the-budget-into-a-check',
          title: '06 / 预算是可检验的假设',
          html: `<p>给这个示例页面暂定 300 kB 的初次资源预算：首图 110 kB，两张插图各 35 kB，其余 HTML、样式和脚本合计 120 kB。总数为 300 kB。再假设可用吞吐量为每秒 200 kB，仅把这些字节传完的算术结果是 1.5 秒。</p><p><strong>1.5 秒不是页面加载时间，也不是 LCP 预测。</strong>这个除法没有模拟连接建立、延迟、请求调度、缓存、解码或渲染。用下方预算练习调整假设，目的是看懂资源之间的取舍，而不是获得测速分数。</p><ol><li>导出候选图，并在最终显示尺寸下检查文字、边缘和颜色。</li><li>打开浏览器网络面板，分别观察首次加载与缓存后加载，记录选中的文件。</li><li>改变视口，观察图片出现前后是否挤动正文。</li><li>记录性能检查的设备、网络条件与时间，修改后在相同条件下比较。</li></ol><p>如果预算不够，先问某张图能否删去、缩小或推迟，而不是无限降低质量。保留原件和导出参数，下次更换设计时就不必从已经模糊的网页文件继续压缩。</p>`
        }
      ],
      takeaways: ['先确认用途与显示尺寸，再分配图片预算。', '传输文件与解码后的像素数据不能混为一谈。', '预留比例、准确的响应式候选和合适的加载顺序需要分别处理。', '预算计算用于比较假设，实际体验需要在浏览器中验证。'],
      lab: 'budget'
    },
    en: {
      title: 'An image budget comes before compression',
      dek: 'Decide why an image exists, how large it appears, and when it is needed before moving the quality slider.',
      lead: 'Imagine a community workshop page with a large photograph and two material diagrams. On a phone, the images arrive slowly and push the description downward. Compressing everything harder may remove useful detail without fixing dimensions or loading order. Assign each image a job and an allowance first. All numbers here are teaching assumptions, not measurements of NOWOI or another website.',
      sections: [
        {
          id: 'give-every-image-a-job',
          title: '01 / Give every image a job',
          html: `<p>Write what each image helps a visitor decide. A workshop photograph shows the setting; a diagram identifies supplies; a decorative texture might be unnecessary. Removing an unhelpful request is a better starting point than choosing its compression format.</p><p>Record the maximum displayed width, aspect ratio, and position. Suppose the article is at most 680 CSS pixels wide, with 16-pixel margins on narrow screens. The photograph suits a 3:2 crop, while labels in a diagram need inspection at their final display size. These assets should not automatically share one quality setting.</p><p>Keep the supply list in nearby text, so it remains understandable when the diagram is unavailable. Alternative text should describe the image's purpose in this context.</p>`
        },
        {
          id: 'three-different-sizes',
          title: '02 / Separate three kinds of size',
          html: `<p>A 3.2 MB camera original is an editing asset. Suppose its web derivative is 1440 by 960 pixels and 110 kB. That encoded file size helps plan downloads; actual transferred bytes depend on factors including caching and response overhead. Here, kB means 1000 bytes.</p><table><thead><tr><th>Quantity</th><th>Assumed example</th><th>Useful for</th></tr></thead><tbody><tr><td>Editing original</td><td>3.2 MB</td><td>Future crops and exports</td></tr><tr><td>Encoded web image</td><td>110 kB</td><td>A download allowance to verify</td></tr><tr><td>Pixel-data estimate</td><td>1440 × 960 × 4 bytes, about 5.27 MiB</td><td>Understanding decoding cost</td></tr></tbody></table><p>The last calculation assumes four-byte RGBA pixels. It is not a measured browser memory footprint and excludes other rendering overhead. Actual representations vary. Lowering encoding quality does not automatically reduce pixel count; resizing an oversized image addresses a different cost.</p>`
        },
        {
          id: 'reserve-the-shape',
          title: '03 / Reserve the shape before arrival',
          html: `<p>If the browser cannot allocate image height during layout, the arriving image can move text. Accurate <code>width</code> and <code>height</code> attributes establish its ratio early. Responsive styling such as <code>max-width: 100%; height: auto;</code> still lets it shrink with its container.</p><p>A 1440-by-960 photograph displayed 600 pixels wide needs 400 pixels of height. Those attributes do not require a 1440-pixel display. A deliberately cropped container can instead reserve its own <code>aspect-ratio</code>; check that the crop preserves important details.</p><p>Use matching ratios across resolution candidates. Different mobile crops require corresponding space. Incorrect dimensions can still produce a correction when the image arrives. Reserving image space addresses one cause of layout shift, not every cause of CLS.</p>`
        },
        {
          id: 'offer-real-candidates',
          title: '04 / Offer real, accurately described candidates',
          html: `<p><code>srcset</code> describes existing files and their pixel widths. <code>sizes</code> describes the expected displayed width under different viewport conditions. Neither generates images nor sets the layout. Export these example files before using this markup.</p><pre><code>&lt;img
  src="workshop-960.webp"
  srcset="workshop-480.webp 480w,
          workshop-960.webp 960w,
          workshop-1440.webp 1440w"
  sizes="(max-width: 720px) calc(100vw - 32px), 680px"
  width="1440" height="960"
  alt="Scissors and colored paper beside the workshop table"
  fetchpriority="high"&gt;</code></pre><p>This assumes 32 pixels of combined mobile margins and a 680-pixel desktop image. A two-column card needs different conditions. The browser considers display width and pixel density rather than always selecting the smallest file. Inspect the actual request at different viewport sizes and device pixel ratios.</p>`
        },
        {
          id: 'protect-the-first-view',
          title: '05 / Protect the important first image',
          html: `<p>A large, visible photograph may become the Largest Contentful Paint element. Applying <code>loading="lazy"</code> can delay its request. Put a critical image in the initial HTML and avoid lazy-loading it. The example's <code>fetchpriority="high"</code> is a priority hint; reserve it for genuinely important resources rather than every image.</p><p>Images farther down an article can be lazy-loaded while retaining dimensions. Verify the actual LCP element with a performance recording: at another viewport size, a heading may be the largest element instead.</p><p>Smaller images cannot remove delays caused by slow server responses, late discovery, or blocked rendering. Diagnose where time is being spent before changing loading behavior.</p>`
        },
        {
          id: 'turn-the-budget-into-a-check',
          title: '06 / Make the budget a testable assumption',
          html: `<p>Try a 300 kB initial resource allowance: 110 kB for the photograph, 35 kB for each diagram, and 120 kB for everything else. At an assumed throughput of 200 kB per second, transferring that quantity alone takes 1.5 seconds.</p><p><strong>That is neither a page-load measurement nor an LCP prediction.</strong> The division excludes connection setup, latency, scheduling, caching, decoding, and rendering. Use the budget exercise to compare choices, not to manufacture a speed score.</p><ol><li>Export candidates and inspect detail at their displayed sizes.</li><li>Check selected files in the network panel, with and without cache.</li><li>Resize the viewport and watch for text moving as images appear.</li><li>Record test conditions and compare revisions under the same conditions.</li></ol><p>If the allowance is exceeded, reconsider an image's presence, dimensions, or timing before endlessly reducing quality. Keep originals and export settings for future revisions.</p>`
        }
      ],
      takeaways: ['Decide purpose and display dimensions before assigning bytes.', 'Encoded downloads and decoded pixel data are different quantities.', 'Space reservation, responsive sources, and request timing solve different problems.', 'A budget compares assumptions; browser checks reveal actual behavior.'],
      lab: 'budget'
    }
  },
  {
    id: 'local-first-honestly',
    topic: 'experience',
    number: '05',
    minutes: 8,
    sources: [
      { title: 'MDN · Using files from web applications', url: 'https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications' },
      { title: 'MDN · Overview of HTTP', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview' },
      { title: 'MDN · localStorage', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage' },
      { title: 'Chrome DevTools · Inspect network activity', url: 'https://developer.chrome.com/docs/devtools/network/' },
      { title: 'MDN · Storage.removeItem()', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Storage/removeItem' }
    ],
    zh: {
      title: '“本地处理”到底能承诺什么',
      dek: '把工具输入、浏览器存储、网站访问和第三方请求分别说清楚，隐私说明才有可核对的边界。',
      lead: '有人想用在线工具整理一段尚未发布的会议记录。“在浏览器中处理”很有吸引力，却不能自动回答记录是否上传、草稿是否保存、网站是否有访问日志这三个不同的问题。设计一个值得信任的本地工具，关键是让数据实际经过的路径与页面上的承诺一致。下面讨论的是设计和验证方法，不代表每个标有“本地”的网站都已经这样实现。',
      sections: [
        {
          id: 'draw-the-data-boundary',
          title: '01 / 先画出数据边界',
          html: `<p>从一个具体操作开始：访客粘贴 <code>MEETING-DEMO-47</code>，点击整理，再导出结果。分别列出输入、计算结果、存储位置和网络请求。浏览器可以读取用户主动选择的文件，并在客户端完成计算；但是，能在本地计算与实际没有上传，仍是两件需要分别确认的事。</p><table><thead><tr><th>数据</th><th>可能经过哪里</th><th>需要说明什么</th></tr></thead><tbody><tr><td>粘贴的记录、选中的文件</td><td>页面内存；若程序发送，也可能到服务器</td><td>工具是否上传这些内容</td></tr><tr><td>保存的草稿或偏好</td><td>浏览器存储</td><td>保存内容、触发条件与删除方法</td></tr><tr><td>网页访问请求</td><td>托管商、CDN 等基础设施</td><td>按实际配置说明访问日志</td></tr><tr><td>字体、统计、广告等请求</td><td>对应第三方服务</td><td>服务、用途与相关数据处理</td></tr></tbody></table><p>“工具输入不上传”描述一条具体边界。“全站没有任何数据传输”则连下载网页本身也无法解释。网站需要通过网络提供页面，不代表工具输入一定被上传；工具输入不上传，也不代表网站完全匿名。</p>`
        },
        {
          id: 'make-saving-a-choice',
          title: '02 / 计算与保存，设计成两个选择',
          html: `<p>对于临时文本工具，一个清楚的默认方案是只在页面内存中处理输入。用户没有选择保存时，程序不应悄悄把内容写进 <code>localStorage</code>。这是本教程建议的产品选择，不是浏览器替你执行的默认保护。</p><p><code>localStorage</code> 属于当前来源，可以跨浏览器会话保留数据，没有自动到期时间。它不是加密保险箱；同一来源执行的脚本可以访问这类存储。共享电脑上的下一位使用者也可能通过恢复页面或工具功能看到已保存内容。</p><p>若确实需要草稿功能，使用默认未选中的“在此浏览器保存草稿”，并在旁边写明保存哪些内容、存在哪里、如何删除。只有用户主动开启并点击保存时才写入；保存失败应明确提示，不能仍显示“已保存”。浏览器策略、空间限制和隐私模式都可能改变保存结果。</p>`
        },
        {
          id: 'follow-one-sample-through',
          title: '03 / 用假数据走一遍完整路径',
          html: `<p>验证时使用不含个人信息的独特样本文字，如 <code>MEETING-DEMO-47</code>。先打开开发工具的网络面板，再重新加载页面，这样能看到初次访问与之后操作的请求。记录域名、请求类型和发起者，然后输入样本，依次执行整理、复制、导出及任何保存操作。</p><ol><li>检查操作前后是否出现新请求，尤其是表单、Fetch/XHR、统计或错误上报请求。</li><li>检查请求 URL、查询参数和可查看的请求正文，确认样本文字有没有被发送。</li><li>查看浏览器存储区域，比较操作前后新增的键和值。</li><li>刷新页面，确认恢复行为是否符合页面说明。</li></ol><p>不要把敏感原文放进 URL：查询参数可能进入历史、日志或分享链接。网络检查只提供当前版本、当前环境和已执行步骤的证据；没看到样本并不能证明所有操作、未来更新或浏览器扩展都绝不会传输内容。代码审查与重复检查仍然必要。</p>`
        },
        {
          id: 'offer-export-and-delete',
          title: '04 / 导出与删除要有明确对象',
          html: `<p>导出让用户自己决定在哪里保留结果。导出文件名可以包含工具名称与日期，但不应擅自放入文档标题中的敏感信息。提示下载文件仍然存在于设备上；清空网页输入不会删除已经下载、复制或另行备份的副本。</p><p>区分“清空当前输入”与“删除此浏览器中的草稿”。前者重置界面和内存，后者还需要删除工具自己保存的键。下例仅演示删除一个明确命名的键，实际项目要按真实存储结构实现：</p><pre><code>localStorage.removeItem("example-tool:draft");</code></pre><p>不要随便使用 <code>localStorage.clear()</code>，否则可能删掉同一来源下其他功能的偏好。删除后刷新，确认草稿没有恢复；导出后打开文件，确认字符与换行正确。若程序用了临时对象 URL，完成相关下载后也应按实现释放不再需要的引用。</p>`
        },
        {
          id: 'write-a-bounded-promise',
          title: '05 / 把承诺写成可以核对的句子',
          html: `<p>与“绝对安全、完全匿名”相比，下面这样的说明更容易落实：</p><blockquote><p>本工具在浏览器内整理你输入的文本，不把该文本发送给我们的服务器。默认不保存草稿；只有你主动开启保存并执行保存操作后，草稿才保留在当前浏览器。网页托管和已启用的外部服务按隐私政策处理访问请求。</p></blockquote><p>这是一段<strong>需要与实际实现核对后才能使用的示例</strong>。如果工具调用云端模型或远程接口，就不能照搬第一句。如果嵌入统计、广告、外部字体或错误监控，也应把这些请求单独列清楚，确认不会把输入和结果夹带进事件属性或错误信息。</p><p>页面上的“无须注册”“本地计算”“不保存草稿”分别回答不同问题，不能互相替代。对仍未核实的托管商日志保留时间，应查配置或供应商说明，不要编造“立即删除”。</p>`
        },
        {
          id: 'recheck-after-changes',
          title: '06 / 每增加一个依赖，就重新看一次边界',
          html: `<p>一次检查不能替代以后的维护。新增广告、分析脚本、反馈表单或远程错误监控时，数据路径都可能变化。在发布记录里写明新增服务、发送的数据、触发条件以及说明页面如何更新。</p><p>下方数据练习用于把数据按处理、保存和请求分类。先写出自己的承诺，再逐项找实现证据；若一句话无法对应到代码、配置或可重复操作，就把它改得更准确。</p><p>处理高度敏感的内容时，先判断网页工具是否适合当前场景。不要为了演示本地处理，就要求用户上传真实合同、凭证或医疗记录。使用合成样本也能验证大多数格式处理与保存流程，而无需扩大验证本身造成的数据暴露。</p>`
        }
      ],
      takeaways: ['工具输入、网页访问和第三方服务是不同的数据路径。', '浏览器存储应有明确用途、主动选择与删除入口。', '用合成样本核查请求和存储，并记录检查边界。', '每次依赖变化，都要重新核对隐私承诺。'],
      lab: 'data'
    },
    en: {
      title: 'What “local processing” can honestly promise',
      dek: 'Separate tool inputs, browser storage, page visits, and third-party requests before writing a privacy claim.',
      lead: 'Someone wants to tidy an unpublished meeting note. “Processed in your browser” sounds reassuring, but it does not answer three separate questions: is the text uploaded, is a draft saved, and does visiting the site create logs? Trust depends on matching the actual data path to the promise. This guide describes a design and verification method, not a certification of every tool labeled local.',
      sections: [
        {
          id: 'draw-the-data-boundary',
          title: '01 / Draw the boundary first',
          html: `<p>Follow one action: paste <code>MEETING-DEMO-47</code>, transform it, and export the result. List the input, output, storage, and requests separately. Browsers can read user-selected files and calculate locally; that capability alone does not establish that a particular implementation avoids uploads.</p><table><thead><tr><th>Data</th><th>Possible destination</th><th>Question to answer</th></tr></thead><tbody><tr><td>Text or selected files</td><td>Page memory, or a server if transmitted</td><td>Does the tool upload this content?</td></tr><tr><td>Drafts and preferences</td><td>Browser storage</td><td>What saves them, and how are they removed?</td></tr><tr><td>Page requests</td><td>Hosting or CDN infrastructure</td><td>What do the actual logging settings retain?</td></tr><tr><td>Fonts, analytics, ads</td><td>External services</td><td>Which services receive what?</td></tr></tbody></table><p>“Tool inputs are not uploaded” is a specific boundary. It does not mean that fetching the website produces no network traffic or that visitors are completely anonymous.</p>`
        },
        {
          id: 'make-saving-a-choice',
          title: '02 / Make processing and saving separate choices',
          html: `<p>For a temporary text utility, a clear design is to process input in page memory without silently persisting it. This is a product decision to implement, not protection the browser automatically supplies.</p><p><code>localStorage</code> belongs to an origin and can persist across sessions without automatic expiry. It is not an encrypted vault; scripts running on that origin can access it. Saved content may also be visible to the next person using a shared browser.</p><p>If drafts are necessary, provide an initially unchecked “Save drafts in this browser” option. Explain the contents, location, and deletion method. Write only after the user opts in and saves. Report storage failures honestly: browser policies, quotas, or private browsing can affect availability.</p>`
        },
        {
          id: 'follow-one-sample-through',
          title: '03 / Follow a harmless sample all the way through',
          html: `<p>Use a distinctive synthetic string such as <code>MEETING-DEMO-47</code>. Open the network panel before reloading so initial and later requests are captured. Note domains, request types, and initiators; then transform, copy, export, and save the sample.</p><ol><li>Inspect new requests, including Fetch/XHR, form submissions, analytics, and error reports.</li><li>Look for the sample in request URLs, query parameters, and visible request bodies.</li><li>Compare browser storage keys and values before and after each action.</li><li>Refresh and check whether restoration matches the explanation.</li></ol><p>Keep sensitive content out of URLs, where it may enter history, logs, or shared links. This inspection covers the current version, environment, and tested actions. Absence of the sample is not proof about every path, future update, or browser extension. Review code and repeat checks after changes.</p>`
        },
        {
          id: 'offer-export-and-delete',
          title: '04 / Name exactly what export and deletion affect',
          html: `<p>An export lets the user choose where a result lives. Avoid inserting sensitive document titles into filenames. Explain that clearing the page does not remove files already downloaded, text copied elsewhere, or backups.</p><p>Distinguish “Clear current input” from “Delete this browser's draft.” The latter must remove the tool's stored data as well as reset its interface. This illustrative line removes one named key:</p><pre><code>localStorage.removeItem("example-tool:draft");</code></pre><p>Do not casually use <code>localStorage.clear()</code>, which could remove unrelated preferences on the same origin. Refresh after deletion to check restoration. Open exported files to verify characters and line breaks. Where temporary object URLs are used, release unneeded references at the appropriate point in the download implementation.</p>`
        },
        {
          id: 'write-a-bounded-promise',
          title: '05 / Write a promise that can be checked',
          html: `<p>A useful statement might read:</p><blockquote><p>This tool transforms text in your browser without sending that text to our servers. Draft saving is off by default. A draft remains in this browser only after you enable saving and save it. Hosting and enabled external services handle page requests as described in the privacy notice.</p></blockquote><p><strong>This is example wording to verify against the implementation.</strong> It is unsuitable for a tool that calls a remote model or API. Separately document external fonts, ads, analytics, and error monitoring. Check that input or output is not accidentally included in events or error messages.</p><p>No registration, local computation, and no saved drafts describe different things. Confirm hosting log retention from actual configuration or provider documentation rather than inventing an immediate-deletion claim.</p>`
        },
        {
          id: 'recheck-after-changes',
          title: '06 / Recheck whenever the boundary changes',
          html: `<p>Adding analytics, advertising, feedback, or remote error reporting can change the data path. Record the service, transmitted data, trigger, and corresponding notice update in the release log.</p><p>Use the data exercise to distinguish processing, storage, and requests. Draft a promise, then find implementation evidence for each sentence. Narrow claims that cannot be connected to code, configuration, or a repeatable check.</p><p>Consider whether a web tool suits especially sensitive material before using it. Do not request real contracts, credentials, or medical notes merely to demonstrate local behavior. Synthetic samples can verify most formatting and storage workflows without making the check itself another disclosure.</p>`
        }
      ],
      takeaways: ['Tool inputs, page requests, and external services follow different paths.', 'Persistent browser storage needs a purpose, an explicit choice, and deletion controls.', 'Inspect requests and storage with synthetic samples and record the limits.', 'Recheck privacy statements when dependencies or behavior change.'],
      lab: 'data'
    }
  },
  {
    id: 'first-week',
    topic: 'ship',
    number: '06',
    minutes: 8,
    sources: [
      { title: 'Google · HTTP status codes and crawling', url: 'https://developers.google.com/crawling/docs/troubleshooting/http-status-codes' },
      { title: 'web.dev · Manual accessibility testing', url: 'https://web.dev/learn/accessibility/test-manual' },
      { title: 'Google · SEO Starter Guide', url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide' },
      { title: 'Search Console · URL Inspection tool', url: 'https://support.google.com/webmasters/answer/9012289?hl=en' },
      { title: 'AdSense · When your site is not ready to show ads', url: 'https://support.google.com/adsense/answer/12176698?hl=en' }
    ],
    zh: {
      title: '网站发布后的第一周',
      dek: '把上线当作观察的起点：先确认访问与操作真实可用，再让反馈决定下一次修改。',
      lead: '一个小型资料站终于有了正式网址。首页可以打开，并不代表从旧书签进入、用键盘切换语言、在手机上完成练习也都正常。发布后的第一周适合建立一条短而可靠的维护路径：记录实际现象，保留复现步骤，修改后回到同一条路径核对。以下七天是可调整的工作安排，不是搜索收录、流量增长或广告审核的承诺。',
      sections: [
        {
          id: 'before-you-announce',
          title: '01 / 宣布上线之前，留一份访问基线',
          html: `<p>先列出首页、一篇教程、一个练习、联系页和一个确定不存在的地址。直接输入这些网址，不要全部通过首页点击进入。这样能发现静态部署的深层路径、刷新以及错误页配置问题。</p><p>例如旧文章 <code>/notes/image-size.html</code> 已永久迁到 <code>/zh/guides/image-budget/</code>，就应将它重定向到相关新内容，而不是统一塞回首页。永久迁移通常使用 301 或 308；具体规则要在实际托管平台验证。完全不存在的路径应返回真正的 404，而不是只画一个“找不到”界面却返回成功状态。</p><table><thead><tr><th>访问样本</th><th>期待结果</th><th>核对证据</th></tr></thead><tbody><tr><td>正式教程地址</td><td>200，正文与标题正确</td><td>页面和文档请求状态</td></tr><tr><td>有对应新内容的旧地址</td><td>永久重定向，最终到达相关页面</td><td>重定向链和最终地址</td></tr><tr><td>随机不存在的地址</td><td>404，有可用返回入口</td><td>HTTP 状态与错误页内容</td></tr></tbody></table><p>在生产地址上检查，而不只在本地预览。记录日期、网址、浏览器和结果；不要把一份尚未执行的检查表标成全部通过。浏览器网络面板中的文档请求，可以帮助确认服务器真正返回了什么。</p>`
        },
        {
          id: 'first-day-complete-a-task',
          title: '02 / 第一天，完整完成一件事',
          html: `<p>选择一个真实目标，例如“找到图片预算教程，调整练习里的数字，再返回目录”。先把鼠标放到一边，仅用键盘完成。用 Tab 和 Shift+Tab 移动，核对焦点是否看得见、顺序是否合理，链接和按钮能否按预期激活。若有弹层，检查能否关闭，以及关闭后焦点回到哪里。</p><p>再用手机走同一条路径，检查菜单、表格、代码和结果区。没有实体设备时可以先用窄屏模拟，但要把它记录成模拟检查。以约 360 个 CSS 像素宽度和浏览器放大后的阅读状态作探查，观察是否出现被遮住的按钮或必须左右拖动才能读完的普通段落。</p><p>清楚、与内容吻合的页面标题也属于这条路径：打开两个教程标签，看看读者能否分辨。修正“能点但不知道发生了什么”的反馈，比添加装饰更直接。一次键盘和手机检查只是基础筛查，不能据此宣称已经通过全面无障碍审计。</p>`
        },
        {
          id: 'second-day-search-visibility',
          title: '03 / 第二至三天，检查搜索看到的版本',
          html: `<p>在 Search Console 验证正确的网站资源后，挑选几个有代表性的完整网址进行网址检查。已编入索引的数据与实时测试回答不同问题：前者展示 Google 已知的版本，后者帮助检查当前页面是否可能被抓取和索引。实时测试成功，不等于页面已经进入索引。</p><p>核对抓取到的正文、资源加载和页面状态；如果提交站点地图，地图里的地址应是希望公开、可正常访问的正式地址。只有检查发现了异常，才去修改对应的重定向、robots 或 noindex 配置，不要见到“尚未收录”就盲目解除所有限制。</p><p>Google 明确说明，返回 200 也不保证收录。提交索引请求同样不是立即收录的保证；对于刚上线的网站，先保留观察记录。Search Console 负责搜索可见性，AdSense 有独立的站点与政策审核，因此“已验证”“已收录”都不能作为广告批准的承诺。</p>`
        },
        {
          id: 'collect-useful-feedback',
          title: '04 / 第三至五天，收集能复现的反馈',
          html: `<p>比“网站不好用”更有帮助的反馈是：“在某个页面，想完成什么，做到哪一步，预期和实际有什么差别。”提供联系入口，并邀请用户描述这些内容。不要要求提交正在处理的真实文件，尤其是合同、账号信息或其他私密材料；可以请对方用合成样本复现。</p><p>先处理阻止任务完成的问题。例如“按下导出没有反应”通常比“卡片间距希望更大”更紧急。但应先复现：确认是否仅在某个浏览器、隐私设置或特定输入下出现。保存最小样本、操作顺序和可见错误，避免仅凭一条模糊反馈重写整站。</p><p>若没有收到反馈，就实际执行前一天的访问路径，或邀请愿意参与的人测试。不要编造用户评价、使用人数和成功率来填补空白。没有数据也是当前状态的一部分，应该如实记录。</p>`
        },
        {
          id: 'write-a-maintenance-entry',
          title: '05 / 第六至七天，写下能追溯的维护记录',
          html: `<p>每个重要修改保留四项：发现的问题、受影响的路径、采取的修改以及修改后的核对结果。下面是一条格式示例，不是本站已经发生的测试记录：</p><blockquote><p>问题：手机菜单关闭后，键盘焦点丢失。路径：教程页 → 打开菜单 → 关闭。修改：关闭后将焦点还给菜单按钮。核对：在指定浏览器重复该路径；其他浏览器待查。</p></blockquote><p>“已修复”应对应已重复的步骤。仍未核对的环境写成待查；无法复现则写明尝试条件，不必强行给出结论。发布一项修改后，顺便检查相关路径：菜单改动可能影响所有页面，单个例子的修订则未必需要全站重测。</p><p>将尚未完成的问题按影响排序，选择下一周能完成的小批次。维护记录可以公开说明有价值的变化，但不应暴露用户输入、私人邮箱或内部错误信息中的凭证。</p>`
        },
        {
          id: 'keep-the-loop-small',
          title: '06 / 留下一条可以重复的维护循环',
          html: `<p>下方发布检查练习适合记录自己的待办与复核结果。它是一份辅助清单，不能自动访问你的网站、替你检查服务器，也不会向 Google 提交任何申请。只有实际完成相应检查，再把项目标为完成。</p><p>第一周结束时，目标是一组可信的事实：哪些网址正常，哪个操作受阻，哪条反馈已处理，哪些问题仍待查。不要用“所有指标全绿”代替这些事实，也不要为了申请广告临时堆砌与读者目标无关的文章。</p><p>之后每次增加教程、依赖或功能，都重复“访问、操作、观察、修改、复核”这条循环。对于小站，稳定地把一个问题解决清楚，往往比一次铺开很多未经验证的新页面更容易维护。</p>`
        }
      ],
      takeaways: ['在正式域名直接检查页面、旧地址和不存在的地址。', '用键盘和手机完成实际任务，并记录检查条件。', '搜索验证与收录状态都不等于 AdSense 批准。', '维护记录应区分已核对、待查和无法复现。'],
      lab: 'launch'
    },
    en: {
      title: 'The first week after your website goes live',
      dek: 'Treat launch as the start of observation: verify real journeys, then let evidence shape the next change.',
      lead: 'A small reference site finally has a public address. Its homepage opens, but do old bookmarks, keyboard navigation, and mobile exercises work too? The first week is a chance to establish a short maintenance loop: observe, reproduce, change, and check again. This suggested schedule is adjustable. It promises no indexing deadline, traffic growth, or advertising approval.',
      sections: [
        {
          id: 'before-you-announce',
          title: '01 / Capture a baseline before announcing',
          html: `<p>List the homepage, a guide, an exercise, a contact page, and a deliberately nonexistent address. Enter each URL directly rather than always navigating from home. This exposes deployment problems with deep links, refreshes, and error handling.</p><p>If <code>/notes/image-size.html</code> permanently moved to <code>/en/guides/image-budget/</code>, redirect it to that relevant replacement. Permanent moves commonly use 301 or 308; verify the hosting rule. Do not redirect every unknown address to the homepage.</p><table><thead><tr><th>Sample</th><th>Expected outcome</th><th>Evidence</th></tr></thead><tbody><tr><td>Published guide</td><td>200 and the correct content</td><td>Document request and page title</td></tr><tr><td>Replaced old URL</td><td>Permanent redirect to relevant content</td><td>Redirect chain and final address</td></tr><tr><td>Nonexistent URL</td><td>404 with useful navigation</td><td>Status and error-page content</td></tr></tbody></table><p>Check the production domain. Record date, address, browser, and result; do not mark an unperformed checklist as passed. The document request in the network panel reveals the response beyond the visible design.</p>`
        },
        {
          id: 'first-day-complete-a-task',
          title: '02 / Day one: complete one whole task',
          html: `<p>Choose a goal: find the image-budget guide, change an exercise, and return to the directory. Put the mouse aside. Use Tab and Shift+Tab, checking visible focus, sensible order, and working controls. For overlays, check dismissal and where focus returns.</p><p>Repeat on a phone, including menus, tables, code, and results. Narrow-screen emulation is useful when hardware is unavailable, but label it as emulation. Probe around 360 CSS pixels and with browser zoom: are buttons hidden, or ordinary paragraphs unnecessarily scrollable sideways?</p><p>Open two guides in separate tabs and check that their titles distinguish them accurately. Improve unclear action feedback before adding decoration. This journey is a basic accessibility screen, not a comprehensive audit.</p>`
        },
        {
          id: 'second-day-search-visibility',
          title: '03 / Days two and three: inspect search visibility',
          html: `<p>After verifying the appropriate Search Console property, inspect representative full URLs. Indexed information describes Google's known version; the live test helps assess the current page's potential indexability. A successful live test does not mean a page is already indexed.</p><p>Review retrieved content, resources, and status. A submitted sitemap should list intended public, working canonical addresses. Change redirects, robots rules, or noindex directives in response to a diagnosed problem rather than removing every restriction because a page is absent.</p><p>Google explicitly states that a 200 response does not guarantee indexing. An indexing request does not promise immediate inclusion either. Search Console addresses search visibility; AdSense applies its own site and policy review. Verification or indexing cannot promise advertising approval.</p>`
        },
        {
          id: 'collect-useful-feedback',
          title: '04 / Days three to five: seek reproducible feedback',
          html: `<p>“On this page, I tried this action, expected this result, and saw this instead” is more useful than “the site is broken.” Offer a contact route and invite that information. Ask for synthetic reproductions instead of real contracts, credentials, or private files.</p><p>Prioritize blocked tasks. An export that does nothing usually matters more than a spacing preference. Reproduce it first: is the failure specific to a browser, privacy setting, or input? Keep the smallest sample, exact steps, and visible error.</p><p>If feedback is absent, repeat your own journey or invite a willing tester. Do not fill the gap with invented testimonials, usage counts, or success rates. No evidence yet is a legitimate status.</p>`
        },
        {
          id: 'write-a-maintenance-entry',
          title: '05 / Days six and seven: leave a useful maintenance record',
          html: `<p>Record the problem, affected journey, change, and verification. This is an illustrative entry, not a completed test:</p><blockquote><p>Problem: closing the mobile menu loses keyboard focus. Journey: guide → open menu → close. Change: return focus to the menu button. Check: repeat in the named browser; other browsers remain untested.</p></blockquote><p>A fixed status needs repeated steps behind it. Mark untested environments as pending. For a failure you cannot reproduce, record attempted conditions rather than forcing a conclusion.</p><p>Recheck related paths after changes: a shared menu affects many pages, while a corrected example may need a narrower review. Prioritize the remaining work for next week. Public change notes can explain improvements without disclosing user inputs, private addresses, or secrets captured in errors.</p>`
        },
        {
          id: 'keep-the-loop-small',
          title: '06 / Keep the loop repeatable',
          html: `<p>Use the launch exercise to organize tasks and verification. It is a checklist, not a remote site scanner or a Google submission service. Mark a check complete only after performing it.</p><p>End the week with trustworthy facts: working addresses, blocked actions, resolved feedback, and remaining questions. Green scores do not replace those facts. Neither does adding unrelated articles simply to pursue advertising approval.</p><p>Repeat the same loop whenever guides, dependencies, or features change: visit, operate, observe, modify, verify. For a small site, resolving one understood problem is easier to maintain than publishing many unverified additions.</p>`
        }
      ],
      takeaways: ['Check production pages, moved URLs, and nonexistent URLs directly.', 'Complete real keyboard and mobile journeys and record conditions.', 'Search verification and indexing do not guarantee AdSense approval.', 'Distinguish verified fixes, pending checks, and unreproduced reports.'],
      lab: 'launch'
    }
  }
];
