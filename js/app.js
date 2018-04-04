requirejs.config({
    baseUrl: "./js/",
    paths: {
        jquery: 'jquery-3.3.1.min'
    }
});
require(
    [
        "jquery",
        "./js/transliterater.js"
    ],
    function($, transliterater){
        var timer = null;
        transliterater.initLibs();
        $("#inStr").on('keyup',function(){
            var self = $(this);
            clearTimeout(timer);
            timer = setTimeout(transliterate(self.val()), 5000);
        });
        $("#inStr").on('keydown', function(){
            clearTimeout(timer);
        });
        function transliterate(inStr){
            var results = transliterater.getTranslitVars("ru","en",inStr, true);
            console.log(results);
        };
    });
