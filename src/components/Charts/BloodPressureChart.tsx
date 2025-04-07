import React, { useRef } from "react";
import styles from "./charts.module.css";
import ReactECharts from "echarts-for-react";
const BloodPressureChart = () => {
  const chartRef = useRef<any>(null);
  const chartOptions = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data: ["Systolic", "Diastolic"],
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: "2%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: Array.from({ length: 31 }, (_, i) => `${i + 1} April`),
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "Blood Pressure (mmHg)",
        nameTextStyle: {
          fontSize: 14,
          align: "left",
        },
      },
    ],
    series: [
      {
        name: "Systolic",
        type: "line",
        stack: "Total",
        smooth: true,
        color: "#00EACE",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [
          120, 122, 119, 125, 130, 128, 126, 127, 125, 124, 123, 122, 124, 126,
          128, 129, 130, 128, 126, 124, 125, 127, 128, 130, 132, 131, 129, 128,
          126, 125, 124,
        ],
      },
      {
        name: "Diastolic",
        type: "line",
        stack: "Total",
        smooth: true,
        color: "#007795",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [
          80, 82, 81, 83, 85, 84, 82, 81, 80, 79, 78, 77, 78, 79, 80, 81, 82,
          83, 82, 81, 80, 79, 80, 81, 82, 83, 84, 85, 84, 83, 82,
        ],
      },
    ],
  };
  return (
    <div className={styles.chartBox}>
      <ReactECharts
        option={chartOptions}
        className={styles.chart}
        theme={"light"}
        ref={chartRef}
      />
    </div>
  );
};

export default BloodPressureChart;
