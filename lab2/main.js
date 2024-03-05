(function(window) {
  var names = ["Jack", "Jill", "John", "Dasha", "Tanya", "Andriy", "Bohdan"];

  for (var i = 0; i < names.length; i++) {
      var name = names[i];
      var firstLetter = name.charAt(0).toLowerCase();

      if (firstLetter === 'j') {
          if (window.byeLibrary) {
              byeLibrary.greet(name);
          }
      } else {
          if (window.helloLibrary) {
              helloLibrary.greet(name);
          }
      }
  }
})(window);
