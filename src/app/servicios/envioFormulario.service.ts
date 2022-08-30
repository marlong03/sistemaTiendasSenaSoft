import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class envioFormularioService {
  postId:String;
    constructor(private http: HttpClient) {
   }
   
   postFormulario(data:any){
    this.http
      .post<any>('https://formsubmit.co/ajax/marlongyes@gmail.com', data)
      .subscribe((data) => {
        console.log(data)
      });
  }
}

