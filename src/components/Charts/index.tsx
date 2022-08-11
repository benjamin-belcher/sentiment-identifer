import { IChartsProps } from '../../interfaces/props/IChartsProps';
import { Chart as ChartJS, registerables } from 'chart.js';
import { 
    Line,
    Bar,
    Chart,
    Pie, 
    Doughnut,
    PolarArea,
    Radar,
    Scatter,
    Bubble
} from 'react-chartjs-2'
import { ReturnChartType } from '../../util/ReturnChartType';
ChartJS.register(...registerables);

export default function Charts(props: IChartsProps) {
  
    return(
        <Chart
            type={ReturnChartType(props.chartType)}
            datasetIdKey='id'
            height="200px"
            options={{maintainAspectRatio: false}}
            data={{
            labels: props.labels,
            datasets: [{
                label: props.chartHeader, 
                data:props.data,
                backgroundColor: props.chartBackgroundColor
            }],
            }}
        />
    )
}