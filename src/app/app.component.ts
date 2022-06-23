import { Component } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  setDoc,
  doc,
  CollectionReference,
} from '@angular/fire/firestore';
import { faker } from '@faker-js/faker';

import { filter, map, Observable, shareReplay, tap } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'not-30k-firebase';
}
