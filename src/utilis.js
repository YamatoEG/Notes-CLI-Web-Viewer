export const listNotes = notes => {
    if (!Array.isArray(notes)) {
        console.log('❌ No notes found or input is invalid.');
        return;
    }

    if (notes.length === 0) {
        console.log('📭 Notes list is empty.');
        return;
    }

    notes.forEach(({ id, content, tags }) => {
        console.log('🆔 ID:', id);
        console.log('📝 Content:', content);
        console.log('🏷️ Tags:', tags?.join(', ') || 'No tags');
        console.log('-----------------------------\n');
    });
};
