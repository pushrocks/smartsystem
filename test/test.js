"use strict";
require("typings-test");
const smartsystem = require("../dist/index");
describe('smartsystem', function () {
    it('should load a module lazily', function (done) {
        let lazyModuleExample = new smartsystem.LazyModule('../test/moduleExample.js', __dirname);
        lazyModuleExample.load().then(m => {
            console.log(m.exportedTestBoolean);
            done();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUFxQjtBQUVyQiw2Q0FBNEM7QUFJNUMsUUFBUSxDQUFDLGFBQWEsRUFBRTtJQUNwQixFQUFFLENBQUMsNkJBQTZCLEVBQUUsVUFBVSxJQUFJO1FBQzVDLElBQUksaUJBQWlCLEdBQUcsSUFBSSxXQUFXLENBQUMsVUFBVSxDQUF3QiwwQkFBMEIsRUFBQyxTQUFTLENBQUMsQ0FBQTtRQUUvRyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO1lBQ2xDLElBQUksRUFBRSxDQUFBO1FBQ1YsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQyxDQUFBIn0=