(function(window) {
  var speakWord = "Hello";

  var helloLibrary = {
      greet: function(name) {
          console.log(speakWord + " " + name);
      }
  };

  if (!window.helloLibrary) {
      window.helloLibrary = helloLibrary;
  }
})(window);
