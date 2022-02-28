  // Fix DTG Text Resizing
        d.continueAddText = function(){
    var text = $("new_text").value;
if (text == null || text == "") {
alert(ml("You must enter a value"));
return;
}
var opts = { text: text };
var proc = allProcesses.byId[this.newProcessId];
proc.allowTextEffects = true;
proc.allowTextGradient = true;
proc.allowTextOutline = true;
proc.allowTextResize = true;
proc.allowTextWarp = true;
if (proc.isWilcomEMB()) {
opts.emb = "1";
}
if (
d.textBehaviour == "1" ||
d.textBehaviour == "2" ||
d.textBehaviour == "3"
) {
opts.vec = "1";
if (d.textBehaviour == "3") opts.useDnt = "1";
}
if (this.newTextOptions != null) {
if (this.newTextOptions.toReplace != null) {
  opts.t = this.newTextOptions.toReplace.top;
  opts.l = this.newTextOptions.toReplace.left;
  opts.z = this.newTextOptions.toReplace.zIndex;
}
}
opts.tc = dColorPicker.getDefaultColor(
this.newProcessId,
"#FF3333",
proc.defaultTextColorId
);
opts.justAddedFromUI = true;
opts.hp = "1";
opts.takeSnapshot = true;
opts.blockingActionId = this.startBlockingAction("Adding New Text");
if (opts.useDnt == "1" && opts.emb != "1") {
var usedPages = this.getFontProvider().getUsedUtf8(text);
var fontFace = this.getFontProvider().getDefaultFontForText(
  text,
  this.newProcessId
);
var self = this;
this.getFontProvider().checkFontAvailable(
  null,
  fontFace,
  true,
  false,
  text,
  true,
  function () {
    self.addNewItemByAsset(self.newProcessId, new TextAsset(), opts);
    if (
      self.newTextOptions != null &&
      self.newTextOptions.toReplace != null
    ) {
      self.newTextOptions.toReplace.del();
    }
    self.newTextOptions = null;
  }
);
} else {
this.addNewItemByAsset(this.newProcessId, new TextAsset(), opts);
if (this.newTextOptions != null && this.newTextOptions.toReplace != null) {
  this.newTextOptions.toReplace.del();
}
this.newTextOptions = null;
}

    }
