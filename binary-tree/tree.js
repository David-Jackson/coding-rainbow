function Tree() {
    this.value = null;
    this.left = null;
    this.right = null;

    this._level = 1;
    this._maxLevel = 1;

    this.x = 1;
    this.y = 1;
}

Tree.prototype.add = function() {
    for (var i = 0; i < arguments.length; i++) {
        var val = arguments[i];
        if (this.value == null) {
            this.value = val;
        } else if (val < this.value) {
            if (this.left == null) {
                this.left = new Tree();
                this.left._level = this._level + 1;
                this.left.x = (2 * this.x) - 1;
                this.left.y = this.y + 1;
            }
            this.left.add(val);
        } else if (val > this.value) {
            if (this.right == null) {
                this.right = new Tree();
                this.right._level = this._level + 1;
                this.right.x = (2 * this.x);
                this.right.y = this.y + 1;
            }
            this.right.add(val);
        }
    }
    this._maxLevel = this.maxLevel();
}

Tree.prototype.find = function(_val) {
    if (this.value == _val) {
        return this.value;
    } else if (_val < this.value && this.left != null) {
        return this.left.find(_val);
    } else if (_val > this.value && this.right != null) {
        return this.right.find(_val);
    }
    return null;
}

Tree.prototype.traverse = function(callback) {
    callback = callback || console.log;
    if (this.left != null) this.left.traverse(callback);
    callback(this);
    if (this.right != null) this.right.traverse(callback);
}

Tree.prototype.getAllLessThan = function(_val) {
    var res = [];
    this.traverse(function(x) {
        if (x.value <= _val) res.push(x.value);
    });
    return res;
}

Tree.prototype.getAllGreaterThan = function(_val) {
    var res = [];
    this.traverse(function(x) {
        if (x.value >= _val) res.push(x.value);
    });
    return res;
}

Tree.prototype.maxLevel = function() {
    var max = 0;
    this.traverse(function(x) {
        if (x._level > max) max = x._level;
    });
    return max;
}

Tree.prototype.toArray = function() {
    return ((this.left == null) ? [] : this.left.toArray()).concat(
        [this.value],
        (this.right == null) ? [] : this.right.toArray()
    );
}

Tree.prototype.toString = function() {
    return this.toArray().join(",");
}