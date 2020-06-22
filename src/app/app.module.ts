import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NotesComponent } from './notes/notes.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { Routes,RouterModule} from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { SingleNoteComponent } from './notes/single-note/single-note.component';
import { NoteTextFiltePipe } from './services/note-text-filte.pipe';


const routes : Routes = [
{path: 'notes', component: NotesComponent},
{path: 'feedback', component: FeedbackComponent},
{path: '', component:NotesComponent, pathMatch: 'full'},
{path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NotesComponent,
    FeedbackComponent,
    NotFoundComponent,
    SingleNoteComponent,
    NoteTextFiltePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
