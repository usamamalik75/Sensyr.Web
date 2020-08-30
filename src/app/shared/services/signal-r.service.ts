import { Injectable, EventEmitter } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { environment } from '@env/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  alarmTableSubject = new Subject<any>();
  connection: any;

  constructor() {
    this.createConnection();
    this.startConnection();
    this.registerEvents();
    this.checkConnection();
  }

  private registerEvents(): void {
    this.hubConnection.on('sendToUser', (data: any) => {
      this.alarmTableSubject.next(data);
    });


    this.hubConnection.onclose(() => {
      setTimeout(function() {
        this.hubConnection.start()
          .done(() => {
            this.connectionEstablished.emit(true);
          })
          .fail((error: any) => {
            this.startingSubject.error(error);
          });
      }, 3000);
    });
  }


  private createConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.uri + 'NotificationHub/')
      .build();
  }


  public startConnection = () => {
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  // public addTransferChartDataListener = () => {
  //   this.hubConnection.on('transferchartdata', (data) => {
  //     // this.data = data;
  //     console.log(data);
  //   });
  // }

  // sendToUser() {
  //   console.log(this.hubConnection.state);
  //   this.hubConnection.invoke('sendToUser');
  // }

  checkConnection() {
    this.connection = setInterval(() => {
      if (!(this.hubConnection.state)) {
        this.disconnect();
        this.startConnection();
      }
    }, 10000);
  }



  public disconnect() {
    this.hubConnection.stop();
  }
}
