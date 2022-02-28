d.addAsset = function(options){
        const xRes = (options.meta && options.meta.x_res) ? options.meta.x_res : 300
    const w = d.convertLengthFromInches(options.width / xRes);
     if(w < 7 || w > 10){
    let newOptionsWidth;
    let cnt = 0;
    switch(xRes)
    {
      case 100:
        cnt = 1;
        break;
      case 200:
        cnt = 3;
        break;
      case 300:
        cnt = 4;
        break;
      case 400:
        cnt = 5;
        break;
      case 500:
        cnt = 6;
        break;
      case 600:
        cnt = 7;
        break;
      case 700:
        cnt = 8;
        break;
      default:
        cnt = xRes / 100 ;
     
    }
    
    if(w < 7){
     newOptionsWidth = d.convertLengthToInches(7 * 100 * cnt );
    }
    else if(w > 10){
        newOptionsWidth = d.convertLengthToInches(10 * 100 * cnt);
    }
   
         options.height += newOptionsWidth - options.width;
        options.width = newOptionsWidth;
    }
   var asset = null;
  if (parseInt(options.type, 10) == ASSET_TYPE_TEMPLATE_TEXT) {
    asset = new TemplateTextAsset(options, this);
  } else if (parseInt(options.type, 10) == ASSET_TYPE_DNT_TEXT) {
    asset = new TextAsset(options, this);
  } else {
    asset = new Asset(options, this);
  }
  return this.addAssetObj(asset);
  }
