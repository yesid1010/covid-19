import { Component } from '@angular/core';
import { CovidService } from './services/covid.service';
import { FirebaseService } from './services/firebase.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private fcm: FirebaseService,
    public service:CovidService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
     // this.statusBar.styleDefault();
     // this.fcm.ObtenerToken()
      this.service.getAllCountries()
      this.splashScreen.hide();
    });
  }

}
