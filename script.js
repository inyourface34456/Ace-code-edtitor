var e = ace.edit("editor");
var modelist = ace.require("ace/ext/language_tools");
var languge = prompt('What languge are you writing in?', 'text');


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
        scrollPastEnd: .5,
        fontSize: 16,
        // fontFamily: "Helvetica"  there is an issue regarding non-monospace fonts.  untill that gets fixed, thi
    });
};

function programingTheame() {
    e.setTheme("ace/theme/gob");
    e.setOptions({
        highlightActiveLine: true,
        cursorStyle: 'slim',
        animatedScroll: true,
        showGutter: true,
        displayIndentGuides: true,
        useWorker: true,
        scrollPastEnd: .5,
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
    });
};

function determinMode() {
    if (languge == 'text') {
        textTheame();
    };

    if (languge != 'text') {
        programingTheame();
    };
};
determinMode();

e.commands.addCommand({
    name: 'Save',
    bindKey: {
        win: 'Ctrl-S',
        mac: 'Command-S'
    },
    exec: function(editor) {
        slot = prompt('What do you want your slot to be named?');
        localStorage.setItem(slot, editor.getValue());
        alert('Content saved!')
    },
    readOnly: true,
});

e.commands.addCommand({
    name: 'Load',
    bindKey: {
        win: 'Ctrl-Shift-L',
        mac: 'Command-Shift-L'
    },
    exec: function(editor) {
        slot = prompt('What slot do you want to load from?');
        editor.setValue(localStorage.getItem(slot));
        alert('Content loaded!')
        lang = prompt('What language did you code the save in?')
        editor.session.setMode("ace/mode/" + lang);
        determinMode();
    },
    readOnly: true,
});

e.commands.addCommand({
    name: 'Set mode to Text',
    bindKey: {
        win: 'Ctrl-Shift-T',
        mac: 'Command-Shift-T'
    },
    exec: function(editor) {
        editor.session.setMode("ace/mode/text");
        textTheame();
    },
    readOnly: true,
});

e.getSession().setMode("ace/mode/" + languge);
