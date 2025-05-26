// src/components/chart/DoughnutChart.jsx
import { Doughnut } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';


// Chart.js 요소 등록 (반드시 필요함)
ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * 도넛 차트 컴포넌트
 * @param {Object} props
 * @param {string[]} props.labels - 각 영역 이름
 * @param {number[]} props.data - 각 항목의 값
 * @param {string[]} [props.colors] - 각 항목의 색상
 */
function DoughnutChart(
    {
        labels,
        data,
        colors,
    },
) {
    const chartData = {
        labels,
        datasets: [
            {
                data,
                backgroundColor: colors || ['#FF6384', '#36A2EB', '#FFCE56'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        cutout: '55%', // 도넛 구멍 크기 (값이 클수록 더 얇은 도넛)
        label: '3rem',
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 12, // 라벨 글씨 크기 (기본: 12)
                    },
                    boxWidth: 10,   // 색상 네모 가로 크기 (기본: 40)
                    boxHeight: 10,  // 색상 네모 세로 크기 (기본: 10)
                    padding: 10,     // 라벨 간 간격
                },
                position: 'bottom',
            },
        },
    };

    return <Doughnut data={chartData} options={options} />;
}

export default DoughnutChart;
