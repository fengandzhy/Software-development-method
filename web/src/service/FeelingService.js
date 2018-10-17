import firebase from 'firebase';
import axios from 'axios';

const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};

export class FeelingService {

    constructor() {
        // Initialize firestore
        if (!firebase.apps.length)
            firebase.initializeApp(config);
        this.db = firebase.firestore();
        this.db.settings({
            timestampsInSnapshots: true
        });
    }


    getTeamFeelings() {

        return this.db.collection('teamfeelings').orderBy('time');
    }

    getIndividualFeelings() {

        return this.db.collection('individualfeelings').orderBy('time');
    }

    getTeamChartDatasets(data) {
        if (!data)
            return null;
        // Get all teams from input data
        const teams = data.map(teamfeeling => teamfeeling.team)
            .filter((team, index, self) => self.indexOf(team) === index);
        return teams.map(
            team => {
                const color = this.getRandowmColor();
                return {
                    label: team,
                    data: data.filter(teamfeeling => teamfeeling.team == team)
                        .map(teamfeeling => ({
                            x: teamfeeling.time.toDate(),
                            y: teamfeeling.feeling
                        })
                        ),
                    fill: false,
                    borderColor: color,
                    backgroundColor: color
                }
            }
        );
    }

    getPersonalChartDatasets(data) {
        if (!data)
            return null;
        // Get all teams from input data
        const persons = data.map(teamfeeling => teamfeeling.person)
            .filter((person, index, self) => self.indexOf(person) === index);
        return persons.map(
            person => {
                const color = this.getRandowmColor();
                return {
                    label: person,
                    data: data.filter(personfeeling => personfeeling.person == person)
                        .map(personfeeling => ({
                            x: personfeeling.time.toDate(),
                            y: personfeeling.feeling
                        })
                        ),
                    fill: false,
                    borderColor: color,
                    backgroundColor: color
                }
            }
        );
    }

    getRandowmColor() {
        return '#' + (Math.random().toString(16) + "000000").substring(2, 8);
    }

    getHappyLevel(label, index, labels) {
        switch (label) {

            case 1:
                return 'Not happy at all';
            case 2:
                return 'Not so happy';
            case 3:
                return 'Neutral';
            case 4:
                return 'Happy';
            case 5:
                return 'Very Happy';
            default:
                return label;
        }
    }

    getClients() {

        return this.db.collection('devices').get();
    }

    notify(token) {
        return axios.post("https://us-central1-howisit-83fe1.cloudfunctions.net/notify",{token});
    }

}