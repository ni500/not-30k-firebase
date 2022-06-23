import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  doc,
  docData,
  Firestore,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { faker } from '@faker-js/faker';

import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { Payment, Vaki } from '../models';

@Component({
  selector: 'app-root',
  templateUrl: './vaki-view.component.html',
  styleUrls: ['./vaki-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VakiViewComponent {
  title = 'not-30k-firebase';
  paymentsCollection = collection(
    this.firestore,
    'payments',
  ) as CollectionReference<Payment>;
  vakisCollection = collection(
    this.firestore,
    'vakis',
  ) as CollectionReference<Vaki>;
  payments$: Observable<Payment[]>;
  vaki$: Observable<Vaki>;
  totalCollected$: Observable<number>;
  totalSupports$: Observable<number>;
  _vakiKey = new BehaviorSubject('');
  vakiKey$ = this._vakiKey.asObservable();

  constructor(
    readonly firestore: Firestore,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.vaki$ = this.activatedRoute.paramMap.pipe(
      map((params) => params.get('vakiKey')),
      tap((vakiKey) => this._vakiKey.next(`${vakiKey}`)),
      map((vakiKey) => doc<Vaki>(this.vakisCollection, `${vakiKey}`)),
      switchMap((vakiRef) => docData<Vaki>(vakiRef)),
    );

    this.payments$ = this.vakiKey$.pipe(
      map((vakiKey) =>
        query(this.paymentsCollection, where('vakiKey', '==', vakiKey)),
      ),
      switchMap((paymentsRef) => collectionData<Payment>(paymentsRef)),
      tap((payments) =>
        console.log(`total documentos leidos: ${payments.length}`),
      ),
    );

    this.totalCollected$ = this.payments$.pipe(
      map((payments) =>
        payments.reduce(
          (acc: number, payment: Payment) => acc + payment.value,
          0,
        ),
      ),
    );

    this.totalSupports$ = this.payments$.pipe(
      map((payments) => payments.length),
    );
  }

  makePayment() {
    const payment = this.randomPayment();
    const docRef = doc(this.firestore, `payments/${payment.uid}`);
    setDoc(docRef, payment);
  }

  randomPayment(): Payment {
    return {
      uid: Date.now().toString(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      value: Math.round(Math.random() * 10000) / 100,
      date: Date.now(),
      vakiKey: this._vakiKey.value,
    };
  }
}
