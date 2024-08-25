import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Note } from './note.model'; // Adjust the path as needed

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes: Note[] = new Array<Note>();

  constructor() { }

  getAll(): Note[] {  // Ensure this method returns the correct type
    return this.notes;
  }
  get(id: number): Observable<Note> { // Change return type to Observable<Note>
    const note = this.notes[id];
    return of(note); // Wrap the note in an observable
  }
  
  getId(note: Note) {
    return this.notes.indexOf(note);
  }
  add(note: Note){
    let newLength = this.notes.push(note);
    let index = newLength - 1;
    return index;
  }

  update(id: number, title: string, body: string) {
    let note = this.notes[id];
    note.title = title;
    note.body = body;
  }

  delete(id: number) {
    this.notes.splice(id, 1);
  }
}
