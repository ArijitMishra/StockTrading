import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppserviceService } from '../appservice.service';
import { Chart } from 'chart.js';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

    Name!: any;
    interval: any;
    Stock!: any;
    Stock1!: any;
    price!: any;
    title!:any;
    @ViewChild('inputStock') inputStock!: ElementRef;

    constructor(private appservice: AppserviceService, private route: ActivatedRoute,
        private router: Router) { }

    renderChart() {
    // alert("local :: "+localStorage.graph);
    localStorage.company=this.Stock;
     if(localStorage.graph=="undefined" && localStorage.count==0)
     {
        // alert("save");
        localStorage.graph=this.Stock;
        localStorage.prev=localStorage.graph;
     }
     else if (localStorage.count==1)
     {
       // alert("second :: "+localStorage.count);
        //alert("prev :: "+localStorage.prev);
        localStorage.graph=localStorage.prev;
        localStorage.count=0;
     }
     else
     {
        //alert("Both");
        //alert(localStorage.prev);
        localStorage.graph=this.Stock;
        localStorage.prev=localStorage.graph;
     }
     
        this.appservice.getCompanyName(localStorage.graph).subscribe((data: any) => {
            this.title=data.name;
            console.log(this.title);
            
            //alert(temp);

        });
       // console.log(this.Stock);
        
        this.appservice.getTimeSeries(localStorage.graph).subscribe((data: any) => {
            //console.log("dashboard");
            this.Stock1 = data["meta"]["symbol"];

            //console.log(data["values"].length);
           // console.log(data["values"][0]["high"]);
            for (let i = 0; i < data["values"].length; i++) {
                this.price = data["values"][i];
                this.values[i] = this.price["close"];
            }
            for (let i = 0; i < data["values"].length; i++) {
                this.y2 = data["values"][i]["datetime"];//.toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });
               // console.log(this.y2);
                this.res = this.y2.split(" ");
                this.res1=this.res[1].split(":");
                this.labels[i] = this.res1[0]+":"+this.res1[1];
                //this.labels[i]=this.y2;
            }
           // console.log(this.labels);
           // console.log(this.values);
            this.values.reverse();
            this.labels.reverse();
            this.BuildChart(this.labels, this.values);
           // this.title=temp;
            //alert("title :: "+this.title);
        });



    }
    //this.Stock1=this.Stock;
    refresh() {
        console.log("varsha");
        this.appservice.getRealTime(localStorage.graph).subscribe((data: any) => {
            console.log(data);
            //console.log("varsha");
            this.labels.push(data.time);
            console.log(this.labels);
            this.labels.shift();
            console.log(this.labels);
            this.values.push(data.price);
            console.log(this.values);
            this.values.shift();
            this.BuildChart(this.labels, this.values);
        });
        //this.BuildChart(this.labels, this.values, "Varsha");
    }






    ngOnInit() {

        if (localStorage.UserName === '') {
            this.router.navigate(['/login']);
          }
      //  alert(localStorage.UserName);
      
        this.Name = localStorage.UserName;
       // alert(localStorage.graph);
        if(localStorage.graph=="undefined")
        {
           // alert("Welcome to your profile!!");
            this.BuildChart(0,0);
        }
        else
        {
        this.renderChart();
        }

    }
    BuildChart(labels: any, values: any): any {
        var data = {
            labels: labels,
            datasets: [{
                // Name the series
                data: values,
                fill: false,
                lineTension: 0,
                backgroundColor: ['#172b4d',
                    '#172b4d',
                    '#172b4d',
                    '#172b4d',
                    '#172b4d',
                    '#172b4d',
                    '#172b4d',
                    '#172b4d',
                    '#172b4d',
                    '#172b4d',
                    '#172b4d',
                    '#172b4d',
                    '#172b4d',
                    '#172b4d',
                    '#172b4d',
                    '#172b4d',
                    '#172b4d',
                    '#172b4d',
                    '#172b4d',
                    '#172b4d',
                    '#172b4d',
                    '#172b4d',
                    '#172b4d',
                    '#172b4d',
                    '#172b4d',
                    '#172b4d',
                    '#172b4d',
                    '#172b4d',
                    '#172b4d',
                    '#172b4d'
                ],
            }],
        };
        const canvas = <HTMLCanvasElement>document.getElementById('myChart');
        const ctx = canvas.getContext('2d');
        //var ctx = document.getElementById("myChart")!.getContext('2d')!;
        var myChart = new Chart('myChart', {
            type: 'line',
            data: data,
            options: {
                responsive: true, // Instruct chart js to respond nicely.
                maintainAspectRatio: true, // Add to prevent default behaviour of full-width/height 
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Time'
                        },
                        gridLines: {
                            color: "#000000"
                        }

                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Price'
                        },
                        gridLines: {
                            color: "#000000"
                        }
                    }]
                },
            }
            //this.ref.detectChanges();
        })

        //return Chart;
    }
    //var price:any;
    labels: any = [];
    values: any = [];
    y2: any;
    res: any;
    res1:any;
    pay()
    {
        localStorage.company=this.Stock;
        //alert(localStorage.company);
        this.router.navigate(['payment/']);
    }
}
