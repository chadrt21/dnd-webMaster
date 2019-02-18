# JSON parser for DnD database
# Date: 2/14/2019
# Created by: Chad Ross
# 
import json
import re
import requests, os, bs4
# import mysql.connector

url = "http://www.dnd5eapi.co/api/spells/"

# Get JSON from Dnd 5e database
# ^ from online (not working)
# res = requests.get(url)
# res.raise_for_status()
# soup = bs4.BeautifulSoup(res.text)
# # print(soup)
# jsonElem = soup.select('p')
# # jsonElem = jsonElem[3:]
# jsonElem = str(jsonElem)
# # jsonElem = jsonElem[4:-5]
# jsonElem = re.split("[\[\]]",jsonElem)
# print(jsonElem[2])

# ^ from file
with open('5e-SRD-Spells.txt') as json_file:
	data = json.load(json_file)
	# print(data[0])
	for p in data:
		print(p['name'])
		print('\t' + p['index'])
		print('\t' + p['casting_time'])

# Parse database

# Put database into MySQL database

'''
name
school
	name
	url
casting_time
index
desc
subclass
	name
	url
url
classes
	name
	url
ritual
level
page
higher_level
material
range
concentration
'''


# db = mysql.connector.connect(
# 	host="localhost",
# 	user="yourusername",
# 	passwd="yourpassword",
# 	database="mydatabase"
# 	)

# dbCursor = db.cursor()

# sql = "INSERT INTO spells (name, ) VALUES (%s, %s)"
# val = 