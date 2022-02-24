const noteBtn = document.querySelector('#add-btn'),
  noteTitle = document.querySelector('#note-title'),
  noteText = document.querySelector('#note-text'),
  form = document.querySelector('form'),
  clear = document.querySelector('.clear');

function getNotes() {
  let notes = localStorage.getItem('notes');
  if ((notes = null)) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
}

noteBtn.addEventListener('click', (e) => {
  e.preventDefault();

  if (noteTitle.value == '' || noteText.value == '') {
    return alert('Please add note title and details.');
  }

  getNotes();

  let myObj = {
    title: noteTitle.value,
    text: noteText.value,
  };
  notesObj.push(myObj);
  localStorage.setItem('notes', JSON.stringify(notesObj));

  form.reset();
});
