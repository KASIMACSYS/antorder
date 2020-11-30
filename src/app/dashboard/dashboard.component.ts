import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist';
declare var require: any;

const data: any = require('./data.json');

export interface Chart {
	type: ChartType;
	data: Chartist.IChartistData;
	options?: any;
	responsiveOptions?: any;
	events?: ChartEvent;
}

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
	weblink: string;

	constructor(private router: Router){
		let tempconObj = {serverIP : '', webLink : '', companyID: ''};
		tempconObj = JSON.parse( localStorage.getItem('conObj')) || tempconObj; 
		this.weblink = tempconObj.webLink;
	}
	ngAfterViewInit() {}

	Submit(Caption){
		localStorage.removeItem('conObj');
		let conObj = {serverIP : '', webLink : '', companyID: ''};
		conObj.serverIP= Caption.value;
		conObj.webLink= 'http://'+Caption.value+'/APINewOrder/api';
		conObj.companyID= ""; //this.companyid;
		localStorage.removeItem('conObj');
		localStorage.setItem('conObj',JSON.stringify(conObj));   
		console.log('ip: ', JSON.parse( localStorage.getItem('conObj')));
		this.router.navigate(['/neworder']);
	}
	// Barchart
	barChart1: Chart = {
		type: 'Bar',
		data: data['Bar'],
		options: {
			seriesBarDistance: 15,
			high: 12,

			axisX: {
				showGrid: false,
				offset: 20
			},
			axisY: {
				showGrid: true,
				offset: 40
			},
			height: 360
		},

		responsiveOptions: [
			[
				'screen and (min-width: 640px)',
				{
					axisX: {
						labelInterpolationFnc: function(
							value: number,
							index: number
						): string {
							return index % 1 === 0 ? `${value}` : null;
						}
					}
				}
			]
		]
	};

	// This is for the donute chart
	donuteChart1: Chart = {
		type: 'Pie',
		data: data['Pie'],
		options: {
			donut: true,
			height: 260,
			showLabel: false,
			donutWidth: 20
		}
	};
}
