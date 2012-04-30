var JMSC = {
    fusionTableIdDefault: 3034108,
    fusionTableId: 3034108,
    numericalUnits: ["people", "people / km²", "HK$"],
    layersWithGraphs: ["popmedianage","usuallang"],
    geoid: 0,
    geotype: "dc",
    geotypenames: { "dc": "District council", "dcca": "Constituency area", "tpu": "Tertiary planning unit", "sb": "Street block" },
    geoBounds: {},
    geoparenttype: "",
    geoparentid: 0,
    geoclicked: null,
    geoparentclicked: null,
    lngLatClicked: null,
    thisLayer: "",
    strokeWeight: 3.0,
    years: [2001, 2006, 2011],
    year: 2001,
    yearSlider: null,
    sliderStepPx: 50,
    fusionTableColumn: "",
    fusionTableQuery: {
	select: 'boundary',
	from: null,
	where: null
    },
    fusionTableStyles: [{
	polygonOptions: {
	    fillColor: "#00FF00",
	    fillOpacity: 0.1
	}
    }],
    fusionTableOpts: {
	suppressInfoWindows: true
    },
    openedInfoWindow: null,
    infoWindowOpts: {
	disableAutoPan: false
    },
    fusionTableQueryString: "",
    stylesNbMax: 5,
    styleGradientColors: {
	blue: ["C5EAF8", "6DCAEC", "2CB1E1", "16A5D7", "0099CC"],
	green: ["E2F0B6", "B6DB49", "92C500", "7CAF00", "669900"],
	red: ["FFCACA", "FF7979", "F83A3A", "E21D1D", "CC0000"],
	yellow: ["FFECC0", "FFD060", "FFB61C", "FFA00E", "FF8A00"],
	multi: ["2CB1E1", "92C500", "FFFF1C", "FFB61C", "F83A3A"]
    },
    mapStyles: {
	minimal: [
	  {
	    featureType: "transit",
	    stylers: [
	      { visibility: "off" }
	    ]
	  },{
	    featureType: "road",
	    stylers: [
	      { visibility: "off" }
	    ]
	  },{
	    featureType: "administrative",
	    stylers: [
	      { visibility: "off" }
	    ]
	  },{
	    featureType: "poi",
	    stylers: [
	      { visibility: "off" }
	    ]
	  },{
	  }
	]
    },
    styleGradient: false,
    currentLayerId: "",
    currentLayerData: null,
    loadedLayer: null,
    ge: null,
    map: null,
    mapdiv: $("#map2d"),
    gediv: $("#map3d"),
    gediv_dom: document.getElementById("map3d"),
    latCenter: 22.35,
    lngCenter: 114.16,
    zoomStart: 11,
    overlayStart: google.maps.MapTypeId.ROADMAP,
    mode3d: false,
    modePrint: false,
    atInit: true,
    userLang: "en",
    siteUrl: "http://" + location.hostname + "/datamap/",
    baseUrlKml: "http://" + location.hostname + "/maps/land/geo/",
    layerMenuId: "layermenu",
    i8n: null,
    i8n_en: {
	layermenu: "Layers by district council",
    },
    i8n_tc: {
	layermenu: "Layers",
    },
    i8n_sc: {
	layermenu: "Layers",
    },
    loadingBarHTML: '<img src="loading-bar.gif" alt="Loading..." />',
    initViz: function() {
    },
    init: function() {
	var url = document.location.href;
	var m = url.match(/index_tc.html/);
	if (m) {
	    JMSC.userLang = "en";
	    JMSC.i8n = JMSC.i8n_en;
	} else {
	    JMSC.userLang = "en";
	    JMSC.i8n = JMSC.i8n_en;
	}
      	$.log("init");
	//JMSC.fusionTableQuery = "SELECT lat FROM " + JMSC.fusionTableId;
	JMSC.fusionTableQuery.from = JMSC.fusionTableId;
	JMSC.fusionTableOpts.query = JMSC.fusionTableQuery;
	JMSC.fusionTableOpts.styles = JMSC.fusionTableStyles;
	if (JMSC.mode3d) {
    	    JMSC.show3d();
	} else {
    	    JMSC.show2d();
	}
	JMSC.populateControls();
	JMSC.populateSliders();
	JMSC.populateLegend();
	JMSC.jumpToUrl();
	//JMSC.jumpToUrlFixMenus();
	window.onkeydown = JMSC.keydownhandler;
	JMSC.initViz();
    },
    failure3dCB: function(errorCode) {
	$.log("failed loading Google Earth plugin");
    },
    show2d: function() {
	$.log("show2d");
	JMSC.gediv.hide();
	JMSC.mapdiv.show();
	$("#button3d").show();
	$("#button2d").hide();
	var myLatlng = new google.maps.LatLng(JMSC.latCenter, JMSC.lngCenter);
	var mapStyleMinimal = new google.maps.StyledMapType(JMSC.mapStyles.minimal, {name:'minimal'});
	var mapOptions = {
	    zoom: JMSC.zoomStart,
	    center: myLatlng,
	    scaleControl: true,
	    mapTypeId: JMSC.overlayStart,
	    streetViewControl: true,
	    mapTypeControlOptions: {
		mapTypeIds: [ google.maps.MapTypeId.ROADMAP, 'minimal' ]
	    },
	    zoomControlOptions: {
		style: google.maps.ZoomControlStyle.SMALL
	    }
	};
	JMSC.map = new google.maps.Map(JMSC.mapdiv.get(0), mapOptions);
	JMSC.map.mapTypes.set('minimal', mapStyleMinimal);
	JMSC.map.setMapTypeId('minimal');
	JMSC.fusionTableOpts.map = JMSC.map;
	JMSC.mode3d = false;
	if (JMSC.atInit) {
	    JMSC.load2d();
	}
	//JMSC.jumpToUrl();
    },
    load2d: function() {
	$.log("load2d");
	JMSC.atInit = false;
	JMSC.showLoadingBar();
	JMSC.unload2d();
	//$.log(JMSC.fusionTableOpts);
	JMSC.loadedLayer = new google.maps.FusionTablesLayer(JMSC.fusionTableOpts);
	google.maps.event.addListener(JMSC.loadedLayer, 'click', JMSC.clickFTLayer);
	//JMSC.setUrlToRidingId();
	JMSC.hideLoadingBar();
    },
    unload2d: function() {
	 if (JMSC.loadedLayer !== null) {
	     JMSC.loadedLayer.setMap(null);
	     JMSC.loadedLayer = null;
	 }
    },
    show3d: function() {
	$.log("show3d");
	JMSC.mapdiv.hide();
	JMSC.gediv.show();
	$("#button2d").show();
	$("#button3d").hide();
	if (JMSC.ge==null) {
	    google.earth.createInstance(JMSC.gediv.get(0), JMSC.plainSuccessCB, JMSC.plainFailureCB);
	} else {
	    JMSC.load3d();
	}
    },
    plainSuccessCB: function(instance) {
	JMSC.ge = instance;
	JMSC.mode3d = true;
	JMSC.ge.getWindow().setVisibility(true);
    },
    plainFailureCB: function(errorCode) {
	JMSC.failure3dCB(errorCode);
	if (JMSC.atInit) {
	    JMSC.mode3d = false;
	    JMSC.show2d();
	    JMSC.atInit = false;
	}
    },
    loadGeOptions: function() {
	var lookAt = JMSC.ge.getView().copyAsLookAt(JMSC.ge.ALTITUDE_RELATIVE_TO_GROUND);
	lookAt.setLatitude(JMSC.latCenter);
	lookAt.setLongitude(JMSC.lngCenter);
	lookAt.setRange(5000000);
	JMSC.ge.getView().setAbstractView(lookAt);

	/* Set options */
	var options = JMSC.ge.getOptions();
	options.setStatusBarVisibility(1);
	options.setGridVisibility(0);
	options.setOverviewMapVisibility(0);
	options.setScaleLegendVisibility(1);
	options.setAtmosphereVisibility(1);
	options.setMouseNavigationEnabled(1);

	// add a navigation control
	JMSC.ge.getNavigationControl().setVisibility(JMSC.ge.VISIBILITY_AUTO);

	// add some layers
	JMSC.ge.getLayerRoot().enableLayerById(JMSC.ge.LAYER_BORDERS, true);
	JMSC.ge.getLayerRoot().enableLayerById(JMSC.ge.LAYER_ROADS, true);
    },
    load3d: function() {
	$.log("load3d");
	JMSC.atInit = false;
	JMSC.unload3d();
	JMSC.showLoadingBar();
    },
    unload3d: function() {
	 if(JMSC.ge==null) return 0;
	 if(JMSC.loadedRidingKml3d == null) {
	     return 0;
	 }
	 if(JMSC.ge.getFeatures().hasChildNodes()) {
	     JMSC.ge.getFeatures().removeChild(JMSC.loadedRidingKml3d);
	 }
     },
    showLoadingBar: function() {
	$("#status").innerHTML = JMSC.loadingBarHTML;
    },
    hideLoadingBar: function() {
	$("#status").innerHTML = "";
    },
    setUrlToRidingId: function() {
	var url =  JMSC.siteUrl;
	url += "#";
	document.location.href = url;
    },
    setGeoFromClick: function(o) {
	JMSC.resetGeoIds();
	try {
	    JMSC.geoid = o.row[JMSC.geotype]["value"];
	} catch (err) {
	    JMSC.geoid = 0;
	}
	JMSC.geoparenttype = "";
	switch (JMSC.geotype) {
	    case "dc":
		for (var x=0; x<JMSC.dc.length; x++) {
		    if (JMSC.dc[x]["dc"] == o.row["dc"]["value"]) {
			JMSC.geoname = JMSC.dc[x]["dceng"] + " " + JMSC.dc[x]["dcchin"];
			JMSC.geoclicked = JMSC.dc[x];
			break;
		    }
		}
		break;
	    case "dcca":
		JMSC.geoparenttype = "dc";
		for (var x=0; x<JMSC.dcca.length; x++) {
		    if (JMSC.dcca[x]["dcca"] == o.row["dcca"]["value"]) {
			JMSC.geoname = JMSC.dcca[x]["dccaeng"] + " " + JMSC.dcca[x]["dccachin"];
			JMSC.geoclicked = JMSC.dcca[x];
			break;
		    }
		}
		JMSC.geoparentid = o.row["dcca"]["value"].substring(0,2);
		JMSC.geoparentdata = null;
		for (var x=0; x<JMSC.dc.length; x++) {
		    if (JMSC.dc[x]["dc"] == JMSC.geoparentid) {
			JMSC.geoparentdata = JMSC.dc[x];
			JMSC.geoparentclicked = JMSC.dc[x];
			break;
		    }
		}
		break;
	    case "sb":
		JMSC.geoparenttype = "tpu";
		JMSC.geoname = JMSC.geoid;
		break;
	}
    },
    infostyles: {
	dc: function(o) {
	    $.log("styling dc");
	},
	dcca: function(o) {
	    var cid = "info-dcca-"+o["row"]["dcca"]["value"];
	    var c = $("#" + cid);
	    var geoparentdata = null;
	    //$.log("styling dcca");
	    /*var hpop = $('<h5>Population</h5>');
	    c.append(hpop);
	    c.append($('<div class="stat"><span class="figure">' + addCommas(o["row"]["a1_dcca_2001_population"]["value"]) + '</span><span class="note" title="Population in constituency area in 2001">2001 pop</span></div>'));
	    if (JMSC.geoparentdata != null) c.append($('<div class="stat"><span class="figure">' + addCommas(JMSC.geoparentdata["pop2001"]) + '</span><span class="note" title="Population in district council in 2001">2001 district pop</span></div>'));*/

	    // First section
	    if (o["row"]["b2_dcca_2001_tertiary_education"] !== undefined) {
		var hedu = $('<h5>Education</h5>');
		var subedu = $('<em class="info-desc">Proportion of non-student population aged 20+ having attained tertiary education (%)</em>');
		var c1 = $('<div id="'+cid+'-chart1"></div>');
		c.append(hedu);
		c.append(subedu);
		c.append(c1);
		d1 = new google.visualization.DataTable();
		d1.addColumn('string', 'Year');
		d1.addColumn('number', 'In DCCA');
		d1.addColumn('number', 'In District');
		for (var i=0; i<JMSC.years.length; i++) {
		    var y = JMSC.years[i];
		    var r = [""+y];
		    if (y == 2001) {
			r.push(parseFloat(o["row"]["b2_dcca_2001_tertiary_education"]["value"]));
			if (JMSC.geoparentdata != null) r.push(parseFloat(JMSC.geoparentdata["b2dcca2001tertiaryeducation"]));
		    } else {
			break;
		    }
		    d1.addRow(r);
		}
		var v1 = new google.visualization.BarChart(document.getElementById(cid + '-chart1'));
		var o1 = JMSC.infostyles.optsBase;
		o1.hAxis = {
		    maxValue: 50,
		    minValue: 0
		};
		v1.draw(d1, o1); 
	    }

	    // Second section
	    if (o["row"]["c5_dcca_2001_median_income"] !== undefined) {
		var hlab = $('<h5>Labour</h5>');
		var sublab = $('<em class="info-desc">Median monthly income from main employment of working population (HK$)</em>');
		var c2 = $('<div id="'+cid+'-chart2"></div>');
		c.append(hlab);
		c.append(sublab);
		c.append(c2);
		d2 = new google.visualization.DataTable();
		d2.addColumn('string', 'Year');
		d2.addColumn('number', 'In DCCA');
		d2.addColumn('number', 'In District');
		for (var i=0; i<JMSC.years.length; i++) {
		    var y = JMSC.years[i];
		    var r = [""+y];
		    if (y == 2001) {
			r.push(parseFloat(o["row"]["c5_dcca_2001_median_income"]["value"]));
			if (JMSC.geoparentdata != null) r.push(parseFloat(JMSC.geoparentdata["c5dcca2001medianincome"]));
		    } else {
			break;
		    }
		    d2.addRow(r);
		}
		var v2 = new google.visualization.BarChart(document.getElementById(cid + '-chart2'));
		var o2 = JMSC.infostyles.optsBase;
		o2.hAxis = {
		    maxValue: 0,
		    minValue: 40000
		};
		v2.draw(d2, o2); 
	    }

	},
	sb: function(o) {
	    $.log("styling sb");
	},
	optsBase: {
	    chartArea: {
		top: 0,
		left: 0,
	    	width: 160,
		height: 100
	    },
	    legend: {
		position: "in"
	    },
	    width: 160,
	    height: 120
	},
	optsInfoWindowBase: {
	    chartArea: {
		top: 0,
		left: 0,
	    	width: 320,
		height: 200
	    },
	    legend: {
		position: "right"
	    },
	    width: 360,
	    height: 210
	}
    },
    closeSidePanel: function() {
	sp = $("#sidepanel");
	sp.html("");
	/*sp.animate({
	    height: '0'
	}, 500);*/
	sp.hide();
	sp.css("height", "0");
	sp.css("padding", "0");
    },
    openSidePanel: function() {
	sp = $("#sidepanel");
	sp.css("padding", "15px");
	sp.css("border", "1px solid #ABABAB");
	/*sp.animate({
	    height: '120'
	}, 500);*/
	sp.css("height", "120");
	sp.show();
    },
    fillSidePanel: function(o) {
	JMSC.openSidePanel();
	sp = $("#sidepanel");
	sp.html("");
	//sp.append($("<h3>Hong Kong</h3>"));
	if (JMSC.geoparentid > 0) {
	    sp.append($("<h3>District council</h3>"));
	    if (JMSC.geoparentid != null) {
		var geoparentname = JMSC.geoparentdata[JMSC.geoparenttype+"eng"] + " " + JMSC.geoparentdata[JMSC.geoparenttype+"chin"];
		/*var a = $('<a href="javascript:void(0);">' + JMSC.geoparentname + '</a>');
		var h = $("<h4></h4>");
		h.append(a);
		a.click(function(e) {
		});*/
		var h = $('<h4 class="geoparent">' + geoparentname + '</h4>');
		sp.append(h);
	    }
	}
	if (false&&JMSC.geotype !== null) {
	    /*sp.append($("<h3>" + JMSC.geotypenames[JMSC.geotype] + "</h3>"));
	    sp.append($("<h4>" + JMSC.geoname + "</h4>"));*/
	    sp.append($('<div id="info-' + JMSC.geotype + "-" + JMSC.geoid + '" class="info"></div>'));
	    if (JMSC.infostyles[JMSC.geotype] !== undefined) {
		JMSC.infostyles[JMSC.geotype](o);
	    }
	}
    },
    resetGeoIds: function() {
	$.log("resetGeoIds");
	JMSC.geoid = 0;
	JMSC.geoparentid = 0;
	JMSC.geoclicked = null;
	JMSC.geoparentclicked = null;
    },
    clearBounds: function(geotype) {
	var types = [];
	if (geotype !== null) {
	    types = [geotype];
	} else {
	    for (x in JMSC.geoBounds) {
		types.push(x);
	    }
	}
	for (var x=0; x<types.length; x++) {
	    if(JMSC.geoBounds[types[x]]!=null) {
		for(var i=0; i<JMSC.geoBounds[types[x]].length; i++) {
		    JMSC.geoBounds[types[x]][i].setMap(null);
		}
	    }
	    JMSC.geoBounds[types[x]] = [];
	}
    },
    getBoundsFromGeo: function(geotype, geoid, strokeColor, clear) {
	if (geotype.length <= 0 || geoid.length <= 0) {
	    geotype = JMSC.geotype;
	    geoid = JMSC.geoid;
	}
	$.ajax({
	    url: "/census/geo.py/getBounds?geotype=" + geotype + "&geoid=" + encodeURI(geoid),
	    dataType: "json",
	    success: function(r) {
		var c = r['coordinates'];
		var coords = [];
		if (r["type"] == "MultiPolygon") {
		    for(var i=0; i<c.length; i++) {
			var subCoords = [];
			for(var j=0; j<c[i][0].length; j++) {
			    var p = new google.maps.LatLng(c[i][0][j][1],c[i][0][j][0]);
			    subCoords.push(p);
			}
			coords.push(subCoords);
			if (i > 10) {
			    break;
			}
		    }
		} else if (r["type"] == "Polygon") {
		    var subCoords = [];
		    for(var i=0; i<c[0].length; i++) {
			var p = new google.maps.LatLng(c[0][i][1],c[0][i][0]);
			subCoords.push(p);
		    }
		    coords.push(subCoords);
		}
		// Construct the polygon
		if (clear) {
		    JMSC.clearBounds(null);
		} else {
		    JMSC.clearBounds(geotype);
		}
		if (JMSC.geoBounds[geotype] == undefined) JMSC.geoBounds[geotype] = [];
		for(var i=0; i<coords.length; i++) {
		    var strokeWeight = JMSC.strokeWeight;
		    if (geotype == JMSC.geoparenttype) {
			strokeWeight = JMSC.strokeWeight / 2.0;
		    }
		    JMSC.geoBounds[geotype][i] = new google.maps.Polyline({
			path: coords[i],
			strokeColor: strokeColor,
			strokeOpacity: 0.8,
			strokeWeight: strokeWeight
		    });
		    JMSC.geoBounds[geotype][i].setMap(JMSC.map);
		}
	    },
	    complete: function(r,status) {
		//$.log(status);
	    }
	});
    },
    loadInfoWindowGraph: function(o) {
	var out = "";
	switch (JMSC.thisLayer) {
	    case "usuallang":
		var d = new google.visualization.DataTable();
		d.addColumn('string', 'Usual language');
		d.addColumn('number', '%');
		langs = ["cantonese", "other_chinese_dialects", "other_asian_oceanian", "english", "european", "others"];
		total = o["row"]["total"]["value"];
		for (var i=0; i<langs.length; i++) {
		    var l = langs[i];
		    var v = o["row"][l]["value"];
		    if (v !== undefined && v != null && v > 0) {
			v = 100.0 * v / total;
			/*v = "" + v
			v = v1.substr(0, 4);*/
			var r = [l, v];
			d.addRow(r);
		    }
		}
		var viz = new google.visualization.PieChart(document.getElementById(JMSC.thisLayer + '-chart'));
		var o = JMSC.infostyles.optsInfoWindowBase;
		o.hAxis = {
		    title: "Usual language",
		    maxValue: 50,
		    minValue: 0
		};
		viz.draw(d, o); 
		break;
	    case "eduattend":
	    case "edutertiary":
		var d = new google.visualization.DataTable();
		d.addColumn('string', 'Usual language');
		d.addColumn('number', '%');
		break;
	    case "popmedianage":
		if (JMSC.popage == null) {
		    $.ajax({
			url: "/census/popage.js",
			dataType: "json",
			async: false,
			success: function(r) {
			    JMSC.popage = r;
			},
			complete: function(r,status) {
			}
		    });
		}
		if (JMSC.popage == undefined || JMSC.popage == null) return 0;
		var popage = JMSC.popage[JMSC.year][JMSC.geoid];
		var d = new google.visualization.DataTable();
		d.addColumn('string', 'age range');
		d.addColumn('number', 'male');
		d.addColumn('number', 'female');
		d.addColumn('number', 'total');
		var steps = ["0_14","15_29","30_44","45_59","60_74","75+"];//,"Total"];
		for (var i=0; i<steps.length; i++) {
		    var m = popage[steps[i]]["m"];
		    var f = popage[steps[i]]["f"];
		    var v = popage[steps[i]]["t"];
		    var l = steps[i].replace("_","-");
		    if (v !== undefined && v != null) {
			var r = [l, m, f, v];
			d.addRow(r);
		    }
		}
		var viz = new google.visualization.ColumnChart(document.getElementById(JMSC.thisLayer + '-chart'));
		var o = JMSC.infostyles.optsInfoWindowBase;
		o.hAxis = {
		    title: "Age"
		};
		o.width = 400;
		o.height = 240;
		viz.draw(d, o); 
		break;
	    default:
		break;
	}
	return out;
    },
    loadInfoWindow: function(o) {
	if (JMSC.currentLayerData == null) return 0;
	infoWindowOpts = JMSC.infoWindowOpts;
	infoWindowContent = ""
	if (JMSC.geotype !== null) {
	    infoWindowContent += "<h3>" + JMSC.geotypenames[JMSC.geotype] + "</h3>";
	    infoWindowContent += "<h4>" + JMSC.geoname + "</h4>";
	}
	var population_nb = "";
	if (o["row"]["a1_dcca_2001_population"] !== undefined) {
	    population_nb = o["row"]["a1_dcca_2001_population"]["value"];
	} else if (JMSC.geoclicked !== null && JMSC.geoclicked["pop2001"] !== undefined) {
	    population_nb = JMSC.geoclicked["pop2001"];
	}
	var ftcol = JMSC.currentLayerData["ftcol"].replace(/[_\-]*/,"");
	var layertitle = JMSC.currentLayerData["nameen"];
	var value = o["row"][ftcol]["value"];
	var unit = "";
	if (JMSC.currentLayerData["unit"]) unit = JMSC.currentLayerData["unit"];
	if ($.inArray(unit, JMSC.numericalUnits)>=0) value = addCommas(value);
	infoWindowContent += "<h5>" + layertitle + "</h5>";
	infoWindowContent += '<div class="infowindow-val"><span>'+ value +'</span> ' + unit + '</div>';
	if (population_nb.length > 0) {
	    infoWindowContent += '<div class="stat"><span class="note" title="Population in constituency area in 2001">2001 pop</span>: <span class="figure">' + addCommas(population_nb) + '</span></div>';
	}
	if ($.inArray(JMSC.thisLayer, JMSC.layersWithGraphs)>=0) {
	    infoWindowContent += '<div id="'+JMSC.thisLayer+'-chart" class="infowindow-chart '+JMSC.thisLayer+'"></div>';
	}
	infoWindowOpts.content = '<div class="infowindow">' + infoWindowContent + "</div>";
	infoWindowOpts.pixelOffset = o["pixelOffset"];
	infoWindowOpts.position = o["latLng"];
	if (JMSC.openedInfoWindow != null) {
	    JMSC.openedInfoWindow.close();
	}
	JMSC.openedInfoWindow = new google.maps.InfoWindow(infoWindowOpts);
	JMSC.openedInfoWindow.open(JMSC.map);
	google.maps.event.addListener(JMSC.openedInfoWindow, 'domready', function() {
	    JMSC.loadInfoWindowGraph(o);
	});
	google.maps.event.addListener(JMSC.openedInfoWindow, 'closeclick', function() {
	    JMSC.closeSidePanel();
	    JMSC.clearBounds(null);
	    JMSC.resetGeoIds();
	});
	//$.log(JMSC.openedInfoWindow);
    },
    clickFTLayer: function(o) {
	//$.log("clicked");
	$.log(o);
	JMSC.latLngClicked = o.latLng;
	//JMSC.sidepanel(o);
	JMSC.setGeoFromClick(o);
	if (JMSC.geotype == "dcca") {
	    JMSC.getBoundsFromGeo(JMSC.geoparenttype, JMSC.geoparentid, "#FFF", false);
	    JMSC.getBoundsFromGeo(JMSC.geotype, JMSC.geoid, "#000", false);
	} else {
	    JMSC.getBoundsFromGeo(JMSC.geotype, JMSC.geoid, "#000", true);
	}
	JMSC.fillSidePanel(o);
	JMSC.loadInfoWindow(o);
    },
    changeLayerOptions: function() { // Set new layer opts and draw map
	if (JMSC.currentLayerId.length <= 0) return 0;
	JMSC.fusionTableOpts.query.from = JMSC.fusionTableId;
	JMSC.fusionTableOpts.query.select = "boundary";//, " + [JMSC.currentLayerId, "MAXIMUM("+JMSC.currentLayerId+")", "MINIMUM("+JMSC.currentLayerId+")"].join(",");
	var min = parseFloat(JMSC.currentLayerData["minvalue"]);
	var max = parseFloat(JMSC.currentLayerData["maxvalue"]);
	var colors = [];
	try {
	    colors = JMSC.styleGradientColors[JMSC.currentLayerData["color"]];
	} catch (err) {
	    $.log(err);
	    colors = JMSC.styleGradientColors.green;
	}
	var step = (max - min) / JMSC.stylesNbMax;
	var newStyles = [];
	if (JMSC.styleGradient) {
	    newStyles = new Array(1);
	    var style = {};
	    style.select = JMSC.fusionTableColumn;
	    style.where = "";
	    style.polygonOptions = {
		fillColorStyler: {
		    kind: "gradient",
		    columnName: JMSC.fusionTableColumn,
		    gradient: {
			min: min,
			max: max,
			colors: {}
		    }
		}
	    };
	    for (var i=0; i<JMSC.stylesNbMax; i++) {
		style.polygonOptions.fillColorStyler.gradient.colors[i] = {
		    color: "#"+colors[i],
		    opacity: 0.6
		};
		$("#legend-"+i).css("background-color","#"+colors[i])
	    }
	    $("#legtext-0").html(min);
	    //$("#legtext-"+JMSC.stylesNbMax).html(max);
	    newStyles[0] = style;
	} else {
	    newStyles = new Array(JMSC.stylesNbMax);
	    for (var i=0; i<JMSC.stylesNbMax; i++) {
		var style = {};
		style.select = JMSC.fusionTableColumn;
		style.polygonOptions = {
		    fillColor: "#"+colors[i],
		    fillOpacity: 0.6,
		    strokeColor: "#"+colors[i]
		};
		if (i == 0) {
		    style.where = JMSC.fusionTableColumn + " < " + (min + step);
		} else if (i == JMSC.stylesNbMax - 1) {
		    style.where = JMSC.fusionTableColumn + " >= " + (max - step);
		} else {
		    style.where = JMSC.fusionTableColumn + " >= " + (min + (step * i));
		    style.where += " AND " + JMSC.fusionTableColumn + " < " + (min + (step * (i + 1)));
		}
		$("#legend-"+i).css("background-color","#"+colors[i]);
		$("#legend-"+i).attr("title", min + (step * i) + " - " + (min + (step * (i + 1))));
		var bottomVal = min + step * i;
		var topVal = min + step * (i + 1);
		if ($.inArray(JMSC.currentLayerData["unit"], JMSC.numericalUnits)>=0) bottomVal = addCommas(bottomVal);
		if ($.inArray(JMSC.currentLayerData["unit"], JMSC.numericalUnits)>=0) topVal = addCommas(topVal);
		if (i >= 0 && i < JMSC.stylesNbMax) {
		    if (JMSC.currentLayerData["unit"].indexOf("$") >= 0) {
			if (i == 0) {
			    $("#legtext-0").html("Less than $"+(min+step));
			} else if (i+1 == JMSC.stylesNbMax) {
			    $("#legtext-"+i).html("$"+(min+step)+" or more");
			} else {
			    $("#legtext-"+i).html("$"+bottomVal+"-$"+topVal);
			}
		    } else if (JMSC.currentLayerData["unit"].indexOf("%") >= 0) {
			if (i == 0) {
			    $("#legtext-0").html("Less than "+(min+step)+"%");
			} else if (i+1 < JMSC.stylesNbMax || (JMSC.stylesNbMax == i+1 && topVal == "100")) {
			    $("#legtext-"+i).html(bottomVal+"-"+topVal+"%");
			} else if (i+1 == JMSC.stylesNbMax) {
			    $("#legtext-"+i).html(bottomVal+"% or more");
			}
		    } else {
			if (i == 0) {
			    $("#legtext-0").html("Less than "+(min+step));
			} else if (i+1 < JMSC.stylesNbMax) {
			    $("#legtext-"+i).html(bottomVal+"-"+topVal);
			} else {
			    $("#legtext-"+i).html(bottomVal+" or more");
			}
		    }
		} else {
		    $("#legtext-"+i).html("");
		}
		newStyles[i] = style;
	    }
	    //$("#legtext-"+JMSC.stylesNbMax).html(">"+max);
	    //$.log(JMSC.currentLayerData);
	    //if (JMSC.currentLayerData["unit"] !== undefined) $("#legunit").html(JMSC.currentLayerData["unit"]);
	}
	JMSC.fusionTableOpts.styles = newStyles;
	//$log(JMSC.fusionTableOpts);
	//JMSC.loadedLayer.setOptions(JMSC.fusionTableOpts);
	if (JMSC.openedInfoWindow != null) {
	    JMSC.openedInfoWindow.close();
	}
    },
    changeYearMenu: function(e) {
	var y = parseInt(JMSC.yearSlider.slider("value"));
	if (JMSC.currentLayerData==null) return 0;
	JMSC.thisLayer = JMSC.currentLayerData["mylayerid"]; // the name of layer (spans many years)
	var oldLayerData = JMSC.currentLayerData;
	var changed = false;
	for (var i=0; i<JMSC.layermenu.length; i++) {
	    if (JMSC.layermenu[i]["mylayerid"] == JMSC.thisLayer && parseInt(JMSC.layermenu[i]["year"]) == y) {
		JMSC.currentLayerData = JMSC.layermenu[i];
		JMSC.currentLayerId = JMSC.currentLayerData["id"];
		$.log(JMSC.currentLayerData);
		changed = true;
		if (JMSC.currentLayerData["ftid"] !== undefined) {
		    JMSC.fusionTableId = parseInt(JMSC.currentLayerData["ftid"]);
		} else { // undefined, so use default
		    JMSC.fusionTableId = JMSC.fusionTableIdDefault;
		}
		if (JMSC.currentLayerData["ftcol"] !== undefined) {
		    JMSC.fusionTableColumn = JMSC.currentLayerData["ftcol"];
		} else {
		    JMSC.fusionTableColumn = JMSC.currentLayerData["ftid"];
		}
		//$.log(JMSC.currentLayerData);
		if (JMSC.currentLayerData["geo"] !== undefined) {
		    JMSC.geotype = JMSC.currentLayerData["geo"];
		} else {
		    JMSC.geotype = null;
		}
		break;
	    }
	}
	if (!changed && oldLayerData["year"] !== undefined) {
	    JMSC.yearSlider.slider("value", oldLayerData["year"]);
	}
	if (changed) {
	    JMSC.changeLayerOptions();
	    JMSC.load2d();
	}
    },
    changeLayerMenu: function(e) {
	if (JMSC.geotype !== null) oldGeotype = JMSC.geotype;
	else oldGeotype = null;
	JMSC.resetGeoIds();
	JMSC.currentLayerData = null;
	JMSC.currentLayerId = null;
	var value = $("#"+JMSC.layerMenuId).val();
	if (value.search(/\d+$/)>=0) {
	    m = value.match(/(\d+)$/);
	    if (m) {
		JMSC.year = parseInt(m[1]);
		JMSC.yearSlider.slider("value", JMSC.year);
	    }
	} else if (value.search(/YYYY$/)) {
	    value = value.replace(/YYYY$/,JMSC.year);
	}
	var oldFusionTableId = JMSC.fusionTableId;
	for (var i=0; i<JMSC.layermenu.length; i++) {
	    if (JMSC.layermenu[i]["id"] == value) {
		JMSC.currentLayerData = JMSC.layermenu[i];
		JMSC.thisLayer = JMSC.currentLayerData["mylayerid"]; // the name of layer (spans many years)
		JMSC.currentLayerId = value;
		if (JMSC.currentLayerData["ftid"] !== undefined) {
		    JMSC.fusionTableId = parseInt(JMSC.currentLayerData["ftid"]);
		} else { // undefined, so use default
		    JMSC.fusionTableId = JMSC.fusionTableIdDefault;
		}
		if (JMSC.currentLayerData["ftcol"] !== undefined) {
		    JMSC.fusionTableColumn = JMSC.currentLayerData["ftcol"];
		} else {
		    JMSC.fusionTableColumn = JMSC.currentLayerData["ftid"];
		}
		//$.log(JMSC.currentLayerData);
		if (JMSC.currentLayerData["geo"] !== undefined) {
		    JMSC.geotype = JMSC.currentLayerData["geo"];
		} else {
		    JMSC.geotype = null;
		}
		break;
	    }
	}
	$.log(oldGeotype);
	$.log(JMSC.currentLayerData);
	//if (oldGeotype != null && oldGeotype != JMSC.geotype) {
	JMSC.closeSidePanel();
	JMSC.clearBounds(null);
	//}
	if (JMSC.currentLayerData["year"] !== undefined) {
	    var y = parseInt(JMSC.currentLayerData["year"]);
	    if (JMSC.year != y && JMSC.years.indexOf(y) >= 0) {
		JMSC.year = y;
		JMSC.yearSlider.slider("value", JMSC.year);
	    }
	}
	JMSC.changeLayerOptions();
	JMSC.load2d();
	document.location.href =  JMSC.siteUrl + "#" + JMSC.currentLayerId;

	if (JMSC.geoid != 0 && JMSC.latLngClicked != null) {
	    //google.maps.event.trigger(JMSC.loadedLayer, 'click', {"latLng": JMSC.latLngClicked});
	    $.log("reopen (not implemented)");
	}

    },
    populateControls: function() {
	var c = $("#controls");
	var container = $('<div></div>');
	container.addClass('layermenu-container');
	var layerMenu = $('<select id="' + JMSC.layerMenuId + '"></select>');
	container.append(layerMenu);
	var layerMenuH = $('<option value="">' + JMSC.i8n.layermenu + '</option>');
	layerMenu.append(layerMenuH);
	layerMenu.change(JMSC.changeLayerMenu);
	c.append(container);
	for (var i=0; i<JMSC.layermenu.length; i++) {
	    var isconsolidated = false;
	    if (JMSC.layermenu[i]["id"] == undefined) continue;
	    if (i+2<JMSC.layermenu.length&&
	    JMSC.layermenu[i]["mylayerid"]==JMSC.layermenu[i+1]["mylayerid"]&&
	    JMSC.layermenu[i]["mylayerid"]==JMSC.layermenu[i+2]["mylayerid"]) {
		isconsolidated = true;	
	    }
	    var value = JMSC.layermenu[i]["id"];
	    var classname = "";
	    var label = "";
	    if (JMSC.layermenu[i]["nameshorten"]) {
		label = JMSC.layermenu[i]["nameshorten"];
	    } else if (JMSC.layermenu[i]["nameen"]) {
		label = JMSC.layermenu[i]["nameen"];
	    } else if (JMSC.layermenu[i]["id"]) {
		label = JMSC.layermenu[i]["id"];
	    }
	    if (isconsolidated) {
		value = value.replace(/2001$/, 'YYYY');
		label = label.replace(/, 2001$/, '');
	    }
	    var opt = $('<option>' + label + '</option>');
	    if (JMSC.layermenu[i]["header"]) {
		opt.addClass("menuHeader");
		opt.attr("disabled", "disabled");
	    } else {
		opt.val(value);
	    }
	    layerMenu.append(opt);
	    if (isconsolidated) i = i+2;
	}
    },
    populateLegend: function() {
	var c = $("#bottom");
	//var container = $('<div></div>');
	var container = $('<fieldset><legend>Legend</legend></fieldset>');
	container.attr("id", "legend-colors");
	container.addClass("legend-container");
	for (var i=0; i<JMSC.stylesNbMax; i++) {
	    var legline = $('<div></div>');
	    legline.addClass('legline');
	    var legtext = $('<div></div>');
	    legtext.html("&nbsp;");
	    legtext.addClass('legtext');
	    legtext.attr("id", "legtext-"+i);
	    legtext.css("left", -62+"px");
	    var legendblock = $("<div></div>");
	    legendblock.addClass("legend");
	    legendblock.attr("id", "legend-"+i);
	    legendblock.css("left", JMSC.sliderStepPx*i-15+"px");
	    legline.append(legendblock);
	    legline.append(legtext);
	    container.append(legline);
	}
	var legtext = $('<div></div>');
	legtext.html("&nbsp;");
	legtext.addClass('legtext');
	legtext.attr("id", "legtext-"+JMSC.stylesNbMax);
	legtext.css("left", -10+"px");
	//container.append(legtext);
	var legunit = $('<div></div>');
	legunit.html("");
	legunit.addClass('legunit');
	legunit.attr("id", "legunit");
	legunit.css("left", -10+"px");
	container.append(legunit);
	c.append(container);
    },
    populateSliders: function() {
	var c = $("#controls");
	//var container = $('<fieldset><legend>Year</legend></fieldset>');
	var container = $('<div></div>');
	container.addClass("sliders-container");
	var slidr = $('<div id="year-slider"></div>');
	container.append(slidr);
	c.append(container);
	JMSC.yearSlider = $("#year-slider").slider({
	    change: JMSC.changeYearMenu,
	    animate: true,
	    min: JMSC.years[0],
	    max: JMSC.years[JMSC.years.length-1],
	    value: JMSC.year,
	    step: 5
	});
	slidr.css("width", JMSC.sliderStepPx*JMSC.years.length+"px");
	for (var i=0; i<JMSC.years.length; i++) {
	    var slitext = $('<div></div>');
	    slitext.html(JMSC.years[i]);
	    slitext.addClass('slitext');
	    slitext.css("left", JMSC.sliderStepPx*i-15+"px");
	    container.append(slitext);
	}
    },
    jumpToUrlFixMenus: function() {
	var url = document.location.href;
	var m = url.match(/#(\w+)$/);
	if (m) {
	    $.log(m);
	}
    },
    jumpToUrl: function() {
    	var url = document.location.href;
	var m = url.match(/#(\w+)$/);
	if (m) {
	    var layerid = m[1];
	    if (layerid.search(/\d+$/)>=0) {
		m = layerid.match(/(\d+)$/);
		if (m) {
		    JMSC.year = parseInt(m[1]);
		    JMSC.yearSlider.slider("value", JMSC.year);
		}
	    } else if (layerid.search(/YYYY$/)) {
		layerid = layerid.replace(/YYYY$/,JMSC.year);
	    }
	    JMSC.currentLayerId = layerid;
	    JMSC.thisLayer = layerid.replace(/(\d+)$/,"");
	    $("#"+JMSC.layerMenuId).val(JMSC.currentLayerId);
	    JMSC.changeLayerMenu();
	}
    }
};
$(document).ready(function() {
    JMSC.init();
});

