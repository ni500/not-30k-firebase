import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VakiViewComponent } from './vaki-view/vaki-view.component';
import { VakisListComponent } from './vakis-list/vakis-list.component';

@NgModule({
  declarations: [AppComponent, VakiViewComponent, VakisListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => {
      const firestore = getFirestore();
      return firestore;
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
