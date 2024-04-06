var engine = (function () {
    'use strict';

    function makeRun() {
        console.log("Hi");
    }
    var index = () => {
        const fmap = {
            makeRun
        };
        return fmap;
    };

    return index;

})();
