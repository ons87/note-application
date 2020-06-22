import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { NoteBook } from './model/note-book';
import { Note } from './model/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notebooks: NoteBook[] = [];
  notes: Note[]= [];
  selectedNotebook: NoteBook;
  searchText:string;


  constructor(private notebookService: ApiServiceService) { }

  ngOnInit(): void {
    this.getAllNotebooks();
    this.getAllNotes();
  }

  getAllNotebooks() {
    this.notebookService.getAllNotebooks().subscribe(
      (res) => { this.notebooks = res },
      (error) => { alert("An error happened") }
    );
  }

  createNotebook() {
    let newNotebook = {
      id: null,
      name: "myNewNotebook",
      nbOfNotes: 0
    }

    this.notebookService.addNotebook(newNotebook).subscribe(
      (res) => {
        newNotebook.id = res.id;
        this.notebooks.push(newNotebook);
      },
      (error) => alert("error when adding notebook")
    );
  }

  selectAllNotes() { 
    this.selectedNotebook = null;
    this.getAllNotes();
  }

  selectNotebook(notebook: NoteBook) { 
    this.selectedNotebook = notebook;
    this.getNotesByNotebookId(this.selectedNotebook.id);
   }

  updateNotebook(notebook) {
    this.notebookService.addNotebook(notebook).subscribe(
      (res) => { },
      (error) => alert("error when update"));
  }

  deleteNotebook(notebook: NoteBook) {
    if (confirm("are you sure to delete this notebook?")) {
      this.notebookService.deleteNotebook(notebook.id).subscribe(
        (res) => {
          let index = this.notebooks.indexOf(notebook);
          this.notebooks.splice(index, 1);
        },
        (error) => { alert("error when delete") }
      )
    }
  }

  getAllNotes(){
    this.notebookService.getAllNotes().subscribe(
      (res)=>{this.notes=res},
      (error)=>{alert("error when getting all notes")}
    )
  }

  getNotesByNotebookId(id: string){
    this.notebookService.getNotesByNotebook(id).subscribe(
      (res)=>{this.notes=res},
      (error)=>{alert("error when getting notes")}
    )
  }

  createNote(notebookId :string) {
    let newNote:Note = {
      id: null,
      title: "New Note",
      text: "Write some text in here",
      lastModifiedOn: null,
      notebookId: notebookId
    };

    this.notebookService.addNote(newNote).subscribe(
      res => {
        newNote.id = res.id;
        this.notes.push(newNote);
      },
      err => {alert("An error occurred while saving the note");}
    );
  }

  deleteNote(note: Note){
    if (confirm("are you sure to delete this note?")) {
    this.notebookService.deleteNote(note.id).subscribe(
      (res)=> {
        let index = this.notes.indexOf(note);
        this.notes.splice(index, 1);
      },
      (error)=>{alert("error when delete note")}
    )
  }
}

updateNote(note:Note){
  this.notebookService.addNote(note).subscribe(
    (res) => { },
    (error) => alert("error when update note")
  );
}
opened(){
  alert("opened");
}

}
