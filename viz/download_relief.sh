#!/bin/bash
export MAGICK_DISK_LIMIT=4200GiB
export MAGICK_AREA_LIMIT=4200MP

# Die GeoTIFFS kann man hier herunterladen: http://dwtkns.com/srtm/ und muss sie dann einzeln in Zeile 10 eintragen

gdal_merge.py \
	-o tif/merged.tif \
	-init "255" \
	tif/srtm_38_03.tif tif/srtm_39_03.tif 

gdalwarp \
    -co "TFW=YES" \
    -s_srs "EPSG:4326" \
    -t_srs "EPSG:3857" \
    tif/merged.tif \
    tif/relief_pseudomercator.tif

# Hier muss ein Shapefile mit den Umrissen angegeben werden

gdalwarp \
    -cutline shp/UKR_adm1.shp \
    -crop_to_cutline \
    -dstalpha \
    tif/relief_pseudomercator.tif \
    tif/relief.tif

rm -rf tmp && mkdir -p tmp

gdaldem \
    hillshade \
    tif/relief.tif \
    tmp/hillshade.tmp.tif \
    -z 5 \
    -az 315 \
    -alt 60 \
    -compute_edges


gdal_calc.py -A tmp/hillshade.tmp.tif  --outfile=tmp/color.tmp.tif --calc="255*(A>220)+1*(A<=220)"

# gdal_calc.py -A tmp/hillshade.tmp.tif  --outfile=tmp/opacity_crop.tmp.tif --calc="1*(A>220)+(256-A)*(A<=220)"

gdalbuildvrt -separate tmp/final.vrt tmp/color.tmp.tif tmp/opacity_crop.tmp.tif

gdal_translate -co COMPRESS=LZW -co ALPHA=YES tmp/final.vrt tif/final.tif


convert \
    -resize x670 \
    tif/final.tif \
    relief.png
