import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';

// const baseUrl = `${environment.apiUrl}/quotation`;

@Injectable({
  providedIn: 'root'
})
export class NeworderService {
  baseUrl: string;

  constructor(private http: HttpClient) { 
    // let tempconObj = {serverIP : '', webLink : '', companyID: ''};
    // tempconObj = JSON.parse( localStorage.getItem('conObj')) || tempconObj;  
    // console.log('tempconObj: ', tempconObj);
    // this.baseUrl = tempconObj.webLink + '/quotation';
    // console.log('baseUrl: ', this.baseUrl);
  }

  getCustomerAndSalesman(cid: number){
    let tempconObj = {serverIP : '', webLink : '', companyID: ''};
    tempconObj = JSON.parse( localStorage.getItem('conObj')) || tempconObj;  
    console.log('tempconObj: ', tempconObj);
    this.baseUrl = tempconObj.webLink + '/quotation';
    console.log('baseUrl: ', this.baseUrl);
    const query = `cid=${cid}`;
    console.log('getCustomer: ', this.baseUrl + '/getcustomersalesman?' + query);
    return this.http.get(this.baseUrl + '/getcustomersalesman?' + query);
    // .catch(this.handleError);
  }

  postFile(caption: string, fileToUpload: File, customerLedger: string, customername: string, salesmanid: string){
    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
    formData.append('ImageCaption', caption);
    formData.append('CustomerLedger', customerLedger);
    formData.append('CustomerName', customername);
    formData.append('SalesmanID', salesmanid);
    return this.http.post(this.baseUrl+'/neworder', formData);
  }

  private handleError(error: Response){
    // if (error.status === 400)
    //     return Observable.throw(new BadInput(error.json()));

    // if (error.status === 404)
    // return Observable.throw (new NotFoundError());

    // return Observable.throw(new AppError(error));
  }
}
