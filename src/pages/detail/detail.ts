import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Note } from '../../business/note';
import { NotesProvider } from '../../providers/notes/notes';
import { HomePage } from "../home/home"
import { AlertController } from 'ionic-angular';
import { LoadingController} from 'ionic-angular'

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  public note = new Note(0, "", "")
  public id=0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public notesProvider: NotesProvider, public alertController:AlertController, public loadCtrl: LoadingController) {
    this.id= navParams.get('id')
    if(this.id!=0){
        let loadDetail=this.loadCtrl.create({content: 'Please wait...'})
        loadDetail.present()
        this.notesProvider.getNoteById(this.id).subscribe(data=>{
          this.note=data
          loadDetail.dismiss()
        })
    }
  }

  public actionNote(){
    let resultado:String;
    if (this.id==0){
      this.note.id = Date.now()
      resultado =this.notesProvider.createNote(this.note)
    }
    else{
      resultado=this.notesProvider.editNote(this.note);
    }
    this.showAlert(resultado)
    this.navCtrl.pop()
  }

  public deleteNote(){
    console.log(this.notesProvider)
    let data=new Note(this.note.id, this.note.title, this.note.description)
    this.notesProvider.deleteNote(data).then(()=>{
      this.showAlert("nota eliminada correctamente")
      this.navCtrl.pop()
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  public showAlert(message){
    let alert=this.alertController.create({title: "Mensaje", subTitle:message, buttons:['OK']})
    alert.present()
  }
}
