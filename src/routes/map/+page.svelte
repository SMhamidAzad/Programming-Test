<script>
    import { onMount } from "svelte";
    import Map from "ol/Map";
    import View from "ol/View";
    import TileLayer from "ol/layer/Tile";
    import VectorLayer from "ol/layer/Vector";
    import VectorSource from "ol/source/Vector";
    import GeoJSON from "ol/format/GeoJSON";
    import OSM from "ol/source/OSM";
    import { fromLonLat } from "ol/proj";
    import { Fill, Style } from "ol/style";

    onMount(async () => {
        const response = await fetch(`/countries.geojson`);
        const geojsonData = await response.json();

        const vectorSource = new VectorSource({
            format: new GeoJSON(),
            features: new GeoJSON().readFeatures(geojsonData, {
                dataProjection: "EPSG:4326",
                featureProjection: "EPSG:3857",
            }),
        });

        // const vectorLayer = new VectorLayer({
        //     source: vectorSource,
        // });
        const vectorLayer = new VectorLayer({
                source: vectorSource,
                style: new Style({
                    fill: new Fill({
                        color: "#006a4e75",
                        opacity: 0.75,
                    }),
                }),
            });
        const map = new Map({
            target: "map",
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
                vectorLayer,
            ],
            view: new View({
                center: fromLonLat([0, 0]),
                zoom: 2,
            }),
        });

        return () => {
            map.dispose();
        };
    });
</script>

<div id="map" />

<style>
    #map {
        width: 100%;
        height: 1000px;
    }
</style>
