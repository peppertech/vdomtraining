define(["require", "exports", "jquery", "./libs/codeMirror/codemirror", "./libs/codeMirror/xml", "./libs/codeMirror/htmlmixed", "./libs/codeMirror/javascript", "./libs/codeMirror/jsx", "./libs/codeMirror/css", "./libs/codeMirror/active-line", "./libs/codeMirror/mark-selection", "./libs/codeMirror/matchbrackets", "./libs/codeMirror/foldcode", "./libs/codeMirror/foldgutter", "./libs/codeMirror/xml-fold", "./libs/codeMirror/comment-fold", "./libs/codeMirror/matchtags", "./libs/codeMirror/brace-fold"], function (require, exports, $, CodeMirror) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ComponentModel {
        constructor(context) {
            this.props = context.properties;
            this.element = context.element;
        }
        _toggleReadonly(readonly) {
            var $ele = $(this.element);
            if (readonly) {
                $ele.addClass('cookbook-readonly');
            }
            else {
                $ele.removeClass('cookbook-readonly');
            }
        }
        ;
        sourceChangeListener(event) {
            this.element.dispatchEvent(new CustomEvent('sourceChange', {
                detail: {
                    origEvent: event
                },
                bubbles: false
            }));
            this.props.source = this.editor.getDoc().getValue();
        }
        ;
        _createCodeEditor(codeMirror, element, code, mode, readOnly) {
            var elem = $(element);
            var codeEditor = elem.data('codeMirrorInstance');
            if (!codeEditor) {
                codeEditor = codeMirror(element, {
                    value: code,
                    // autoRefresh: true,
                    highlightNonStandardPropertyKeywords: false,
                    lineNumbers: true,
                    lineWrapping: true,
                    styleActiveLine: true,
                    styleSelectedText: true,
                    matchBrackets: true,
                    foldGutter: true,
                    readOnly: readOnly,
                    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
                    matchTags: true,
                    mode: mode,
                    extraKeys: {
                        Tab: false,
                        'Shift-Tab': false,
                        'Ctrl-Z': false
                    }
                });
                elem.data('codeMirrorInstance', codeEditor);
                if (readOnly) {
                    elem.find('.CodeMirror').css('background-color', '#ffffff');
                }
            }
            return codeEditor;
        }
        ;
        _setReadonlyLines(lineBlocks) {
            var self = this;
            if (lineBlocks) {
                lineBlocks = lineBlocks.split(',');
                lineBlocks.forEach((newLines) => {
                    newLines = newLines.split('-');
                    if (newLines.length === 1) {
                        newLines.push(this.editor.getDoc().lastLine());
                    }
                    self.editor.getDoc().markText(CodeMirror.Pos(parseInt(newLines[0], 10), 0), CodeMirror.Pos(parseInt(newLines[1], 10), 0), {
                        readOnly: true
                    });
                    self.editor.getDoc().eachLine(newLines[0], newLines[1], function (lh) {
                        self.editor.getDoc().addLineClass(lh, 'wrap', 'cookbook-readonly-line');
                    });
                });
            }
        }
        ;
        _setFoldLines(newLines) {
            if (newLines) {
                newLines = newLines.split('-');
                this.editor.foldCode(CodeMirror.Pos(parseInt(newLines[0], 10), 0), CodeMirror.Pos(parseInt(newLines[1], 10), 0), 'fold');
            }
        }
        ;
        getSource() {
            return this.editor.getDoc().getValue();
        }
        ;
        refresh() {
            if (this.editor) {
                this.editor.refresh();
            }
        }
        ;
        // Lifecycle methods - uncomment and implement if necessary
        connected(context) {
            var $ele = $(context.element);
            var source = this.props.source;
            var type = this.props.type;
            var readonly = this.props.readOnly;
            var sourceTempalte = $ele.find('template[slot=content]');
            if (!source && sourceTempalte.length > 0) {
                source = sourceTempalte[0].innerHTML;
            }
            this.HTML_INDENTATION = '  ';
            if (source) {
                source = source.trim();
                var prefixedEmptyStringLength = source.search(/\S/);
                var modifiedSource = source.split('\n');
                modifiedSource = modifiedSource.map(function (item, index, array) {
                    return item.search(/\S/) >= prefixedEmptyStringLength ? item.substring(prefixedEmptyStringLength) : item;
                });
                source = this.HTML_INDENTATION + modifiedSource.join('\n' + this.HTML_INDENTATION);
            }
            else {
                source = '';
            }
            this.editor = this._createCodeEditor(CodeMirror, $ele[0], source, type, readonly);
            this._setReadonlyLines(this.props.readOnlyLines);
            this._setFoldLines(this.props.foldLines);
            this.editor.on('change', this.sourceChangeListener.bind(this));
            this._toggleReadonly(readonly);
            context.element.addEventListener('sourceChanged', (event) => {
                if (event.detail.updatedFrom === 'internal') {
                    return;
                }
                try {
                    this.editor.getDoc().setValue(event.detail.value);
                }
                catch (e) {
                    // ignore
                }
                this._setReadonlyLines(this.props.readOnlyLines);
                this._setFoldLines(this.props.foldLines);
            });
            context.element.addEventListener('typeChanged', (event) => {
                this.editor.setOption('mode', event.detail.value);
            });
            context.element.addEventListener('readOnlyChanged', (event) => {
                this.editor.setOption('readOnly', event.detail.value);
                this._toggleReadonly(event.detail.value);
            });
            context.element.addEventListener('readOnlyLinesChanged', (event) => {
                var newLines = event.detail.value;
                var prevValue = event.detail.previousValue;
                if (prevValue) {
                    prevValue = prevValue.split('-');
                    this.editor.getDoc().markText(CodeMirror.Pos(parseInt(prevValue[0], 10), 0), CodeMirror.Pos(parseInt(prevValue[1], 10), 0), {
                        readOnly: false
                    });
                }
                this._setReadonlyLines(newLines);
            });
            context.element.addEventListener('foldLinesChanged', (event) => {
                var newLines = event.detail.value;
                var prevValue = event.detail.previousValue;
                if (prevValue) {
                    prevValue = prevValue.split('-');
                    this.editor.foldCode(CodeMirror.Pos(parseInt(prevValue[0], 10), 0), CodeMirror.Pos(parseInt(prevValue[1], 10), 0), 'unfold');
                }
                this._setFoldLines(newLines);
            });
        }
    }
    exports.default = ComponentModel;
});
