import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PeticionService {
  requestOption: any = {};

  urlHost: string = ' ';
  urlHostTest: string = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  //Función para obtener los datos de la API

  Post(url: string, payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const requestOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        withCredentials: true,
      };

      this.http
        .post(url, payload, requestOptions)
        .toPromise()
        .then((res: any) => {
          console.log('Respuesta del servidor:', res);
          resolve(res);
        })
        .catch((error: any) => {
          console.error('Error en la petición:', error);
          reject(error);
        });
    });
  }

  Get(url: string) {
    let promise = new Promise((resolve, reject) => {
      this.requestOption = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        whithCredentials: true,
      };

      this.http
        .get(url, this.requestOption)
        .toPromise()
        .then((res: any) => {
          console.log(res);
          resolve(res);
        })
        .catch((error: any) => {
          console.log(error);
          reject(error);
        });
    });
    return promise;
  }

  Put(url: string, payload: any) {
    let promise = new Promise((resolve, reject) => {
      this.requestOption = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        whithCredentials: true,
      };

      this.http
        .put(url, payload, this.requestOption)
        .toPromise()
        .then((res: any) => {
          console.log(res);
          resolve(res);
        })
        .catch((error: any) => {
          console.log(error);
          reject(error);
        });
    });
    return promise;
  }

  Delete(url: string) {
    let promise = new Promise((resolve, reject) => {
      this.requestOption = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        whithCredentials: true,
      };

      this.http
        .delete(url, this.requestOption)
        .toPromise()
        .then((res: any) => {
          console.log(res);
          resolve(res);
        })
        .catch((error: any) => {
          console.log(error);
          reject(error);
        });
    });
    return promise;
  }
}
