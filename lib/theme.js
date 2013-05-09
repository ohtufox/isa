exports.getSelectedTheme = getSelectedTheme;

let self = require('self');

const themes = [
    {
        good: self.data.url('icons/checkmark_32.png'),
        bad: self.data.url('icons/warning_32.png'),
        eyeopen: self.data.url('icons/eye_open_16.png'),
        eyeclosed: self.data.url('icons/eye_closed_16.png')
    },
    {
        good: self.data.url('icons/information_32.png'),
        bad: self.data.url('icons/forbidden_32.png'),
        eyeopen: self.data.url('icons/checkmark_32.png'),
        eyeclosed: self.data.url('icons/warning_old_32.png')
    }
];

function getSelectedTheme() {
    let themeIndex = require('sdk/simple-prefs').prefs['theme'];
    let theme = themes[themeIndex];
    return theme;
}
