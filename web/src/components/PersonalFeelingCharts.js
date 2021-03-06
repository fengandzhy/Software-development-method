import React, { Component } from 'react';
import { Chart } from 'primereact/chart';
import { FeelingService } from '../service/FeelingService';
import {Card} from 'primereact/card';

export class PersonalFeelingCharts extends Component {

    constructor() {
        super();
        this.state = {
            lineData: {
                // labels: [],
                datasets: []
            },
            // barData: {
            //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            //     datasets: [
            //         {
            //             label: 'My First dataset',
            //             backgroundColor: '#03A9F4',
            //             borderColor: '#03A9F4',
            //             data: [65, 59, 80, 81, 56, 55, 40]
            //         },
            //         {
            //             label: 'My Second dataset',
            //             backgroundColor: '#FFC107',
            //             borderColor: '#FFC107',
            //             data: [28, 48, 40, 19, 86, 27, 90]
            //         }
            //     ]
            // },
            // pieData: {
            //     labels: ['A','B','C'],
            //     datasets: [
            //         {
            //             data: [300, 50, 100],
            //             backgroundColor: [
            //                 "#FFC107",
            //                 "#03A9F4",
            //                 "#4CAF50"
            //             ],
            //             hoverBackgroundColor: [
            //                 "#FFE082",
            //                 "#81D4FA",
            //                 "#A5D6A7"
            //             ]
            //         }]
            // },
            // polarData: {
            //     datasets: [{
            //         data: [
            //             11,
            //             16,
            //             7,
            //             3,
            //             14
            //         ],
            //         backgroundColor: [
            //             "#FFC107",
            //             "#03A9F4",
            //             "#4CAF50",
            //             "#E91E63",
            //             "#9C27B0"
            //         ],
            //         label: 'My dataset'
            //     }],
            //     labels: [
            //         "Yellow",
            //         "Blue",
            //         "Green",
            //         "Pink",
            //         "Purple"
            //     ]
            // },
            // radarData: {
            //     labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
            //     datasets: [
            //         {
            //             label: 'My First dataset',
            //             backgroundColor: 'rgba(179,181,198,0.2)',
            //             borderColor: 'rgba(179,181,198,1)',
            //             pointBackgroundColor: 'rgba(179,181,198,1)',
            //             pointBorderColor: '#fff',
            //             pointHoverBackgroundColor: '#fff',
            //             pointHoverBorderColor: 'rgba(179,181,198,1)',
            //             data: [65, 59, 90, 81, 56, 55, 40]
            //         },
            //         {
            //             label: 'My Second dataset',
            //             backgroundColor: 'rgba(255,99,132,0.2)',
            //             borderColor: 'rgba(255,99,132,1)',
            //             pointBackgroundColor: 'rgba(255,99,132,1)',
            //             pointBorderColor: '#fff',
            //             pointHoverBackgroundColor: '#fff',
            //             pointHoverBorderColor: 'rgba(255,99,132,1)',
            //             data: [28, 48, 40, 19, 96, 27, 100]
            //         }
            //     ]
            // }
        };
        this.feelingSerice = new FeelingService();
        this.options = {
            showLines: true,
            scales: {
                yAxes: [{
                    ticks: {
                        min: 1,
                        max: 5,
                        stepSize: 1,
                        suggestedMin: 0.5,
                        suggestedMax: 5.5,
                        callback: this.feelingSerice.getHappyLevel
                    },
                    gridLines: { display: true }
                }],
                xAxes: [{
                    ticks: {
                        callback: (label, index, labels) => new Date(label).toLocaleString()
                    },
                    gridLines: { display: true }
                }]
            },

        };

    }

    componentDidMount() {


        this.feelingSerice.getIndividualFeelings().onSnapshot(snapShot => {

            let personalFeelings = [];

            snapShot.forEach(doc => personalFeelings.push(doc.data()));
            // console.log(personalFeelings);
            const lineData = {
                // labels: teamFeelings.map(teamFeeling => teamFeeling.time.toDate().toLocaleString())
                //     .filter((time, index, self) => self.indexOf(time) === index),
                datasets: this.feelingSerice.getPersonalChartDatasets(personalFeelings)
            };
            console.log(lineData);
            this.setState({ lineData });

        });

        // this.feelingSerice.getIndividualFeelings().onSnapshot(snapShot => {
        //     snapShot.forEach(doc => console.log(doc.data()));
        // });

    }

    render() {
        return (
            <Card>
                <div className="p-g p-fluid">
                    <div className="p-g-12 p-lg-12">
                        <div className="card">
                            <h1 className="centerText">Personal Feelings</h1>
                            <Chart type="scatter" data={this.state.lineData} options={this.options} />
                        </div>

                        {/* <div className="card">
                        <h1 className="centerText">Pie Chart</h1>
                        <Chart type="pie" data={this.state.pieData} height="150"/>
                    </div>
        
                    <div className="card">
                        <h1 className="centerText">Polar Area Chart</h1>
                        <Chart type="polarArea" data={this.state.polarData} height="150"/>
                    </div> */}
                    </div>
                    {/* <div className="p-g-12 p-lg-6">
                    <div className="card">
                        <h1 className="centerText">Bar Chart</h1>
                        <Chart type="bar" data={this.state.barData}/>
                    </div>

                    <div className="card">
                        <h1 className="centerText">Doughnut Chart</h1>
                        <Chart type="doughnut" data={this.state.pieData} height="150"/>
                    </div>

                    <div className="card">
                        <h1 className="centerText">Radar Chart</h1>
                        <Chart type="radar" data={this.state.radarData} height="150"/>
                    </div>
                </div> */}
                </div>
            </Card>
        )
    }
}
