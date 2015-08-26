; (function ($, window, document, undefined) {
  'use strict';

  $.getGit = {};

  var BASE_URL = 'https://api.github.com',
      ensureReq = function (id) {
        if (!id || id instanceof Object) {
          throw new Error();
        } else {
          return id;
        }
      },
      base = function () {
        var def = $.Deferred.bind({}),
            rack = function () {
              this.balls = [];
              this.broken = false;
              this.result = null;
              this.up = function (ball) {
                if (!(this.broken)) {
                  balls.push(ball);
                  return;
                }
                ball(this.table);
              };
              this.sinkem = function (table) {
                if (this.broken) return;
                this.table = table;
                this.broken = true;

                while (this.balls.length > 0) this.balls.shift()(table);

                return table;
              }
            };
        def.rack = new rack();
        def.pocket = BASE_URL;

        def.markIt = function () {
          $.ajax({
            type: 'GET',
            url: this.pocket,
            success: function (res) {
              this.resolve(res);
            }.bind(this),
            error: function (jqxhr) {
              this.reject(jqxhr);
            }.bind(this)
          });

          return this;
        };

        return def;
      },
      pluralize = function (singular) {
        return singular + 's';
      };

  $.getGit.repos = function (type, identifier, callback, error) {
    var repo = function () {
      $.extend(this, base());
      this.pocket += '/$0/$1/repos'.replace(/\$0/, pluralize(ensureReq(type))).replace(/\$1/, ensureReq(identifier));
      this.resolve = callback;
      this.reject = error;

      setTimeout(function () {
        this.rack.sinkem(this).markIt();
      }.bind(this));

      return this;
    };
    return new repo();
  };

})(jQuery, window, document);