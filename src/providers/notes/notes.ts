import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from '../../business/note';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the NotesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotesProvider {

  notes=[new Note(1,"nota 1", "description 1"), new Note(2, "nota 2", "description 2")]

  constructor(public http: HttpClient, public afDB: AngularFireDatabase) {
    console.log('Hello NotesProvider Provider');
  }

  public getNotes(){
    //return this.afDB.list('note/')
    return this.afDB.list('note').valueChanges();
  }

  public getNoteById(id){
    return this.afDB.object('note/'+id).valueChanges()
  }

  public createNote(note: Note){
    this.afDB.database.ref('note/'+note.id).set(note);
    //this.notes.push(note);
    return "Nota agregada exitosamente"
  }

  public editNote(note:Note){
    this.afDB.object('note/'+note.id).update(note)
    /**
    for(let i=0; i< this.notes.length; i++){
      let oldNote = this.notes[i]
      if(oldNote.id==note.id){
        this.notes[i]=note;
        return "Nota Modificada exitosamente"
      }
    }
    */
    return "Nota modificada"
  }

  public deleteNote(note:Note){
    /**
    for(let i=0; i<this.notes.length; i++){
      if(note.id==this.notes[i].id){
        this.notes.splice(i, 1)
        return "Nota eliminada satisfactoriamente"
      }
    }
    **/
    //this.afDB.object('note/'+note.id).remove()
    return this.afDB.object('note/'+note.id).remove()
    //return "Nota eliminada"
  }

}
