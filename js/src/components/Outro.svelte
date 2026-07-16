<script>
  export let config = {};
</script>

{#if config.stand}
  <div class="___chart_quelle article-figcaption">
    Quelle: {@html config.quelle} | Stand: {@html config.stand}
  </div>
{:else}
  <div class="___chart_quelle article-figcaption">Quelle: {@html config.quelle}</div>
{/if}
