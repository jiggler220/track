import { Component, OnInit } from "@angular/core";
import { Chart } from 'chart.js';

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {
  public canvas : any;
  public ctx: any;
  public datasets: any;
  public data: any;
  public myChartData: any;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;

  constructor() {}

  ngOnInit() {

    const MONTHS = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
    ];
    const data = {
      labels: MONTHS,
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    const config = {
      type: 'line',
      data: data,
    };

    var gradientChartOptionsConfigurationWithTooltipBlue: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#2380f7"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#2380f7"
          }
        }]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipPurple: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(225,78,202,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipRed: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(233,32,16,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipOrange: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 50,
            suggestedMax: 110,
            padding: 20,
            fontColor: "#ff8a76"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(220,53,69,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#ff8a76"
          }
        }]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipGreen: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 50,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(0,242,195,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }]
      }
    };


    var gradientBarChartConfiguration: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 120,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }],

        xAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }]
      }
    };

    this.canvas = document.getElementById("chartLineRed");
    this.ctx = this.canvas.getContext("2d");

    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
    gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
    gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors

    var myChart = new Chart(this.ctx, {
      type: 'line',
      data: data,
      options: gradientChartOptionsConfigurationWithTooltipRed
    });


    this.canvas = document.getElementById("chartLineGreen");
    this.ctx = this.canvas.getContext("2d");


    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
    gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)'); //green colors
    gradientStroke.addColorStop(0, 'rgba(66,134,121,0)'); //green colors

    myChart = new Chart(this.ctx, {
      type: 'line',
      data: data,
      options: gradientChartOptionsConfigurationWithTooltipGreen

    });



    var chart_labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    this.datasets = [
      [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
      [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
      [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
    ];
    this.data = this.datasets[0];



    this.canvas = document.getElementById("chartBig1");
    this.ctx = this.canvas.getContext("2d");

    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
    gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
    gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors




    this.canvas = document.getElementById("CountryChart");
    this.ctx  = this.canvas.getContext("2d");
    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
    gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
    gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors

  }
  public updateOptions() {
    this.myChartData.data.datasets[0].data = this.data;
    this.myChartData.update();
  }
}
