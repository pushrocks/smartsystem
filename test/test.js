"use strict";
require("typings-test");
const smartsystem = require("../dist/index");
describe('smartsystem', function () {
    it('should load a module lazily', function (done) {
        let lazyModuleExample = new smartsystem.LazyModule('./test/moduleExample.js');
        lazyModuleExample.load().then(m => {
            console.log(m.exportedTestBoolean);
            done();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUFxQjtBQUVyQiw2Q0FBNEM7QUFJNUMsUUFBUSxDQUFDLGFBQWEsRUFBRTtJQUNwQixFQUFFLENBQUMsNkJBQTZCLEVBQUUsVUFBVSxJQUFJO1FBQzVDLElBQUksaUJBQWlCLEdBQUcsSUFBSSxXQUFXLENBQUMsVUFBVSxDQUF3Qix5QkFBeUIsQ0FBQyxDQUFBO1FBRXBHLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUE7WUFDbEMsSUFBSSxFQUFFLENBQUE7UUFDVixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFDLENBQUEifQ==