
RGraph=window.RGraph||{isRGraph:true};RGraph.Thermometer=function(conf)
{if(typeof conf==='object'&&typeof conf.id==='string'){var parseConfObjectForOptions=true;}else{var conf={id:arguments[0],min:arguments[1],max:arguments[2],value:arguments[3]}}
this.id=conf.id;this.canvas=document.getElementById(this.id);this.context=this.canvas.getContext?this.canvas.getContext('2d'):null;this.canvas.__object__=this;this.uid=RGraph.CreateUID();this.canvas.uid=this.canvas.uid?this.canvas.uid:RGraph.CreateUID();this.colorsParsed=false;this.type='thermometer';this.isRGraph=true;this.min=RGraph.stringsToNumbers(conf.min);this.max=RGraph.stringsToNumbers(conf.max);this.value=RGraph.stringsToNumbers(conf.value);this.coords=[];this.graphArea=[];this.currentValue=null;this.coordsText=[];this.original_colors=[];this.firstDraw=true;this.properties={'chart.linewidth':1,'chart.background.color':'white','chart.strokestyle':'black','chart.colors':['Gradient(#c00:red:#f66:#fcc)'],'chart.gutter.left':25,'chart.gutter.right':25,'chart.gutter.top':25,'chart.gutter.bottom':25,'chart.ticksize':2,'chart.text.color':'black','chart.text.font':'Arial, Verdana, sans-serif','chart.text.size':12,'chart.text.bold':false,'chart.text.italic':false,'chart.text.accessible':true,'chart.text.accessible.overflow':'visible','chart.text.accessible.pointerevents':false,'chart.numticks':10,'chart.units.pre':'','chart.units.post':'','chart.zoom.factor':1.5,'chart.zoom.fade.in':true,'chart.zoom.fade.out':true,'chart.zoom.hdir':'right','chart.zoom.vdir':'down','chart.zoom.frames':25,'chart.zoom.delay':16.666,'chart.zoom.shadow':true,'chart.zoom.background':true,'chart.title':'','chart.title.side':'','chart.title.side.bold':true,'chart.title.side.font':null,'chart.shadow':true,'chart.shadow.offsetx':0,'chart.shadow.offsety':0,'chart.shadow.blur':15,'chart.shadow.color':'#ddd','chart.resizable':false,'chart.contextmenu':null,'chart.adjustable':false,'chart.value.label':true,'chart.value.label.color':null,'chart.value.label.font':null,'chart.value.label.size':null,'chart.value.label.bold':null,'chart.value.label.italic':null,'chart.value.label.decimals':null,'chart.value.label.thousand':',','chart.value.label.point':'.','chart.labels.count':5,'chart.scale.visible':false,'chart.scale.decimals':0,'chart.annotatable':false,'chart.annotate.color':'black','chart.scale.decimals':0,'chart.scale.point':'.','chart.scale.thousand':',','chart.tooltips':null,'chart.tooltips.highlight':true,'chart.tooltips.effect':'fade','chart.tooltips.event':'onclick','chart.highlight.stroke':'rgba(0,0,0,0)','chart.highlight.fill':'rgba(255,255,255,0.7)','chart.clearto':'rgba(0,0,0,0)','chart.bulb.bottom.radius.adjust':0,'chart.bulb.bottom.radius':null}
if(!this.canvas){alert('[THERMOMETER] No canvas support');return;}
this.$0={};if(!this.canvas.__rgraph_aa_translated__){this.context.translate(0.5,0.5);this.canvas.__rgraph_aa_translated__=true;}
var RG=RGraph,ca=this.canvas,co=ca.getContext('2d'),prop=this.properties,pa2=RG.path2,win=window,doc=document,ma=Math
if(RG.Effects&&typeof RG.Effects.decorate==='function'){RG.Effects.decorate(this);}
this.set=this.Set=function(name)
{var value=typeof arguments[1]==='undefined'?null:arguments[1];if(arguments.length===1&&typeof name==='object'){RG.parseObjectStyleConfig(this,name);return this;}
if(name.substr(0,6)!='chart.'){name='chart.'+name;}
while(name.match(/([A-Z])/)){name=name.replace(/([A-Z])/,'.'+RegExp.$1.toLowerCase());}
if(name=='chart.ylabels.count'){name='chart.labels.count';}
prop[name.toLowerCase()]=value;return this;};this.get=this.Get=function(name)
{if(name.substr(0,6)!='chart.'){name='chart.'+name;}
while(name.match(/([A-Z])/)){name=name.replace(/([A-Z])/,'.'+RegExp.$1.toLowerCase());}
return prop[name];};this.draw=this.Draw=function()
{RG.fireCustomEvent(this,'onbeforedraw');this.value=ma.min(this.max,this.value);this.value=ma.max(this.min,this.value);if(!this.colorsParsed){this.parseColors();this.colorsParsed=true;}
this.currentValue=this.value;this.coordsText=[];this.gutterLeft=prop['chart.gutter.left'];this.gutterRight=prop['chart.gutter.right'];this.gutterTop=prop['chart.gutter.top'];this.gutterBottom=prop['chart.gutter.bottom'];this.scale2=RG.getScale2(this,{max:this.max,min:this.min,strict:true,'scale.thousand':prop['chart.scale.thousand'],'scale.point':prop['chart.scale.point'],'scale.decimals':prop['chart.scale.decimals'],'ylabels.count':prop['chart.labels.count'],'scale.round':prop['chart.scale.round'],'units.pre':prop['chart.units.pre'],'units.post':prop['chart.units.post']});this.x=this.gutterLeft;this.width=ca.width-this.gutterLeft-this.gutterRight;this.y=this.gutterTop+(this.width/2);this.halfWidth=this.width/2;this.bulbTopCenterx=this.gutterLeft+(this.width/2);this.bulbTopCentery=this.gutterTop+(this.width/2);this.bulbTopRadius=this.width/2;this.bulbBottomCenterx=this.gutterLeft+(this.width/2);this.bulbBottomRadius=typeof prop['chart.bulb.bottom.radius']==='number'?prop['chart.bulb.bottom.radius']:this.width*0.75+prop['chart.bulb.bottom.radius.adjust'];this.bulbBottomCentery=ca.height-this.gutterBottom-this.bulbBottomRadius;this.scaleTopY=this.bulbTopCentery;this.scaleBottomY=this.bulbBottomCentery-this.bulbBottomRadius;this.scaleHeight=this.scaleBottomY-this.scaleTopY;this.height=this.getYCoord(this.min)-this.getYCoord(this.value);this.coords[0]=[this.x,this.getYCoord(this.value),this.width,this.height];this.drawBackground();this.drawBar();this.drawTickMarks();this.drawLabels();if(prop['chart.title']){this.drawTitle();}
if(prop['chart.title.side']){this.drawSideTitle();}
if(prop['chart.resizable']){RG.allowResizing(this);}
if(prop['chart.contextmenu']){RG.showContext(this);}
RG.installEventListeners(this);if(this.firstDraw){this.firstDraw=false;RG.fireCustomEvent(this,'onfirstdraw');this.firstDrawFunc();}
RG.fireCustomEvent(this,'ondraw');return this;};this.drawBackground=this.DrawBackground=function()
{if(prop['chart.shadow']){RG.setShadow(this,prop['chart.shadow.color'],prop['chart.shadow.offsetx'],prop['chart.shadow.offsety'],prop['chart.shadow.blur']);}
this.pathBackground();co.strokeStyle=prop['chart.strokestyle'];co.fillStyle=prop['chart.background.color'];co.lineWidth=1+prop['chart.linewidth'];co.stroke();co.fill();co.lineWidth=1;};this.drawBar=this.DrawBar=function()
{this.pathBar();pa2(co,'f %',prop['chart.colors'][0]);};this.pathBar=function()
{var barHeight=this.coords[0][3],y=(this.coords[0][1]+this.coords[0][3])-barHeight
RG.noShadow(this);pa2(co,'b r % % % % a % % % 0 6.28 false',this.coords[0][0],y,this.coords[0][2],this.bulbBottomCentery-y,this.bulbBottomCenterx,this.bulbBottomCentery,this.bulbBottomRadius);};this.pathBackground=function()
{pa2(this.context,'b   r % % % %   a % % % 0 6.28 false   m % %   a % % % 0 6.28 false',this.x,this.scaleTopY,this.coords[0][2],this.bulbBottomCentery-this.scaleTopY,this.bulbTopCenterx,this.bulbTopCentery,this.bulbTopRadius,this.bulbBottomCenterx,this.bulbBottomCentery,this.bulbBottomCenterx,this.bulbBottomCentery,this.bulbBottomRadius);};this.drawTickMarks=this.DrawTickMarks=function()
{if(prop['chart.numticks']){var ticksize=prop['chart.ticksize'];co.strokeStyle=prop['chart.strokestyle'];co.lineWidth=prop['chart.linewidth']/2;co.beginPath();for(var i=0;i<=prop['chart.numticks'];++i){var y=this.scaleBottomY-((this.scaleHeight/prop['chart.numticks'])*i);co.moveTo(this.gutterLeft,ma.round(y));co.lineTo(this.gutterLeft+ticksize,ma.round(y));co.moveTo(ca.width-this.gutterRight,ma.round(y));co.lineTo(ca.width-this.gutterRight-ticksize,ma.round(y));}
co.stroke();co.lineWidth=1;}};this.drawLabels=this.DrawLabels=function()
{if(prop['chart.value.label']){co.fillStyle=typeof prop['chart.value.label.color']==='string'?prop['chart.value.label.color']:prop['chart.text.color'];var text=prop['chart.scale.visible']?RG.numberFormat(this,this.value.toFixed(typeof prop['chart.value.label.decimals']=='number'?prop['chart.value.label.decimals']:prop['chart.scale.decimals'])):RG.numberFormat(this,this.value.toFixed(typeof prop['chart.value.label.decimals']=='number'?prop['chart.value.label.decimals']:prop['chart.scale.decimals']),prop['chart.units.pre'],prop['chart.units.post']);RG.text2(this,{font:typeof prop['chart.value.label.font']==='string'?prop['chart.value.label.font']:prop['chart.text.font'],size:typeof prop['chart.value.label.size']==='number'?prop['chart.value.label.size']:prop['chart.text.size'],x:this.coords[0][0]+(this.coords[0][2]/2),y:this.coords[0][1]+7,text:text,bold:typeof prop['chart.value.label.bold']==='boolean'?prop['chart.value.label.bold']:prop['chart.text.bold'],italic:typeof prop['chart.value.label.italic']==='boolean'?prop['chart.value.label.italic']:prop['chart.text.italic'],valign:'top',halign:'center',bounding:true,boundingFill:'white',tag:'value.label'});}
if(prop['chart.scale.visible']){this.drawScale();}};this.drawTitle=this.DrawTitle=function()
{co.fillStyle=prop['chart.text.color'];RG.text2(this,{font:prop['chart.text.font'],size:prop['chart.text.size']+2,x:this.gutterLeft+(this.width/2),y:this.gutterTop-3,text:String(prop['chart.title']),valign:'bottom',halign:'center',bold:true,tag:'title'});};this.drawSideTitle=this.DrawSideTitle=function()
{var font=prop['chart.title.side.font']?prop['chart.title.side.font']:prop['chart.text.font'];var size=prop['chart.title.side.size']?prop['chart.title.side.size']:prop['chart.text.size']+2;co.fillStyle=prop['chart.text.color'];RG.text2(this,{font:font,size:size+2,x:this.gutterLeft-3,y:(this.scaleHeight/2)+this.gutterTop+this.bulbTopRadius,text:String(prop['chart.title.side']),valign:'bottom',halign:'center',angle:270,bold:prop['chart.title.side.bold'],tag:'title.side',accessible:false});};this.drawScale=this.DrawScale=function()
{co.fillStyle=prop['chart.text.color'];var font=prop['chart.text.font'],italic=prop['chart.text.italic'],bold=prop['chart.text.bold'],size=prop['chart.text.size'],color=prop['chart.text.color'],units_pre=prop['chart.units.pre'],units_post=prop['chart.units.post'],decimals=prop['chart.scale.decimals'],numLabels=prop['chart.labels.count'],step=(this.max-this.min)/numLabels;for(var i=1;i<=numLabels;++i){var x=ca.width-this.gutterRight+(prop['chart.linewidth']/2),y=ca.height-this.gutterBottom-(2*this.bulbBottomRadius)-((this.scaleHeight/numLabels)*i),text=RG.numberFormat(this,String((this.min+(i*step)).toFixed(decimals)),units_pre,units_post);RG.text2(this,{font:font,size:size,x:x+6,y:y,text:text,valign:'center',tag:'scale',bold:bold,italic:italic,color:color});}
RG.text2(this,{font:font,size:size,x:x+6,y:this.bulbBottomCentery-this.bulbBottomRadius,text:RG.numberFormat(this,this.min.toFixed(decimals),units_pre,units_post),valign:'center',tag:'scale'});};this.getShape=this.getBar=function(e)
{var mouseXY=RG.getMouseXY(e),mouseX=mouseXY[0],mouseY=mouseXY[1];for(var i=0;i<this.coords.length;i++){var coords=this.coords[i],left=coords[0],top=coords[1],width=coords[2],height=coords[3];this.pathBar();if(co.isPointInPath(mouseX,mouseY)){var tooltip=RG.parseTooltipText?RG.parseTooltipText(prop['chart.tooltips'],i):'';return{0:this,object:this,1:left,x:left,2:top,y:top,3:width,width:width,4:height,height:height,5:i,index:i,tooltip:tooltip};}}
return null;};this.getValue=function(arg)
{if(arg.length===2){var mouseX=arg[0],mouseY=arg[1];}else{var mouseXY=RG.getMouseXY(arg),mouseX=mouseXY[0],mouseY=mouseXY[1];}
var value=(this.scaleHeight-(mouseY-this.scaleTopY))/this.scaleHeight;value*=(this.max-this.min);value+=this.min;value=ma.max(value,this.min);value=ma.min(value,this.max);return value;};this.highlight=this.Highlight=function(shape)
{if(prop['chart.tooltips.highlight']){if(typeof prop['chart.highlight.style']==='function'){(prop['chart.highlight.style'])(shape);return;}
this.pathBar();pa2(co,'s % f %',prop['chart.highlight.stroke'],prop['chart.highlight.fill']);}};this.getObjectByXY=function(e)
{var mouseXY=RG.getMouseXY(e),mouseX=mouseXY[0],mouseY=mouseXY[1]
this.pathBackground();if(co.isPointInPath(mouseX,mouseY)){return this;}};this.adjusting_mousemove=this.Adjusting_mousemove=function(e)
{if(prop['chart.adjustable']&&RG.Registry.get('chart.adjusting')&&RG.Registry.Get('chart.adjusting').uid==this.uid){var mouseXY=RG.getMouseXY(e),value=this.getValue(e);if(typeof(value)=='number'){RG.fireCustomEvent(this,'onadjust');this.value=Number(value.toFixed(prop['chart.scale.decimals']));RG.redrawCanvas(ca);}}};this.getYCoord=function(value)
{if(value>this.max||value<this.min){return null;}
var y=ma.abs(value-this.min)/ma.abs(this.max-this.min)
y=y*(this.scaleBottomY-this.scaleTopY);return this.scaleBottomY-y;};this.overChartArea=function(e)
{var mouseXY=RG.getMouseXY(e),mouseX=mouseXY[0],mouseY=mouseXY[1];this.pathBackground();return co.isPointInPath(mouseX,mouseY);};this.parseColors=function()
{if(this.original_colors.length===0){this.original_colors['chart.colors']=RG.arrayClone(prop['chart.colors']);}
var colors=prop['chart.colors'];for(var i=0;i<colors.length;++i){colors[i]=this.parseSingleColorForGradient(colors[i]);}};this.reset=function()
{};this.parseSingleColorForGradient=function(color)
{if(!color){return color;}
if(typeof color==='string'&&color.match(/^gradient\((.*)\)$/i)){if(color.match(/^gradient\(({.*})\)$/i)){return RGraph.parseJSONGradient({object:this,def:RegExp.$1});}
var parts=RegExp.$1.split(':');var grad=co.createLinearGradient(prop['chart.gutter.left'],0,ca.width-prop['chart.gutter.right'],0);var diff=1/(parts.length-1);grad.addColorStop(0,RG.trim(parts[0]));for(var j=1;j<parts.length;++j){grad.addColorStop(j*diff,RG.trim(parts[j]));}}
return grad?grad:color;};this.on=function(type,func)
{if(type.substr(0,2)!=='on'){type='on'+type;}
if(typeof this[type]!=='function'){this[type]=func;}else{RG.addCustomEventListener(this,type,func);}
return this;};this.firstDrawFunc=function()
{};this.grow=function()
{var obj=this,callback=arguments[1]||function(){},opt=arguments[0]||{},frames=opt.frames?opt.frames:30,origValue=Number(obj.currentValue),newValue=obj.value;newValue=ma.min(newValue,this.max);newValue=ma.max(newValue,this.min);var diff=newValue-origValue,step=(diff/frames),frame=0;function iterate()
{obj.value=(step*frame)+origValue;RG.clear(obj.canvas);RG.redrawCanvas(obj.canvas);if(frame<frames){frame++;RG.Effects.updateCanvas(iterate);}else{callback(obj);}}
iterate();return this;};RG.register(this);if(parseConfObjectForOptions){RG.parseObjectStyleConfig(this,conf.options);}};