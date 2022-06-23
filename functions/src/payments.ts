import * as functions from 'firebase-functions';
import {firestore} from './config';
import {Payment, Vaki} from './models';

export const aggregatePayment = async (
    snapshot: functions.Change<functions.firestore.DocumentSnapshot>,
) => {
  const payment = snapshot.after.data() as Payment;
  const vakiRef = firestore.doc(`vakis/${payment.vakiKey}`);
  const vakiDoc = await vakiRef.get();
  const vaki = vakiDoc.data() as Vaki;
  const totalCollected = vaki.totalCollected + payment.value;
  const totalSupports = vaki.totalSupports + 1;
  const latestPayments = [payment, ...(vaki.latestPayments?.slice(0, 4) ?? [])];
  await vakiRef.update({totalCollected, totalSupports, latestPayments});
};

// DEPLOYABLE FUNCTIONS
export const aggregatePayments = functions.firestore
    .document('payments/{paymentId}')
    .onWrite(aggregatePayment);
