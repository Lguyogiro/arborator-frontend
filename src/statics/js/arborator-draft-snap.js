(function () {

/*!
 * arborator script for dependency drawing 
 * version 1.0
 * http://arborator.ilpga.fr/
 *
 * Copyright 2010-2017, Kim Gerdes & Gaël Guibon
 *
 * This program is free software:
 * Licensed under version 3 of the GNU Affero General Public License (the "License");
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at http://www.gnu.org/licenses/agpl-3.0.html
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
 * See the License for the specific language governing permissions and limitations under the License. 
 *
 */

// var drag = d3.drag();

// xWordDistance = 20;
yWordDistance = 20;
leveldistance = 33; // to be overrulled by the css definition
// global variables:
fontSize = 0; // computed from css value for .token in arborator-draft.css
lemmaHeight = 0;
// maxLevelDistance = 33; // the maximum distance between one dependency relation and the next higher one
posHeight = 0;
svgDefaultHeight = 500;
svgHeight = 0;
el=10; // type of conll (10, 14, or 4), computed in conllNodesToTree
trees=[]; // list of tree objects
uextras=[]; // list of comments. each comment is a hashtable position(=line)->comment TODO: add this to the display
conlltrees=[]; // list of conll strings
defaultCat="_"
catFeatureName = 'cat'
shownfeatures=["t", "cat", "lemma","gloss"]; // recomputed in readConll
// progressiveLoading = true; // false to make it load all trees at once (may overload the browser)
pngBtn = true;
svgBtn = true;
reverseMode = false; // set true for right to left conll
conlls = {	
	10: 	{"id": 0, "t":1, "lemma": 2, "cat": 3, "xpos":4, "morph":5, "gov":6, "func":7, "xgov":8, "gloss":9}, 
	14: 	{"id": 0, "t":1, "lemma": 3, "cat": 5, "gov":9, "func":11}, 
	4: 	{"t":0, "lemma": 0, "cat": 1, "gov":2, "func":3} 
}
isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1; // needed for bezier bounding box bug

currentS = null;
// drag & drop stuff:
droppables =[];
dragrepl = null;
dragcurve = null;
dragarrowhead = null;
dragsun = null;
dragover = -1;
// debug:
log = console.log.bind(console);

// TODO: add lemmas and pos!!!
lemmaColor = '#006400';
posColor = '#9e04de';

// base 64 logo of arborator for the link image
base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAXCAYAAABEQGxzAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABtQAAAbUBnmWvHAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANXSURBVFiFtZhLbA1RGMd/59x7e5XeVrXU45aF9ztCLEQ3gojMwkZiJ7GYRDALhAUJa/FIZjk7EYKWCIMQG0qIx4JIQyREqxWP1uNyH729MxYzreu29zF3xj85mznf+X///8x3Zr4zwrZtqoWqaDXALKClggHwqYLx3jD1wWo1Ca+GVEWbAmwGFGAjECsWK22oyQkyYRsPWRLAbcAEbhim/tmLvooMqYq2HMeAAqwGZLk18USINb1RGjKSn1GLmpzgzOLfXrQBWMBjHHOmYerPyy0oakhVtGbgALANaPWioiEj2fGijmguT5mweThjkGdTsyTDlhe6fPQA54Fjhql/HStglCFV0WLAPmAvJcqpGOKJEOvej2P6r9CouZy0uT47TVdT1ittIRLASeCEYeqJ/Il/SkdVtJVAF3CEKswA1A0Kpv0ebQYgZAnaeqIs7A9XQ52PGI7GLlfzCEYMqYq2FegE4n4ytSRDiBLbsjEtaUyX3YKVIg50utoB15CqaBuBC0Ct3wxNqbGfTj7mDUSY9aN8XIWoBS64Hgj1PR1oBm5RZYkVYlDaLO6PlIyZkJV8q7Vf9dTnJAHcREAA66+du3laAvuBaQGQArDsS6TsN0cA44ZEDJgUVF4cD/sl0BYgKVfmphioLf1a7qvLca81PSPIvC7aJLAsSMZJaWk1pmVRR9+jFh3zkwwF9l74B0sk8C4AIgu4C+y2RHamgINjBaXDNu0LkiQj1fePZfAyDFwFllax2AIeABeBS4apfxyeeNd8uLVQck7A5Xkp+suUo090hoFTwE4q26A2jol2oMMw9b4icWeB9cCi4Qs3Z6forh/yJ7c0PgLHhW3bwx3CHWDiGIE28BDnSXQYpt5blloI8bbp0BNgJcD9eIb78Uxgyoto3GSY+u2RXk5VtFU4phrcgEf8NfHBa4a3kw8dwRZHXzZnMeekgpM+Gilgu2Hq7VDQnKqKthpYC7Qbpt7jJ8vryQdj3Q2i9/L8ZCwn/DCVxAdgi2Hqz4YveD7gVYpdm/dsBXkxK/8Lf9Fu+78YUhVtBfAECKxhc+H9POQXqqK14HzbgujRgjuxVgNV0SI4dT3FB42vfwq+T1oF2AC8ABqBeneMd4eFI/Yb8AXoA7qBNwT41+cPAlA7a3SX2xoAAAAASUVORK5CYII=';

svgIdIndex = 0;

// public initialisation function
this.ArboratorDraft = function(visuMode = 0, reverse = false) {
	// main function called from html file
	// if(reverse) reverseMode = true;
	// if(visuMode==0){
	// 	$( ".expander" ).click(function(){
	// 		log(99,$(this).next('conll'));
	// 		$(this).next('conll').toggle();});    
	// 	readConll();
	// }else{


		// console.log('[ArboratorDraft] visumode');
		// trees=[]; 
		// uextras=[]; 
		// conlltrees=[]; 
		// $('conll').hide();
		// refresh( $('#conllarea').text() );


	// }
}

// public functions
ArboratorDraft.prototype.emptyThenRefresh = function(content, reverse = false, toggle = false) {	
	if(reverse) reverseMode = true; // to set reverse or not
	if(toggle) reverseMode = !reverseMode; // to toggle reverse
	empty().done( refresh( content ) );
}

ArboratorDraft.prototype.getSvg = function(strConll, usermatches, id){
	// log('usermatches', usermatches) // the one that we see
	var treedata = conllNodesToTree(strConll.trim()); // treedata is object: {tree:tree, uextra:sentencefeatures, sentence, svg:snap-object}
	treedata['svg'] = drawsnap(id, treedata, usermatches, shownfeatures);
	// tree['svg'] = draw(tree.tree, id);
	return treedata;
}

ArboratorDraft.prototype.getTree = function(strConll){
	// log('getTree conll', strConll)
	// log( conllNodesToTree(strConll));
	return conllNodesToTree(strConll.trim());
}

ArboratorDraft.prototype.setRel = function(rel){
	log('setRel START');
	log(rel);
	log('setRel END');
} 

ArboratorDraft.prototype.relationChanged = function(s, depid, govid, relation){
	relationChanged(s, depid, govid, relation);
}

ArboratorDraft.prototype.catChanged = function(s, depid, cat){
	catChanged(s, depid, cat);
}

ArboratorDraft.prototype.getConll = function (s) {
	// console.log("SSSSSSS", s)
	return treeDataToConll(s.treedata)
}

ArboratorDraft.prototype.treeDataToConll = function(treedata) {
	var newconll=treeDataToConll(treedata);
	console.log("the new conll", newconll);
	return newconll;
}



// private functions


function refresh(idSVG, content) {
	// $('#svgwell').html('');
	// $('#svgwell').append( $("<conll></conll>").attr('id', 'transformhere').text( content ) );
	// var conll = d3.selectAll('#transformhere')['_groups'][0][0];
	log("_____refresh \n content",content);
	// drawConll(conll);
	listOfConlls = content.trim().split(/\n\s*\n\s*\n*/);	
	
	for (let singleConll of listOfConlls) { // for each conll tree at once, can block the browser
		var treedata = conllNodesToTree(singleConll)
		console.log("refresh function",this);
		drawsnap(idSVG, treedata, usermatches, shownfeatures)
		}
	return;
}

function level(i,gi,tree, idgov2level) {
	// recursive function determining the level of a dependency relation
	// log("__________level",i,gi)
	if (idgov2level[i+'_'+gi]>0) return idgov2level[i+'_'+gi];
	if (gi==0) return 0;
	var intermlevs = [1];
	for (var ii = Math.min(i,gi)+1; ii < Math.max(i,gi); ii++) {
		if (tree[ii])
			for (var gii in tree[ii]["gov"]) {
				if (gii>=Math.min(i,gi) && gii<=Math.max(i,gi)) {
					if (idgov2level[ii+'_'+gii]>0) intermlevs.push(idgov2level[ii+'_'+gii]+1);
					else intermlevs.push(level(ii, gii, tree, idgov2level)+1);
				}
			}
	}
	idgov2level[i+'_'+gi] = Math.max( ...intermlevs );
	// log("__________level",i,gi,'returns',idgov2level[i+'_'+gi])
	return idgov2level[i+'_'+gi];
}


function dragging(dx, dy, posX, posY, event){
	// log("onmove",dx, dy, posX, posY,this, event,"translate("+posX+","+posY+")")
	this.transform("translate("+(dx-15)+","+(dy-30)+")").attr({"class":"gloss"});
	x=this.midx;
	y=this.topy;
	var path = "M"+x+","+y+" C"+x+","+(y-Math.abs(dx)/2)+" "+(x+dx)+","+(y-Math.abs(dx)/2)+" "+(x+dx)+","+(y+dy);
	dragcurve.attr({d:path});
	dragarrowhead.transform("translate("+dx+","+dy+")")
	if (y+dy<leveldistance/2 && Math.abs(dx)<leveldistance/2) {if (dragsun==null) dragsun = this.paper.root.circle(x,0,leveldistance/2).attr("class", "dragcurve")}
	else {if(dragsun!=null) {dragsun.remove();dragsun=null}}
}

var startdrag = function(xx,yy,e) {
	// this.data('origTransform', this.transform().local );
	dragrepl = this.clone();
	dragrepl.attr({class:"draggov"});
	this.attr({cursor: "move"})

	x=this.midx;
	y=this.topy;
	// log("-----------", this.attr("x"));
	var path = "M"+x+","+y+" C"+x+","+(y-1)+" "+(x+1)+","+(y-1)+" "+(x+1)+","+y;
	// log("path",path)
	dragcurve = this.paper.root.path(path).attr({class:"dragcurve"});
	dragarrowhead = this.paper.root.path(arrowhead(x,y)).attr("class", "dragcurve");
	
	for (let dropa of droppables) 
		{ 
			if (dropa!=this) 
			{
				dropa.mouseover(
					function() {
						// console.log("Over the word", this.nr);
						dropa.attr({"class":"gloss"});
						dragover = this.nr
					});
				dropa.mouseout(
					function() {
						// console.log("out from the word", this.nr);
						dropa.attr({"class":"t"});
						dragover = -1
					});
				dropa.attr({cursor: "move"});
			}
		}
}


var stopdrag = function(e) {
	
	this.animate({transform: "translate("+0+","+0+")"}, 300, mina.easein,
		function()
			{
				this.attr({"class":"t"});
				dragrepl.remove();
			}
		);
	// log(45654)
	for (let dropa of droppables) 
	{ 
		dropa.unmouseover();
		dropa.unmouseout();
		dropa.attr({cursor: "move", cursor: "grab", "class":"t"})
	}
	dragcurve.remove();
	dragarrowhead.remove();
	
	if (dragover!=this.nr &&( (dragover>=0 && this.nr != undefined) || dragsun!=null) )
	{
		nr = this.nr;
		if (dragsun) {dragover = nr; nr=0; }
		oldRelation = Object.values(this.paper.root.treedata.tree[dragover]['gov'])[0]		
		// relationChanged(this.paper, nr, dragover, oldRelation )
		this.paper.root.treedata.triggerRelationChange(this.paper, this, nr, dragover, oldRelation);
		
		// $('#conllarea').text(	);
	}
	if(dragsun!=null) {dragsun.remove(); dragsun=null}
	dragover=-1;
}

var categoryclick = function(e) {
	// log("categoryclick",e,this);
	this.attr({class:"catselected"})
	// log("categoryclick2",e,this);
	this.paper.root.treedata.triggerCategoryChange(this.paper, this, this.nr, this.cat); 
	// log("categoryclick3",e,this);
}

var relationclick = function(e) {
	// relationChanged(this.paper, this.nr, this.govid, this.relation+"kim" )
	this.attr({class:"deprelselected"})
	this.paper.root.treedata.triggerRelationChange(this.paper, this, this.govid, this.nr, this.relation); 
	
	// log("relationclick",e,this)
}

function relationChanged(s, depid, govid, relation ) {  // todo: maybe include adding of secondary governor!!!
	// called from ConllGraph.vue 
	s.root.treedata.tree[depid]['gov']={}
	s.root.treedata.tree[depid]['gov'][govid]=relation
	s.paper.clear();
	drawsnap(s.id, s.root.treedata, {'nodes':[],'edges':[]}, shownfeatures)
}

function catChanged(s, depid, cat ) {  
	// called from ConllGraph.vue
	// console.log("BEFORE", JSON.parse(JSON.stringify(s.root.treedata.tree)));
	s.root.treedata.tree[depid]['cat']=cat;
	s.paper.clear();
	drawsnap(s.id, s.root.treedata, {'nodes':[],'edges':[]}, shownfeatures)
	// return s.root.treedata.tree
}



function drawsnap(idSVG, treedata, usermatches, shownfeatures) {
	///////////////////////////////////
	// draws json tree on svg in div //
	// idSVG is of pre-existing svg
	// treedata is an object containing .tree (relevant here), but also sentence and uextra with one line per sentence feature: [ "# user_id = Marine", "# elan_id = P_WAZK_07_34 P_WAZK_07_35", … ]
	// usermatches is of the form edges: Array [], nodes: 20, 21]
	// shownfeatures todo!!!
	///////////////////////////////////
	var textgraphdistance = 10;
	// log(999,usermatches)
	var textstarty = 10; // has to be bigger than arborator-draft.css deprel fontsize
	var runningy = textstarty;
	var s=Snap(document.getElementById(idSVG));
	leveldistance = parseInt(getComputedStyle(s.parent().node).getPropertyValue('--depLevelHeight'));
	var idgov2level = {};
	var levels = [];
	s.treedata = treedata;
	s.id = idSVG;
	var tree = treedata.tree;
	
	// insertion of texts
	var xpositions = [0];
	var allstexts = {};
	var feati = 0;
	for (let shofea of shownfeatures) { 
		stexts = [];
		ind = 0;
		for (var nr in tree) {
			var word = tree[nr];
			var sword = s.text(xpositions[ind], runningy, word[shofea]).attr({class:shofea});
			sword.wordDistance = parseInt(getComputedStyle(sword.node).getPropertyValue('--wordDistance'));
			sword.nr = nr;
			stexts.push(sword);
			if (feati==0) { // tokens
				sword.attr({cursor: "move", cursor: "grab"}).drag(dragging, startdrag, stopdrag); // dragging only the first line (normally the tokens)
				droppables.push(sword);
				for (var govid in tree[nr]["gov"]) { // computation of tree depth. for each governor...
					if (tree[govid]) levels.push(level(nr, govid, tree, idgov2level));
					else levels.push(2); // minimum height 2 for root relations
				}
			}
			if (shofea == catFeatureName) { // categories
				sword.attr({cursor: "pointer"}).click( categoryclick );
				sword.nr = nr;
				sword.cat =  word[shofea];
			}
			if (  usermatches.nodes.includes( nr.toString())) { // highlight matches
				sword.attr({class:"deprelselected"}).node.scrollIntoView()
			}
			nextx = Math.max(xpositions[ind+1] || 0, xpositions[ind]+sword.getBBox().w + sword.wordDistance);
			xpositions[ind+1]=nextx;
			ind += 1;
		};
		runningy += yWordDistance;
		allstexts[shofea]=stexts;
		feati += 1;
	}
	var maxlevel = Math.max(...levels);	
	var xmidpoints = [];
	var x2s = []; // right edge of all shown features
	var y2s = []; // bottom of all shown features
	var basey = textstarty+(maxlevel)*leveldistance-textgraphdistance;
	var firstTextFontSize = parseInt(getComputedStyle(allstexts[shownfeatures[0]][0].node).getPropertyValue('font-size'));

	// readjusting the position of texts
	for (let shofea of shownfeatures) {
		var ind = 0;
		for (var nr in tree) {
			var xmidpoint = xpositions[ind]+(xpositions[ind+1]-xpositions[ind])/2;
			xmidpoints.push(xmidpoint);
			allstexts[shofea][ind].midx=xmidpoint;
			allstexts[shofea][ind].attr({'x':  xmidpoint - allstexts[shofea][ind].getBBox().w/2});
			allstexts[shofea][ind].attr({'y': allstexts[shofea][ind].getBBox().y2+(maxlevel)*leveldistance});
			allstexts[shofea][ind].topy = allstexts[shofea][ind].getBBox().y;
			x2s.push(allstexts[shofea][ind].getBBox().x2);
			y2s.push(allstexts[shofea][ind].getBBox().y2);
			ind += 1;
		};
	}

	// drawing the dependency relations
	var ind = 0;
	for (var nr in tree) {
		var word = tree[nr];
		for (var govid in word["gov"]) { // for each governor
			if (govid in tree || govid==0) // only existing governors
			{
				le = idgov2level[nr+'_'+govid]; 
				var controly = basey-le*leveldistance;
				var tox = govid > ind ? xmidpoints[govid-1]-firstTextFontSize/2 : xmidpoints[govid-1]+firstTextFontSize/2;
				if (govid>0) var path = "M"+xmidpoints[ind]+","+basey+" C"+xmidpoints[ind]+","+controly+" "+tox+","+controly+" "+tox+","+basey;
				else var path = "M"+xmidpoints[ind]+","+(basey)+" L"+xmidpoints[ind]+","+"0 ";
				var p = s.path(path).attr({class:"curve"});
				s.path(arrowhead(xmidpoints[ind],basey)).attr("class", "arrowhead");
				var pbox = p.getBBox();
				var xmidf = pbox.x+(pbox.w)/2;
				var srel = s.text(xmidf, pbox.y-2, word["gov"][govid]).attr({class:"deprel"}).click( relationclick );
				srel.nr = nr;
				srel.govid = govid;
				srel.relation = word["gov"][govid];
				if (govid==0) srel.attr({'y':  firstTextFontSize})
				else srel.attr({'x':  xmidf - srel.getBBox().w/2});
			}
		}
		ind += 1;
	};

	var maxx2 = Math.max(...x2s);
	var maxy2 = Math.max(...y2s);
	s.attr("height", (maxy2)+"px");
	s.attr("width", (maxx2)+"px");
	svgHeight = s.attr('height').replace(/px/,'');
	return s;
}



function arrowhead(x,y) {
	// gives path for arrowhead x,y startpoint (end of arrow)
	var size = 5;
	var startpoint = x+","+y; // to move the arrowhead lower: (y+size/3);
	var lefttop = "0,0" +(-size/2)+","+(-size*1.5)+" "+(-size/2)+","+(-size*1.5);
	var righttop = (size/2)+"," +(size/2)+" "+(size/2)+"," +(size/2)+ " "+(size)+",0";
	var arrowPath = "M"+ startpoint+"c"+lefttop+ "c"+righttop+ "z";
	return arrowPath;
}




function treeDataToConll(treedata)
{
	conllstrs=treedata.uextra[0].slice();
	// conllstrs=[];
	for (let nr in treedata.tree){

		var node = treedata.tree[nr];
		// log('_______________',node)
		govs=node["gov"]||{};
		govk = Object.keys(govs).sort();
		if (govk) {
			gk = govk[0];
			gv = govs[gk] || "_"
		}
		else {
			gk = '_';
			gv = '_';
		}
		featstr = "";
		for (let a in node){
			if (!(["t","lemma","cat","tag","tag2","xpos","egov","misc","id","index","gov","kids","govrel"].includes(a))){
				featstr += a+"="+node[a];
			}
		}
		othergovstr = "";
		for (let g in govk.slice(1)){
				othergovstr += g+":"+govs[g];
		}
		conllstrs.push(
			[
				nr,
				(node['t']||'_'),
				(node['lemma']||'_'),
				(node['cat']||'_'),
				(node['xpos']||'_'),
				(node['morph']||'_'),
				gk,
				gv,
				(othergovstr||'_'),
				(node['gloss']||'_') // NoSpaceAfter???
			].join("\t"))
	};
	conllstr=conllstrs.join("\n")
	return conllstr


}

function conllNodesToTree(treeline) {
	// reads a conll representation of a single tree 
	// returns object: {tree:tree, uextra:sentencefeatures, sentence}

	var nodes = treeline.split('\n');
	if(reverseMode) nodes.reverse();
	// nodes = nodes.reverse();
	var tree={};
	var uextra={}; // node position to comments starting with #. normally only uextra[0] is relevant
	var lastid=0;
	var skipuntil=0;
	var words=[]
	// $.each(nodes, function(id,nodeline)
	// for (const color of colors){
	nodes.forEach(function (nodeline, id) 
	{ // for each conll line:
		// var nodeline=$.trim(nodeline);
		nodeline=nodeline.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
		if (nodeline.charAt(0) == "#") 
		{
			if (!(lastid in uextra)) uextra[lastid]=[];
			uextra[lastid].push(nodeline)
			return true;
		}
		var elements = nodeline.split('\t');
		el=elements.length;
		if(el > 1)
		{
			if (!(el in conlls) && el>10) el=10;
			if (el > 4) id=elements[conlls[el]["id"]];
			else if (elements[conlls[el]["t"]] != "_") id++;
			if (lastid!=id) // needed for the arborator encoding of multiple govs
			{
				var t=elements[conlls[el]["t"]];
				var tokids=id.split("-")
				if (tokids.length == 1) {
					tree[id]={}
					tree[id]["gov"]={};
					tree[id]["t"]=t;
					tree[id]["id"]=id;
					tree[id]["lemma"]=elements[conlls[el]["lemma"]];
					tree[id]["cat"]=elements[conlls[el]["cat"]];
					if (id>skipuntil) words.push(t);
					if (el==10) {
						tree[id]["xpos"]=elements[conlls[el]["xpos"]];
						tree[id]["morph"]=elements[conlls[el]["morph"]];
						tree[id]["gloss"]=elements[conlls[el]["gloss"]];
						if (tree[id]["gloss"]=="SpaceAfter=No"){
							tree[id]["gloss"]="_";
							tree[id]["NoSpaceAfter"]=false;
						}
						var xgov = elements[conlls[el]["xgov"]];
						if (xgov.indexOf(':') > -1){
							var xgovs=xgov.split("|");
							// $.each(xgovs, function(ind,xg){ 
							xgovs.forEach(function (xg, ind)
							{
								// for each extra governor line:
								var xgs=xg.split(":")
								if (xgs.length >=2) {
									// if it's not just _
									var gov=xgs[0];
									var func= xgs.slice(1).join(":");
									tree[id]["gov"][gov]=func;
								}
							});
						}
					}
				}
				else if (tokids.length == 2){ // n-m type multi-word encoding
					skipuntil = parseInt(tokids[1])
					words.push(elements[conlls[el]["t"]]);
					if (!(lastid in uextra)) uextra[lastid]=[];
					uextra[lastid].push(nodeline);
				}
				else {
					if (!(lastid in uextra)) uextra[lastid]=[];
					uextra[lastid].push(nodeline);
				}
			}
			gov = elements[conlls[el]["gov"]];
			if (gov!="" && gov!="_") 
			{
				if (gov==-1)
				{
					gov = elements[conlls[el]["gov"]+1];
				}
				// var func = 
				// if (func.indexOf('::') !== -1) 
				// 	{	
				// 		var stydic = func.substring(func.indexOf("::") + 1);
				// 		func = func.split("::")[0];
				// 		if (stydic!="") funcDic[func] = $.parseJSON(stydic);
				// 		$('#styleconllcheck').prop('checked', true);
				// 	};
				tree[id]["gov"][gov]=elements[conlls[el]["func"]];
			}
			lastid=id;
		}//end if el >1
	});	
	var sentence = [];
	words.forEach(function (word, i) {
		sentence.push(word);
		// if(!reverseMode){
		// 	if (i+1 in tree && !(("NoSpaceAfter" in tree[i+1]) && tree[i+1]["NoSpaceAfter"]==false)) sentence.push(" ");
		// }else{
			// sentence.push(word);

		// }
		
	});
	return {tree:tree, uextra:uextra, sentence:sentence.join(' ')};
}

}());
