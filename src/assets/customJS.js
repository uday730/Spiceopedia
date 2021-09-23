class CustomJS {
    Modal_Show(elementId) {
      $("#"+elementId).modal({
        backdrop: 'static',
        fadeDuration: 1000,
        fadeDelay: 0.50
    });

      $("#"+elementId).modal("show");  
    };

    Modal_Hide(elementId) {
      $("#"+elementId).modal("hide");  
    };

    showSuccessToast = function(msg,displayType,bgColor,iconType) {
      'use strict';
      resetToastPosition();
      $.toast({
        heading: displayType,//'Success',
        text: msg,
        showHideTransition: 'slide',
        icon: iconType,//'success',
        loaderBg: bgColor,//'#f96868',
        position: 'top-right',
        progressBar: true,
        //hideAfter: false,
        hideAfter: 10000, 
        stack: false
      })
    };

  };

  var jsObj = new CustomJS();