(function(window) {
    
    var names = ["Jack", "Jill", "John", "Dasha", "Tanya", "Andriy", "Bohdan"];

    
    function greetsecond(name) {
        var lastLetter = name.charAt(name.length - 1).toLowerCase();
        
        
        if (lastLetter === 'a') {
            helloLibrary.greet(name);
        } else {
            byeLibrary.greet(name);
        }
    }


    for (var i = 0; i < names.length; i++) {
        var name = names[i];
        var firstLetter = name.charAt(0).toLowerCase();

        
        if (firstLetter === 'j') {
            byeLibrary.greet(name);
        } else {
            helloLibrary.greet(name);
        }

        
        greetsecond(name);
    }
})(window);
