<script>
    import { onMount } from "svelte";
    import "ol/ol.css";
    import View from "ol/View";
    import Map from "ol/Map";
    import GeoJSON from "ol/format/GeoJSON";
    import { OSM, Vector as VectorSource } from "ol/source";
    import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
    import { Style, Fill } from "ol/style";
    import { geoJsonDataStore } from "../../stores/geoJsonData";
    import { useGeographic } from "ol/proj";

    let geoJsonData = [];
    
    let map; // Declare map here

    // useGeographic(); 
    geoJsonDataStore.subscribe((data) => {
        geoJsonData = data;

        // After the GeoJSON data is fetched, add it to the map
        if (map) {
            addGeoJSONToMap();
        }
    });
   
    onMount(() => {
        // Create a map
        map = new Map({
            target: "map",
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: new View({
                center: [0, 0],
                zoom: 5, // Increase the zoom level
            }),
        });

        // Add GeoJSON to map if data is available
        if (geoJsonData) {
            addGeoJSONToMap();
        }
    });

    // Function to add GeoJSON data to the map
    function addGeoJSONToMap() {
        if (map && geoJsonData && geoJsonData.features) {
            const sourceVector = new VectorSource({
                features: new GeoJSON().readFeatures(geoJsonData),
            });

            const vectorLayer = new VectorLayer({
                source: sourceVector,
                style: new Style({
                    fill: new Fill({
                        color: "#006a4e75",
                        opacity: 0.75,
                    }),
                }),
            });

            map.addLayer(vectorLayer);

            // Fit the map view to the extent of the GeoJSON data
            map.getView().fit(sourceVector.getExtent());
            console.log("Extent:", sourceVector.getExtent());
        }
    }

</script>

<div id="map" />

<style>
    #map {
        width: 100vw;
        height: 100vh;
    }
</style>
