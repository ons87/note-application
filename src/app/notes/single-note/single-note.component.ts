import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Note } from '../model/note';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.css']
})
export class SingleNoteComponent implements OnInit {

  @Input() note: Note;
  @Output() noteDeleted : EventEmitter<Note> = new EventEmitter<Note>();
  @Output() noteUpdated: EventEmitter<Note> = new EventEmitter<Note>();
  visible: boolean = false;
  @Output() open: EventEmitter<any> = new EventEmitter<any>();
  @Output() close: EventEmitter<any> = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
  }

  deleteNote(){
     this.noteDeleted.emit(this.note);
  }

  updateNote(){
    this.noteUpdated.emit(this.note);
  }

  toggle() {
    this.visible = !this.visible;
    if (this.visible) {
      this.open.emit(null);
    } else {
      this.close.emit(null);
    }
  }

}
