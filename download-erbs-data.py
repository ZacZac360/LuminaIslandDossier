#!/usr/bin/env python3
import json
import time
import os

import requests
import urllib.request

ERBS_API_KEY = 'yC64acO6xj53iW03VTdPX6QZxY5Y7najMElljT50'

if os.getenv("ERBS_API_KEY") is None:
    print("you need to set the ERBS_API_KEY environment variable to your ERBS API key")
    print(
        "if you edit the file to hard-code it, DO NOT commit and upload your API key!!!!"
    )
    exit(1)

headers = {
    "x-api-key": os.environ["ERBS_API_KEY"],
    "api-key": os.environ["ERBS_API_KEY"],
    "accept": "application/json",
}

print("downloading mapping file")
r = requests.get("https://open-api.bser.io/v1/l10n/English", headers=headers)
mapping_file_url = r.json()["data"]["l10Path"]

with urllib.request.urlopen(mapping_file_url) as f:
    mapping_file_content = f.read().decode("utf-8")
with open("raw-mapping-file.txt", "w") as mapping_file_output:
    mapping_file_output.write(mapping_file_content)

print("done downloading mapping file")
time.sleep(15.0)
r = requests.get("https://open-api.bser.io/v1/data/hash", headers=headers)

for data_type in r.json()["data"]:
    if "/" not in data_type and data_type not in ["MonsterLevelUpStat"]:
        time.sleep(15.0)
        r = requests.get(
            f"https://open-api.bser.io/v1/data/{data_type}", headers=headers
        )
        if r.status_code == 200:
            print("good on", data_type)
            with open(f"api-original-data/{data_type}.json", "w") as output_file:
                json.dump(r.json()["data"], output_file, indent=2, sort_keys=True)
        else:
            print("return code", r.status_code, "for", data_type)
