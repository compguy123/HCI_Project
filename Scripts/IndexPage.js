

var handleComponentClick=(compName)=>{
    //push TopSellers.html to the breadcrumbs
    localStorage.setItem("history",JSON.stringify(["Index.html"]));
    
    // window.localStorage.setItem("history","pages/"+compName);
    window.location.href = "Pages/"+compName;
    history.push("pages/"+compName);
    
  }

 