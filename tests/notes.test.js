import { expect, jest, test } from '@jest/globals';

jest.unstable_mockModule('../src/db.js', () => ({
  insertDB: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn(),
}));
//dynamic import 
const { insertDB, getDB, saveDB } = await import('../src/db.js');
const { newNote, getAllNotes, removeNote } = await import('../src/notes.js');

beforeEach(() => {
  insertDB.mockClear();
  getDB.mockClear();
  saveDB.mockClear();
})

test('newNote insertes data and return note',async()=>{
    const content = 'Test note'
    const tags= ['tag1','tag2']
    const note = {
        tags:tags,
        content:content,
        id:Date.now()
    }
    insertDB.mockResolvedValue(note)
    const result = await newNote(note.content,note.tags)
    expect(result).toEqual(note)
})
test('get all notes ',async()=>{
    const db = {
        notes:['note1','note2','note3']
    }
    getDB.mockResolvedValue(db);
    const result = await getAllNotes();
    expect(result).toEqual(db.notes)
})
test('remove note does nothing if id is note found',async()=>{
    const notes=[
        {
            id:1,content:'note1',tags:['tag1','tag2']
        },
        {
            id:2,content:'note2',tags:['tag1','tag2']
        },
        {
            id:3,content:'note3',tags:['tag1','tag2']
        }
    ]
    const idToRemove = 4
    saveDB.mockResolvedValue(notes);
    const result = await removeNote(idToRemove)
    expect(result).toBeUndefined();
})