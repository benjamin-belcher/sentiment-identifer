export function ReturnChartType(chartType: string){
    switch(chartType){
        case "Line":
            return "line";
        case "Bar":
            return "bar";
        case "Pie":
            return "pie";
        case "Doughnut":
            return "doughnut";
        case "PolarArea":
            return "polarArea";
        case "Radar":
            return "radar";
        case "Scatter":
            return "scatter";
        case "Bubble":
            return "bubble";
        default: 
            return "line";
        
    }
}