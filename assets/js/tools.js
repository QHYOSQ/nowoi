
  function byId(id) { return document.getElementById(id); }
  var input = byId('input');
  var output = byId('output');
  var runBtn = byId('run');
  var copyBtn = byId('copy');
  var clearBtn = byId('clear');
  var status = byId('status');
  var extra = byId('extra-controls');
  var toolType = document.body.getAttribute('data-tool');

  if (!input || !output || !runBtn) return;

  function setStatus(text, cls) {
    if (!status) return;
    status.textContent = text;
    status.className = 'note ' + (cls || '');
  }

  function create(html) {
    var wrap = document.createElement('div');
    wrap.innerHTML = html;
    while (wrap.firstChild) extra.appendChild(wrap.firstChild);
  }

  function value(id) {
    var n = byId(id);
    return n ? n.value : '';
  }

  function setOutput(v) {
    output.value = v || '';
  }

  function safeDecodeURIComponent(v) {
    try { return decodeURIComponent(v); } catch (e) { return null; }
  }

  function titleCase(s) {
    return s.toLowerCase().replace(/\b\w/g, function (c) { return c.toUpperCase(); });
  }

  function markdownRender(md) {
    return md
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      .replace(/\n/gim, '<br>');
  }

  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0;
      var v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function runTool() {
    var src = input.value;
    setStatus('Processed in browser.', 'status-ok');
    try {
      if (toolType === 'json-formatter') {
        setOutput(JSON.stringify(JSON.parse(src), null, 2));
      } else if (toolType === 'json-validator') {
        JSON.parse(src);
        setOutput('Valid JSON.');
      } else if (toolType === 'uuid-generator') {
        var count = Math.max(1, Math.min(100, parseInt(value('count') || '5', 10)));
        var list = [];
        for (var i = 0; i < count; i++) list.push(uuidv4());
        setOutput(list.join('\n'));
      } else if (toolType === 'url-encoder') {
        var mode1 = value('mode') || 'encode';
        setOutput(mode1 === 'decode' ? decodeURIComponent(src) : encodeURIComponent(src));
      } else if (toolType === 'base64-encoder') {
        var mode2 = value('mode') || 'encode';
        if (mode2 === 'decode') setOutput(decodeURIComponent(escape(atob(src.trim()))));
        else setOutput(btoa(unescape(encodeURIComponent(src))));
      } else if (toolType === 'word-counter') {
        var words = (src.trim().match(/\S+/g) || []).length;
        var chars = src.length;
        var lines = src ? src.split(/\r?\n/).length : 0;
        var reading = words > 0 ? (words / 200).toFixed(2) : '0.00';
        setOutput('Words: ' + words + '\nCharacters: ' + chars + '\nLines: ' + lines + '\nEstimated reading time: ' + reading + ' min');
      } else if (toolType === 'case-converter') {
        var mode3 = value('mode') || 'upper';
        if (mode3 === 'upper') setOutput(src.toUpperCase());
        else if (mode3 === 'lower') setOutput(src.toLowerCase());
        else if (mode3 === 'title') setOutput(titleCase(src));
        else setOutput(src.toLowerCase().replace(/^./, function (c) { return c.toUpperCase(); }));
      } else if (toolType === 'slug-generator') {
        setOutput(src.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-'));
      } else if (toolType === 'password-generator') {
        var len = Math.max(6, Math.min(128, parseInt(value('length') || '16', 10)));
        var symbols = byId('symbols') && byId('symbols').checked;
        var charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' + (symbols ? '!@#$%^&*()_+{}[]<>?' : '');
        var pass = '';
        for (var p = 0; p < len; p++) pass += charset.charAt(Math.floor(Math.random() * charset.length));
        setOutput(pass);
      } else if (toolType === 'qr-code-generator') {
        var qr = byId('qr');
        if (!src.trim()) return;
        var url = 'https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=' + encodeURIComponent(src.trim());
        if (qr) qr.src = url;
        setOutput(url);
      } else if (toolType === 'timestamp-converter') {
        var t = src.trim();
        if (/^\d+$/.test(t)) {
          var d1 = new Date(parseInt(t, 10) * 1000);
          setOutput(d1.toISOString() + '\nLocal: ' + d1.toString());
        } else if (t) {
          var d2 = new Date(t);
          setOutput(String(Math.floor(d2.getTime() / 1000)));
        } else {
          var dt = value('dt');
          if (dt) {
            var d3 = new Date(dt);
            setOutput('Unix: ' + Math.floor(d3.getTime() / 1000) + '\nISO: ' + d3.toISOString());
          }
        }
      } else if (toolType === 'markdown-preview') {
        var html = markdownRender(src);
        var preview = byId('preview');
        if (preview) preview.innerHTML = html;
        setOutput(html);
      } else if (toolType === 'remove-line-breaks') {
        setOutput(src.replace(/\r?\n+/g, ' ').replace(/\s{2,}/g, ' ').trim());
      } else if (toolType === 'html-minifier') {
        setOutput(src.replace(/<!--([\s\S]*?)-->/g, '').replace(/>\s+</g, '><').replace(/\s{2,}/g, ' ').trim());
      } else if (toolType === 'css-minifier') {
        setOutput(src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{}:;,])\s*/g, '$1').replace(/;}/g, '}').trim());
      } else if (toolType === 'js-minifier') {
        setOutput(src.replace(/\/\/.*$/gm, '').replace(/\s+/g, ' ').replace(/\s*([{}();,:+\-*/=<>])\s*/g, '$1').trim());
      } else if (toolType === 'image-to-base64') {
        var fileNode = byId('file');
        var file = fileNode && fileNode.files && fileNode.files[0];
        if (!file) {
          setStatus('Choose an image file first.', 'status-warn');
          return;
        }
        var reader = new FileReader();
        reader.onload = function () { setOutput(reader.result); };
        reader.readAsDataURL(file);
      } else if (toolType === 'random-number-generator') {
        var min = parseInt(value('min') || '1', 10);
        var max = parseInt(value('max') || '100', 10);
        var cnt = Math.max(1, Math.min(500, parseInt(value('count') || '10', 10)));
        var arr = [];
        for (var r = 0; r < cnt; r++) arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
        setOutput(arr.join(', '));
      } else if (toolType === 'color-picker') {
        var hex = (src || value('color') || '#1f2937').trim();
        var h = hex.replace('#', '');
        if (h.length === 3) h = h.split('').map(function (x) { return x + x; }).join('');
        var n = parseInt(h, 16);
        var rgb = { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
        setOutput('HEX: ' + hex + '\nRGB: rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')');
        var swatch = byId('swatch');
        if (swatch) swatch.style.background = hex;
      } else if (toolType === 'text-diff-checker') {
        var b = byId('input2') ? byId('input2').value : '';
        var al = src.split(/\r?\n/);
        var bl = b.split(/\r?\n/);
        var len = Math.max(al.length, bl.length);
        var lines = [];
        for (var i2 = 0; i2 < len; i2++) {
          var left = al[i2] || '';
          var right = bl[i2] || '';
          if (left === right) lines.push('  ' + left);
          else {
            if (left) lines.push('- ' + left);
            if (right) lines.push('+ ' + right);
          }
        }
        setOutput(lines.join('\n'));
      }
    } catch (err) {
      setOutput('');
      setStatus('Error: ' + err.message, 'status-danger');
    }
  }

  if (toolType === 'uuid-generator') {
    create('<input id=\"count\" type=\"number\" min=\"1\" max=\"100\" value=\"5\" />');
  } else if (toolType === 'url-encoder' || toolType === 'base64-encoder') {
    create('<select id=\"mode\"><option value=\"encode\">Encode</option><option value=\"decode\">Decode</option></select>');
  } else if (toolType === 'case-converter') {
    create('<select id=\"mode\"><option value=\"upper\">UPPERCASE</option><option value=\"lower\">lowercase</option><option value=\"title\">Title Case</option><option value=\"sentence\">Sentence case</option></select>');
  } else if (toolType === 'password-generator') {
    create('<div class=\"row\"><input id=\"length\" type=\"number\" min=\"6\" max=\"128\" value=\"16\" /><label><input id=\"symbols\" type=\"checkbox\" checked /> Include symbols</label></div>');
  } else if (toolType === 'qr-code-generator') {
    create('<img id=\"qr\" alt=\"QR\" style=\"max-width:220px;border:1px solid #ddd;border-radius:10px;padding:8px;background:#fff\" />');
  } else if (toolType === 'timestamp-converter') {
    create('<input id=\"dt\" type=\"datetime-local\" />');
  } else if (toolType === 'markdown-preview') {
    create('<div id=\"preview\" style=\"border:1px solid #ddd;border-radius:10px;padding:12px;background:#fff\"></div>');
  } else if (toolType === 'image-to-base64') {
    create('<input id=\"file\" type=\"file\" accept=\"image/*\" />');
  } else if (toolType === 'random-number-generator') {
    create('<div class=\"row\"><input id=\"min\" type=\"number\" value=\"1\" /><input id=\"max\" type=\"number\" value=\"100\" /><input id=\"count\" type=\"number\" min=\"1\" max=\"500\" value=\"10\" /></div>');
  } else if (toolType === 'color-picker') {
    create('<div class=\"row\"><input id=\"color\" type=\"color\" value=\"#1f2937\" /><div id=\"swatch\" style=\"width:64px;height:36px;border:1px solid #ccc;border-radius:8px;background:#1f2937\"></div></div>');
    var colorNode = byId('color');
    if (colorNode) {
      colorNode.addEventListener('input', function () {
        input.value = colorNode.value;
        var sw = byId('swatch');
        if (sw) sw.style.background = colorNode.value;
      });
    }
  } else if (toolType === 'text-diff-checker') {
    create('<textarea id=\"input2\" placeholder=\"Paste second text block...\"></textarea>');
  }

  runBtn.addEventListener('click', runTool);
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      output.select();
      document.execCommand('copy');
    });
  }
  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      input.value = '';
      output.value = '';
      if (byId('input2')) byId('input2').value = '';
      setStatus('All processing runs in your browser.', '');
    });
  }
})();