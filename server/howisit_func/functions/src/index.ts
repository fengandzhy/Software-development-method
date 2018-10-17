import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
import axios from 'axios';
import * as moment from 'moment';

const corsHandler = cors({ origin: true });
import { v4 as uuidv4 } from 'uuid';





// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript



admin.initializeApp(functions.config().firebase);

function sendMessage(token: string, msgId?: string) {

    const url = 'https://fcm.googleapis.com/fcm/send';
    const headers = {
        'Content-Type': 'application/json',
        Authorization: 'key=AIzaSyDIuYJxzRH4KknUMfVQFHqYs_iRqKp0des'
    };


    const message = {
        to: token,
        data: {
            title: 'Reminder',
            message: "It's the schedule time into your happiness",
            'force-start': 1,
            'visibility': 1,
            'id': msgId || uuidv4(),
            actions: [
                {
                    //icon: 'emailGuests',
                    title: '5 mins later',
                    callback: 'delay5',
                    foreground: false
                },
                {
                    //icon: snooze,
                    title: '10 mins later',
                    callback: 'delay10',
                    foreground: false
                },
                {
                    //icon: 'emailGuests',
                    title: '20 mins later',
                    callback: 'delay20',
                    foreground: false
                },
            ]
        }
    }
    return axios.post(url, message, { headers });
}

export const notify = functions.https.onRequest((request, response) => {

    corsHandler(request, response, () => ({}));

    // Get token from request body
    const token = request.body.token;

    if (!token) {
        response.sendStatus(400);
    }

    sendMessage(token)
        // admin.messaging().sendToDevice(token, message)
        .then((resp) => {
            // Resp is a message ID string.
            // console.log('Successfully sent message:', resp);
            response.status(200).json(resp.data);

        })
        .catch((error) => {
            // console.log('Error sending message:', error);
            response.status(500).send(error);
        });

});

export const sendScheduledNotification = functions.https.onRequest((request, response) => {


    corsHandler(request, response, () => ({}));

    const db = admin.firestore();
    try {
        db.settings({ timestampsInSnapshots: true });
    } catch (e) { }

    db.collection('tasks').where('status', '==', 0).where('actualTime', '<=', admin.firestore.Timestamp.now()).orderBy('actualTime').get()
        .then(snapShot => {
            console.log('start send messages ' + snapShot.size);
            snapShot.forEach(doc => {
                console.log('Message id is:' + doc.data().id);
                // Not postponed more than 1 hour
                console.log(doc.data().actualTime.toDate() - doc.data().scheduledTime.toDate());
                if (doc.data().actualTime.toDate() - doc.data().scheduledTime.toDate() <= 3600000) {
                    // Send the scheduled notification
                    sendMessage(doc.data().token, doc.data().id).then(
                        // Update sent time
                        () => {
                            doc.ref.update({ sentTime: admin.firestore.Timestamp.now(), status: 1 }).then(
                                () => {
                                    // console.log('Message send: ' + doc.data().id);
                                    // response.sendStatus(200);
                                }
                            ).catch(
                                // () => response.sendStatus(400)
                            );

                        }
                    ).catch(
                        // () => response.sendStatus(400)
                    );
                } else {
                    // response.sendStatus(201);
                    doc.ref.update({ status: 2 }).then(
                        () => console.log('Canceled a message: ' + doc.data().id)
                    ).catch();
                }
            });
        }).catch(
            // () => response.sendStatus(400)
        );
    response.sendStatus(200);
});


exports.updateTasks = functions.firestore.document('schedules/schedule')
    .onUpdate((change, context) => {

        console.log('Start update tasks ...');

        const schedule = change.after.data();
        const db = admin.firestore();
        try {
            db.settings({ timestampsInSnapshots: true });
        } catch (e) { }
        const startTime = moment(schedule.startTime.toDate());
        const endTime = moment(schedule.endTime.toDate());
        const interval = schedule.interval;
        // const tasks = [];
        // const tokens = [];


        console.log('schedule.isActive: ' + schedule.isActive);
        // Turn on notification
        if (schedule.isActive) {

            const batch = db.batch();
            let docRef;
            let task;

            return db.collection('devices').get()
                .then(snapShot => {
                    snapShot.forEach(doc => {

                        // Generate tasks
                        for (let i = startTime; i < endTime; i = i.add(interval, 'minutes')) {

                            task = {
                                id: uuidv4(),
                                status: 0,
                                token: doc.data().token,
                                scheduledTime: i.toDate(),
                                actualTime: i.toDate()
                            };
                            docRef = db.collection("tasks").doc(task.id);
                            batch.set(docRef, task);
                        }
                    });
                    batch.commit().then().catch();
                });
        }
        else {
            //Turn off notification
            console.log('Delete tasks!');
            return db.collection('tasks').get().then(
                snapshot => {
                    // If there are records
                    if (snapshot.size > 0) {
                        // Delete documents in a batch
                        const batch = db.batch();
                        snapshot.docs.forEach((doc) => {
                            batch.delete(doc.ref);
                        });

                        batch.commit().then().catch();
                    }


                }
            );
        }
    });
