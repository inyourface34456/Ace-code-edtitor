"use strict";
var e = ace.edit("editor");
var modelist = ace.require("ace/ext/language_tools");
var beautify = ace.require("ace/ext/beautify");

// Get and log the current mode of the editor
function getCurrentMode() {
    return e.session.getMode().$id;
}

e.getSession().setUseWrapMode(true);

function textTheame() {
    e.setTheme("ace/theme/chrome");
    e.setOptions({
        highlightActiveLine: false,
        cursorStyle: 'slim',
        animatedScroll: true,
        showGutter: false,
        showPrintMargin: false,
        displayIndentGuides: false,
        useWorker: true,
        scrollPastEnd: 0.5,
        fontSize: 16
        // fontFamily: "Helvetica"  there is an issue regarding non-monospace fonts.  untill that gets fixed, thi
    });
}

function programingTheame() {
    e.setTheme("ace/theme/gob");
    e.setOptions({
        highlightActiveLine: true,
        cursorStyle: 'slim',
        animatedScroll: true,
        showGutter: true,
        displayIndentGuides: true,
        useWorker: true,
        scrollPastEnd: 0.5,
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        useSvgGutterIcons: true
    });
}

e.commands.addCommand({
    name: 'Save',
    bindKey: {
        win: 'Ctrl-S',
        mac: 'Command-S'
    },
    exec: function (editor) {
        var slot = prompt('What do you want your slot to be named?');
        localStorage.setItem(slot, JSON.stringify({text: editor.getValue(), mode: getCurrentMode()}));
        alert('Content saved!');
    },
    readOnly: true
});

e.commands.addCommand({
    name: 'Load',
    bindKey: {
        win: 'Ctrl-Shift-L',
        mac: 'Command-Shift-L'
    },
    exec: function (editor) {
        var slot = prompt('What slot do you want to load from?');
        var content = JSON.parse(localStorage.getItem(slot));
        editor.setValue(content.text);
        alert('Content loaded!');
        editor.session.setMode(content.mode);
    },
    readOnly: true
});

e.commands.addCommand({
    name: 'Set mode to Text',
    bindKey: {
        win: 'Ctrl-Shift-T',
        mac: 'Command-Shift-T'
    },
    exec: function (editor) {
        editor.session.setMode("ace/mode/text");
        textTheame();
    },
    readOnly: true
});

e.commands.addCommand({
    name: 'Split Into Three Parts',
    bindKey: {
        win: 'Ctrl-Shift-3',
        mac: 'Command-Shift-3'
    },
    exec: function (editor) {
        var text = editor.getValue();
        var len = text.length;
        var partLen = Math.floor(len / 3);
        var part1 = text.slice(0, partLen);
        var part2 = text.slice(partLen, partLen * 2);
        var part3 = text.slice(partLen * 2);
        var result = `part 1:\n${part1}\n\npart 2:\n${part2}\n\npart 3:\n${part3}`;
        editor.setValue(result, -1);
    },
    readOnly: false
});

e.getSession().setMode("ace/mode/text");
