/*!***************************************************
 * mark.js
 * https://github.com/julmot/mark.js
 * Copyright (c) 2014–2016, Julian Motz
 * Released under the MIT license https://git.io/vwTVl
 *****************************************************/
"use strict";
jasmine.getFixtures().fixturesPath = "base/test/fixtures";

describe("nested unmark", function () {
    var $ctx;
    beforeEach(function (done) {
        jasmine.getFixtures().appendLoad("nested.html");

        $ctx = $(".nested");
        var instance = new Mark($ctx[0]);
        instance.mark("lorem", {
            "diacritics": false,
            "separateWordSearch": false,
            "className": "mark",
            "complete": function () {
                instance.unmark({
                    "complete": function () {
                        done();
                    }
                });
            }
        });
    });
    afterEach(function () {
        $ctx.remove();
    });

    it("should remove all marked elements", function () {
        expect($ctx).not.toContainElement("mark.mark");
    });
    it("should restore the DOM to the original state", function () {
        var nodes1 = $ctx.find("> p")[0].childNodes;
        var nodes2 = $ctx.find("> div > p")[0].childNodes;
        var nodes3 = $ctx.find(".nested-mark")[0].childNodes;
        expect(nodes1.length).toBe(3);
        expect(nodes2.length).toBe(3);
        expect(nodes3.length).toBe(1);
    });
});
