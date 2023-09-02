<script>
  import { countryDataStore } from "../../stores/countryData";
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  let countryData = [];
  countryDataStore.subscribe((data) => {
    console.log(data);
    countryData = data;
  });

  if (countryData) {
    let chart;

    function prepareData(data) {
      data.sort((a, b) => b.population - a.population);
      const top10Countries = data.slice(0, 10);
      const labels = top10Countries.map((country) => country.name.common);
      const populationData = top10Countries.map(
        (country) => country.population
      );
      return { labels, populationData };
    }

    onMount(() => {
      const ctx = document.getElementById("polarAreaChart").getContext("2d");
      const { labels, populationData } = prepareData(countryData);
      chart = new Chart(ctx, {
        type: "polarArea",
        data: {
          labels: labels,
          datasets: [
            {
              data: populationData,
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
              ],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        },
      });
    });
  }
</script>

<main>
  <div class="bg-blue-50">
    <div class="grid grid-cols-3">
      <div class="container mx-auto px-4 sm:px-8 col-span-2">
        <div class="py-8">
          <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div
              class="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
            >
              <table class="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      class="pl-10 py-3 bg-white border-y border-gray-200 text-left text-md font-semibold text-gray-700"
                    >
                      Flag
                    </th>
                    <th
                      class="pl-10 py-3 bg-white border-y border-gray-200 text-left text-md font-semibold text-gray-700"
                    >
                      Name
                    </th>
                    <th
                      class="pl-10 py-3 bg-white border-y border-gray-200 text-left text-md font-semibold text-gray-700"
                    >
                      Population
                    </th>
                    <th
                      class="pl-10 py-3 bg-white border-y border-gray-200 text-left text-md font-semibold text-gray-700"
                    >
                      CIOC
                    </th>
                    <th
                      class="w-40 py-3 bg-white border-y border-gray-200 text-left text-md font-semibold text-gray-700"
                    >
                      UN Member Status
                    </th>
                    <th
                      class="pl-6 py-3 bg-white border-y border-gray-200 text-left text-md font-semibold text-gray-700"
                    >
                      Currencies
                    </th>
                    <th
                      class="pl-16 py-3 border-y bg-white border-gray-200 text-left text-md font-semibold text-gray-700"
                    >
                      Languages
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {#each countryData as country (country.flags?.png)}
                    {#if country}
                      <tr>
                        <td
                          class="pl-10 py-3  border-b border-gray-200 bg-white text-sm"
                        >
                       
                          <img
                            class="w-20 h-8"
                            src={country.flags?.png}
                            alt={country.name?.common}
                          />
                        </td>
                        <td
                          class="pl-10 py-3 border-b border-gray-200 bg-white text-sm"
                        >
                          {country.name?.common}
                        </td>
                        <td
                          class="pl-10 py-3 border-b border-gray-200 bg-white text-sm"
                        >
                          {country.population}
                        </td>
                        <td
                          class="pl-10 py-3 border-b border-gray-200 bg-white text-sm"
                        >
                          {country.cioc}
                        </td>
                        <td
                          class="pl-10 py-3  border-b border-gray-200 bg-white text-sm"
                        >
                          {#if country.unMember}
                            <span
                              class="bg-gray-600 text-white px-2 py-1 rounded-md"
                              >YES</span
                            >
                          {:else}
                            <span
                              class="bg-gray-300 text-white px-2 py-1 rounded-md"
                              >NO</span
                            >
                          {/if}
                        </td>
                        <td
                          class="pl-10 py-3 border-b border-gray-200 bg-white text-sm"
                        >
                          {country?.currencies &&
                            Object.keys(country?.currencies)}
                        </td>
                        <td
                          class="pl-16 py-3 border-b border-gray-200 bg-white text-sm"
                        >
                          {#if country.languages && typeof country.languages === "object"}
                            {#each Object.keys(country.languages) as langCode}
                              <span>
                                {country.languages[langCode]}
                              </span>
                            {/each}
                          {:else}
                            <p>No languages found.</p>
                          {/if}
                        </td>
                      </tr>
                    {/if}
                  {/each}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class=" mt-12">
        <div class="bg-white rounded-md">
          <div class="font-medium border-b border-gray-200 py-5 px-5">
            <h1>Countries</h1>
          </div>

          <div class="mt-5">
            <canvas id="polarAreaChart" width="400" height="400" />
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
