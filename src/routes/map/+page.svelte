<script lang="ts">
  import {
    MapLibre,
    MarkerLayer,
    Popup,
    GeoJSON,
    LineLayer,
    FillLayer,
  } from "svelte-maplibre"
  import { hoverStateFilter } from "$lib/maplibre/filters"
  import { contrastingColor } from "$lib/maplibre/colors"

  import dzielnice from "./dzielnice.geojson?url"

  let map: maplibregl.Map | undefined
  let loaded: boolean
  let textLayers: maplibregl.LayerSpecification[] = []
  let showFill = true
  let showBorder = true
  let fillColor = "#41b391"
  let borderColor = "#235c4b"
  $: if (map && loaded) {
    textLayers = map
      .getStyle()
      .layers.filter((layer) => layer["source-layer"] === "place")
  }

  $: colors = contrastingColor(fillColor)
  $: if (map && loaded) {
    for (let layer of textLayers) {
      map.setPaintProperty(layer.id, "text-color", colors.textColor)
      map.setPaintProperty(layer.id, "text-halo-color", colors.textOutlineColor)
    }
  }

  let filterStates = false
  $: filter = filterStates
    ? ["==", "T", ["slice", ["get", "NAME"], 0, 1]]
    : undefined
</script>

<MapLibre
  center={[19.993890229752196, 50.04867501826817]}
  zoom={11}
  class="relative w-full aspect-[9/16] max-h-[70vh] sm:max-h-full sm:aspect-video"
  standardControls
  style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
>
  <GeoJSON id="dzielnice_krakowa" data={dzielnice} promoteId="id_dzielni">
    {#if showFill}
      <FillLayer
        paint={{
          "fill-color": hoverStateFilter(fillColor, colors.hoverBgColor),
          "fill-opacity": 0.5,
        }}
        {filter}
        beforeLayerType="symbol"
        manageHoverState
      />
    {/if}
    {#if showBorder}
      <LineLayer
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{ "line-color": borderColor, "line-width": 3 }}
        beforeLayerType="symbol"
      />
    {/if}
    <MarkerLayer interactive let:feature>
      <div class="rounded-full bg-gray-700 p-2 shadow">
        <div class="text-sm font-bold">{feature.properties.NAME}</div>
      </div>
      <Popup openOn="hover" popupClass="text-gray-700">
        {feature.properties.NAME} ma powierzchnię {feature.properties
          .powierzchn}
      </Popup>
    </MarkerLayer>
  </GeoJSON>
</MapLibre>

<style>
  :global(.map) {
    height: 1000px;
  }
</style>
