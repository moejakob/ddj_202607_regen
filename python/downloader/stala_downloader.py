import pandas as pd
import requests
import os
import time
import argparse

# Erstellen des Argumentparsers
parser = argparse.ArgumentParser(description="Download data from STALA")
parser.add_argument("--data-id", type=str, default="16035020")
parser.add_argument(
    "--region-only", action="store_true", help="Download data for specific region only"
)
parser.add_argument(
    "--gemeinden-only", action="store_true", help="Download Gemeinde data only"
)
parser.add_argument(
    "--set-dir",
    type=str,
    default="./stala-download",
    help="Set the download directory",
)
args = parser.parse_args()

# Liste der Regionen
region = ["08326", "08327", "08335", "08337", "08435", "08437"]


def get_gkz():
    """
    Lädt die Gemeindekennzahlen von der Webseite der Statistik-BW und gibt
    sie als Liste zurück.

    Returns:
        list: Liste der Gemeindekennzahlen
    """
    url = "https://www.statistik-bw.de/BevoelkGebiet/Bevoelk_I_Flaeche_j.csv"
    df = pd.read_csv(url, sep=";", encoding="latin1", skiprows=20)
    gkz = df.iloc[:, 1].apply(lambda x: str(x).zfill(len(str(x)) + 1)).drop_duplicates()
    if args.region_only:
        gkz = gkz[gkz.str[:5].isin(region)]
    if args.gemeinden_only:
        gkz = gkz[gkz.str.len() == 8]
    else:
        gkz = gkz[gkz.str.len() == 5]
    return gkz.tolist()


def download_csv():
    """
    Lädt die CSV-Dateien für jede Gemeindekennzahl herunter und
    speichert sie im Ordner "stala-download".

    """
    gkz = get_gkz()
    url = f"https://www.statistik-bw.de/{args.data_id}.tab?R="
    os.makedirs(args.set_dir, exist_ok=True)
    for i, g in enumerate(gkz):
        try:
            if len(g) == 5:
                r = requests.get(f"{url}KR{g[2:]}&form=csv")
            else:
                r = requests.get(f"{url}GS{g[2:]}&form=csv")
            with open(os.path.join(args.set_dir, f"{g}.csv"), "wb") as f:
                f.write(r.content)
            print(f"Downloaded {g}.csv")
            time.sleep(1 if i % 10 == 0 else 0.2)
        except Exception as e:
            print(f"Could not download {g}.csv")
            print(e)


if __name__ == "__main__":
    download_csv()
