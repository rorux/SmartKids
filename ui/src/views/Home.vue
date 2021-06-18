<template>
  <div>
    <main class="app-content" :class="{ full: !modelValue }">
      <div class="app-page">
        <div>
          <div class="page-title">
            <h3>Статистика</h3>
          </div>

          <div class="history-chart">
            <canvas ref="canvas"></canvas>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { Line } from "vue-chartjs";
import { mapActions } from "vuex";
import subjectsMap from "@/utils/subjects";
export default {
  extends: Line,
  props: ["modelValue", "info"],
  name: "home",
  data() {
    const dataChartDb = [];

    return {
      dataChartDb,
    };
  },
  computed: {
    dataChart() {
      const datasets = [];
      let labelsPrev = [];
      let labels = [];
      let labelss = [];
      const correct = [];
      const wrong = [];
      const chartColor = {
        math: {
          correct: "#00FF7F",
          wrong: "#F08080",
        },
        rus: {
          correct: "#66CDAA",
          wrong: "#FF8C00",
        },
      };
      this.dataChartDb.forEach((el, ind) => {
        el.dates.forEach((date) => {
          if (!labelsPrev.includes(date)) {
            labelsPrev.push(date);
          }
          if (!correct[ind]) {
            correct[ind] = {};
          }
          el.dates.forEach((dateEx, indEx) => {
            if (!correct[ind][dateEx]) {
              correct[ind][dateEx] = el.correct[indEx];
            }
          });
          if (!wrong[ind]) {
            wrong[ind] = {};
          }
          el.dates.forEach((dateEx, indEx) => {
            if (!wrong[ind][dateEx]) {
              wrong[ind][dateEx] = el.wrong[indEx];
            }
          });
        });
      });
      labels = labelsPrev.sort();
      labelsPrev.forEach((dataLabels) => {
        const dataConvert = dataLabels.match(/^(\d{2})\.(\d{2}).(\d{4})/);
        labelss.push(
          Date.parse(
            new Date(+dataConvert[3], +dataConvert[2] - 1, +dataConvert[1])
          )
        );
      });
      labelss.sort();
      labels = labelss.map((el) => {
        return this.humanDate(el);
      });
      this.dataChartDb.forEach((el, ind) => {
        const correctArr = [];
        const wrongArr = [];
        labels.forEach((dateEvent) => {
          if (!correct[ind][dateEvent]) {
            correctArr.push(0);
          } else {
            correctArr.push(correct[ind][dateEvent]);
          }
        });
        labels.forEach((dateEvent) => {
          if (!wrong[ind][dateEvent]) {
            wrongArr.push(0);
          } else {
            wrongArr.push(wrong[ind][dateEvent]);
          }
        });
        datasets.push({
          label: `Верно ${subjectsMap[el.subject]}`,
          borderColor: chartColor[el.subject].correct,
          data: correctArr,
          fill: false,
        });
        datasets.push({
          label: `Ошибки ${subjectsMap[el.subject]}`,
          borderColor: chartColor[el.subject].wrong,
          data: wrongArr,
          fill: false,
        });
      });
      return {
        labels: labels,
        datasets: datasets,
      };
    },
  },
  methods: {
    ...mapActions(["getStatTotalDb"]),
    setup() {
      this.renderChart(this.dataChart);
    },
    transformDayMonth(str) {
      return str.toString().length === 1 ? "0" + str.toString() : str;
    },
    humanDate(date) {
      const dateFormat = new Date(date);
      return (
        this.transformDayMonth(dateFormat.getDate()) +
        "." +
        this.transformDayMonth(dateFormat.getMonth() + 1) +
        "." +
        dateFormat.getFullYear()
      );
    },
  },
  async mounted() {
    this.dataChartDb = await this.getStatTotalDb();
    this.setup();
  },
};
</script>
