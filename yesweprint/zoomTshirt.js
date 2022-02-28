if(document.documentElement.clientWidth <= 576){
//  d.selectCurrentView function's overriding;  
   d.selectCurrentView = function(id, areaId, duringLoad){
  log("selectCurrentView()");
let currViewOptions = this.currentCProduct.getView(id, true);
  if(currViewOptions == null) {
    log("View " + id + " not supported");  
    var firstProc = this.currentCProduct.product.getFirstProcessId();
    this.initViews(null, [firstProc]);
    return
  }
  this.viewToggle(id); //make it appear selected
  if(this.currentCView != null) {
    this.currentCView.hide();
  }
  //this.currentView = this.currentProduct.views.byId[id];
  this.currentCView = this.currentCProduct.getView(id, true);
  //this.currentCView.setDesignerBackground(); show() will do this
  var handleAreaId = function(areaId) {
    if(areaId == null) { //no area passed... get the first used area.. if none used get the first area...
      areaId = d.currentCView.getFirstAreaId();
      if(areaId == null) {
        log("selectCurrentView: ERROR: no first area in view");
      }
    } else {
      log("selectCurrentView: using passed areaId:" + areaId);
    }
    return areaId;
  }
  if(this.inSimpleMode(TEMPLATE_MODE_CP)) {
    if(this.currentCView.uiPrepared != true) {
      this.currentCView.prepareUI(null, true);
    }
    if(!this.currentCProduct.isNonDecProduct()) {
      areaId = handleAreaId(areaId);
      this.selectCurrentArea(areaId, false); //set the area while in simple mode as some popups use it, i.e. select screen colors
    }
    this.currentCView.setBgPosition();
    this.currentCView.show();
  } else if(this.mode != DESIGNER_MODE_VIEW_CUSTOM_PRODUCT) { //lets also set the area and load the items used in that area
    if(!this.currentCProduct.isNonDecProduct()) {
      areaId = handleAreaId(areaId);
    }
    this.currentCView.show();
    if(!this.currentCProduct.isNonDecProduct()) {
      this.selectCurrentArea(areaId, false);
      this.currentCView.setBgPosition();
    }
  } else if(this.currentCView.productView.nonVis) {
    var vid = this.currentCProduct.product.getFirstVisViewId();
    //we will load the designer...
    if(duringLoad && vid != null) {
      //find the first vis view...
      log("Loading a vis view");
      this.selectCurrentView(vid);
    } else {
      msgBox("Loading Designer", "Please wait while the designer loads");
      this.loadInDesigner({mode:"BLANK_PRODUCT", viewId:this.currentCView.productView.id});
    }
    return;
  } else {
    this.currentCView.show();
  }
  this.currentCView.checkBgImage();
// calculateBackgroundPosition function's overriding Start
    d.currentCView.calculateBackgroundPosition = function (zoomed, designOnly) {
  
  if(zoomed) {
    if(designOnly) {
      var areaPosition = this.selectedArea.getDesignZoomScale();
    } else {
      var areaPosition = this.selectedArea.productArea.getZoomedDesignerPosition();
    }
    //we have the positon of the area... we need the position of the background element....
    var left = 0 - (areaPosition.s * areaPosition.ol) + areaPosition.l;
    var top = 0 - (areaPosition.s * areaPosition.ot) + areaPosition.t;
    var width = areaPosition.s * d.canvasSize;
    var height = areaPosition.s * d.canvasSize;
    var reScale = areaPosition.s;
    return {
      l: left,
      t: top,
      w: width,
      h: height,
      s: reScale
    }
  } else {
    var bb = d.getDesignerSize();
    var reScale;
    if(bb.h >= bb.w) {
      //fit using width
      log("using width to fit");
      reScale = parseFloat(bb.w) / parseFloat(d.canvasSize);
      console.log(reScale,"width");
    } else {
      log("using height to fit");
      reScale = parseFloat(bb.h) / parseFloat(d.canvasSize);
       console.log(reScale,"height");
    }
    
   reScale += 0.3;
    var w = d.canvasSize * reScale;
    var h = d.canvasSize * reScale;
    var l = (bb.w - w) / 2;
    var t = (bb.h - h) / 2;
    
    return {
      l: l,
      t: t,
      w: w,
      h: h,
      s: reScale
    }
    
  }
}
d.currentCView.toggleZoomMode();
}
// calculateBackgroundPosition function's overriding END
//  d.selectCurrentView function's overriding END ;
}
