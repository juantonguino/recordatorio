import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Note } from '../../business/note';
import { NotesProvider } from '../../providers/notes/notes';
import { DetailPage } from '../detail/detail'
import { Observable } from 'rxjs/Observable'
import { LoadingController} from 'ionic-angular'
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public notes:Note[]

  constructor(public navCtrl: NavController, public notesProvider:NotesProvider, public loadCtrl:LoadingController, public alertController: AlertController) {
    console.log(this.loadCtrl)
    let loadingList=this.loadCtrl.create({content: 'Please wait...'})
    loadingList.present()
    notesProvider.getNotes().subscribe(response =>{
      this.notes=response
      loadingList.dismiss()
    })
  }

  public itemSelected(note){
    this.navCtrl.push(DetailPage, {id : note.id})
  }

  public createNote(){
    this.navCtrl.push(DetailPage, {id : 0})
  }

  public deleteItem(note){
    this.notesProvider.deleteNote(note)
    this.showAlert("nota eliminada")
  }

  public showAlert(message){
    let alert=this.alertController.create({title: "Mensaje", subTitle:message, buttons:['OK']})
    alert.present()
  }

}
