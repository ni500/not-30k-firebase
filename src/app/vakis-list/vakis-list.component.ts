import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  doc,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { faker } from '@faker-js/faker/locale/es';
import { Observable } from 'rxjs';
import { Vaki } from '../models';

@Component({
  selector: 'app-vakis-list',
  templateUrl: './vakis-list.component.html',
  styleUrls: ['./vakis-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VakisListComponent {
  vakisCollection = collection(
    this.firestore,
    'vakis'
  ) as CollectionReference<Vaki>;
  vakis$: Observable<Vaki[]>;

  constructor(readonly firestore: Firestore) {
    this.vakis$ = collectionData<Vaki>(this.vakisCollection);
  }

  createVaki() {
    const vaki = this.randomVaki();
    const docRef = doc(this.firestore, `vakis/${vaki.uid}`);
    setDoc(docRef, vaki);
  }

  randomVaki(): Vaki {
    return {
      uid: Date.now().toString(),
      name: `Una Vaki para ${faker.company.companyName()}`,
      totalCollected: 0,
      totalSupports: 0,
      latestPayments: [],
    };
  }
}
