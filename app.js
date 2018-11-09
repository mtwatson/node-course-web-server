const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
const demandTitle = {
    describe: 'Title of note',
    demand: true,
    alias: 't',
};
const demandBody = {
    describe: 'body of note',
    demand: true,
    alias: 'b',
};
const argv = yargs
    .command('add', 'Add a new note', {
        title: demandTitle,
        body: demandBody,
    })
    .command('list', 'Lists all notes')
    .command('read', 'Read a note', {
        title: demandTitle,
    })
    .command('remove', 'Removea note', {
        title: demandTitle,
    })
    .help()
    .argv;
const command = argv._[0];

if (command === 'add') {
    const note = notes.addNote(argv.title, argv.body);
    if (!_.isUndefined(note)) {
        console.log(`Note created`);
        console.log('--');
        notes.logNote(note);
    } else {
        console.log('Note title taken');
    }
} else if (command === 'list') {
    const allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`);
    allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'read') {
    const readNote = notes.getNote(argv.title);
    const message = readNote ? notes.logNote(readNote) : 'Note was not found';
    console.log(message);
} else if (command === 'remove') {
    const noteRemoved = notes.removeNote(argv.title);
    const message = noteRemoved ? 'Note was removed' : 'Note was not removed';
    console.log(message);
} else {
    console.log('Command not recognized');
}
