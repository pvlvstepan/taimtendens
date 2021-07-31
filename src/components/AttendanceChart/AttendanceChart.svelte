<script>
  import { onMount } from 'svelte';
  import { options } from './chartConfig';

  export let attendance;
  export let id;

  const renderChart = () => {
    var ctx = document.getElementById(`pie-chart-${id}`);
    void new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['present', 'absent'],
        datasets: [
          {
            label: 'Attendance',
            data: [attendance, 100 - attendance],
            backgroundColor: ['#4caf50', '#f44336']
          }
        ]
      },
      options
    });
  };

  onMount(renderChart);
</script>

<div class="chart_wrapper">
  <canvas
    id={`pie-chart-${id}`}
    class="pie-chart"
    width="307px"
    height="307px"
  />
  <div
    class={'text-h3 font-weight-black float lighten-4 ' +
      (attendance >= 80 ? 'green-bg green-text' : 'red-bg red-text')}
  >
    {attendance}%
  </div>
</div>

<style>
  .chart_wrapper {
    position: relative;
  }
  .pie-chart {
    z-index: 1;
    position: relative;
  }
  .float {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px;
    border-radius: 50%;
  }
  .green-bg {
    background: rgba(76, 175, 80, 0.2);
  }
  .red-bg {
    background: rgba(244, 67, 54, 0.2);
  }
</style>
