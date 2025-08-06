import React, { useRef } from "react";
import styles from "./charts.module.css";
import ReactECharts from "echarts-for-react";
import { IMeasurement } from "@/utils/interfaces";
import { getBloodPressureChartData } from "@/utils/helper";

const BloodPressureChart = ({ data }: { data: IMeasurement[] }) => {
  const chartRef = useRef<any>(null);
  const chartData = getBloodPressureChartData(data);
  const dates = chartData.map((d) => d.date);
  const systolic = chartData.map((d) => d.SYS_BLOOD_PRESSURE ?? null);
  const diastolic = chartData.map((d) => d.DIA_BLOOD_PRESSURE ?? null);

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
        data: dates,
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
        data: systolic,
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
        data: diastolic,
      },
    ],
  };
  if (!Array.isArray(data) || data.length <= 0 || systolic.length <=0 || diastolic.length <=0) {
    return <p>No Blood Measuremnts for this Patient yet!</p>;
  }
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
