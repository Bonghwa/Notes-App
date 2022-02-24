const noteBtn = document.querySelector('#add-btn'),
  noteTitle = document.querySelector('#note-title'),
  noteText = document.querySelector('#note-text'),
  form = document.querySelector('form'),
  clear = document.querySelector('.clear');

function getNotes() {
  let notes = localStorage.getItem('notes');
  if (notes == null) {
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
  showNotes();
});

function showNotes() {
  getNotes();

  let html = '';
  notesObj.forEach((element, index) => {
    html += `
    <div class="note">
        <div class="note-cta">
            <p class="note-counter">Note ${index + 1}</p>
            <div class="note-cta-btn">
                <button class="note-btn" id="${index}" onClick="deleteNote(this.id)"><i class="fas fa-trash"></i>Delete</button>
                <button class="note-btn edit-btn" id="${index}" onClick="editNote(this.id)"><i class="fas fa-edit"></i>Edit</button>
            </div>
        </div>
        <hr />
        <h3 class="note-title">Title: ${element.title}</h3>
        <p class="note-text">${element.text}</p>
    </div>
    `;
  });

  const noteElm = document.querySelector('#notes');
  if (notesObj.length != 0) {
    noteElm.innerHTML = html;
  } else {
    noteElm.innerHTML = `<p>No notes added. Please add a note.</p>`;
  }
}

function deleteNote(index) {
  const confirmDel = confirm('Delete this note.');
  if (confirmDel) {
    getNotes();
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
  }
}

clear.addEventListener('click', () => {
  localStorage.clear();
  showNotes();
});

function editNote(index) {
  if (noteTitle.value !== '' || noteText.value !== '') {
    return alert('Please clear the form before editing.');
  }

  getNotes();
  noteTitle.value = notesObj[index].title;
  noteText.value = notesObj[index].text;

  notesObj.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notesObj));
  showNotes();
}

showNotes();
