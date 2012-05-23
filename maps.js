var JMSC = {
    fusionTableIdDefault: 3034108,
    fusionTableId: 3034108,
    fusionTablesSqlApi: "https://fusiontables.googleusercontent.com/fusiontables/api/query?sql=",
    numericalUnits: ["people", "people / km²", "HK$"],
    layersWithGraphs: ["popmedianage","usuallang"],
    months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
    geoid: 0,
    geotype: "dc",
    geotypenames: { "dc": "District council", "dcca": "Constituency area", "tpu": "Tertiary planning unit", "sb": "Street block", "bb": "Building block" },
    geokeys: { "sb": "ful" },
    geonopoly: ["bb", "point"],
    bbcodecolname: "BUILDBLOCK_CENCODE",
    bbmarkers: [],
    geoBounds: {},
    geoparenttype: "",
    geoparentid: 0,
    geoclicked: null,
    geoparentclicked: null,
    lngLatClicked: null,
    thisLayer: "",
    strokeWeight: 3.0,
    years: [2001, 2006, 2011],
    yearsDefault: [2001, 2006, 2011],
    currentFilter: null,
    filtersopts: {
	"buildings": {
	    "occupation_permit_types": [
		null,
		{"label": "Domestic", "terms": ["Domestic"]},
		{"label": "Composite", "terms": ["Composite"]},
		null,
		{"label": "Non-domestic", "terms": ["Non-Domestic"]}
	    ],
	    "building_types": [
		{"label": "Schools", "terms": ["school", "education", "academic"]},
		{"label": "Residential", "terms": ["resident", "apartment", "flat"]},
		{"label": "Offices", "terms": ["office", "staff"]},
		null,
		{"label": "Hotels", "terms": ["hotel"]},
	    ],
	    "address_site": null,
	    "authorized_person": null,
	    "registered_structural_engineer": null,
	    "applicant": null
	}
    },
    rangeValues: {
	"min": 200501,
	"max": 201212,
	"start": 200501,
	"end": 201112,
	"start_init": 200501,
	"end_init": 201112,
	"start_val": 0,
	"end_val": 1000,
	"length": 1000,
	"stepval": null
    },
    poi: {
	zoom: null,
	center: null,
	id: null
    },
    year: 2001,
    yearSlider: null,
    rangeSlider: null,
    sliderStepPx: 100,
    fusionTableColumn: "",
    fusionTableQuery: {
	select: 'boundary',
	from: null,
	where: null
    },
    fusionTableStyles: [{
	polygonOptions: {
	    fillColor: "#FFFFFF",
	    fillOpacity: 0.8
	}
    }],
    fusionTableOpts: {
	suppressInfoWindows: true
    },
    kmlLayerOpts: {
	suppressInfoWindows: false,
	preserveViewport: true
    },
    kmlUrl: "",
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
	multi: ["2CB1E1", "92C500", "FFFF1C", "FFB61C", "F83A3A"],
	marker: ["small_blue", "measle_turquoise", "small_green", "small_yellow", "small_red"],
	marker_hex: ["9999FF", "99FFFF", "99FF99", "FFFF99", "FF6666"]
    },
    mapStyles: {
	minimal: [
	  {
	    stylers: [
	      { visibility: "off" }
	    ]
	  },{
	    featureType: "water",
	    stylers: [
	      { visibility: "on" },
	      { lightness: 50 },
	      { saturation: -50 }
	    ]
	  },{
	    featureType: "administrative",
	    stylers: [
	      { visibility: "on" }
	    ]
	  },{
	    featureType: "poi",
	    stylers: [
	      { visibility: "off" }
	    ]
	  },{
	    featureType: "landscape",
	    elementType: "geometry",
	    stylers: [
	      { visibility: "on" },
	      { lightness: -40 }
	    ]
	  },{
	    featureType: "landscape",
	    elementType: "labels",
	    stylers: [
	      { visibility: "on" }
	    ]
	  }

	]
    },
    styleGradient: false,
    currentLayerId: "",
    currentLayerData: null,
    currentSection: "census",
    loadedLayer: null,
    loadedKml3d: null,
    ge: null,
    ge_ready: false,
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
    baseUrlKml: "http://" + location.hostname + "/datamap/geo/",
    placesMenuId: "placesmenu",
    layerMenuId: "layermenu",
    filterMenuId: "filtermenu",
    i8n: null,
    i8n_en: {
	layermenu: "Layers",
	placesmenu: "Places of interest",
	filtermenu: "Filter by:"
    },
    i8n_tc: {
	layermenu: "Layers",
	placesmenu: "Places of interest",
	filtermenu: "Filters"
    },
    i8n_sc: {
	layermenu: "Layers",
	placesmenu: "Places of interest",
	filtermenu: "Filters"
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
	JMSC.populatePlaces();
	JMSC.populateControls();
	JMSC.populateYearSlider();
	JMSC.populateRangeSlider();
	JMSC.populateFilters();
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
	JMSC.poi.zoom = JMSC.zoomStart;
	JMSC.poi.center = myLatlng;
	JMSC.poi.id = null;
	JMSC.map = new google.maps.Map(JMSC.mapdiv.get(0), mapOptions);
	JMSC.map.mapTypes.set('minimal', mapStyleMinimal);
	JMSC.map.setMapTypeId('minimal');
	JMSC.fusionTableOpts.map = JMSC.map;
	JMSC.kmlLayerOpts.map = JMSC.map;
	JMSC.mode3d = false;
	if (JMSC.atInit) {
	    JMSC.load2d();
	}
	google.maps.event.addListener(JMSC.map, 'bounds_changed', JMSC.updatePlacesMenu);
	//JMSC.jumpToUrl();
    },
    loadKml2d: function() {
	$.log("loadKml2d");
	JMSC.atInit = false;
	JMSC.showLoadingBar();
	JMSC.unload2d();
	JMSC.kmlUrl = JMSC.baseUrlKml + JMSC.currentLayerId + ".kmz";
       	JMSC.loadedLayer = new google.maps.KmlLayer(JMSC.kmlUrl, JMSC.kmlLayerOpts);
	google.maps.event.addListener(JMSC.loadedLayer, 'click', JMSC.clickKmlLayer);
	JMSC.hideLoadingBar();
    },
    loadFT2d: function() {
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
    load2d: function() {
	if (JMSC.currentLayerData == null) return 0;
	switch (JMSC.currentLayerData.section) {
	    case "googleearth":
		JMSC.loadKml2d();
		break;
	    case "buildings":
	    case "census":
	    default:
		JMSC.loadFT2d();
	}
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
	    $.log("Create GEarth instance");
	    google.earth.createInstance(JMSC.gediv_dom, JMSC.plainSuccessCB, JMSC.plainFailureCB);
	} else {
	    JMSC.load3d();
	}
    },
    plainSuccessCB: function(instance) {
	$.log("Success creating GEarth instance");
	JMSC.ge_ready = true;
	JMSC.ge = instance;
	JMSC.mode3d = true;
	JMSC.ge.getWindow().setVisibility(true);
	JMSC.loadGeOptions();
	JMSC.load3d();
	$.log("API version: " + JMSC.ge.getApiVersion());
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
	//JMSC.unload3d();
	JMSC.showLoadingBar();
	JMSC.kmlUrl = JMSC.baseUrlKml + JMSC.currentLayerId + ".kmz";
	//$.log(JMSC.kmlUrl);
	google.earth.fetchKml(JMSC.ge, JMSC.kmlUrl, function(kmlObject) {
	    if (kmlObject) {
		JMSC.unload3d();
		if ('getFeatures' in kmlObject) {
		    kmlObject.getFeatures().appendChild(kmlObject);
		}
		JMSC.loadedKml3d = kmlObject;
		JMSC.ge.getFeatures().appendChild(kmlObject);
		if (kmlObject.getAbstractView()) {
		    JMSC.ge.getView().setAbstractView(kmlObject.getAbstractView());
		} else {
		    JMSC.zoomToPlace();
		}
		JMSC.hideLoadingBar();
	    } else {
		JMSC.hideLoadingBar();
	    }
	});
    },
    unload3d: function() {
	 if(JMSC.ge==null) return 0;
	 if(JMSC.ge.getFeatures().hasChildNodes()) {
	     JMSC.ge.getFeatures().removeChild(JMSC.loadedKml3d);
	 }
     },
    showLoadingBar: function() {
	$("#status").innerHTML = JMSC.loadingBarHTML;
    },
    hideLoadingBar: function() {
	$("#status").innerHTML = "";
    },
    updatePlacesMenu: function() {
	if (JMSC.poi.center !== undefined && JMSC.poi.center !== null) {
	    if (JMSC.map.getBounds().contains(JMSC.poi.center) && JMSC.map.getZoom() < JMSC.poi.zoom) {
		$("ul#placesmenu li").removeClass("selected");
		JMSC.poi.zoom = null;
		JMSC.poi.center = null;
		JMSC.poi.id = null;
	    }
	} else return 0;
    },
    setGeoFromClick: function(o) {
	JMSC.resetGeoIds();
	try {
	    if (JMSC.geokeys[JMSC.geotype] !== undefined) {
		JMSC.geoid = Number(o.row[JMSC.geokeys[JMSC.geotype]]["value"]);
	    } else {
		JMSC.geoid = o.row[JMSC.geotype]["value"];
	    }
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
		try {
		    var m = JMSC.geoid.match(/(\d+)\/(\d+)/);
		    if (m) JMSC.geoparentid = Number(m[2]);
		} catch (e) {
		    JMSC.geoparentid = parseInt(JMSC.geoid / 1000);
		}
		JMSC.geoname = JMSC.geoid;
		break;
	    case "bb":
		JMSC.geoparenttype = "sb";
		try {
		    JMSC.geoparentid = Number(o.row["TPU1"]["value"] + o.row["TPU2"]["value"] + o.row["SB"]["value"]);
		} catch (e) {
		    JMSC.geoparentid = Number(o.row["SB"]["value"]);
		}
		JMSC.geoname = o.row["BUILDBLOCK_CENCODE"]["value"];
		JMSC.geoid = o.row["BUILDBLOCK_CENCODE"]["value"];
		if (o.row["FROM_NO"]["value"].length > 0 && o.row["TO_NO"]["value"].length > 0) {
		    JMSC.geoname += " - " + o.row["FROM_NO"]["value"];
		    if (o.row["FROM_NO_A"]["value"].length > 0) JMSC.geoname += o.row["FROM_NO_A"]["value"];
		    if ((o.row["FROM_NO"]["value"] + o.row["FROM_NO_A"]["value"]) != (o.row["TO_NO"]["value"] + o.row["TO_NO_A"]["value"])) {
			JMSC.geoname += "-" + o.row["TO_NO"]["value"];
			if (o.row["TO_NO_A"]["value"].length > 0) JMSC.geoname += o.row["TO_NO_A"]["value"];
		    }
		    if (o.row["NAME_ENG"]["value"].length > 0) {
			JMSC.geoname += " " + o.row["NAME_ENG"]["value"];
		    }
		}
		if (o.row["EST_ENG"]["value"].length > 0) {
		    JMSC.geoname += " - " + o.row["EST_ENG"]["value"];
		    if (o.row["BLDG_ENG"]["value"].length > 0) {
			JMSC.geoname += "(" + o.row["BLDG_ENG"]["value"] + ")";
		    }
		}
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
    openSidePanel: function(w,h) {
	sp = $("#sidepanel");
	sp.css("padding", "15px");
	sp.css("width", w);
	sp.css("border", "1px solid #ABABAB");
	/*sp.animate({
	    height: '120'
	}, 500);*/
	sp.css("height", h);
	sp.show();
    },
    fillSidePanel: function(o) {
	sp = $("#sidepanel");
	sp.html("");
	switch (JMSC.currentSection) {
	    case "buildings":
		var cols = ["address_firstrow", "occupation_permit", "occupation_permit_type", "gross_floor_area_domestic", "gross_floor_area_nondomestic", "usable_floor_area_domestic", "usable_floor_area_non_domestic", "applicant", "authorized_person", "registered_structural_engineer"];
		var colnames = ["Short address", "Occupation Permit #", "Permit type", "Gross floor area (domestic)", "Gross floor area (non-domestic)", "Usable floor area (domestic)", "Usable floor area (non-domestic)", "Applicant", "Authorized Person", "Registered Structural Engineer"];
		JMSC.openSidePanel(220,280);
		sp.append($("<h3>Building details</h3>"));
		var ul = $('<ul class="bd-infos"></ul>');
		for (var i=0; i<cols.length; i++) {
		    if (JMSC.bd[cols[i]] !== undefined && JMSC.bd[cols[i]] !== null) {
			var v = JMSC.bd[cols[i]];
			if (v == "-0") v = "0";
			if (v == "null") v = "-";
			//if (v == 0) continue;
			if (cols[i].indexOf("_area") > 0) v += " m<sup>2</sup>"
			if (cols[i] == "address_firstrow") v = '<a href="http://maps.google.com.hk/maps?q=' + encodeURI(v) + '" target="_blank">' + v + '</a>';
			if (cols[i] == "authorized_person" || cols[i] == "registered_structural_engineer" || cols[i] == "applicant") v = '<a href="http://www.google.com.hk/search?q=' + encodeURI(v) + '" target="_blank">' + v + '</a>';
			var li = $('<li><div class="key">' + colnames[i] + '</div> <div class="value">' + v + '</div></li>');
			ul.append(li);
		    }
		}
		sp.append(ul);
		break;
	    case "census":
	    default:
		JMSC.openSidePanel(160,120);
		//sp.append($("<h3>Hong Kong</h3>"));
		if (JMSC.geoparentid > 0 && JMSC.geotype != "bb") {
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
	}
    },
    resetGeoIds: function() {
	JMSC.geoid = 0;
	JMSC.geoparentid = 0;
	JMSC.geoclicked = null;
	JMSC.geoparentclicked = null;
    },
    clearLegend: function() {
	for (var i=-1; i<JMSC.stylesNbMax; i++) {
	    n = i;
	    if (i < 0) n = "n";
	    $("#legtext-"+n).html("");
	    $("#legline-"+n).hide();
	}
    },
    clearBB: function(geotype) {
	for (var i=0; i<JMSC.bbmarkers.length; i++) {
	    JMSC.bbmarkers[i].setMap(null);
	    JMSC.bbmarkers[i] = null;
	}
	JMSC.bbmarkers = [];
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
    buildingDetails: function(tid,bid) {
	$(".bd").removeClass("selected");
	$("#bd-" + bid).addClass("selected");
	$.ajax({
	    url: "/datamap/data.py/getBuildingDetails?typeid=" + tid + "&rowid=" + bid,
	    dataType: "json",
	    success: function(r) {
		JMSC.bd = r;
		JMSC.fillSidePanel();
		if (r.msg !== undefined) {
		    $("#bd-" + bid).removeClass("selected");
		}
	    }
	});
    },
    getBoundsFromGeo: function(geotype, geoid, strokeColor, clear) {
	if (geotype.length <= 0 || geoid.length <= 0) {
	    geotype = JMSC.geotype;
	    geoid = JMSC.geoid;
	}
	var url_after = "";
	if (JMSC.currentSection == "buildings") { // geo = sb
	    url_after = "&year=2006";
	    try {
		var m = geoid.match(/(\d+)\/(\d+)/);
		if (m) {
		    var tpu = Number(m[1]);
		    var sb = Number(m[2]);
		    if (sb < 10) geoid = "00" + sb;
		    if (sb < 100) geoid = "0" + sb;
		    geoid = "" + tpu + geoid;
		} else {
		    geoid = geoid.replace(/\//,"");
		}
	    } catch (e) {
		var tpu = parseInt(geoid / 1000);
		var sb = parseInt(geoid % 1000);
	    }
	}
	$.ajax({
	    url: "/datamap/geo.py/getBounds?geotype=" + geotype + "&geoid=" + encodeURI(geoid) + url_after,
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
	switch (JMSC.currentSection) {
	    case "buildings":
		break;
	    case "census":
	    default:
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
		    case "mosedutertiary":
			var d = new google.visualization.DataTable();
			d.addColumn('string', 'Usual language');
			d.addColumn('number', '%');
			break;
		    case "popmedianage":
			if (JMSC.popage == null) {
			    $.ajax({
				url: "/datamap/popage.js",
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
		} // end inside switch (current layer)
	} // end outside switch (current section)
	return out;
    },
    loadOverlappingData: function(o) {
	var lat = o.latLng.lat();
	var lng = o.latLng.lng();
	var geocol = "location";
	if (JMSC.currentLayerData.geocolname !== undefined) geocol = JMSC.currentLayerData.geocolname;
	var sql = "SELECT * FROM " + JMSC.fusionTableId + " WHERE ";
	sql += "ST_INTERSECTS(" + geocol + ",CIRCLE(LATLNG("+lat+","+lng+"),10))"
	sql += "&jsonCallback=?"
	sql = sql.replace(/ /g,"+");
	$.ajax({
	    url: JMSC.fusionTablesSqlApi + encodeURI(sql),
	    dataType: "jsonp",
	    crossDomain: true,
	    success: function(r) {
		$.log(r);
	    }
	});
    },
    loadBuildingBlockData: function(o) {
	var lat = o.latLng.lat();
	var lng = o.latLng.lng();
	var sql = "SELECT * FROM " + JMSC.fusionTableId + " WHERE ";
	sql += JMSC.bbcodecolname + " = '" + o.row[JMSC.bbcodecolname]["value"] + "'";
	sql += "&jsonCallback=?"
	sql = sql.replace(/ /g,"+");
	$.ajax({
	    url: JMSC.fusionTablesSqlApi + encodeURI(sql),
	    dataType: "jsonp",
	    crossDomain: true,
	    success: function(r) {
		$.log(r);
		var infoWindowOpts = JMSC.infoWindowOpts;
		var infoWindowContent = "";
		var geocol = "point";
		if (JMSC.currentLayerData.geocolname !== undefined) geocol = JMSC.currentLayerData.geocolname;
		var cols = r.table.cols;
		var rows = r.table.rows;
		var geocolid = -1;
		for (var i=0; cols.length; i++) {
		    if (cols[i] == geocol) {
			geocolid = i;
			break;
		    }
		}
		JMSC.clearBB();
		for (var i=0; i<rows.length; i++) {
		    var geo = rows[i][geocolid];
		    var coor = rows[i][geocolid].coordinates;
		    var type = rows[i][geocolid].type;
		    var lat = coor[1];
		    var lng = coor[0];
		    /*$.log(lat);
		    $.log(lng);
		    $.log(type);
		    break;*/
		    var latLng = new google.maps.LatLng(lat, lng);
		    var marker = new google.maps.Marker({
			position: latLng,
			title: rows[i][0]
		    });
			//map: JMSC.map,
		    marker.setMap(JMSC.map);
		    JMSC.bbmarkers.push(marker);
		}
		if (JMSC.geotype !== null) {
		    infoWindowContent += "<h3>" + JMSC.geotypenames[JMSC.geotype] + "</h3>";
		    infoWindowContent += '<h4 class="bb">' + JMSC.geoname + "</h4>";
		}
		infoWindowContent += "<em>This building</em>"
		infoWindowContent += "<ul>"
		if (o.row["ERECT_DATE"]["value"].indexOf("111101") != 0) {
		    var month = o.row["ERECT_DATE"]["value"];
		    month = JMSC.months[Number(month) % 100 - 1].substring(0,3) + "&nbsp;" + Math.floor(month / 100);
		    //infoWindowContent += "<li>ERECT_DATE: " + o.row["ERECT_DATE"]["value"].substring(0,4) + "-" + o.row["ERECT_DATE"]["value"].substr(4,2) + "</li>"
		    infoWindowContent += "<li>ERECT_DATE: " + month + "</li>"
		}
		infoWindowContent += "<li>STOREYS: " + o.row["STOREYS"]["value"] + "</li>"
		infoWindowContent += "<li>LQ_CNT: " + o.row["LQ_CNT"]["value"] + "</li>"
		infoWindowContent += "<li>BLDG_TYPE: " + o.row["BLDG_TYPE"]["value"] + "</li>"
		infoWindowContent += "</ul>"
		infoWindowContent += "<hr/>"
		infoWindowContent += "<em>Entire block</em>"
		var population_nb = "";
		if (o["row"]["population"] !== undefined) {
		    population_nb = o["row"]["population"]["value"].split(".")[0];
		}
		var ftcol = JMSC.currentLayerData.ftcol.replace(/[_\-]*/,"");
		var layertitle = JMSC.currentLayerData["nameen"];
		var value = Number(o["row"][ftcol]["value"]);
		var unit = "";
		if (JMSC.currentLayerData["unit"]) unit = JMSC.currentLayerData["unit"];
		if ($.inArray(unit, JMSC.numericalUnits)>=0) value = addCommas(value);
		infoWindowContent += "<h5>" + layertitle + "</h5>";
		infoWindowContent += '<div class="infowindow-val"><span>'+ value +'</span> ' + unit + '</div>';
		if (population_nb.length > 0) {
		    infoWindowContent += '<div class="stat"><span class="note" title="Population in building block in 2006">2006 pop</span>: <span class="figure">' + addCommas(population_nb) + '</span></div>';
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
		    JMSC.clearBB();
		});
	    }
	});
    },
    loadInfoWindow: function(o) {
	$.log(o);
	if (JMSC.currentLayerData == null) return 0;
	infoWindowOpts = JMSC.infoWindowOpts;
	infoWindowContent = ""
	if (JMSC.geotype !== null) {
	    infoWindowContent += "<h3>" + JMSC.geotypenames[JMSC.geotype] + "</h3>";
	    infoWindowContent += "<h4>" + JMSC.geoname + "</h4>";
	}
	switch (JMSC.currentSection) {
	    case "buildings":
		var section_title = "";
		var unavailable_filters = [];
		switch (JMSC.thisLayer) {
		    case "approved":
			section_title = "Buildings with plans approved";
			section_id = 3;
			unavailable_filters = ["occupation_permit_types"];
			break;
		    case "commenced":
			section_title = "Buildings with work commenced";
			section_id = 4;
			unavailable_filters = ["occupation_permit_types"];
			break;
		    case "completed":
		    default:
			section_title = "Completed buildings";
			section_id = 6;
			unavailable_filters = [];
			break;
		}
		infoWindowContent = "";
		var addresses = o["row"]["addresses"]["value"].split("~~");
		var building_types = o["row"]["building_types"]["value"].split("~~");
		var months = o["row"]["months"]["value"].split("~~");
		var ids = o["row"]["ids"]["value"].split(",");
		var declared_building_costs = [];
		if (JMSC.thisLayer == "completed") declared_building_costs = o["row"]["declared_building_costs"]["value"].split("~~");
		var oi = new Array(); // ordered indexes
		for (var i=0; i<ids.length; i++) { // going through ids
		    var nid = Number(ids[i]); // numerical id
		    ids[i] = nid;
		    if (oi.length == 0) {
			oi.push(i);
		    } else {
			for (var j=0; j<oi.length; j++) {
		    	    var curr_index = oi[j];
	    		    var prev_index = oi[j-1];
    			    var curr_id = Number(ids[curr_index]);
			    var prev_id = Number(ids[prev_index]);
			    if (oi.length == 1 && prev_index == undefined) {
				if (nid <= curr_id) oi.unshift(i);
				else oi.push(i);
				break;
			    } else if (prev_index == undefined) {
				if (nid < curr_id) {
				    oi.unshift(i);
				    break;
				}
			    } else if (nid >= prev_id && nid < curr_id) {
	    			oi.splice(j,0,i);
		    		break;
			    } else if ((j+1) == oi.length) {
				oi.push(i);
				break;
			    }
			}
		    }
		}
		var costs_i = declared_building_costs.length - 1;
		var res_valid = [];
		var bldg_costs_header = ""
		for (var i=oi.length-1; i>=0; i--) {
		    var bldg_costs_html = "";
		    var oii = oi[i];
		    months[oii] = Number(months[oii]);
		    if (months[oii] < JMSC.rangeValues.start || months[oii] > JMSC.rangeValues.end) continue; // skip if out of date range
		    addresses[oii] = addresses[oii].replace(/\|\|/g,"<br/>\n");
		    building_types[oii] = building_types[oii].replace(/\|\|/g,"<br/>\n");
		    ids[oii] = Number(ids[oii]);
		    if (declared_building_costs.length > 0) {
			bldg_costs_header = '<th>Declared building cost</th>';
			if (months[oii] < 200804) {
			    costs = "$&nbsp;" + JMSC.numberWithCommas(declared_building_costs[costs_i]);
			    costs_i -= 1;
			} else {
			    costs = "N/A";
			}
			bldg_costs_html = '<td class="declared-building-costs">' + costs + '</td>';
		    }
		    var digest_link = "/buildings/digests/Md" + months[oii] + "e";
		    if (months[oii] == 201106 || months[oii] == 201109) {
			digest_link += "_revised";
		    }
	    	    digest_link += ".pdf";
		    month = JMSC.months[Number(months[oii] % 100)-1].substring(0,3) + "&nbsp;" + Math.floor(months[oii] / 100);
		    infoWindowContent += '<tr id="bd-' + ids[oii] + '" class="bd"><td class="address"><a href="javascript:void(0);" onclick="JMSC.buildingDetails('+section_id+','+ids[oii]+');" id="bldg-' + ids[oii] + '">' + addresses[oii] + '</a></td><td class="month"><a href="'+digest_link+'" target="_blank">' + month + '</a></td><td class="building-type">' + building_types[oii] + '</td>' + bldg_costs_html + '</tr>';
		    res_valid.push(ids[oii]);
		}
		if (res_valid.length>1) {
		    res_str = "results";
		    JMSC.closeSidePanel();
		} else {
		    res_str = "result";
		    JMSC.buildingDetails(section_id, res_valid[0]);
		}
		infoWindowContent = '<div class="infowindow"><h3><span class="tputext">'+section_title+' for town planning unit '+o["row"]["tpu"]["value"]+'/'+o["row"]["sb_vc"]["value"]+'</span> <span class="nbres">('+res_valid.length+' '+res_str+')</span></h3><table><thead><tr><th>Address</th><th>Monthly digest</th><th>Building type</th>' + bldg_costs_header + '</tr></thead><tbody>' + infoWindowContent + '</tbody></table></div>';
		break;
	    case "census":
		var population_nb = "";
		if (o["row"]["a1_dcca_2001_population"] !== undefined) {
		    population_nb = o["row"]["a1_dcca_2001_population"]["value"];
		} else if (JMSC.geoclicked !== null && JMSC.geoclicked["pop2001"] !== undefined) {
		    population_nb = JMSC.geoclicked["pop2001"];
		}
		if (JMSC.currentLayerData.ftcol == undefined) break;
		var ftcol = JMSC.currentLayerData.ftcol.replace(/[_\-]*/,"");
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
		break;
	    default:
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
    clickKmlLayer: function(o) {
	$.log(o);
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
	} else if ($.inArray(JMSC.geotype, JMSC.geonopoly)<0) {
	    JMSC.getBoundsFromGeo(JMSC.geotype, JMSC.geoid, "#000", true);
	}
	if (JMSC.currentSection == "census") {
	    JMSC.fillSidePanel(o);
	}
	if ($.inArray(JMSC.geotype, JMSC.geonopoly)<0) JMSC.loadInfoWindow(o);
	else if (JMSC.geotype == "point") JMSC.loadOverlappingData(o);
	else if (JMSC.geotype == "bb") JMSC.loadBuildingBlockData(o);
    },
    gearthLayer: function() {
	$.log("gearthLayer");
	if (!JMSC.mode3d) {
	    JMSC.loadKml2d();
	}
    },
    tpbLayer: function() {
	$.log("tpbLayer");
	JMSC.fusionTableOpts.suppressInfoWindows = false;
    },
    buildingsLayer: function() {
	//$.log("buildingsLayer");
	newStyles = new Array(JMSC.stylesNbMax);
	//JMSC.fusionTableOpts.styles = newStyles;
	var start = JMSC.rangeValues.start;
	var end = JMSC.rangeValues.end;
	var months = new Array();
	var ys = Math.round(start / 100);
	var ye = Math.round(end / 100);
	var ms = start % 100;
	var me = end % 100;
	if (start == JMSC.rangeValues.start_init && end == JMSC.rangeValues.end_init) {
	    JMSC.fusionTableOpts.query.where = "";
	} else {
	    JMSC.fusionTableOpts.query.where = "months_min <= "+end+" AND months_max >= "+start+"";
	}
	var colors = JMSC.styleGradientColors.multi;
	JMSC.fusionTableOpts.styles = JMSC.fusionTableStyles;
	//$.log(JMSC.currentFilter);
	//$.log(JMSC.fusionTableStyles);
	if (JMSC.currentFilter == null || JMSC.currentFilter == "") { // No filter, so no need to do the rest
	    $("#custom-filter").hide();	    
	    return 0;
	} else {
	    $("#custom-filter").show();
	}

	/* Part with filters */ var newStyles = [];
	//$.log(JMSC.currentFilter);
	var skippedOne = false;
	var color = "CCCCCC";
	if (JMSC.customFilterQuery.length > 0) { // custom filter is a search string basically on that column
	    $(".legline").hide();
	    var defaultstyle = {}
	    defaultstyle.select = JMSC.currentFilter;
	    defaultstyle.polygonOptions = {
		fillColor: "#"+color,
		fillOpacity: 0.6,
		strokeColor: "#"+color
	    };
	    newStyles.push(defaultstyle);
	    color = colors[JMSC.stylesNbMax-1];
	    var styleq = {};
	    styleq.polygonOptions = {
		fillColor: "#"+color,
		fillOpacity: 0.6,
		strokeColor: "#"+color
	    };
	    styleq.select = JMSC.currentFilter;
	    styleq.where = JMSC.currentFilter + " CONTAINS IGNORING CASE '"+JMSC.customFilterQuery.replace("'","\'")+"'";
	    n = JMSC.stylesNbMax-1;
	    $("#legend-"+n).css("background-color","#"+color);
	    $("#legtext-"+n).html(JMSC.customFilterQuery);
	    $("#legline-"+n).show();
	    newStyles.push(styleq);
	    //$.log(newStyles);
	} else {
	    //style = {}
	    var filteropts = JMSC.filtersopts[JMSC.currentSection][JMSC.currentFilter];
	    if (filteropts == undefined || filteropts == null) { // a null filter, no need to style
		JMSC.clearLegend();
		return 1;
	    }
	    var defaultfilteropt = {"label":"[Other or mixed]"};
	    //$.log(filteropts);
	    var termsaccumulator = [];
	    for (var i=0; i<JMSC.stylesNbMax; i++) {
		filteropt = filteropts[i];
		if (filteropt == null) continue;
		for (var j=0; j<filteropt["terms"].length; j++) {
		    termsaccumulator.push(filteropt["terms"][j]);
		    break; // no support for OR, so only one term per style is used
		}
	    }
	    for (var i=-1; i<JMSC.stylesNbMax; i++) {
		var style = {};
		if (i>=0) {
		    color = colors[i];
		    filteropt = filteropts[i];
		    n = i;
		} else {
		    color = "CCCCCC";
		    filteropt = defaultfilteropt;
		    n = "n";
		}
		if (filteropt == undefined || filteropt == null) {
		    if (i>=0) {
			$("#legline-"+n).hide();
			skippedOne = true;
			continue;
		    }
		}
		$("#legline-"+n).show();
		style.select = JMSC.currentFilter;//JMSC.fusionTableColumn;
		style.polygonOptions = {
		    fillColor: "#"+color,
		    fillOpacity: 0.6,
		    strokeColor: "#"+color
		};
		$("#legend-"+n).css("background-color","#"+color);
		if (filteropt["label"] !== undefined) {
		    $("#legend-"+n).attr("title", filteropt["label"]);
		    $("#legtext-"+n).html(filteropt["label"]);
		}
		if (filteropt["terms"]) {
		    for (var j=0; j<filteropt["terms"].length; j++) {
			style.where = JMSC.currentFilter + " CONTAINS IGNORING CASE '"+filteropt["terms"][j]+"'";
			break;
		    }
		    for (var j=0; j<termsaccumulator.length; j++) {
			if (termsaccumulator[j] != filteropt["terms"][0] && filteropt["terms"][0].indexOf(termsaccumulator[j]) < 0) {
			    style.where += " AND " + JMSC.currentFilter + " DOES NOT CONTAIN '" + termsaccumulator[j] + "'";
			}
		    }
		/*} else {
		    var whereterms = [];
		    for (var j=0; j<termsaccumulator.length; j++) {
			whereterms.push(JMSC.currentFilter + " DOES NOT CONTAIN '" + termsaccumulator[j] + "'");
		    }
		    style.where = whereterms.join(" AND ");
		}*/
		}
		newStyles.push(style);
	    }
	}
	JMSC.fusionTableOpts.styles = newStyles;
	//$.log(JMSC.fusionTableOpts.styles);
    },
    censusLayer: function() {
	var min = parseFloat(JMSC.currentLayerData["minvalue"]);
	var max = parseFloat(JMSC.currentLayerData["maxvalue"]);
	var colors = [];
	try {
	    if (JMSC.currentLayerData["geo"] == "bb") {
		colors = JMSC.styleGradientColors["marker"];
	    } else {
		colors = JMSC.styleGradientColors[JMSC.currentLayerData["color"]];
	    }
	} catch (err) {
	    $.log(err);
	    colors = JMSC.styleGradientColors.green;
	}
	if (JMSC.currentLayerData["color"] == "marker") {
	    colors_hex = JMSC.styleGradientColors.marker_hex;
	} else {
	    colors_hex = colors;
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
		$("#legend-"+i).css("background-color","#"+colors_hex[i])
	    }
	    $("#legtext-0").html(min);
	    $("#legline-"+i).show();
	    //$("#legtext-"+JMSC.stylesNbMax).html(max);
	    newStyles[0] = style;
	} else {
	    newStyles = new Array(JMSC.stylesNbMax);
	    for (var i=0; i<JMSC.stylesNbMax; i++) {
		var style = {};
		style.select = JMSC.fusionTableColumn;
		if (JMSC.currentLayerData.geo == "bb") {
		    style.select = "point";
		    style.markerOptions = {
			iconName: colors[i]
		    };
		} else {
		    style.polygonOptions = {
			fillColor: "#"+colors[i],
			fillOpacity: 0.6,
			strokeColor: "#"+colors[i]
		    };
		}
		if (i == 0) {
		    style.where = JMSC.fusionTableColumn + " < " + (min + step);
		} else if (i == JMSC.stylesNbMax - 1) {
		    style.where = JMSC.fusionTableColumn + " >= " + (max - step);
		} else {
		    style.where = JMSC.fusionTableColumn + " >= " + (min + (step * i));
		    style.where += " AND " + JMSC.fusionTableColumn + " < " + (min + (step * (i + 1)));
		}
		$("#legend-"+i).css("background-color","#"+colors_hex[i]);
		$("#legend-"+i).attr("title", min + (step * i) + " - " + (min + (step * (i + 1))));
		var bottomVal = min + step * i;
		var topVal = min + step * (i + 1);
		if ($.inArray(JMSC.currentLayerData["unit"], JMSC.numericalUnits)>=0) bottomVal = addCommas(bottomVal);
		if ($.inArray(JMSC.currentLayerData["unit"], JMSC.numericalUnits)>=0) topVal = addCommas(topVal);
		if (i >= 0 && i < JMSC.stylesNbMax) {// && JMSC.currentLayerData["geo"] != "bb") {
		    if (JMSC.currentLayerData["unit"].indexOf("$") >= 0) {
			if (i == 0) {
			    $("#legtext-0").html("Less than $"+addCommas(min+step));
			} else if (i+1 == JMSC.stylesNbMax) {
			    $("#legtext-"+i).html("$"+addCommas(max+step)+" or more");
			} else {
			    $("#legtext-"+i).html("$"+bottomVal+"-$"+topVal);
			}
		    } else if (JMSC.currentLayerData["unit"].indexOf("%") >= 0) {
			if (i == 0) {
			    $("#legtext-0").html("Less than "+addCommas(min+step)+"%");
			} else if (i+1 < JMSC.stylesNbMax || (JMSC.stylesNbMax == i+1 && topVal == "100")) {
			    $("#legtext-"+i).html(bottomVal+"-"+topVal+"%");
			} else if (i+1 == JMSC.stylesNbMax) {
			    $("#legtext-"+i).html(bottomVal+"% or more");
			}
		    } else {
			if (i == 0) {
			    $("#legtext-0").html("Less than "+addCommas(min+step));
			} else if (i+1 < JMSC.stylesNbMax) {
			    $("#legtext-"+i).html(bottomVal+"-"+topVal);
			} else {
			    $("#legtext-"+i).html(bottomVal+" or more");
			}
		    }
		} else {
		    $("#legtext-"+i).html("");
		}
		$("#legline-"+i).show();
		newStyles[i] = style;
	    }
	    //$("#legtext-"+JMSC.stylesNbMax).html(">"+max);
	    //$.log(JMSC.currentLayerData);
	    //if (JMSC.currentLayerData["unit"] !== undefined) $("#legunit").html(JMSC.currentLayerData["unit"]);
	}
	JMSC.fusionTableOpts.styles = newStyles;
	$.log(JMSC.fusionTableOpts.styles);
    },
    changeLayerOptions: function() { // Set new layer opts and draw map
	$.log("changeLayerOptions()");
	if (JMSC.currentLayerId.length <= 0) return 0;
	//$.log(JMSC.fusionTableOpts.query);
	JMSC.fusionTableOpts.query.from = JMSC.fusionTableId;
	$.log(JMSC.currentLayerData);
	var filters = [];
	if (JMSC.currentLayerData.filters !== undefined) {
	    filters = JMSC.currentLayerData.filters.split(",");
	}
	if ($.inArray(JMSC.currentFilter, filters) < 0) {
	    $.log($.inArray(JMSC.currentFilter, filters));
	    JMSC.currentFilter = null;
	    JMSC.clearLegend();
	}
	if (JMSC.currentLayerData.geo == "bb") {
	    JMSC.fusionTableOpts.suppressInfoWindows = false;
	    if (JMSC.currentSection == "census") JMSC.fusionTableOpts.suppressInfoWindows = true;
	} else {
	    JMSC.fusionTableOpts.suppressInfoWindows = true;
	}
	switch (JMSC.currentLayerData.section) {
	    case "buildings":
		JMSC.fusionTableOpts.query.select = "bounds";
		JMSC.buildingsLayer();
		$("#year-slider").hide();
		$(".slitext.years").hide();
		$("#range-slider").show();
		$(".slitext.range").show();
		$(".filters-container").show();
		break;
	    case "census":
		JMSC.fusionTableOpts.query.select = "boundary";
		JMSC.censusLayer();
		$("#range-slider").hide();
		$(".slitext.range").hide();
		$("#year-slider").show();
		$(".slitext.years").show();
		$(".filters-container").hide();
		break;
	    case "googleearth":
		//JMSC.gearthLayer();
	    case "tpb":
		JMSC.tpbLayer();
	    default:
		$("#range-slider").hide();
		$(".slitext.range").hide();
		if ($("#"+JMSC.layerMenuId).val().search(/YYYY$/)<0) {
		    $("#year-slider").hide();
		    $(".slitext.years").hide();
		}
		$(".filters-container").hide();
	}
	//$log(JMSC.fusionTableOpts);
	//JMSC.loadedLayer.setOptions(JMSC.fusionTableOpts);
	if (JMSC.openedInfoWindow != null) {
	    JMSC.openedInfoWindow.close();
	}
	JMSC.closeSidePanel();
	JMSC.clearBounds(null);
	JMSC.resetGeoIds();
    },
    changeYearMenu: function(e) {
	//$.log("changeYearMenu()");
	var y = parseInt(JMSC.yearSlider.slider("value"));
	if (JMSC.currentLayerData==null) return 0;
	JMSC.thisLayer = JMSC.currentLayerData["mylayerid"]; // the name of layer (spans many years)
	var oldLayerData = JMSC.currentLayerData;
	var changed = false;
	for (var i=0; i<JMSC.layermenu.length; i++) {
	    if (JMSC.layermenu[i]["mylayerid"] == JMSC.thisLayer &&
	    (((JMSC.currentLayerData.section == undefined || JMSC.currentLayerData == "census" || $("#"+JMSC.layerMenuId).val().search(/YYYY$/)>=0) && parseInt(JMSC.layermenu[i]["year"]) == y) ||
	    JMSC.currentLayerData.section == "buildings")) {
		JMSC.currentLayerData = JMSC.layermenu[i];
		JMSC.currentLayerId = JMSC.currentLayerData["id"];
		//$.log(JMSC.currentLayerData);
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
		JMSC.year = y;
		break;
	    }
	}
	if (!changed && oldLayerData["year"] !== undefined) {
	    JMSC.yearSlider.slider({change: function(event, ui) {return 0;}});
	    JMSC.yearSlider.slider("value", oldLayerData["year"]); // creates a loop if you don't pause the event listening...
	    JMSC.yearSlider.slider({change: JMSC.changeYearMenu});
	}
	if (changed) {
	    JMSC.changeLayerOptions();
	    //JMSC.clearLegend();
	    JMSC.kmlLayerOpts.preserveViewport = true;
	    if (JMSC.currentLayerData["3d"] !== undefined) {
		if (google.earth.isSupported()) {
		    JMSC.mode3d = true;
		    $.log("change layer menu to 3D layer");
		    JMSC.show3d();
		} else { // not supported, so prep to load the kmllayer
		    if (JMSC.mode3d) {
			JMSC.show2d();
		    }
		    JMSC.load2d();
		    JMSC.mode3d = false;
		}
	    } else {
		if (JMSC.mode3d) {
		    JMSC.load2d();
		    JMSC.mode3d = false;
		}
	    }
	    // Setting the URL of the page
	    document.location.href =  JMSC.siteUrl + "#" + JMSC.currentLayerId;
	}
    },
    zoomTo: function(place) {
	latLng = new google.maps.LatLng(place.lat, place.lng);
	if (JMSC.mode3d) {
	    if (JMSC.ge !== null) {
		var lookAt = JMSC.ge.getView().copyAsLookAt(JMSC.ge.ALTITUDE_RELATIVE_TO_GROUND);
		lookAt.setLatitude(place.lat-0.01);
		lookAt.setLongitude(place.lng+0.015);
		lookAt.setRange(5000);
		lookAt.setTilt(45);
		JMSC.ge.getView().setAbstractView(lookAt);
	    }
	} else {
	    JMSC.map.setCenter(latLng);
	    JMSC.map.setZoom(place.zoom);
	}
	JMSC.poi.zoom = place.zoom;
	JMSC.poi.center = latLng;
	JMSC.poi.id = place.id;
	$("ul#placesmenu li").removeClass("selected");
    },
    zoomToPlace: function() {
	found = false;
	//$.log("zoom to place");
	//$.log(JMSC.currentLayerData);
	for (var i=0; i<JMSC.placesmenu.length; i++) {
	    if (JMSC.placesmenu[i].id == JMSC.currentLayerData.place) {
		var place = JMSC.placesmenu[i];
		JMSC.zoomTo(place);
		$("#place-" + JMSC.currentLayerData.place).parent().addClass("selected");
		found = true;
		break;
	    }
	}
    },
    selectPlacesMenu: function(e) {
	var found = false;
	//$.log(e);
	//var val = $("#" + JMSC.placesMenuId).val();
	var val = "";
	var m = e.target.id.match(/place-(\w+)/);
	if (m) {
	    val = m[1];
	} else {
	    return 0;
	}
	for (var i=0; i<JMSC.placesmenu.length; i++) {
	    /*$.log(val);
	    $.log(JMSC.placesmenu[i]);*/
	    if (JMSC.placesmenu[i].id == val) {
		var place = JMSC.placesmenu[i];
		JMSC.zoomTo(place);
		found = true;
		e.target.parentElement.className = "selected";
		break;
	    }
	}
	if (!found) {
	    latLng = new google.maps.LatLng(JMSC.latCenter, JMSC.lngCenter);
	    JMSC.map.setCenter(latLng);
	    JMSC.map.setZoom(JMSC.zoomStart);
	}
    },
    changeLayerMenu: function(e) {
	if (JMSC.geotype !== null) oldGeotype = JMSC.geotype;
	else oldGeotype = null;
	isconsolidated = false;
	JMSC.resetGeoIds();
	JMSC.currentLayerData = null;
	JMSC.currentLayerId = null;
	//JMSC.currentFilter = null;
	var value = $("#"+JMSC.layerMenuId).val();
	var value_base = value;
	if (value.search(/\d+$/)>=0) {
	    m = value.match(/(\d+)$/);
	    if (m) {
		JMSC.year = parseInt(m[1]);
		JMSC.yearSlider.slider("value", JMSC.year);
		value_base = value.replace(""+JMSC.year, "");
	    }
	    $("#year-slider").show();
	    $(".slitext.years").show();
	} else if (value.search(/YYYY$/)>=0) {
	    isconsolidated = true;
	    value_base = value.replace(/YYYY$/, "");
	    value = value.replace(/YYYY$/, JMSC.year);
	    $("#year-slider").show();
	    $(".slitext.years").show();
	}
	$.log(value_base);
	var oldFusionTableId = JMSC.fusionTableId;
	var oldSection = JMSC.currentSection;
	var oldFilter = JMSC.currentFilter;
	for (var i=0; i<JMSC.layermenu.length; i++) { // searching for the layer itself
	    if (JMSC.layermenu[i]["id"] == value) {
		JMSC.currentLayerData = JMSC.layermenu[i];
		break;
	    }
	}
	if (JMSC.currentLayerData == null) {
	    var availLayers = [];
	    $("#"+JMSC.layerMenuId + " option").each(function(i, el) {
		availLayers[i] = el.value;
	    });
    	    if ($.inArray(value_base + "YYYY", availLayers)) { // not found yet, search again if consolidated
		for (var i=JMSC.years.length-1; i>=0; i--) {
		    var value_year = value_base + JMSC.years[i];
		    for (var j=0; j<JMSC.layermenu.length; j++) {
			if (JMSC.layermenu[j]["id"] == value_year) {
			    JMSC.currentLayerData = JMSC.layermenu[j];
			    break;
			}
		    }
		    if (JMSC.currentLayerData !== null) {
			break;
		    }
		}
	    }
	}
	if (JMSC.currentLayerData == null) { // exit, there's no hope
	    document.location.href =  JMSC.siteUrl + "#";
	    return 0;
	} else { // layer data is found, so assign the new layer's values
	    JMSC.thisLayer = JMSC.currentLayerData["mylayerid"]; // the name of layer (spans many years)
	    JMSC.currentLayerId = value;
	    if (JMSC.currentLayerData["3d"] !== undefined) {
		if (google.earth.isSupported()) {
		    JMSC.mode3d = true;
		    $.log("change layer menu to 3D layer");
		    JMSC.show3d();
		} else { // not supported, so prep to load the kmllayer
		    JMSC.show2d();
		    JMSC.mode3d = false;
		}
	    } else {
		if (JMSC.mode3d) {
		    JMSC.show2d();
		    JMSC.mode3d = false;
		}
	    }
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
	    if (JMSC.currentLayerData.section !== undefined) {
		JMSC.currentSection = JMSC.currentLayerData.section;
	    }
	    if (JMSC.currentSection == "buildings") {
		JMSC.fusionTableColumn = null;
	    }
	    if (JMSC.currentLayerData.place !== undefined) {
		if (JMSC.poi.id !== JMSC.currentLayerData.place) {
		    JMSC.zoomToPlace();
		}
	    }
	    var years = JMSC.yearsDefault;
	    visible = true;
	    if ($("#year-slider").attr("display") == "none") {
		visible = false;
	    }
	    if (JMSC.currentLayerData.years !== undefined) {
		var years_str = JMSC.currentLayerData.years.split("|");
		years = [];
		for (var i=0; i<years_str.length; i++) {
		    years.push(Number(years_str[i]));
		}
	    }
	    JMSC.changeYearSlider(years, visible);
	    JMSC.clearBB();
	}
	//$.log(oldGeotype);
	//$.log(JMSC.currentLayerData);
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
	if (oldSection != JMSC.currentSection) {
	    JMSC.currentFilter = null;
	}
	JMSC.changeLayerOptions();
	JMSC.loadFilters();
	if (JMSC.mode3d) {
	    if (JMSC.ge!==null) {
	    }
	} else {
	    JMSC.kmlLayerOpts.preserveViewport = false;
	    JMSC.load2d();
	}

	// Setting the URL of the page
	document.location.href =  JMSC.siteUrl + "#" + JMSC.currentLayerId;

	if (JMSC.geoid != 0 && JMSC.latLngClicked != null) {
	    //google.maps.event.trigger(JMSC.loadedLayer, 'click', {"latLng": JMSC.latLngClicked});
	    $.log("reopen (not implemented)");
	}

    },
    submitCustomFilter: function(e) {
	var value = $("#"+JMSC.filterMenuId).val();
	var q = $("#"+JMSC.filterMenuId+"-q").val();
	switch (JMSC.currentSection) {
	    case "buildings":
		JMSC.currentFilter = value;
		JMSC.customFilterQuery = q;
		$.log("submit custom: "+q);
		JMSC.buildingsLayer();
		break;
	}
	JMSC.closeSidePanel();
	JMSC.clearBounds(null);
	JMSC.resetGeoIds();
	JMSC.load2d();
    },
    changeFilterMenu: function(e) {
	var value = $("#"+JMSC.filterMenuId).val();
	var q = $("#"+JMSC.filterMenuId+"-q").val("");
	switch (JMSC.currentSection) {
	    case "buildings":
		JMSC.currentFilter = value;
		JMSC.customFilterQuery = "";
		JMSC.buildingsLayer();
		break;
	}
	$.log(value);
	JMSC.closeSidePanel();
	JMSC.clearBounds(null);
	JMSC.resetGeoIds();
	JMSC.load2d();
    },
    changeRangeSlider: function() {
	JMSC.changeLayerOptions();
	JMSC.load2d();
    },
    initRangeSlider: function() {
	JMSC.rangeSlider.slider("option", "values", [JMSC.rangeValues.start_val, JMSC.rangeValues.end_val]);
	JMSC.rangeValues.start = JMSC.rangeValues.start_init;
	JMSC.rangeValues.end = JMSC.rangeValues.end_init;
	JMSC.updateRangeSliderText();
	JMSC.changeRangeSlider();
    },
    preInitRangeSlider: function() {
	var min = 0;
	var max = JMSC.rangeValues["length"];
	var ymin = Math.floor(JMSC.rangeValues.min / 100);
	var ymax = Math.floor(JMSC.rangeValues.max / 100);
	var mmin = JMSC.rangeValues.min % 100;
	var mmax = JMSC.rangeValues.max % 100;
	var steps = 12 * (ymax - ymin - 1) + mmax + (12 - mmin);
	JMSC.rangeValues.stepval = 1.0 * (max - min) / steps;
	if (JMSC.rangeValues.min != JMSC.rangeValues.start) {
	    ydiff = Math.floor(JMSC.rangeValues.start / 100) - ymin;
	    mdiff = JMSC.rangeValues.start % 100 - mmin;
	    JMSC.rangeValues.start_val += Math.round(JMSC.rangeValues.stepval * (12 * ydiff + mdiff));
	}
	if (JMSC.rangeValues.max != JMSC.rangeValues.end) {
	    ydiff = ymax - Math.floor(JMSC.rangeValues.end / 100);
	    mdiff = mmax - JMSC.rangeValues.end % 100;
	    JMSC.rangeValues.end_val -= Math.round(JMSC.rangeValues.stepval * (12 * ydiff + mdiff));
	}
    },
    slideRangeSlider: function(e, ui) {
	var start = ui.values[0];
	var end = ui.values[1];
	var ys = Math.floor(JMSC.rangeValues.min / 100);
	var ms = JMSC.rangeValues.min % 100;
	startsteps = Math.round(start / JMSC.rangeValues.stepval);
	endsteps = Math.round(end / JMSC.rangeValues.stepval);
	ssteps_y = Math.floor(startsteps / 12);
	ssteps_m = startsteps % 12;
	if (ssteps_m > 12) {
	    ssteps_y += 1;
	    ssteps_m -= 12;
	}
	ssteps_y += ys;
	JMSC.rangeValues.start = ssteps_y * 100 + ssteps_m + 1;
	esteps_y = Math.floor(endsteps / 12);
	esteps_m = endsteps % 12;
	esteps_m += ms;
	if (esteps_m > 12) {
	    esteps_y += 1;
	    esteps_m -= 12;
	}
	esteps_y += ys;
	JMSC.rangeValues.end = esteps_y * 100 + esteps_m;
	JMSC.updateRangeSliderText();
    },
    updateRangeSliderText: function() {
	startmonth = JMSC.months[(Number(JMSC.rangeValues.start) % 100) - 1] + "&nbsp;" + Math.floor(JMSC.rangeValues.start / 100);
	endmonth = JMSC.months[(Number(JMSC.rangeValues.end) % 100) - 1] + "&nbsp;" + Math.floor(JMSC.rangeValues.end / 100);
	$("#range-from").html(startmonth);
	$("#range-to").html(endmonth);
    },
    populatePlaces: function() {
	var c = $("#controls");
	var container = $('<div></div>');
	container.addClass(JMSC.placesMenuId + '-container');
	var placesMenu = $('<ul id="' + JMSC.placesMenuId + '"></ul>');
	container.append(placesMenu);
	var home = $('<a href="javascript:void(0);" id="place-home">Home</a>');
	var placesMenuH = $('<li></li>');
	placesMenuH.append(home);
	placesMenu.append(placesMenuH);
	placesMenu.click(JMSC.selectPlacesMenu);
	c.append(container);
	for (var i=0; i<JMSC.placesmenu.length; i++) {
	    var place = JMSC.placesmenu[i];
	    var value = place["id"];
	    var label = $('<a href="javascript:void(0);" id="place-'+value+'">' + place["nameen"] + '</a>');
	    label.click(JMSC.selectPlacesMenu);
	    var opt = $('<li></li>');
	    opt.append(label);
	    if (place["header"] !== undefined && place["header"]) {
		opt.addClass("menuHeader");
		opt.attr("disabled", "disabled");
	    } else {
		opt.attr("name", value);
	    }
	    placesMenu.append(opt);
	}
    },
    populateControls: function() {
	var c = $("#controls");
	var container = $('<div></div>');
	container.addClass(JMSC.layerMenuId + '-container');
	var layerMenu = $('<select id="' + JMSC.layerMenuId + '"></select>');
	container.append(layerMenu);
	var layerMenuH = $('<option value="">' + JMSC.i8n.layermenu + '</option>');
	layerMenu.append(layerMenuH);
	var layerMenuS = $('<option value="">--</option>');
	layerMenu.append(layerMenuS);
	layerMenu.change(JMSC.changeLayerMenu);
	c.append(container);
	for (var i=0; i<JMSC.layermenu.length; i++) {
	    var isconsolidated = false;
	    if (JMSC.layermenu[i]["id"] == undefined) continue;
	    var jump = 0;
	    if (i+2<JMSC.layermenu.length&&
	    (JMSC.layermenu[i]["mylayerid"]==JMSC.layermenu[i+1]["mylayerid"]||
	    JMSC.layermenu[i]["mylayerid"]==JMSC.layermenu[i+2]["mylayerid"])) {
		isconsolidated = true;	
		if (JMSC.layermenu[i]["mylayerid"]==JMSC.layermenu[i+1]["mylayerid"]&&
		JMSC.layermenu[i]["mylayerid"]==JMSC.layermenu[i+2]["mylayerid"]) {
		    jump = 2;
		} else if (JMSC.layermenu[i]["mylayerid"]==JMSC.layermenu[i+1]["mylayerid"]) {
		    jump = 1;
		}
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
	    if (isconsolidated) {
		i = i+jump;
	    }
	}
    },
    populateLegend: function() {
	var c = $("#bottom");
	//var container = $('<div></div>');
	var container = $('<fieldset><legend>Legend</legend></fieldset>');
	container.attr("id", "legend-colors");
	container.addClass("legend-container");
	for (var i=0; i<JMSC.stylesNbMax+1; i++) {
	    var n = i;
	    if (i == JMSC.stylesNbMax) n = "n";
	    var legline = $('<div id="legline-'+n+'"></div>');
	    legline.addClass('legline');
	    var legtext = $('<div></div>');
	    legtext.html("&nbsp;");
	    legtext.addClass('legtext');
	    legtext.attr("id", "legtext-"+n);
	    legtext.css("left", -62+"px");
	    var legendblock = $("<div></div>");
	    legendblock.addClass("legend");
	    legendblock.attr("id", "legend-"+n);
	    //legendblock.css("left", JMSC.sliderStepPx*i-15+"px");
	    legline.append(legendblock);
	    legline.append(legtext);
	    container.append(legline);
	    legline.hide();
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
    populateYearSlider: function() {
	var c = $("#controls");
	var container = $('<div id="year-slider-container"></div>');
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
	    step: (JMSC.years[JMSC.years.length-1] - JMSC.years[0]) / (JMSC.years.length-1)
	});
	$.log(JMSC.years[JMSC.years.length-1]);
	$.log(JMSC.years[0]);
	$.log(JMSC.years.length-1);
	$.log((JMSC.years[JMSC.years.length-1] - JMSC.years[0]) / 1);
	$.log((JMSC.years[JMSC.years.length-1] - JMSC.years[0]) / JMSC.years.length-1)
	var len = JMSC.sliderStepPx*(JMSC.years.length-1);
	slidr.css("width", len+"px");
	for (var i=0; i<JMSC.years.length; i++) {
	    stepPx = JMSC.sliderStepPx;
	    var slitext = $('<div></div>');
	    slitext.html(JMSC.years[i]);
	    slitext.addClass('slitext years');
	    slitext.css("left", stepPx*i-15+"px");
	    container.append(slitext);
	}
    },
    populateRangeSlider: function() {
	var c = $("#controls");
	var container = $('<div id="range-slider-container"></div>');
	container.addClass("sliders-container");
	var rangeslidr = $('<div id="range-slider"></div>');
	container.append(rangeslidr);
	$("#layermenu-container").after(container);
	JMSC.preInitRangeSlider();
	JMSC.rangeSlider = $("#range-slider").slider({
	    range: true,
	    change: JMSC.changeRangeSlider,
	    min: 0,
	    max: JMSC.rangeValues["length"],
	    values: [JMSC.rangeValues.start_val, JMSC.rangeValues.end_val],
	    slide: JMSC.slideRangeSlider
	});
	var slitext = $('<div>From <span id="range-from"></span> to <span id="range-to"></span></div>');
	slitext.addClass('slitext range');
	//slitext.css("left", 15+"px");
	container.append(slitext);
	var slitext_reset = $('<div></div>');
	var slitext_reset_link = $('<a href="javascript:void(0);">reset range</a>');
	slitext_reset.css("float", "right");
	slitext_reset.append(slitext_reset_link);
	slitext_reset_link.click(JMSC.initRangeSlider);
	slitext_reset.addClass('slitext range');
	//slitext_reset.css("left", 15+"px");
	container.append(slitext_reset);
	JMSC.updateRangeSliderText();
	/*for (var i=0; i<JMSC.rangeValues.length; i++) {
	    var slitext = $('<div></div>');
	    slitext.html(JMSC.years[i]);
	    slitext.addClass('slitext range');
	    slitext.css("left", JMSC.sliderStepPx*i-15+"px");
	    container.append(slitext);
	}*/
    },
    changeYearSlider: function(years, visible) {
	var same = false;
	if (years.length == JMSC.years.length) {
	    same = true;
	    for (var i=0; i<years.length; i++) {
		if (years[i] == JMSC.years[i]) {
		    same = false;
		    break;
		}
	    }
	}
	if (!same) {
	    JMSC.years = years;
	    $("#year-slider-container").remove();
	    JMSC.populateYearSlider();
	    if (visible) {
		$("#year-slider").show();
		$(".slitext.years").show();
	    }
	}
    },
    loadFilters: function(oldFilter) {
	var filterMenu = $("#"+JMSC.filterMenuId);
	if (JMSC.currentLayerData.filters == undefined) {
	    filterMenu.hide();
	    return 0;
	}
	filterMenu.html("");
	var filterMenuH = $('<option value="">' + JMSC.i8n.filtermenu + '</option>');
	filterMenu.append(filterMenuH);
	var filters = JMSC.currentLayerData.filters.split(",");
	var filternames = JMSC.currentLayerData.filternames.split(",");
	for (var i=0; i<filters.length; i++) {
	    var isconsolidated = false;
	    if (filters[i] == undefined) continue;
	    var value = filters[i];
	    var classname = "";
	    var label = "";
	    label = filternames[i];
	    var opt = $('<option>' + label + '</option>');
    	    opt.val(value);
	    filterMenu.append(opt);
	}
	if (JMSC.currentFilter !== undefined && JMSC.currentFilter !== null && JMSC.currentFilter.length != "") {
	    filterMenu.val(JMSC.currentFilter);
	}
	//$.log(filterMenu.val());
	filterMenu.show();
    },
    populateFilters: function() {
	var c = $("#controls");
	var container = $('<div></div>');
	container.addClass("filters-container");
	var filterMenu = $('<select id="' + JMSC.filterMenuId + '"></select>');
	container.append(filterMenu);
	filterMenu.change(JMSC.changeFilterMenu);
	c.append(container);
	var spancustom = $('<span id="custom-filter"></span>');
	var input = $('<input id="' + JMSC.filterMenuId + '-q" type="text"/>');
	spancustom.append(input);
	var submit = $('<input type="submit"/>');
	submit.val("custom filter");
	spancustom.append(submit);
	container.append(spancustom);
	submit.click(JMSC.submitCustomFilter);
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
	    var availLayers = [];
	    $("#"+JMSC.layerMenuId + " option").each(function(i, el) {
		availLayers[i] = el.value;
	    });
	    JMSC.currentLayerId = layerid;
	    JMSC.thisLayer = layerid.replace(/(\d+)$/,"");
	    if ($.inArray(JMSC.thisLayer + "YYYY", availLayers)>=0) {
		$("#"+JMSC.layerMenuId).val(JMSC.thisLayer + "YYYY");
		/*$("#year-slider").show();
		$(".slitext.years").show();*/
	    } else {
		$("#"+JMSC.layerMenuId).val(JMSC.currentLayerId);
	    }
	    JMSC.changeLayerMenu();
	}
    },
    numberWithCommas: function(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
};
$(document).ready(function() {
    JMSC.init();
});
