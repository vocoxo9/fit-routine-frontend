import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategorySclae,
    LinearScale,
    Tooltip,
    CategoryScale,
} from 'chart.js';

// Chart.js 요소 등록 (반드시 필요함)
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

/**
 * Bar 차트 컴포넌트
 * @param {Object} props
 * @param {string[]} props.labels - 각 영역 이름
 * @param {number[]} props.data - 각 항목의 값
 * @param {string[]} [props.colors] - 각 항목의 색상
 */
function BarChart() {
    const data = {
        labels: ['다이어트는 내일부터', '홍길동', '내가 임마'],
        datasets: [
            {
                label: 'Data',
                data: [2, 3, 1],
                // backgroundColor: '#D0E3FF', // 그래프 Bar의 색상
                // backgroundColor: '#334EAC', // 그래프 Bar의 색상
                // backgroundColor: ['#BAD6EB', '#334EAC', '#D0E3FF'], // 그래프 Bar의 색상
                backgroundColor: [
                    'rgb(192,192,192)', 
                    'rgb(255, 215, 0)', 
                    'rgb(205,127,50)'
                ], // 그래프 Bar의 색상
                borderWidth: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // 범례제거
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, // x축 그리드 제거
                },
                ticks: {
                    font: {
                        size: 15, // 기본: 12
                    },
                    color: '#000000',
                },
                border: {
                    display: false, // x축 선 제거
                },
            },
            y: {
                grid: {
                    display: false, // x축 그리드 제거
                },
                ticks: {
                    display: false, // y축 라벨 제거 (선택사항)
                },
                border: {
                    display: false, // x축 선 제거
                },
            },
        },
    };

    return <Bar data={data} options={options} />;
}

export default BarChart;
