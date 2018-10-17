import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { FeelingService } from '../service/FeelingService';
import { Growl } from 'primereact/growl';

export class Notification extends Component {

    constructor() {
        super();
        this.state = {
            clients: []
        };
        this.feelingService = new FeelingService();
        this.actionTemplate = this.actionTemplate.bind(this);
        this.notify = this.notify.bind(this);
        

    }

    notify(token) {

        console.log(token);
        this.feelingService.notify(token)
            .then(
                data => this.growl.show({severity: 'success', summary: 'Notify sent', detail: 'Message has already sent to client'})
                )
                .catch(errors => this.growl.show({severity: 'error', summary: 'Notify failed', detail: 'There is something wrong'}))

    }
    actionTemplate(rowData, column) {
        return (
            <div>
                <Button type="button" label="Notify" className="p-button-success" onClick={this.notify.bind(this, rowData.token)}></Button>
            </div>
        );
    }



    componentDidMount() {

        const clients = [];
        this.feelingService.getClients()
            .then(snapShot => {
                snapShot.forEach(doc => clients.push(doc.data()));
                this.setState({ clients });
                console.log(this.state);
            });
    }

    render() {


        const header = (<div className="p-clearfix" style={{ 'lineHeight': '1.87em' }}>List of Clients</div>);

        return (
            
            <Card>
                <Growl ref={(el) => this.growl = el} />
                <DataTable value={this.state.clients} header={header} paginator={true} rows={10}>
                    <Column field="client" header="Client" style={{ textAlign: 'center', width: '15em' }} />
                    <Column field="token" header="Token" />
                    <Column body={this.actionTemplate} style={{ textAlign: 'center', width: '8em' }} header="Notify" />
                </DataTable>
            </Card>
        );
    }
}