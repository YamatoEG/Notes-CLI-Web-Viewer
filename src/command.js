import yargs from 'yargs'
import {hideBin} from 'yargs/helpers'
import { newNote,getAllNotes, readNote, removeNote, removeAll } from './notes.js';
import { getDB} from './db.js';
import { listNotes } from './utilis.js';
import {start} from './server.js'
yargs(hideBin(process.argv))
//create a command that using for create a new note
.command('new <note>',"create a new note",(yargs)=>{
    return yargs.positional('note',{
        type:'string',
        describe: 'the content of the note to create'
    })
},async (argv)=>{
    const tags = argv.tags ? argv.tags.split(',') :[]
    const note = await newNote(argv.note,tags)
    console.log('New Note! ',note)
})
//adding option to tag our note so we can search for them with tags 
.option('tags',{
    //-t insted of using --tags 
    alias:'t',
    type:'string',
    description:'tags to add to the note'
})
.command('all', 'get all notes', () => {}, async (argv) => {
    const notes = await getAllNotes();
     listNotes(notes)
  })
  .command('find <filter>', 'get matching notes', yargs => {
    return yargs.positional('filter', {
      describe: 'The search term to filter notes by, will be applied to note.content',
      type: 'string'
    })
  }, async (argv) => {
    const notes =await getAllNotes();
    const matches = await readNote(argv.filter)
    listNotes(matches)
    
  })
  .command('remove <id>', 'remove a note by id', yargs => {
    return yargs.positional('id', {
      type: 'number',
      description: 'The id of the note you want to remove'
    })
  }, async (argv) => {
    const id = await removeNote(argv.id);
    console.log(id);
  })
  .command('web [port]', 'launch website to see notes', yargs => {
    return yargs
      .positional('port', {
        describe: 'port to bind on',
        default: 5000,
        type: 'number'
      })
  }, async (argv) => {
    const notes = await getAllNotes();
    start(notes,argv.port)

  })
  .command('clean', 'remove all notes', () => {}, async (argv) => {
    await removeAll();
    console.log("notes cleaned")
  })
//.demanCommand(1) means you cannot run note without enter at least 1 command 
//.parse means execute
.demandCommand(1).parse();