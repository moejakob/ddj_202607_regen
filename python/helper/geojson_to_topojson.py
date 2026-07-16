import topojson
import argparse
import json
import geopandas


def geojson_to_topojson(geojson_file, topojson_file, simplify=False):

    if type(geojson_file) == str:
        with open(geojson_file, "r") as f:
            geojson = json.load(f)
    if type(geojson_file) == geopandas.GeoDataFrame:
        geojson = geojson_file

    topo = topojson.Topology(
        geojson,
        toposimplify=simplify,
        prevent_oversimplify=True,
        shared_coords=True,
    )

    topo.to_json(topojson_file)


if __name__ == "__main__":
    # Set up the argument parser
    parser = argparse.ArgumentParser(
        description="Convert a GeoJSON file to TopoJSON"
    )
    parser.add_argument("geojson_file", help="Path to the GeoJSON file")
    parser.add_argument(
        "topojson_file", help="Path to the output TopoJSON file"
    )
    parser.add_argument(
        "--simplify",
        help="How much the topojson should be simplified",
        type=float,
        required=False,
        default=False,
    )

    # Parse the arguments
    args = parser.parse_args()
    geojson_file = args.geojson_file
    topojson_file = args.topojson_file
    simplify = args.simplify

    # Convert the file
    geojson_to_topojson(geojson_file, topojson_file, simplify=simplify)
