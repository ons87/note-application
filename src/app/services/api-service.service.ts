import { Injectable } from '@angular/core';
import { NoteBook } from '../notes/model/note-book';
import { Observable } from 'rxjs';
import { FeedbackViewModel } from '../feedback/feedback.component';
import { Note } from '../notes/model/note';
import {HttpClient} from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private BASE_URL: string = window["cfgApiBaseUrl"]+"/api";
  private NOTEBOOK_URL = `${this.BASE_URL}/notebooks/all`;
  private FEEDBACK_URL = `${this.BASE_URL}/feedback`;
  private ADD_NOTEBOOK_URL = `${this.BASE_URL}/notebooks/`;
  private NOTE_URL = `${this.BASE_URL}/notes/all`;
  private NOTE_URL_BY_ID = `${this.BASE_URL}/notes/byNotebook/`
  private DELETE_NOTE_URL = `${this.BASE_URL}/notes/`
  private ADD_NOTE_URL = `${this.BASE_URL}/notes/`;



  constructor(private http: HttpClient) { }

  getAllNotebooks(): Observable<NoteBook[]> {
    return this.http.get<NoteBook[]>(this.NOTEBOOK_URL);
  }

  getAllNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.NOTE_URL);
  }

  getNotesByNotebook(id: string): Observable<Note[]> {
    return this.http.get<Note[]>(this.NOTE_URL_BY_ID + id);
  }

  sendFeedback(feedback: FeedbackViewModel): Observable<any> {
    const customHeaders = new Headers({ Authorization: "Bearer " + localStorage.getItem("token")});
    const requestOptions = {
      headers: customHeaders
    };

    return this.http.post(this.FEEDBACK_URL, feedback);
  }

  addNotebook(notebook: NoteBook): Observable<NoteBook> {
    return this.http.post<NoteBook>(this.ADD_NOTEBOOK_URL, notebook);
  }

  deleteNotebook(id: string) {
    return this.http.delete<NoteBook>(this.ADD_NOTEBOOK_URL + id);
  }

  deleteNote(id: string) {
    return this.http.delete<Note>(this.DELETE_NOTE_URL + id);
  }

  addNote(note: Note) {
    return this.http.post<Note>(this.ADD_NOTE_URL, note);
  }
}
