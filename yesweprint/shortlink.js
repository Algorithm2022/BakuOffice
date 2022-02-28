document.addEventListener("DOMContentLoaded", function () {
  if(location.href.includes("yesweprint.com/designer/")){
    history.pushState("Link", 'Designer Studio Link Short', location.pathname);
  }
}
