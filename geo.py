#!/usr/bin/env python
#-*- coding: utf-8
import sys
import re
import pg
import mod_python
import json
import mypass

GEO_TABLES = {"dc": "dc", "dcca": "dcca2"}
GEO_KEYS = {}
GEO_GEOM = {"dcca": "the_geom_nowater"}
GEO_TOLERANCE = { "dc": 5.0, "dcca": 0.1, "sb": 0.1 }
GEO_HASYEARS = ["sb", "tpu"]
COLS = {"dc": ["dc_code", "dc", "dc_eng", "dc_chin"]}

def getCensusData(req, geotype, geoid):
    pgconn = mypass.getConn()
    if geotype is None:
	return json.dumps(None);
    if geoid is None:
	return json.dumps(None);
    if geotype in GEO_TABLES:
	geotable = GEO_TABLES[geotype]
    else:
	geotable = geotype
    if geotype == "dcca":
	parentgeotype = "dc"
	parentgeoid = geoid[0:2]
	'''
	sql = "SELECT %(cols)s FROM %(parentgeotype)s WHERE dc = '%(parentgeoid)s' " % { "parentgeotype": parentgeotype, "parentgeoid": parentgeoid, "cols": ",".join(COLS[parentgeotype]) }
	res = pgconn.query(sql).dictresult()
	json.dumps(res[0])
	'''

def getBounds(req, geotype, geoid, year=2001):
    pgconn = mypass.getConn()
    if geotype is None:
	return json.dumps(None);
    if geoid is None:
	return json.dumps(None);
    #geoid = geoid.strip()
    if geotype in GEO_TABLES:
	geotable = GEO_TABLES[geotype]
    else:
	geotable = geotype
    if geotype in GEO_HASYEARS:
	geotable += str(year)
    if geotype in GEO_KEYS:
	geokey = GEO_KEYS[geotype]
    else:
	geokey = geotype
    if geotype in GEO_KEYS:
	geogeom = GEO_GEOM[geotype]
    else:
	geogeom = "the_geom"
    if geotype in GEO_TOLERANCE:
	tolerance = GEO_TOLERANCE[geotype]
	if geotype == "dc":
	    try:
		geoid_int = int(geoid)
		if geoid_int >= 32:
		    tolerance = tolerance * 5
	    except:
		pass
    else:
	tolerance = 1.0
    if geotype == "sb":
	m = re.match(r"([\d/]+)", geoid)
	if m is not None:
	    x_geo = m.group(0) # x_geo is numeric
	    if len(geoid) > len(x_geo):
		x_geo += "S"
		geoid = x_geo
    sql = "SELECT ST_AsGeoJSON(ST_Transform(ST_SimplifyPreserveTopology(%(geom)s, %(tolerance)f),4326)) AS bounds FROM hkcensus.%(geotable)s \
WHERE %(geokey)s = '%(geoid)s'" % { "geotable": geotable, "geokey": geokey, "geoid": geoid, "geom": geokey, "geom": geogeom, "tolerance": tolerance }
    rows = pgconn.query(sql)
    results = rows.getresult()
    if len(results) <= 0:
	return json.dumps({})
    return results[0][0]

