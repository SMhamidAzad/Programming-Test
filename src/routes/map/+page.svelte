<script>
    import { onMount } from "svelte";
    import "ol/ol.css";
    import View from "ol/View";
    import Map from "ol/Map";
    import GeoJSON from "ol/format/GeoJSON";
    import { OSM, Vector as VectorSource } from "ol/source";
    import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
    import { Style, Fill } from "ol/style";

    let map;

    onMount(() => {
        const sourceVector = new VectorSource({
            url: "../../lib/data/countries.geojson",
            format: new GeoJSON(),
        });

        const vectorLayer = new VectorLayer({
            source: sourceVector,
            style: new Style({
                fill: new Fill({
                    color: "rgba(0, 106, 78, 0.75)",
                }),
            }),
        });

        // Create a map
        map = new Map({
            target: "map",
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
                vectorLayer,
            ],
            view: new View({
                center: [0, 0],
                zoom: 2,
            }),
        });
    });
</script>

<div id="map" />

<style>
    #map {
        width: 100vw;
        height: 100vh;
    }
</style>
