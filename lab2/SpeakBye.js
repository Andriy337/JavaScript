(function(window) {
  var speakWord = "Goodbye";

  var byeLibrary = {
      greet: function(name) {
          console.log(speakWord + " " + name);
      }
  };

  if (!window.byeLibrary) {
      window.byeLibrary = byeLibrary;
  }
})(window);
