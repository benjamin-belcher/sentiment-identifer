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
import { useRef } from 'react';
ChartJS.register(...registerables);

export default function Charts(props: IChartsProps) {
  
    return(
        <Chart
            style={{backgroundColor: '#ffffff'}}
            type={ReturnChartType(props.chartType)}
            ref={props.cref}
            datasetIdKey='id'
            height="400px"
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