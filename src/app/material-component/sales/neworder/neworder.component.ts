import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { NeworderService } from '../neworder.service';
import {Observable} from 'rxjs';
import {startWith, map, pluck} from 'rxjs/operators';
import * as _ from 'underscore/underscore-min.js';

interface Animal {
  name: string;
  sound: string;
}

@Component({
  selector: 'app-neworder',
  templateUrl: './neworder.component.html',
  styleUrls: ['./neworder.component.css']
})
export class NeworderComponent implements OnInit {
  customerControl = new FormControl('', Validators.required);
  salesmanControl = new FormControl('', Validators.required);

  imageUrl: string = "assets/images/default-image.png";
  fileToUpload: File = null;

  ledgerid: string;
  customername: string;
  salesmanid: string;

  customers: Customer[];
  salesman: Customer[];

  customernames: string[]= [];
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  
  salesmannames: string[]= [];
  salesmanControl1 = new FormControl();
  salesmanfilteredOptions: Observable<string[]>;
  

  constructor(private newOrderService: NeworderService) { }

  ngOnInit(): void {
    this.loadCustomerAndSalesman();

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    // console.log('filteredOptions : ', this.filteredOptions);  

    // this.salesmanfilteredOptions = this.salesmanControl1.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => this._salesmanfilter(value))
    //   );
    //   console.log('salesmanfilteredOptions : ', this.salesmanfilteredOptions);  
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.customernames.filter(option => option.toLowerCase().includes(filterValue));
  }

  // private _salesmanfilter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //   return this.salesmannames.filter(option => option.toLowerCase().includes(filterValue));
  // }

  loadCustomerAndSalesman(){
    this.newOrderService.getCustomerAndSalesman(101)
    .subscribe(data =>{
      var result = data as any;
      result = data;      
      this.customers = result.respdata.Customers;
      this.customernames = _.pluck(this.customers, 'name');

      this.salesman = result.respdata.Salesman;
      // console.log('salesmanlist : ', this.salesman);
      // this.salesmannames = _.pluck(this.salesman, 'name');
      // console.log('salesmannames : ', this.salesmannames);
    });
  }
 
  selectedcustomer(event) {
    this.ledgerid = JSON.parse(_.pluck(_.where(this.customers, { 'name': event.option.value }), 'id'));
    this.customername = event.option.value;
    console.log('customer ledgerid: ', this.ledgerid);
    console.log('customer name: ', event.option.value);
  }

  // selectedsalesman(event) {
  //   this.salesmanid = JSON.parse(_.pluck(_.where(this.salesman, { 'name': event.option.value }), 'id'));
  //   console.log('salesmanid: ', this.salesmanid);
  // }

  handleFileInput(file: FileList){
    this.fileToUpload = file.item(0);

    //show image preview
    var reader = new FileReader();
    reader.onload = (event: any) =>{
      this. imageUrl = event.target.result;
    }

    reader.readAsDataURL(this.fileToUpload);
    console.log('file: ', this.imageUrl);
  }

  OnSubmit(Caption, Image){
    this.newOrderService.postFile(Caption.value, this.fileToUpload, this.ledgerid, this.customername, this.salesmanid).subscribe(res =>{
      console.log('done');
      alert('Neworder updated');
      this.customername='';
      this.salesmanid = '';
      Caption.value = null;
      Image.value = null;
      this.imageUrl = "/assets/images/default-image.png";
    });
  }

  customerSelection(customer){
    console.log(customer);
    this.ledgerid = customer.value['id'];
    this.customername = customer.value['name'];
    console.log('id: ',this.ledgerid);
    console.log('name: ',this.customername);
    
  }

  salesmanSelection(value){
    console.log(value);
    this.salesmanid = value;
  }
}

interface Customer {
  id: number;
  name: string;
}