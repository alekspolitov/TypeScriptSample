var Greeter = (function () {
    //static MyStaticVar: string = "тестовое сообщение";
    function Greeter(element) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }
    Greeter.prototype.start = function () {
        var _this = this;
        this.timerToken = setInterval(function () { return _this.span.innerHTML = new Date().toUTCString(); }, 500);
    };
    Greeter.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    return Greeter;
})();
window.onload = function () {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
};
var Shapes;
(function (Shapes) {
    // Class
    var Point = (function () {
        // Constructor
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        // Instance member
        Point.prototype.getDist = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        };
        // Static member
        Point.origin = new Point(0, 0);
        return Point;
    })();
    Shapes.Point = Point;
})(Shapes || (Shapes = {}));
// Local variables
var p = new Shapes.Point(3, 4);
var dist = p.getDist();
