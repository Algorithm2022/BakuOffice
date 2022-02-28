//BUG FIX. when click start design in home page , not scale tshirt ;
    if(document.querySelector("#dn_main_nav_start-designing_dropdown")){
    document.querySelector("#dn_main_nav_start-designing_dropdown > a").removeAttribute("href");
 let onclickVal = "window.location='/designer/customize';"
    document.querySelector("#dn_main_nav_start-designing_dropdown").setAttribute("onclick",onclickVal);
    }
