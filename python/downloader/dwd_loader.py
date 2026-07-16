import requests
import zipfile
import os
import glob
import pandas as pd
import numpy as np

from bs4 import BeautifulSoup as bs

BASE_URL_OBSERVATIONS = "https://opendata.dwd.de/climate_environment/CDC/observations_germany/climate"


def get_daily_data(downloadpfad, stations=[], historisch=False):

    """
    Läd die aktuellsten Daten vom DWD-Server, benennt die Spalten um und speichert die Daten als CSV.

    Arguments:
        downloadpfad (string): Der Pfad, an den die Daten geladen werden sollen. Legt dort zwei Ordner an, temp und dwd_data

        stations (list): Array mit den Stations-ID. Falls leer, lädt es alle Daten aus der Region

        historisch (bool): TODO

    Returns:
        verarbeitete CSV für jede Stations

    """

    if len(stations) == 0:
        stations = [
            "02712",
            "03927",
            "04175",
            "04703",
            "05229",
            "05731",
            "06263",
            "06258",
            "01584",
        ]

    # Downloadordner erstellen, falls noch nicht geschehen
    print("Erstelle Ordner...")
    tempordner = f"{downloadpfad}/temp/"
    dataordner = f"{downloadpfad}/dwd_data/"
    if not os.path.exists(downloadpfad):
        os.makedirs(downloadpfad)
        os.makedirs(tempordner)
    if not os.path.exists(tempordner):
        os.makedirs(tempordner)
    if not os.path.exists(dataordner):
        os.makedirs(dataordner)

    print("Lade die Daten vom DWD-Server...")
    for station in stations:
        if historisch:
            link = get_zip_links(
                f"{BASE_URL_OBSERVATIONS}/daily/kl/historical/", station
            )
            url = f"{BASE_URL_OBSERVATIONS}/daily/kl/historical/{link}"
        else:
            url = f"{BASE_URL_OBSERVATIONS}/daily/kl/recent/tageswerte_KL_{station}_akt.zip"

        print(url)
        s = requests.Session()
        r = s.get(url, allow_redirects=True)

        if r.status_code == 200:
            print("Status ok...")
            file = f"{tempordner}/{station}_daily.zip"

            open(file, "wb").write(r.content)

            print("entpacke Daten")
            with zipfile.ZipFile(file, "r") as zipdata:
                # Hole Liste aller Dateien im File
                listOfFileNames = zipdata.namelist()
                # Loop und speichere nur die Daten mit den Daten
                for fileName in listOfFileNames:
                    if fileName.startswith("produkt_"):
                        # Extract a single file from zip
                        zipdata.extract(fileName, tempordner)

        else:
            raise Exception(
                f"Fehler: DWD-Daten nicht erreichbar: Statuscode {str(r.status_code)}"
            )

    print("Lösche Zipfiles...")
    for filename in glob.glob(f"{tempordner}/*.zip"):
        os.remove(filename)

    # Wrangle Files

    print("Verarbeite txt-Dateien...")
    for filename in glob.glob(f"{tempordner}/*.txt"):
        df = pd.read_csv(filename, sep=";")
        df = df.replace(-999, np.nan)
        cols = [
            "id",
            "datum",
            "messqualitaet_1",
            "wind_max",
            "wind_mittel",
            "messqualitaet_2",
            "niederschlag",
            "niederschlagsform",
            "sonnenscheindauer",
            "schneehoehe",
            "bedeckungsgrad",
            "dampfdruck",
            "luftdruck",
            "temp_mittel",
            "feuchtigkeit_mittel",
            "temp_max",
            "temp_min",
            "temp_min_boden",
            "eor",
        ]
        df.columns = cols

        new_filename = filename.split("/")[-1].split(".")[0]

        print("Speichere CSV-Dateien...")
        df.to_csv(
            f"{dataordner}/{new_filename}.csv", encoding="utf-8", index=False
        )

        print(
            "Geschafft. Doku beachten! https://opendata.dwd.de/climate_environment/CDC/observations_germany/climate/daily/kl/recent/BESCHREIBUNG_obsgermany_climate_daily_kl_recent_de.pdf"
        )


def get_zip_links(url, station):
    s = requests.Session()
    r = s.get(url)

    if r.status_code == 200:
        soup = bs(r.content, "html.parser")

        links = soup.find_all("a")
        for link in links:
            if station in link["href"]:
                return link["href"]
