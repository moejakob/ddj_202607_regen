import osmnx as ox
import geopandas as gpd
import argparse


def get_arguments():
    parser = argparse.ArgumentParser(
        description="Lädt Straßen in bestimmten Gebieten von OSM"
    )

    parser.add_argument(
        "place",
        metavar="p",
        type=str,
        nargs=1,
        help="In welchem Bereich suchen wir? (z.B. Germany, Baden-Württemberg",
    )

    parser.add_argument(
        "search",
        metavar="s",
        type=str,
        nargs=1,
        help="Wonach suchen wir? OSM_Searchstring, z.B.: ['highway'='motorway']",
    )

    parser.add_argument(
        "savepath",
        metavar="sp",
        type=str,
        nargs=1,
        help="Wo wollen wir das alles speichern?",
    )

    args = parser.parse_args()

    return vars(args)


def load_osm_data(args):
    ox.settings.log_console = False
    ox.settings.use_cache = True
    cf = args["search"][0]

    # get a network
    place = args["place"][0]
    print("Suche nach den Daten...")
    G = ox.graph_from_place(
        place, custom_filter=cf, simplify=False, retain_all=True
    )

    savepath = args["savepath"][0]

    json_savepath = ""
    gpkg_savepath = ""

    if savepath.endswith(".gpkg"):
        json_savepath = savepath.replace(".gpkg", ".json")
        gpkg_savepath = savepath
    if savepath.endswith(".json"):
        gpkg_savepath = savepath.replace(".json", ".gpkg")
        json_savepath = savepath

    print("Sichere Daten als Geopackage...")
    ox.save_graph_geopackage(G, filepath=gpkg_savepath)

    gdf_nodes, gdf_edges = ox.graph_to_gdfs(G)

    print("Sichere Edges als GeoJSON")
    gdf_edges.to_file(json_savepath + ".json", driver="GeoJSON")


if __name__ == "__main__":
    args = get_arguments()
    load_osm_data(args)
