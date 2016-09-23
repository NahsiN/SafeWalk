window.Modernizr = function(Y, X, W) {
  function E(b) {
    Q.cssText = b
  }
  function D(d, c) {
    return E(prefixes.join(d + ";") + (c || ""))
  }
  function C(d, c) {
    return typeof d === c
  }
  function B(d, c) {
    return !!~("" + d).indexOf(c)
  }
  function A(g, c, j) {
    for (var i in g) {
      var h = c[g[i]];
      if (h !== W) {
        return j === !1 ? g[i] : C(h, "function") ? h.bind(j || c) : h
      }
    }
    return !1
  }
  var V = "2.6.2",
    U = {},
    T = X.documentElement,
    S = "modernizr",
    R = X.createElement(S),
    Q = R.style,
    P,
    O = {}.toString,
    N = {},
    M = {},
    K = {},
    J = [],
    I = J.slice,
    H,
    G = {}.hasOwnProperty,
    F;
  !C(G, "undefined") && !C(G.call, "undefined") ? F = function(d, c) {
    return G.call(d, c)
  } : F = function(d, c) {
    return c in d && C(d.constructor.prototype[c], "undefined")
  }, Function.prototype.bind || (Function.prototype.bind = function(a) {
    var h = this;
    if (typeof h != "function") {
      throw new TypeError
    }
    var g = I.call(arguments, 1),
      f = function() {
        if (this instanceof f) {
          var b = function() {};
          b.prototype = h.prototype;
          var d = new b,
            c = h.apply(d, g.concat(I.call(arguments)));
          return Object(c) === c ? c : d
        }
        return h.apply(a, g.concat(I.call(arguments)))
      };
    return f
  }), N.geolocation = function() {
    return "geolocation" in navigator
  }, N.history = function() {
    return !!Y.history && !!history.pushState
  };
  for (var z in N) {
    F(N, z) && (H = z.toLowerCase(), U[H] = N[z](), J.push((U[H] ? "" : "no-") + H))
  }
  return U.addTest = function(e, c) {
      if (typeof e == "object") {
        for (var f in e) {
          F(e, f) && U.addTest(f, e[f])
        }
      } else {
        e = e.toLowerCase();
        if (U[e] !== W) {
          return U
        }
        c = typeof c == "function" ? c() : c, typeof enableClasses != "undefined" && enableClasses && (T.className += " " + (c ? "" : "no-") + e), U[e] = c
      }
      return U
    }, E(""), R = P = null, U._version = V, U
}(this, this.document);!function(c) {
  var b = function(e, d) {
    this.init("tooltip", e, d)
  };
  b.prototype = {
    constructor: b,
    init: function(k, h, f) {
      var m,
        d,
        j,
        e,
        g;
      this.type = k;
      this.$element = c(h);
      this.options = this.getOptions(f);
      this.enabled = true;
      j = this.options.trigger.split(" ");
      for (g = j.length; g--;) {
        e = j[g];
        if (e == "click") {
          this.$element.on("click." + this.type, this.options.selector, c.proxy(this.toggle, this))
        } else {
          if (e != "manual") {
            m = e == "hover" ? "mouseenter" : "focus";
            d = e == "hover" ? "mouseleave" : "blur";this.$element.on(m + "." + this.type, this.options.selector, c.proxy(this.enter, this));this.$element.on(d + "." + this.type, this.options.selector, c.proxy(this.leave, this))
          }
        }
      }
      this.options.selector ? (this._options = c.extend({}, this.options, {
        trigger: "manual",
        selector: ""
      })) : this.fixTitle()
    },
    getOptions: function(d) {
      d = c.extend({}, c.fn[this.type].defaults, this.$element.data(), d);
      if (d.delay && typeof d.delay == "number") {
        d.delay = {
          show: d.delay,
          hide: d.delay
        }
      }
      return d
    },
    enter: function(f) {
      var d = c(f.currentTarget)[this.type](this._options).data(this.type);
      if (!d.options.delay || !d.options.delay.show) {
        return d.show()
      }
      clearTimeout(this.timeout);
      d.hoverState = "in";
      this.timeout = setTimeout(function() {
        if (d.hoverState == "in") {
          d.show()
        }
      }, d.options.delay.show)
    },
    leave: function(f) {
      var d = c(f.currentTarget)[this.type](this._options).data(this.type);
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      if (!d.options.delay || !d.options.delay.hide) {
        return d.hide()
      }
      d.hoverState = "out";
      this.timeout = setTimeout(function() {
        if (d.hoverState == "out") {
          d.hide()
        }
      }, d.options.delay.hide)
    },
    show: function() {
      var i,
        k,
        g,
        j,
        d,
        h,
        f = c.Event("show");
      if (this.hasContent() && this.enabled) {
        this.$element.trigger(f);
        if (f.isDefaultPrevented()) {
          return
        }
        i = this.tip();this.setContent();
        if (this.options.animation) {
          i.addClass("fade")
        }
        d = typeof this.options.placement == "function" ? this.options.placement.call(this, i[0], this.$element[0]) : this.options.placement;i.detach().css({
          top: 0,
          left: 0,
          display: "block"
        });
        this.options.container ? i.appendTo(this.options.container) : i.insertAfter(this.$element);
        k = this.getPosition();
        g = i[0].offsetWidth;
        j = i[0].offsetHeight;switch (d) {
          case "bottom":
            h = {
              top: k.top + k.height,
              left: k.left + k.width / 2 - g / 2
            };
            break;case "top":
            h = {
              top: k.top - j,
              left: k.left + k.width / 2 - g / 2
            };
            break;case "left":
            h = {
              top: k.top + k.height / 2 - j / 2,
              left: k.left - g
            };
            break;case "right":
            h = {
              top: k.top + k.height / 2 - j / 2,
              left: k.left + k.width
            };
            break
        }
        this.applyPlacement(h, d);this.$element.trigger("shown")
      }
    },
    applyPlacement: function(g, h) {
      var i = this.tip(),
        e = i[0].offsetWidth,
        m = i[0].offsetHeight,
        d,
        j,
        k,
        f;
      i.offset(g).addClass(h).addClass("in");
      d = i[0].offsetWidth;
      j = i[0].offsetHeight;
      if (h == "top" && j != m) {
        g.top = g.top + m - j;
        f = true
      }
      if (h == "bottom" || h == "top") {
        k = 0;
        if (g.left < 0) {
          k = g.left * -2;
          g.left = 0;i.offset(g);
          d = i[0].offsetWidth;
          j = i[0].offsetHeight
        }
        this.replaceArrow(k - e + d, d, "left")
      } else {
        this.replaceArrow(j - m, j, "top")
      }
      if (f) {
        i.offset(g)
      }
    },
    replaceArrow: function(f, e, d) {
      this.arrow().css(d, f ? (50 * (1 - f / e) + "%") : "")
    },
    setContent: function() {
      var e = this.tip(),
        d = this.getTitle();
      e.find(".tooltip-inner")[this.options.html ? "html" : "text"](d);e.removeClass("fade in top bottom left right")
    },
    hide: function() {
      var d = this,
        g = this.tip(),
        f = c.Event("hide");
      this.$element.trigger(f);
      if (f.isDefaultPrevented()) {
        return
      }
      g.removeClass("in");
      function h() {
        var e = setTimeout(function() {
          g.off(c.support.transition.end).detach()
        }, 500);
        g.one(c.support.transition.end, function() {
          clearTimeout(e);g.detach()
        })
      }
      c.support.transition && this.$tip.hasClass("fade") ? h() : g.detach();this.$element.trigger("hidden");return this
    },
    fixTitle: function() {
      var d = this.$element;
      if (d.attr("title") || typeof (d.attr("data-original-title")) != "string") {
        d.attr("data-original-title", d.attr("title") || "").attr("title", "")
      }
    },
    hasContent: function() {
      return this.getTitle()
    },
    getPosition: function() {
      var d = this.$element[0];
      return c.extend({}, (typeof d.getBoundingClientRect == "function") ? d.getBoundingClientRect() : {
        width: d.offsetWidth,
        height: d.offsetHeight
      }, this.$element.offset())
    },
    getTitle: function() {
      var f,
        d = this.$element,
        e = this.options;
      f = d.attr("data-original-title") || (typeof e.title == "function" ? e.title.call(d[0]) : e.title);return f
    },
    tip: function() {
      return this.$tip = this.$tip || c(this.options.template)
    },
    arrow: function() {
      return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    },
    validate: function() {
      if (!this.$element[0].parentNode) {
        this.hide();
        this.$element = null;
        this.options = null
      }
    },
    enable: function() {
      this.enabled = true
    },
    disable: function() {
      this.enabled = false
    },
    toggleEnabled: function() {
      this.enabled = !this.enabled
    },
    toggle: function(f) {
      var d = f ? c(f.currentTarget)[this.type](this._options).data(this.type) : this;
      d.tip().hasClass("in") ? d.hide() : d.show()
    },
    destroy: function() {
      this.hide().$element.off("." + this.type).removeData(this.type)
    }
  };
  var a = c.fn.tooltip;
  c.fn.tooltip = function(d) {
    return this.each(function() {
      var g = c(this),
        f = g.data("tooltip"),
        e = typeof d == "object" && d;
      if (!f) {
        g.data("tooltip", (f = new b(this, e)))
      }
      if (typeof d == "string") {
        f[d]()
      }
    })
  };
  c.fn.tooltip.Constructor = b;
  c.fn.tooltip.defaults = {
    animation: true,
    placement: "top",
    selector: false,
    template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: "hover focus",
    title: "",
    delay: 0,
    html: false,
    container: false
  };
  c.fn.tooltip.noConflict = function() {
    c.fn.tooltip = a;return this
  }
}(window.jQuery);!function(c) {
  var b = function(e, d) {
    this.options = d;
    this.$element = c(e).delegate('[data-dismiss="modal"]', "click.dismiss.modal", c.proxy(this.hide, this));this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
  };
  b.prototype = {
    constructor: b,
    toggle: function() {
      return this[!this.isShown ? "show" : "hide"]()
    },
    show: function() {
      var d = this,
        f = c.Event("show");
      this.$element.trigger(f);
      if (this.isShown || f.isDefaultPrevented()) {
        return
      }
      this.isShown = true;this.escape();this.backdrop(function() {
        var e = c.support.transition && d.$element.hasClass("fade");
        if (!d.$element.parent().length) {
          d.$element.appendTo(document.body)
        }
        d.$element.show();
        if (e) {
          d.$element[0].offsetWidth
        }
        d.$element.addClass("in").attr("aria-hidden", false);d.enforceFocus();
        e ? d.$element.one(c.support.transition.end, function() {
          d.$element.focus().trigger("shown")
        }) : d.$element.focus().trigger("shown")
      })
    },
    hide: function(f) {
      f && f.preventDefault();
      var d = this;
      f = c.Event("hide");this.$element.trigger(f);
      if (!this.isShown || f.isDefaultPrevented()) {
        return
      }
      this.isShown = false;this.escape();c(document).off("focusin.modal");this.$element.removeClass("in").attr("aria-hidden", true);
      c.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal()
    },
    enforceFocus: function() {
      var d = this;
      c(document).on("focusin.modal", function(f) {
        if (d.$element[0] !== f.target && !d.$element.has(f.target).length) {
          d.$element.focus()
        }
      })
    },
    escape: function() {
      var d = this;
      if (this.isShown && this.options.keyboard) {
        this.$element.on("keyup.dismiss.modal", function(f) {
          f.which == 27 && d.hide()
        })
      } else {
        if (!this.isShown) {
          this.$element.off("keyup.dismiss.modal")
        }
      }
    },
    hideWithTransition: function() {
      var d = this,
        e = setTimeout(function() {
          d.$element.off(c.support.transition.end);d.hideModal()
        }, 500);
      this.$element.one(c.support.transition.end, function() {
        clearTimeout(e);d.hideModal()
      })
    },
    hideModal: function() {
      var d = this;
      this.$element.hide();this.backdrop(function() {
        d.removeBackdrop();d.$element.trigger("hidden")
      })
    },
    removeBackdrop: function() {
      this.$backdrop.remove();
      this.$backdrop = null
    },
    backdrop: function(g) {
      var f = this,
        e = this.$element.hasClass("fade") ? "fade" : "";
      if (this.isShown && this.options.backdrop) {
        var d = c.support.transition && e;
        this.$backdrop = c('<div class="modal-backdrop ' + e + '" />').appendTo(document.body);this.$backdrop.click(this.options.backdrop == "static" ? c.proxy(this.$element[0].focus, this.$element[0]) : c.proxy(this.hide, this));
        if (d) {
          this.$backdrop[0].offsetWidth
        }
        this.$backdrop.addClass("in");
        if (!g) {
          return
        }
        d ? this.$backdrop.one(c.support.transition.end, g) : g()
      } else {
        if (!this.isShown && this.$backdrop) {
          this.$backdrop.removeClass("in");
          c.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(c.support.transition.end, g) : g()
        } else {
          if (g) {
            g()
          }
        }
      }
    }
  };
  var a = c.fn.modal;
  c.fn.modal = function(d) {
    return this.each(function() {
      var g = c(this),
        f = g.data("modal"),
        e = c.extend({}, c.fn.modal.defaults, g.data(), typeof d == "object" && d);
      if (!f) {
        g.data("modal", (f = new b(this, e)))
      }
      if (typeof d == "string") {
        f[d]()
      } else {
        if (e.show) {
          f.show()
        }
      }
    })
  };
  c.fn.modal.defaults = {
    backdrop: true,
    keyboard: true,
    show: true
  };
  c.fn.modal.Constructor = b;
  c.fn.modal.noConflict = function() {
    c.fn.modal = a;return this
  };c(document).on("click.modal.data-api", '[data-toggle="modal"]', function(i) {
    var h = c(this),
      f = h.attr("href"),
      d = c(h.attr("data-target") || (f && f.replace(/.*(?=#[^\s]+$)/, ""))),
      g = d.data("modal") ? "toggle" : c.extend({
        remote: !/#/.test(f) && f
      }, d.data(), h.data());
    i.preventDefault();d.modal(g).one("hide", function() {
      h.focus()
    })
  })
}(window.jQuery);!function(a) {
  a(function() {
    a.support.transition = (function() {
      var b = (function() {
        var e = document.createElement("bootstrap"),
          d = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
          },
          c;
        for (c in d) {
          if (e.style[c] !== undefined) {
            return d[c]
          }
        }
      }());
      return b && {
          end: b
      }
    })()
  })
}(window.jQuery);!function(c) {
  var b = function(e, d) {
    this.$element = c(e);
    this.options = c.extend({}, c.fn.button.defaults, d)
  };
  b.prototype.setState = function(g) {
    var i = "disabled",
      e = this.$element,
      f = e.data(),
      h = e.is("input") ? "val" : "html";
    g = g + "Text";f.resetText || e.data("resetText", e[h]());e[h](f[g] || this.options[g]);setTimeout(function() {
      g == "loadingText" ? e.addClass(i).attr(i, i) : e.removeClass(i).removeAttr(i)
    }, 0)
  };
  b.prototype.toggle = function() {
    var d = this.$element.closest('[data-toggle="buttons-radio"]');
    d && d.find(".active").removeClass("active");this.$element.toggleClass("active")
  };
  var a = c.fn.button;
  c.fn.button = function(d) {
    return this.each(function() {
      var g = c(this),
        f = g.data("button"),
        e = typeof d == "object" && d;
      if (!f) {
        g.data("button", (f = new b(this, e)))
      }
      if (d == "toggle") {
        f.toggle()
      } else {
        if (d) {
          f.setState(d)
        }
      }
    })
  };
  c.fn.button.defaults = {
    loadingText: "loading..."
  };
  c.fn.button.Constructor = b;
  c.fn.button.noConflict = function() {
    c.fn.button = a;return this
  };c(document).on("click.button.data-api", "[data-toggle^=button]", function(f) {
    var d = c(f.target);
    if (!d.hasClass("btn")) {
      d = d.closest(".btn")
    }
    d.button("toggle")
  })
}(window.jQuery);!function(c) {
  var b = function(e, d) {
    this.init("popover", e, d)
  };
  b.prototype = c.extend({}, c.fn.tooltip.Constructor.prototype, {
    constructor: b,
    setContent: function() {
      var f = this.tip(),
        e = this.getTitle(),
        d = this.getContent();
      f.find(".popover-title")[this.options.html ? "html" : "text"](e);f.find(".popover-content")[this.options.html ? "html" : "text"](d);f.removeClass("fade top bottom left right in")
    },
    hasContent: function() {
      return this.getTitle() || this.getContent()
    },
    getContent: function() {
      var e,
        d = this.$element,
        f = this.options;
      e = (typeof f.content == "function" ? f.content.call(d[0]) : f.content) || d.attr("data-content");return e
    },
    tip: function() {
      if (!this.$tip) {
        this.$tip = c(this.options.template)
      }
      return this.$tip
    },
    destroy: function() {
      this.hide().$element.off("." + this.type).removeData(this.type)
    }
  });
  var a = c.fn.popover;
  c.fn.popover = function(d) {
    return this.each(function() {
      var g = c(this),
        f = g.data("popover"),
        e = typeof d == "object" && d;
      if (!f) {
        g.data("popover", (f = new b(this, e)))
      }
      if (typeof d == "string") {
        f[d]()
      }
    })
  };
  c.fn.popover.Constructor = b;
  c.fn.popover.defaults = c.extend({}, c.fn.tooltip.defaults, {
    placement: "right",
    trigger: "click",
    content: "",
    template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  });
  c.fn.popover.noConflict = function() {
    c.fn.popover = a;return this
  }
}(window.jQuery);!function(d) {
  var c = '[data-dismiss="alert"]',
    b = function(e) {
      d(e).on("click", c, this.close)
    };
  b.prototype.close = function(j) {
    var i = d(this),
      g = i.attr("data-target"),
      h;
    if (!g) {
      g = i.attr("href");
      g = g && g.replace(/.*(?=#[^\s]*$)/, "")
    }
    h = d(g);j && j.preventDefault();h.length || (h = i.hasClass("alert") ? i : i.parent());h.trigger(j = d.Event("close"));
    if (j.isDefaultPrevented()) {
      return
    }
    h.removeClass("in");
    function f() {
      h.trigger("closed").remove()
    }
    d.support.transition && h.hasClass("fade") ? h.on(d.support.transition.end, f) : f()
  };
  var a = d.fn.alert;
  d.fn.alert = function(e) {
    return this.each(function() {
      var g = d(this),
        f = g.data("alert");
      if (!f) {
        g.data("alert", (f = new b(this)))
      }
      if (typeof e == "string") {
        f[e].call(g)
      }
    })
  };
  d.fn.alert.Constructor = b;
  d.fn.alert.noConflict = function() {
    d.fn.alert = a;return this
  };d(document).on("click.alert.data-api", c, b.prototype.close)
}(window.jQuery);
/* jQuery UI - v1.10.0 - 2013-02-14
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js, jquery.ui.autocomplete.js, jquery.ui.menu.js, jquery.ui.slider.js
* Copyright (c) 2013 jQuery Foundation and other contributors Licensed MIT */
(function(f, b) {
  function a(j, p) {
    var k,
      h,
      m,
      e = j.nodeName.toLowerCase();
    return "area" === e ? (k = j.parentNode, h = k.name, !j.href || !h || k.nodeName.toLowerCase() !== "map" ? !1 : (m = f("img[usemap=#" + h + "]")[0], !!m && c(m))) : (/input|select|textarea|button|object/.test(e) ? !j.disabled : "a" === e ? j.href || p : p) && c(j)
  }
  function c(e) {
    return f.expr.filters.visible(e) && !f(e).parents().addBack().filter(function() {
        return f.css(this, "visibility") === "hidden"
      }).length
  }
  var g = 0,
    d = /^ui-id-\d+$/;
  f.ui = f.ui || {};
  if (f.ui.version) {
    return
  }
  f.extend(f.ui, {
    version: "1.10.0",
    keyCode: {
      BACKSPACE: 8,
      COMMA: 188,
      DELETE: 46,
      DOWN: 40,
      END: 35,
      ENTER: 13,
      ESCAPE: 27,
      HOME: 36,
      LEFT: 37,
      NUMPAD_ADD: 107,
      NUMPAD_DECIMAL: 110,
      NUMPAD_DIVIDE: 111,
      NUMPAD_ENTER: 108,
      NUMPAD_MULTIPLY: 106,
      NUMPAD_SUBTRACT: 109,
      PAGE_DOWN: 34,
      PAGE_UP: 33,
      PERIOD: 190,
      RIGHT: 39,
      SPACE: 32,
      TAB: 9,
      UP: 38
    }
  }), f.fn.extend({
    _focus: f.fn.focus,
    focus: function(e, h) {
      return typeof e == "number" ? this.each(function() {
        var i = this;
        setTimeout(function() {
          f(i).focus(), h && h.call(i)
        }, e)
      }) : this._focus.apply(this, arguments)
    },
    scrollParent: function() {
      var e;
      return f.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? e = this.parents().filter(function() {
          return /(relative|absolute|fixed)/.test(f.css(this, "position")) && /(auto|scroll)/.test(f.css(this, "overflow") + f.css(this, "overflow-y") + f.css(this, "overflow-x"))
        }).eq(0) : e = this.parents().filter(function() {
          return /(auto|scroll)/.test(f.css(this, "overflow") + f.css(this, "overflow-y") + f.css(this, "overflow-x"))
        }).eq(0), /fixed/.test(this.css("position")) || !e.length ? f(document) : e
    },
    zIndex: function(k) {
      if (k !== b) {
        return this.css("zIndex", k)
      }
      if (this.length) {
        var j = f(this[0]),
          e,
          h;
        while (j.length && j[0] !== document) {
          e = j.css("position");
          if (e === "absolute" || e === "relative" || e === "fixed") {
            h = parseInt(j.css("zIndex"), 10);
            if (!isNaN(h) && h !== 0) {
              return h
            }
          }
          j = j.parent()
        }
      }
      return 0
    },
    uniqueId: function() {
      return this.each(function() {
        this.id || (this.id = "ui-id-" + ++g)
      })
    },
    removeUniqueId: function() {
      return this.each(function() {
        d.test(this.id) && f(this).removeAttr("id")
      })
    }
  }), f.extend(f.expr[":"], {
    data: f.expr.createPseudo ? f.expr.createPseudo(function(e) {
      return function(h) {
        return !!f.data(h, e)
      }
    }) : function(e, i, h) {
      return !!f.data(e, h[3])
    },
    focusable: function(e) {
      return a(e, !isNaN(f.attr(e, "tabindex")))
    },
    tabbable: function(e) {
      var i = f.attr(e, "tabindex"),
        h = isNaN(i);
      return (h || i >= 0) && a(e, !h)
    }
  }), f("<a>").outerWidth(1).jquery || f.each(["Width", "Height"], function(p, k) {
    function e(i, u, q, o) {
      return f.each(h, function() {
          u -= parseFloat(f.css(i, "padding" + this)) || 0, q && (u -= parseFloat(f.css(i, "border" + this + "Width")) || 0), o && (u -= parseFloat(f.css(i, "margin" + this)) || 0)
        }), u
    }
    var h = k === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
      j = k.toLowerCase(),
      m = {
        innerWidth: f.fn.innerWidth,
        innerHeight: f.fn.innerHeight,
        outerWidth: f.fn.outerWidth,
        outerHeight: f.fn.outerHeight
      };
    f.fn["inner" + k] = function(i) {
      return i === b ? m["inner" + k].call(this) : this.each(function() {
        f(this).css(j, e(this, i) + "px")
      })
    }, f.fn["outer" + k] = function(i, o) {
      return typeof i != "number" ? m["outer" + k].call(this, i) : this.each(function() {
        f(this).css(j, e(this, i, !0, o) + "px")
      })
    }
  }), f.fn.addBack || (f.fn.addBack = function(h) {
    return this.add(h == null ? this.prevObject : this.prevObject.filter(h))
  }), f("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (f.fn.removeData = function(e) {
    return function(h) {
      return arguments.length ? e.call(this, f.camelCase(h)) : e.call(this)
    }
  }(f.fn.removeData)), f.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), f.support.selectstart = "onselectstart" in document.createElement("div"), f.fn.extend({
    disableSelection: function() {
      return this.bind((f.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(h) {
        h.preventDefault()
      })
    },
    enableSelection: function() {
      return this.unbind(".ui-disableSelection")
    }
  }), f.extend(f.ui, {
    plugin: {
      add: function(h, m, k) {
        var e,
          j = f.ui[h].prototype;
        for (e in k) {
          j.plugins[e] = j.plugins[e] || [], j.plugins[e].push([m, k[e]])
        }
      },
      call: function(m, j, o) {
        var k,
          h = m.plugins[j];
        if (!h || !m.element[0].parentNode || m.element[0].parentNode.nodeType === 11) {
          return
        }
        for (k = 0; k < h.length; k++) {
          m.options[h[k][0]] && h[k][1].apply(m.element, o)
        }
      }
    },
    hasScroll: function(h, k) {
      if (f(h).css("overflow") === "hidden") {
        return !1
      }
      var j = k && k === "left" ? "scrollLeft" : "scrollTop",
        e = !1;
      return h[j] > 0 ? !0 : (h[j] = 1, e = h[j] > 0, h[j] = 0, e)
    }
  })
})(jQuery);(function(d, b) {
  var f = 0,
    c = Array.prototype.slice,
    a = d.cleanData;
  d.cleanData = function(e) {
    for (var i = 0, h; (h = e[i]) != null; i++) {
      try {
        d(h).triggerHandler("remove")
      } catch (g) {}
    }
    a(e)
  }, d.widget = function(q, h, e) {
    var j,
      v,
      g,
      p,
      m = {},
      k = q.split(".")[0];
    q = q.split(".")[1], j = k + "-" + q, e || (e = h, h = d.Widget), d.expr[":"][j.toLowerCase()] = function(i) {
      return !!d.data(i, j)
    }, d[k] = d[k] || {}, v = d[k][q], g = d[k][q] = function(n, i) {
      if (!this._createWidget) {
        return new g(n, i)
      }
      arguments.length && this._createWidget(n, i)
    }, d.extend(g, v, {
      version: e.version,
      _proto: d.extend({}, e),
      _childConstructors: []
    }), p = new h, p.options = d.widget.extend({}, p.options), d.each(e, function(i, n) {
      if (!d.isFunction(n)) {
        m[i] = n;return
      }
      m[i] = function() {
        var r = function() {
            return h.prototype[i].apply(this, arguments)
          },
          o = function(s) {
            return h.prototype[i].apply(this, s)
          };
        return function() {
          var u = this._super,
            x = this._superApply,
            w;
          return this._super = r, this._superApply = o, w = n.apply(this, arguments), this._super = u, this._superApply = x, w
        }
      }()
    }), g.prototype = d.widget.extend(p, {
      widgetEventPrefix: v ? p.widgetEventPrefix : q
    }, m, {
      constructor: g,
      namespace: k,
      widgetName: q,
      widgetFullName: j
    }), v ? (d.each(v._childConstructors, function(i, s) {
      var o = s.prototype;
      d.widget(o.namespace + "." + o.widgetName, g, s._proto)
    }),
    delete v._childConstructors
      ) : h._childConstructors.push(g), d.widget.bridge(q, g)
  }, d.widget.extend = function(m) {
    var h = c.call(arguments, 1),
      j = 0,
      k = h.length,
      g,
      e;
    for (; j < k; j++) {
      for (g in h[j]) {
        e = h[j][g], h[j].hasOwnProperty(g) && e !== b && (d.isPlainObject(e) ? m[g] = d.isPlainObject(m[g]) ? d.widget.extend({}, m[g], e) : d.widget.extend({}, e) : m[g] = e)
      }
    }
    return m
  }, d.widget.bridge = function(h, e) {
    var g = e.prototype.widgetFullName || h;
    d.fn[h] = function(m) {
      var j = typeof m == "string",
        i = c.call(arguments, 1),
        k = this;
      return m = !j && i.length ? d.widget.extend.apply(null, [m].concat(i)) : m, j ? this.each(function() {
          var o,
            n = d.data(this, g);
          if (!n) {
            return d.error("cannot call methods on " + h + " prior to initialization; attempted to call method '" + m + "'")
          }
          if (!d.isFunction(n[m]) || m.charAt(0) === "_") {
            return d.error("no such method '" + m + "' for " + h + " widget instance")
          }
          o = n[m].apply(n, i);
          if (o !== n && o !== b) {
            return k = o && o.jquery ? k.pushStack(o.get()) : o, !1
          }
        }) : this.each(function() {
          var n = d.data(this, g);
          n ? n.option(m || {})._init() : d.data(this, g, new e(m, this))
        }), k
    }
  }, d.Widget = function() {}, d.Widget._childConstructors = [], d.Widget.prototype = {
    widgetName: "widget",
    widgetEventPrefix: "",
    defaultElement: "<div>",
    options: {
      disabled: !1,
      create: null
    },
    _createWidget: function(e, g) {
      g = d(g || this.defaultElement || this)[0], this.element = d(g), this.uuid = f++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = d.widget.extend({}, this.options, this._getCreateOptions(), e), this.bindings = d(), this.hoverable = d(), this.focusable = d(), g !== this && (d.data(g, this.widgetFullName, this), this._on(!0, this.element, {
        remove: function(h) {
          h.target === g && this.destroy()
        }
      }), this.document = d(g.style ? g.ownerDocument : g.document || g), this.window = d(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
    },
    _getCreateOptions: d.noop,
    _getCreateEventData: d.noop,
    _create: d.noop,
    _init: d.noop,
    destroy: function() {
      this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(d.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
    },
    _destroy: d.noop,
    widget: function() {
      return this.element
    },
    option: function(m, j) {
      var g = m,
        h,
        k,
        e;
      if (arguments.length === 0) {
        return d.widget.extend({}, this.options)
      }
      if (typeof m == "string") {
        g = {}, h = m.split("."), m = h.shift();
        if (h.length) {
          k = g[m] = d.widget.extend({}, this.options[m]);
          for (e = 0; e < h.length - 1; e++) {
            k[h[e]] = k[h[e]] || {}, k = k[h[e]]
          }
          m = h.pop();
          if (j === b) {
            return k[m] === b ? null : k[m]
          }
          k[m] = j
        } else {
          if (j === b) {
            return this.options[m] === b ? null : this.options[m]
          }
          g[m] = j
        }
      }
      return this._setOptions(g), this
    },
    _setOptions: function(h) {
      var g;
      for (g in h) {
        this._setOption(g, h[g])
      }
      return this
    },
    _setOption: function(h, g) {
      return this.options[h] = g, h === "disabled" && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!g).attr("aria-disabled", g), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
    },
    enable: function() {
      return this._setOption("disabled", !1)
    },
    disable: function() {
      return this._setOption("disabled", !0)
    },
    _on: function(g, k, j) {
      var e,
        h = this;
      typeof g != "boolean" && (j = k, k = g, g = !1), j ? (k = e = d(k), this.bindings = this.bindings.add(k)) : (j = k, k = this.element, e = this.widget()), d.each(j, function(p, s) {
        function n() {
          if (!g && (h.options.disabled === !0 || d(this).hasClass("ui-state-disabled"))) {
            return
          }
          return (typeof s == "string" ? h[s] : s).apply(h, arguments)
        }
        typeof s != "string" && (n.guid = s.guid = s.guid || n.guid || d.guid++);
        var m = p.match(/^(\w+)\s*(.*)$/),
          q = m[1] + h.eventNamespace,
          i = m[2];
        i ? e.delegate(i, q, n) : k.bind(q, n)
      })
    },
    _off: function(h, g) {
      g = (g || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, h.unbind(g).undelegate(g)
    },
    _delay: function(i, g) {
      function j() {
        return (typeof i == "string" ? h[i] : i).apply(h, arguments)
      }
      var h = this;
      return setTimeout(j, g || 0)
    },
    _hoverable: function(e) {
      this.hoverable = this.hoverable.add(e), this._on(e, {
        mouseenter: function(g) {
          d(g.currentTarget).addClass("ui-state-hover")
        },
        mouseleave: function(g) {
          d(g.currentTarget).removeClass("ui-state-hover")
        }
      })
    },
    _focusable: function(e) {
      this.focusable = this.focusable.add(e), this._on(e, {
        focusin: function(g) {
          d(g.currentTarget).addClass("ui-state-focus")
        },
        focusout: function(g) {
          d(g.currentTarget).removeClass("ui-state-focus")
        }
      })
    },
    _trigger: function(g, m, j) {
      var e,
        h,
        k = this.options[g];
      j = j || {}, m = d.Event(m), m.type = (g === this.widgetEventPrefix ? g : this.widgetEventPrefix + g).toLowerCase(), m.target = this.element[0], h = m.originalEvent;
      if (h) {
        for (e in h) {
          e in m || (m[e] = h[e])
        }
      }
      return this.element.trigger(m, j), !(d.isFunction(k) && k.apply(this.element[0], [m].concat(j)) === !1 || m.isDefaultPrevented())
    }
  }, d.each({
    show: "fadeIn",
    hide: "fadeOut"
  }, function(e, g) {
    d.Widget.prototype["_" + e] = function(m, j, k) {
      typeof j == "string" && (j = {
        effect: j
      });
      var n,
        h = j ? j === !0 || typeof j == "number" ? g : j.effect || g : e;
      j = j || {}, typeof j == "number" && (j = {
        duration: j
      }), n = !d.isEmptyObject(j), j.complete = k, j.delay && m.delay(j.delay), n && d.effects && d.effects.effect[h] ? m[e](j) : h !== e && m[h] ? m[h](j.duration, j.easing, k) : m.queue(function(i) {
        d(this)[e](), k && k.call(m[0]), i()
      })
    }
  })
})(jQuery);(function(b, a) {
  var c = !1;
  b(document).mouseup(function() {
    c = !1
  }), b.widget("ui.mouse", {
    version: "1.10.0",
    options: {
      cancel: "input,textarea,button,select,option",
      distance: 1,
      delay: 0
    },
    _mouseInit: function() {
      var d = this;
      this.element.bind("mousedown." + this.widgetName, function(f) {
        return d._mouseDown(f)
      }).bind("click." + this.widgetName, function(e) {
        if (!0 === b.data(e.target, d.widgetName + ".preventClickEvent")) {
          return b.removeData(e.target, d.widgetName + ".preventClickEvent"), e.stopImmediatePropagation(), !1
        }
      }), this.started = !1
    },
    _mouseDestroy: function() {
      this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && b(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
    },
    _mouseDown: function(e) {
      if (c) {
        return
      }
      this._mouseStarted && this._mouseUp(e), this._mouseDownEvent = e;
      var g = this,
        d = e.which === 1,
        f = typeof this.options.cancel == "string" && e.target.nodeName ? b(e.target).closest(this.options.cancel).length : !1;
      if (!d || f || !this._mouseCapture(e)) {
        return !0
      }
      this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
        g.mouseDelayMet = !0
      }, this.options.delay));
      if (this._mouseDistanceMet(e) && this._mouseDelayMet(e)) {
        this._mouseStarted = this._mouseStart(e) !== !1;
        if (!this._mouseStarted) {
          return e.preventDefault(), !0
        }
      }
      return !0 === b.data(e.target, this.widgetName + ".preventClickEvent") && b.removeData(e.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(h) {
          return g._mouseMove(h)
        }, this._mouseUpDelegate = function(h) {
          return g._mouseUp(h)
        }, b(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), e.preventDefault(), c = !0, !0
    },
    _mouseMove: function(d) {
      return b.ui.ie && (!document.documentMode || document.documentMode < 9) && !d.button ? this._mouseUp(d) : this._mouseStarted ? (this._mouseDrag(d), d.preventDefault()) : (this._mouseDistanceMet(d) && this._mouseDelayMet(d) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, d) !== !1, this._mouseStarted ? this._mouseDrag(d) : this._mouseUp(d)), !this._mouseStarted)
    },
    _mouseUp: function(d) {
      return b(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, d.target === this._mouseDownEvent.target && b.data(d.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(d)), !1
    },
    _mouseDistanceMet: function(d) {
      return Math.max(Math.abs(this._mouseDownEvent.pageX - d.pageX), Math.abs(this._mouseDownEvent.pageY - d.pageY)) >= this.options.distance
    },
    _mouseDelayMet: function() {
      return this.mouseDelayMet
    },
    _mouseStart: function() {},
    _mouseDrag: function() {},
    _mouseStop: function() {},
    _mouseCapture: function() {
      return !0
    }
  })
})(jQuery);(function(x, C) {
  function v(c, a, d) {
    return [parseInt(c[0], 10) * (m.test(c[0]) ? a / 100 : 1), parseInt(c[1], 10) * (m.test(c[1]) ? d / 100 : 1)]
  }
  function g(a, c) {
    return parseInt(x.css(a, c), 10) || 0
  }
  function y(a) {
    var c = a[0];
    return c.nodeType === 9 ? {
      width: a.width(),
      height: a.height(),
      offset: {
        top: 0,
        left: 0
      }
    } : x.isWindow(c) ? {
      width: a.width(),
      height: a.height(),
      offset: {
        top: a.scrollTop(),
        left: a.scrollLeft()
      }
    } : c.preventDefault ? {
      width: 0,
      height: 0,
      offset: {
        top: c.pageY,
        left: c.pageX
      }
    } : {
      width: a.outerWidth(),
      height: a.outerHeight(),
      offset: a.offset()
    }
  }
  x.ui = x.ui || {};
  var k,
    b = Math.max,
    q = Math.abs,
    D = Math.round,
    j = /left|center|right/,
    B = /top|center|bottom/,
    A = /[\+\-]\d+%?/,
    w = /^\w+/,
    m = /%$/,
    z = x.fn.position;
  x.position = {
    scrollbarWidth: function() {
      if (k !== C) {
        return k
      }
      var d,
        a,
        c = x("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
        e = c.children()[0];
      return x("body").append(c), d = e.offsetWidth, c.css("overflow", "scroll"), a = e.offsetWidth, d === a && (a = c[0].clientWidth), c.remove(), k = d - a
    },
    getScrollInfo: function(c) {
      var f = c.isWindow ? "" : c.element.css("overflow-x"),
        e = c.isWindow ? "" : c.element.css("overflow-y"),
        a = f === "scroll" || f === "auto" && c.width < c.element[0].scrollWidth,
        d = e === "scroll" || e === "auto" && c.height < c.element[0].scrollHeight;
      return {
        width: a ? x.position.scrollbarWidth() : 0,
        height: d ? x.position.scrollbarWidth() : 0
      }
    },
    getWithinInfo: function(a) {
      var d = x(a || window),
        c = x.isWindow(d[0]);
      return {
        element: d,
        isWindow: c,
        offset: d.offset() || {
            left: 0,
            top: 0
        },
        scrollLeft: d.scrollLeft(),
        scrollTop: d.scrollTop(),
        width: c ? d.width() : d.outerWidth(),
        height: c ? d.height() : d.outerHeight()
      }
    }
  }, x.fn.position = function(s) {
    if (!s || !s.of) {
      return z.apply(this, arguments)
    }
    s = x.extend({}, s);
    var a,
      d,
      r,
      c,
      f,
      h,
      i = x(s.of),
      p = x.position.getWithinInfo(s.within),
      u = x.position.getScrollInfo(p),
      e = (s.collision || "flip").split(" "),
      o = {};
    return h = y(i), i[0].preventDefault && (s.at = "left top"), d = h.width, r = h.height, c = h.offset, f = x.extend({}, c), x.each(["my", "at"], function() {
        var E = (s[this] || "").split(" "),
          F,
          t;
        E.length === 1 && (E = j.test(E[0]) ? E.concat(["center"]) : B.test(E[0]) ? ["center"].concat(E) : ["center", "center"]), E[0] = j.test(E[0]) ? E[0] : "center", E[1] = B.test(E[1]) ? E[1] : "center", F = A.exec(E[0]), t = A.exec(E[1]), o[this] = [F ? F[0] : 0, t ? t[0] : 0], s[this] = [w.exec(E[0])[0], w.exec(E[1])[0]]
      }), e.length === 1 && (e[1] = e[0]), s.at[0] === "right" ? f.left += d : s.at[0] === "center" && (f.left += d / 2), s.at[1] === "bottom" ? f.top += r : s.at[1] === "center" && (f.top += r / 2), a = v(o.at, d, r), f.left += a[0], f.top += a[1], this.each(function() {
        var t,
          O,
          M = x(this),
          G = M.outerWidth(),
          J = M.outerHeight(),
          I = g(this, "marginLeft"),
          K = g(this, "marginTop"),
          F = G + I + g(this, "marginRight") + u.width,
          H = J + K + g(this, "marginBottom") + u.height,
          n = x.extend({}, f),
          E = v(o.my, M.outerWidth(), M.outerHeight());
        s.my[0] === "right" ? n.left -= G : s.my[0] === "center" && (n.left -= G / 2), s.my[1] === "bottom" ? n.top -= J : s.my[1] === "center" && (n.top -= J / 2), n.left += E[0], n.top += E[1], x.support.offsetFractions || (n.left = D(n.left), n.top = D(n.top)), t = {
          marginLeft: I,
          marginTop: K
        }, x.each(["left", "top"], function(P, N) {
          x.ui.position[e[P]] && x.ui.position[e[P]][N](n, {
            targetWidth: d,
            targetHeight: r,
            elemWidth: G,
            elemHeight: J,
            collisionPosition: t,
            collisionWidth: F,
            collisionHeight: H,
            offset: [a[0] + E[0], a[1] + E[1]],
            my: s.my,
            at: s.at,
            within: p,
            elem: M
          })
        }), s.using && (O = function(R) {
          var T = c.left - n.left,
            Q = T + d - G,
            S = c.top - n.top,
            N = S + r - J,
            P = {
              target: {
                element: i,
                left: c.left,
                top: c.top,
                width: d,
                height: r
              },
              element: {
                element: M,
                left: n.left,
                top: n.top,
                width: G,
                height: J
              },
              horizontal: Q < 0 ? "left" : T > 0 ? "right" : "center",
              vertical: N < 0 ? "top" : S > 0 ? "bottom" : "middle"
            };
          d < G && q(T + Q) < d && (P.horizontal = "center"), r < J && q(S + N) < r && (P.vertical = "middle"), b(q(T), q(Q)) > b(q(S), q(N)) ? P.important = "horizontal" : P.important = "vertical", s.using.call(this, R, P)
        }), M.offset(x.extend(n, {
          using: O
        }))
      })
  }, x.ui.position = {
    fit: {
      left: function(r, G) {
        var d = G.within,
          h = d.isWindow ? d.scrollLeft : d.offset.left,
          H = d.width,
          c = r.left - G.collisionPosition.marginLeft,
          F = h - c,
          E = c + G.collisionWidth - H - h,
          p;
        G.collisionWidth > H ? F > 0 && E <= 0 ? (p = r.left + F + G.collisionWidth - H - h, r.left += F - p) : E > 0 && F <= 0 ? r.left = h : F > E ? r.left = h + H - G.collisionWidth : r.left = h : F > 0 ? r.left += F : E > 0 ? r.left -= E : r.left = b(r.left - c, r.left)
      },
      top: function(r, G) {
        var d = G.within,
          h = d.isWindow ? d.scrollTop : d.offset.top,
          H = G.within.height,
          c = r.top - G.collisionPosition.marginTop,
          F = h - c,
          E = c + G.collisionHeight - H - h,
          p;
        G.collisionHeight > H ? F > 0 && E <= 0 ? (p = r.top + F + G.collisionHeight - H - h, r.top += F - p) : E > 0 && F <= 0 ? r.top = h : F > E ? r.top = h + H - G.collisionHeight : r.top = h : F > 0 ? r.top += F : E > 0 ? r.top -= E : r.top = b(r.top - c, r.top)
      }
    },
    flip: {
      left: function(K, Q) {
        var G = Q.within,
          i = G.offset.left + G.scrollLeft,
          R = G.width,
          F = G.isWindow ? G.scrollLeft : G.offset.left,
          P = K.left - Q.collisionPosition.marginLeft,
          O = P - F,
          J = P + Q.collisionWidth - R - F,
          H = Q.my[0] === "left" ? -Q.elemWidth : Q.my[0] === "right" ? Q.elemWidth : 0,
          N = Q.at[0] === "left" ? Q.targetWidth : Q.at[0] === "right" ? -Q.targetWidth : 0,
          I = -2 * Q.offset[0],
          E,
          M;
        if (O < 0) {
          E = K.left + H + N + I + Q.collisionWidth - R - i;
          if (E < 0 || E < q(O)) {
            K.left += H + N + I
          }
        } else {
          if (J > 0) {
            M = K.left - Q.collisionPosition.marginLeft + H + N + I - F;
            if (M > 0 || q(M) < J) {
              K.left += H + N + I
            }
          }
        }
      },
      top: function(K, R) {
        var G = R.within,
          i = G.offset.top + G.scrollTop,
          S = G.height,
          F = G.isWindow ? G.scrollTop : G.offset.top,
          Q = K.top - R.collisionPosition.marginTop,
          O = Q - F,
          J = Q + R.collisionHeight - S - F,
          H = R.my[1] === "top",
          N = H ? -R.elemHeight : R.my[1] === "bottom" ? R.elemHeight : 0,
          I = R.at[1] === "top" ? R.targetHeight : R.at[1] === "bottom" ? -R.targetHeight : 0,
          E = -2 * R.offset[1],
          M,
          P;
        O < 0 ? (P = K.top + N + I + E + R.collisionHeight - S - i, K.top + N + I + E > O && (P < 0 || P < q(O)) && (K.top += N + I + E)) : J > 0 && (M = K.top - R.collisionPosition.marginTop + N + I + E - F, K.top + N + I + E > J && (M > 0 || q(M) < J) && (K.top += N + I + E))
      }
    },
    flipfit: {
      left: function() {
        x.ui.position.flip.left.apply(this, arguments), x.ui.position.fit.left.apply(this, arguments)
      },
      top: function() {
        x.ui.position.flip.top.apply(this, arguments), x.ui.position.fit.top.apply(this, arguments)
      }
    }
  }, function() {
    var d,
      p,
      f,
      c,
      e,
      h = document.getElementsByTagName("body")[0],
      a = document.createElement("div");
    d = document.createElement(h ? "div" : "body"), f = {
      visibility: "hidden",
      width: 0,
      height: 0,
      border: 0,
      margin: 0,
      background: "none"
    }, h && x.extend(f, {
      position: "absolute",
      left: "-1000px",
      top: "-1000px"
    });
    for (e in f) {
      d.style[e] = f[e]
    }
    d.appendChild(a), p = h || document.documentElement, p.insertBefore(d, p.firstChild), a.style.cssText = "position: absolute; left: 10.7432222px;", c = x(a).offset().left, x.support.offsetFractions = c > 10 && c < 11, d.innerHTML = "", p.removeChild(d)
  }()
})(jQuery);(function(b, a) {
  var c = 0;
  b.widget("ui.autocomplete", {
    version: "1.10.0",
    defaultElement: "<input>",
    options: {
      appendTo: null,
      autoFocus: !1,
      delay: 300,
      minLength: 1,
      position: {
        my: "left top",
        at: "left bottom",
        collision: "none"
      },
      source: null,
      change: null,
      close: null,
      focus: null,
      open: null,
      response: null,
      search: null,
      select: null
    },
    pending: 0,
    _create: function() {
      var d,
        f,
        e;
      this.isMultiLine = this._isMultiLine(), this.valueMethod = this.element[this.element.is("input,textarea") ? "val" : "text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, {
        keydown: function(g) {
          if (this.element.prop("readOnly")) {
            d = !0, e = !0, f = !0;return
          }
          d = !1, e = !1, f = !1;
          var h = b.ui.keyCode;
          switch (g.keyCode) {
            case h.PAGE_UP:
              d = !0, this._move("previousPage", g);
              break;case h.PAGE_DOWN:
              d = !0, this._move("nextPage", g);
              break;case h.UP:
              d = !0, this._keyEvent("previous", g);
              break;case h.DOWN:
              d = !0, this._keyEvent("next", g);
              break;case h.ENTER:
            case h.NUMPAD_ENTER:
              this.menu.active && (d = !0, g.preventDefault(), this.menu.select(g));
              break;case h.TAB:
              this.menu.active && this.menu.select(g);
              break;case h.ESCAPE:
              this.menu.element.is(":visible") && (this._value(this.term), this.close(g), g.preventDefault());
              break;default:
              f = !0, this._searchTimeout(g)
          }
        },
        keypress: function(h) {
          if (d) {
            d = !1, h.preventDefault();return
          }
          if (f) {
            return
          }
          var g = b.ui.keyCode;
          switch (h.keyCode) {
            case g.PAGE_UP:
              this._move("previousPage", h);
              break;case g.PAGE_DOWN:
              this._move("nextPage", h);
              break;case g.UP:
              this._keyEvent("previous", h);
              break;case g.DOWN:
              this._keyEvent("next", h)
          }
        },
        input: function(g) {
          if (e) {
            e = !1, g.preventDefault();return
          }
          this._searchTimeout(g)
        },
        focus: function() {
          this.selectedItem = null, this.previous = this._value()
        },
        blur: function(g) {
          if (this.cancelBlur) {
            delete this.cancelBlur;
            return
          }
          clearTimeout(this.searching), this.close(g), this._change(g)
        }
      }), this._initSource(), this.menu = b("<ul>").addClass("ui-autocomplete").appendTo(this._appendTo()).menu({
        input: b(),
        role: null
      }).zIndex(this.element.zIndex() + 1).hide().data("ui-menu"), this._on(this.menu.element, {
        mousedown: function(g) {
          g.preventDefault(), this.cancelBlur = !0, this._delay(function() {
            delete this.cancelBlur
          });
          var h = this.menu.element[0];
          b(g.target).closest(".ui-menu-item").length || this._delay(function() {
            var i = this;
            this.document.one("mousedown", function(j) {
              j.target !== i.element[0] && j.target !== h && !b.contains(h, j.target) && i.close()
            })
          })
        },
        menufocus: function(g, i) {
          if (this.isNewMenu) {
            this.isNewMenu = !1;
            if (g.originalEvent && /^mouse/.test(g.originalEvent.type)) {
              this.menu.blur(), this.document.one("mousemove", function() {
                b(g.target).trigger(g.originalEvent)
              });return
            }
          }
          var h = i.item.data("ui-autocomplete-item");
          !1 !== this._trigger("focus", g, {
            item: h
          }) ? g.originalEvent && /^key/.test(g.originalEvent.type) && this._value(h.value) : this.liveRegion.text(h.value)
        },
        menuselect: function(i, g) {
          var j = g.item.data("ui-autocomplete-item"),
            h = this.previous;
          this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = h, this._delay(function() {
            this.previous = h, this.selectedItem = j
          })), !1 !== this._trigger("select", i, {
            item: j
          }) && this._value(j.value), this.term = this._value(), this.close(i), this.selectedItem = j
        }
      }), this.liveRegion = b("<span>", {
        role: "status",
        "aria-live": "polite"
      }).addClass("ui-helper-hidden-accessible").insertAfter(this.element), this._on(this.window, {
        beforeunload: function() {
          this.element.removeAttr("autocomplete")
        }
      })
    },
    _destroy: function() {
      clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
    },
    _setOption: function(f, d) {
      this._super(f, d), f === "source" && this._initSource(), f === "appendTo" && this.menu.element.appendTo(this._appendTo()), f === "disabled" && d && this.xhr && this.xhr.abort()
    },
    _appendTo: function() {
      var d = this.options.appendTo;
      return d && (d = d.jquery || d.nodeType ? b(d) : this.document.find(d).eq(0)), d || (d = this.element.closest(".ui-front")), d.length || (d = this.document[0].body), d
    },
    _isMultiLine: function() {
      return this.element.is("textarea") ? !0 : this.element.is("input") ? !1 : this.element.prop("isContentEditable")
    },
    _initSource: function() {
      var d,
        f,
        e = this;
      b.isArray(this.options.source) ? (d = this.options.source, this.source = function(h, g) {
        g(b.ui.autocomplete.filter(d, h.term))
      }) : typeof this.options.source == "string" ? (f = this.options.source, this.source = function(h, g) {
        e.xhr && e.xhr.abort(), e.xhr = b.ajax({
          url: f,
          data: h,
          dataType: "json",
          success: function(i) {
            g(i)
          },
          error: function() {
            g([])
          }
        })
      }) : this.source = this.options.source
    },
    _searchTimeout: function(d) {
      clearTimeout(this.searching), this.searching = this._delay(function() {
        this.term !== this._value() && (this.selectedItem = null, this.search(null, d))
      }, this.options.delay)
    },
    search: function(f, d) {
      f = f != null ? f : this._value(), this.term = this._value();
      if (f.length < this.options.minLength) {
        return this.close(d)
      }
      if (this._trigger("search", d) === !1) {
        return
      }
      return this._search(f)
    },
    _search: function(d) {
      this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({
        term: d
      }, this._response())
    },
    _response: function() {
      var f = this,
        d = ++c;
      return function(e) {
        d === c && f.__response(e), f.pending--, f.pending || f.element.removeClass("ui-autocomplete-loading")
      }
    },
    __response: function(d) {
      d && (d = this._normalize(d)), this._trigger("response", null, {
        content: d
      }), !this.options.disabled && d && d.length && !this.cancelSearch ? (this._suggest(d), this._trigger("open")) : this._close()
    },
    close: function(d) {
      this.cancelSearch = !0, this._close(d)
    },
    _close: function(d) {
      this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", d))
    },
    _change: function(d) {
      this.previous !== this._value() && this._trigger("change", d, {
        item: this.selectedItem
      })
    },
    _normalize: function(d) {
      return d.length && d[0].label && d[0].value ? d : b.map(d, function(e) {
        return typeof e == "string" ? {
          label: e,
          value: e
        } : b.extend({
          label: e.label || e.value,
          value: e.value || e.label
        }, e)
      })
    },
    _suggest: function(d) {
      var e = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
      this._renderMenu(e, d), this.menu.refresh(), e.show(), this._resizeMenu(), e.position(b.extend({
        of: this.element
      }, this.options.position)), this.options.autoFocus && this.menu.next()
    },
    _resizeMenu: function() {
      var d = this.menu.element;
      d.outerWidth(Math.max(d.width("").outerWidth() + 1, this.element.outerWidth()))
    },
    _renderMenu: function(d, f) {
      var e = this;
      b.each(f, function(g, h) {
        e._renderItemData(d, h)
      })
    },
    _renderItemData: function(f, d) {
      return this._renderItem(f, d).data("ui-autocomplete-item", d)
    },
    _renderItem: function(d, e) {
      return b("<li>").append(b("<a>").text(e.label)).appendTo(d)
    },
    _move: function(f, d) {
      if (!this.menu.element.is(":visible")) {
        this.search(null, d);return
      }
      if (this.menu.isFirstItem() && /^previous/.test(f) || this.menu.isLastItem() && /^next/.test(f)) {
        this._value(this.term), this.menu.blur();return
      }
      this.menu[f](d)
    },
    widget: function() {
      return this.menu.element
    },
    _value: function() {
      return this.valueMethod.apply(this.element, arguments)
    },
    _keyEvent: function(f, d) {
      if (!this.isMultiLine || this.menu.element.is(":visible")) {
        this._move(f, d), d.preventDefault()
      }
    }
  }), b.extend(b.ui.autocomplete, {
    escapeRegex: function(d) {
      return d.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
    },
    filter: function(d, f) {
      var e = new RegExp(b.ui.autocomplete.escapeRegex(f), "i");
      return b.grep(d, function(g) {
        return e.test(g.label || g.value || g)
      })
    }
  }), b.widget("ui.autocomplete", b.ui.autocomplete, {
    options: {
      messages: {
        noResults: "No search results.",
        results: function(d) {
          return d + (d > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
        }
      }
    },
    __response: function(f) {
      var d;
      this._superApply(arguments);
      if (this.options.disabled || this.cancelSearch) {
        return
      }
      f && f.length ? d = this.options.messages.results(f.length) : d = this.options.messages.noResults, this.liveRegion.text(d)
    }
  })
})(jQuery);(function(b, a) {
  b.widget("ui.menu", {
    version: "1.10.0",
    defaultElement: "<ul>",
    delay: 300,
    options: {
      icons: {
        submenu: "ui-icon-carat-1-e"
      },
      menus: "ul",
      position: {
        my: "left top",
        at: "right top"
      },
      role: "menu",
      blur: null,
      focus: null,
      select: null
    },
    _create: function() {
      this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
        role: this.options.role,
        tabIndex: 0
      }).bind("click" + this.eventNamespace, b.proxy(function(c) {
        this.options.disabled && c.preventDefault()
      }, this)), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({
        "mousedown .ui-menu-item > a": function(c) {
          c.preventDefault()
        },
        "click .ui-state-disabled > a": function(c) {
          c.preventDefault()
        },
        "click .ui-menu-item:has(a)": function(c) {
          var d = b(c.target).closest(".ui-menu-item");
          !this.mouseHandled && d.not(".ui-state-disabled").length && (this.mouseHandled = !0, this.select(c), d.has(".ui-menu").length ? this.expand(c) : this.element.is(":focus") || (this.element.trigger("focus", [!0]), this.active && this.active.parents(".ui-menu").length === 1 && clearTimeout(this.timer)))
        },
        "mouseenter .ui-menu-item": function(c) {
          var d = b(c.currentTarget);
          d.siblings().children(".ui-state-active").removeClass("ui-state-active"), this.focus(c, d)
        },
        mouseleave: "collapseAll",
        "mouseleave .ui-menu": "collapseAll",
        focus: function(d, c) {
          var f = this.active || this.element.children(".ui-menu-item").eq(0);
          c || this.focus(d, f)
        },
        blur: function(c) {
          this._delay(function() {
            b.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(c)
          })
        },
        keydown: "_keydown"
      }), this.refresh(), this._on(this.document, {
        click: function(c) {
          b(c.target).closest(".ui-menu").length || this.collapseAll(c), this.mouseHandled = !1
        }
      })
    },
    _destroy: function() {
      this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
        var c = b(this);
        c.data("ui-menu-submenu-carat") && c.remove()
      }), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
    },
    _keydown: function(f) {
      function c(i) {
        return i.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
      }
      var k,
        h,
        e,
        g,
        j,
        d = !0;
      switch (f.keyCode) {
        case b.ui.keyCode.PAGE_UP:
          this.previousPage(f);
          break;case b.ui.keyCode.PAGE_DOWN:
          this.nextPage(f);
          break;case b.ui.keyCode.HOME:
          this._move("first", "first", f);
          break;case b.ui.keyCode.END:
          this._move("last", "last", f);
          break;case b.ui.keyCode.UP:
          this.previous(f);
          break;case b.ui.keyCode.DOWN:
          this.next(f);
          break;case b.ui.keyCode.LEFT:
          this.collapse(f);
          break;case b.ui.keyCode.RIGHT:
          this.active && !this.active.is(".ui-state-disabled") && this.expand(f);
          break;case b.ui.keyCode.ENTER:
        case b.ui.keyCode.SPACE:
          this._activate(f);
          break;case b.ui.keyCode.ESCAPE:
          this.collapse(f);
          break;default:
          d = !1, h = this.previousFilter || "", e = String.fromCharCode(f.keyCode), g = !1, clearTimeout(this.filterTimer), e === h ? g = !0 : e = h + e, j = new RegExp("^" + c(e), "i"), k = this.activeMenu.children(".ui-menu-item").filter(function() {
            return j.test(b(this).children("a").text())
          }), k = g && k.index(this.active.next()) !== -1 ? this.active.nextAll(".ui-menu-item") : k, k.length || (e = String.fromCharCode(f.keyCode), j = new RegExp("^" + c(e), "i"), k = this.activeMenu.children(".ui-menu-item").filter(function() {
            return j.test(b(this).children("a").text())
          })), k.length ? (this.focus(f, k), k.length > 1 ? (this.previousFilter = e, this.filterTimer = this._delay(function() {
            delete this.previousFilter
          }, 1000)) :
            delete this.previousFilter
            ) :
            delete this.previousFilter
      }
      d && f.preventDefault()
    },
    _activate: function(c) {
      this.active.is(".ui-state-disabled") || (this.active.children("a[aria-haspopup='true']").length ? this.expand(c) : this.select(c))
    },
    refresh: function() {
      var c,
        e = this.options.icons.submenu,
        d = this.element.find(this.options.menus);
      d.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({
        role: this.options.role,
        "aria-hidden": "true",
        "aria-expanded": "false"
      }).each(function() {
        var g = b(this),
          h = g.prev("a"),
          f = b("<span>").addClass("ui-menu-icon ui-icon " + e).data("ui-menu-submenu-carat", !0);
        h.attr("aria-haspopup", "true").prepend(f), g.attr("aria-labelledby", h.attr("id"))
      }), c = d.add(this.element), c.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({
        tabIndex: -1,
        role: this._itemRole()
      }), c.children(":not(.ui-menu-item)").each(function() {
        var f = b(this);
        /[^\-—–\s]/.test(f.text()) || f.addClass("ui-widget-content ui-menu-divider")
      }), c.children(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !b.contains(this.element[0], this.active[0]) && this.blur()
    },
    _itemRole: function() {
      return {
        menu: "menuitem",
        listbox: "option"
      }[this.options.role]
    },
    _setOption: function(d, c) {
      d === "icons" && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(c.submenu), this._super(d, c)
    },
    focus: function(f, c) {
      var g,
        d;
      this.blur(f, f && f.type === "focus"), this._scrollIntoView(c), this.active = c.first(), d = this.active.children("a").addClass("ui-state-focus"), this.options.role && this.element.attr("aria-activedescendant", d.attr("id")), this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"), f && f.type === "keydown" ? this._close() : this.timer = this._delay(function() {
        this._close()
      }, this.delay), g = c.children(".ui-menu"), g.length && /^mouse/.test(f.type) && this._startOpening(g), this.activeMenu = c.parent(), this._trigger("focus", f, {
        item: c
      })
    },
    _scrollIntoView: function(e) {
      var j,
        g,
        d,
        f,
        h,
        c;
      this._hasScroll() && (j = parseFloat(b.css(this.activeMenu[0], "borderTopWidth")) || 0, g = parseFloat(b.css(this.activeMenu[0], "paddingTop")) || 0, d = e.offset().top - this.activeMenu.offset().top - j - g, f = this.activeMenu.scrollTop(), h = this.activeMenu.height(), c = e.height(), d < 0 ? this.activeMenu.scrollTop(f + d) : d + c > h && this.activeMenu.scrollTop(f + d - h + c))
    },
    blur: function(d, c) {
      c || clearTimeout(this.timer);
      if (!this.active) {
        return
      }
      this.active.children("a").removeClass("ui-state-focus"), this.active = null, this._trigger("blur", d, {
        item: this.active
      })
    },
    _startOpening: function(c) {
      clearTimeout(this.timer);
      if (c.attr("aria-hidden") !== "true") {
        return
      }
      this.timer = this._delay(function() {
        this._close(), this._open(c)
      }, this.delay)
    },
    _open: function(c) {
      var d = b.extend({
        of: this.active
      }, this.options.position);
      clearTimeout(this.timer), this.element.find(".ui-menu").not(c.parents(".ui-menu")).hide().attr("aria-hidden", "true"), c.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(d)
    },
    collapseAll: function(c, d) {
      clearTimeout(this.timer), this.timer = this._delay(function() {
        var e = d ? this.element : b(c && c.target).closest(this.element.find(".ui-menu"));
        e.length || (e = this.element), this._close(e), this.blur(c), this.activeMenu = e
      }, this.delay)
    },
    _close: function(c) {
      c || (c = this.active ? this.active.parent() : this.element), c.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active")
    },
    collapse: function(d) {
      var c = this.active && this.active.parent().closest(".ui-menu-item", this.element);
      c && c.length && (this._close(), this.focus(d, c))
    },
    expand: function(d) {
      var c = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
      c && c.length && (this._open(c.parent()), this._delay(function() {
        this.focus(d, c)
      }))
    },
    next: function(c) {
      this._move("next", "first", c)
    },
    previous: function(c) {
      this._move("prev", "last", c)
    },
    isFirstItem: function() {
      return this.active && !this.active.prevAll(".ui-menu-item").length
    },
    isLastItem: function() {
      return this.active && !this.active.nextAll(".ui-menu-item").length
    },
    _move: function(f, c, g) {
      var d;
      this.active && (f === "first" || f === "last" ? d = this.active[f === "first" ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : d = this.active[f + "All"](".ui-menu-item").eq(0));
      if (!d || !d.length || !this.active) {
        d = this.activeMenu.children(".ui-menu-item")[c]()
      }
      this.focus(g, d)
    },
    nextPage: function(d) {
      var f,
        e,
        c;
      if (!this.active) {
        this.next(d);return
      }
      if (this.isLastItem()) {
        return
      }
      this._hasScroll() ? (e = this.active.offset().top, c = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
        return f = b(this), f.offset().top - e - c < 0
      }), this.focus(d, f)) : this.focus(d, this.activeMenu.children(".ui-menu-item")[this.active ? "last" : "first"]())
    },
    previousPage: function(d) {
      var f,
        e,
        c;
      if (!this.active) {
        this.next(d);return
      }
      if (this.isFirstItem()) {
        return
      }
      this._hasScroll() ? (e = this.active.offset().top, c = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
        return f = b(this), f.offset().top - e + c > 0
      }), this.focus(d, f)) : this.focus(d, this.activeMenu.children(".ui-menu-item").first())
    },
    _hasScroll: function() {
      return this.element.outerHeight() < this.element.prop("scrollHeight")
    },
    select: function(c) {
      this.active = this.active || b(c.target).closest(".ui-menu-item");
      var d = {
        item: this.active
      };
      this.active.has(".ui-menu").length || this.collapseAll(c, !0), this._trigger("select", c, d)
    }
  })
})(jQuery);(function(b, a) {
  var c = 5;
  b.widget("ui.slider", b.ui.mouse, {
    version: "1.10.0",
    widgetEventPrefix: "slide",
    options: {
      animate: !1,
      distance: 0,
      max: 100,
      min: 0,
      orientation: "horizontal",
      range: !1,
      step: 1,
      value: 0,
      values: null,
      change: null,
      slide: null,
      start: null,
      stop: null
    },
    _create: function() {
      var e,
        j,
        g = this.options,
        d = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
        f = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
        h = [];
      this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all"), this.range = b([]), g.range && (g.range === !0 && (g.values ? g.values.length && g.values.length !== 2 ? g.values = [g.values[0], g.values[0]] : b.isArray(g.values) && (g.values = g.values.slice(0)) : g.values = [this._valueMin(), this._valueMin()]), this.range = b("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header" + (g.range === "min" || g.range === "max" ? " ui-slider-range-" + g.range : ""))), j = g.values && g.values.length || 1;
      for (e = d.length; e < j; e++) {
        h.push(f)
      }
      this.handles = d.add(b(h.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.add(this.range).filter("a").click(function(i) {
        i.preventDefault()
      }).mouseenter(function() {
        g.disabled || b(this).addClass("ui-state-hover")
      }).mouseleave(function() {
        b(this).removeClass("ui-state-hover")
      }).focus(function() {
        g.disabled ? b(this).blur() : (b(".ui-slider .ui-state-focus").removeClass("ui-state-focus"), b(this).addClass("ui-state-focus"))
      }).blur(function() {
        b(this).removeClass("ui-state-focus")
      }), this.handles.each(function(i) {
        b(this).data("ui-slider-handle-index", i)
      }), this._setOption("disabled", g.disabled), this._on(this.handles, this._handleEvents), this._refreshValue(), this._animateOff = !1
    },
    _destroy: function() {
      this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy()
    },
    _mouseCapture: function(v) {
      var g,
        d,
        j,
        w,
        e,
        q,
        p,
        k,
        h = this,
        m = this.options;
      return m.disabled ? !1 : (this.elementSize = {
        width: this.element.outerWidth(),
        height: this.element.outerHeight()
      }, this.elementOffset = this.element.offset(), g = {
        x: v.pageX,
        y: v.pageY
      }, d = this._normValueFromMouse(g), j = this._valueMax() - this._valueMin() + 1, this.handles.each(function(f) {
        var i = Math.abs(d - h.values(f));
        if (j > i || j === i && (f === h._lastChangedValue || h.values(f) === m.min)) {
          j = i, w = b(this), e = f
        }
      }), q = this._start(v, e), q === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = e, w.addClass("ui-state-active").focus(), p = w.offset(), k = !b(v.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = k ? {
        left: 0,
        top: 0
      } : {
        left: v.pageX - p.left - w.width() / 2,
        top: v.pageY - p.top - w.height() / 2 - (parseInt(w.css("borderTopWidth"), 10) || 0) - (parseInt(w.css("borderBottomWidth"), 10) || 0) + (parseInt(w.css("marginTop"), 10) || 0)
      }, this.handles.hasClass("ui-state-hover") || this._slide(v, e, d), this._animateOff = !0, !0))
    },
    _mouseStart: function() {
      return !0
    },
    _mouseDrag: function(f) {
      var d = {
          x: f.pageX,
          y: f.pageY
        },
        g = this._normValueFromMouse(d);
      return this._slide(f, this._handleIndex, g), !1
    },
    _mouseStop: function(d) {
      return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(d, this._handleIndex), this._change(d, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
    },
    _detectOrientation: function() {
      this.orientation = this.options.orientation === "vertical" ? "vertical" : "horizontal"
    },
    _normValueFromMouse: function(j) {
      var f,
        k,
        h,
        d,
        g;
      return this.orientation === "horizontal" ? (f = this.elementSize.width, k = j.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (f = this.elementSize.height, k = j.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), h = k / f, h > 1 && (h = 1), h < 0 && (h = 0), this.orientation === "vertical" && (h = 1 - h), d = this._valueMax() - this._valueMin(), g = this._valueMin() + h * d, this._trimAlignValue(g)
    },
    _start: function(f, d) {
      var g = {
        handle: this.handles[d],
        value: this.value()
      };
      return this.options.values && this.options.values.length && (g.value = this.values(d), g.values = this.values()), this._trigger("start", f, g)
    },
    _slide: function(j, f, k) {
      var h,
        d,
        g;
      this.options.values && this.options.values.length ? (h = this.values(f ? 0 : 1), this.options.values.length === 2 && this.options.range === !0 && (f === 0 && k > h || f === 1 && k < h) && (k = h), k !== this.values(f) && (d = this.values(), d[f] = k, g = this._trigger("slide", j, {
        handle: this.handles[f],
        value: k,
        values: d
      }), h = this.values(f ? 0 : 1), g !== !1 && this.values(f, k, !0))) : k !== this.value() && (g = this._trigger("slide", j, {
        handle: this.handles[f],
        value: k
      }), g !== !1 && this.value(k))
    },
    _stop: function(f, d) {
      var g = {
        handle: this.handles[d],
        value: this.value()
      };
      this.options.values && this.options.values.length && (g.value = this.values(d), g.values = this.values()), this._trigger("stop", f, g)
    },
    _change: function(f, d) {
      if (!this._keySliding && !this._mouseSliding) {
        var g = {
          handle: this.handles[d],
          value: this.value()
        };
        this.options.values && this.options.values.length && (g.value = this.values(d), g.values = this.values()), this._lastChangedValue = d, this._trigger("change", f, g)
      }
    },
    value: function(d) {
      if (arguments.length) {
        this.options.value = this._trimAlignValue(d), this._refreshValue(), this._change(null, 0);return
      }
      return this._value()
    },
    values: function(e, h) {
      var g,
        d,
        f;
      if (arguments.length > 1) {
        this.options.values[e] = this._trimAlignValue(h), this._refreshValue(), this._change(null, e);return
      }
      if (!arguments.length) {
        return this._values()
      }
      if (!b.isArray(arguments[0])) {
        return this.options.values && this.options.values.length ? this._values(e) : this.value()
      }
      g = this.options.values, d = arguments[0];
      for (f = 0; f < g.length; f += 1) {
        g[f] = this._trimAlignValue(d[f]), this._change(null, f)
      }
      this._refreshValue()
    },
    _setOption: function(e, g) {
      var f,
        d = 0;
      b.isArray(this.options.values) && (d = this.options.values.length), b.Widget.prototype._setOption.apply(this, arguments);switch (e) {
        case "disabled":
          g ? (this.handles.filter(".ui-state-focus").blur(), this.handles.removeClass("ui-state-hover"), this.handles.prop("disabled", !0)) : this.handles.prop("disabled", !1);
          break;case "orientation":
          this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
          break;case "value":
          this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
          break;case "values":
          this._animateOff = !0, this._refreshValue();
          for (f = 0; f < d; f += 1) {
            this._change(null, f)
          }
          this._animateOff = !1;
          break;case "min":
        case "max":
          this._animateOff = !0, this._refreshValue(), this._animateOff = !1
      }
    },
    _value: function() {
      var d = this.options.value;
      return d = this._trimAlignValue(d), d
    },
    _values: function(g) {
      var d,
        h,
        f;
      if (arguments.length) {
        return d = this.options.values[g], d = this._trimAlignValue(d), d
      }
      h = this.options.values.slice();
      for (f = 0; f < h.length; f += 1) {
        h[f] = this._trimAlignValue(h[f])
      }
      return h
    },
    _trimAlignValue: function(g) {
      if (g <= this._valueMin()) {
        return this._valueMin()
      }
      if (g >= this._valueMax()) {
        return this._valueMax()
      }
      var d = this.options.step > 0 ? this.options.step : 1,
        h = (g - this._valueMin()) % d,
        f = g - h;
      return Math.abs(h) * 2 >= d && (f += h > 0 ? d : -d), parseFloat(f.toFixed(5))
    },
    _valueMin: function() {
      return this.options.min
    },
    _valueMax: function() {
      return this.options.max
    },
    _refreshValue: function() {
      var q,
        g,
        d,
        j,
        v,
        e = this.options.range,
        p = this.options,
        m = this,
        k = this._animateOff ? !1 : p.animate,
        h = {};
      this.options.values && this.options.values.length ? this.handles.each(function(f) {
        g = (m.values(f) - m._valueMin()) / (m._valueMax() - m._valueMin()) * 100, h[m.orientation === "horizontal" ? "left" : "bottom"] = g + "%", b(this).stop(1, 1)[k ? "animate" : "css"](h, p.animate), m.options.range === !0 && (m.orientation === "horizontal" ? (f === 0 && m.range.stop(1, 1)[k ? "animate" : "css"]({
          left: g + "%"
        }, p.animate), f === 1 && m.range[k ? "animate" : "css"]({
          width: g - q + "%"
        }, {
          queue: !1,
          duration: p.animate
        })) : (f === 0 && m.range.stop(1, 1)[k ? "animate" : "css"]({
          bottom: g + "%"
        }, p.animate), f === 1 && m.range[k ? "animate" : "css"]({
          height: g - q + "%"
        }, {
          queue: !1,
          duration: p.animate
        }))), q = g
      }) : (d = this.value(), j = this._valueMin(), v = this._valueMax(), g = v !== j ? (d - j) / (v - j) * 100 : 0, h[this.orientation === "horizontal" ? "left" : "bottom"] = g + "%", this.handle.stop(1, 1)[k ? "animate" : "css"](h, p.animate), e === "min" && this.orientation === "horizontal" && this.range.stop(1, 1)[k ? "animate" : "css"]({
        width: g + "%"
      }, p.animate), e === "max" && this.orientation === "horizontal" && this.range[k ? "animate" : "css"]({
        width: 100 - g + "%"
      }, {
        queue: !1,
        duration: p.animate
      }), e === "min" && this.orientation === "vertical" && this.range.stop(1, 1)[k ? "animate" : "css"]({
        height: g + "%"
      }, p.animate), e === "max" && this.orientation === "vertical" && this.range[k ? "animate" : "css"]({
        height: 100 - g + "%"
      }, {
        queue: !1,
        duration: p.animate
      }))
    },
    _handleEvents: {
      keydown: function(f) {
        var h,
          e,
          g,
          j,
          d = b(f.target).data("ui-slider-handle-index");
        switch (f.keyCode) {
          case b.ui.keyCode.HOME:
          case b.ui.keyCode.END:
          case b.ui.keyCode.PAGE_UP:
          case b.ui.keyCode.PAGE_DOWN:
          case b.ui.keyCode.UP:
          case b.ui.keyCode.RIGHT:
          case b.ui.keyCode.DOWN:
          case b.ui.keyCode.LEFT:
            f.preventDefault();
            if (!this._keySliding) {
              this._keySliding = !0, b(f.target).addClass("ui-state-active"), h = this._start(f, d);
              if (h === !1) {
                return
              }
            }
        }
        j = this.options.step, this.options.values && this.options.values.length ? e = g = this.values(d) : e = g = this.value();switch (f.keyCode) {
          case b.ui.keyCode.HOME:
            g = this._valueMin();
            break;case b.ui.keyCode.END:
            g = this._valueMax();
            break;case b.ui.keyCode.PAGE_UP:
            g = this._trimAlignValue(e + (this._valueMax() - this._valueMin()) / c);
            break;case b.ui.keyCode.PAGE_DOWN:
            g = this._trimAlignValue(e - (this._valueMax() - this._valueMin()) / c);
            break;case b.ui.keyCode.UP:
          case b.ui.keyCode.RIGHT:
            if (e === this._valueMax()) {
              return
            }
            g = this._trimAlignValue(e + j);
            break;case b.ui.keyCode.DOWN:
          case b.ui.keyCode.LEFT:
            if (e === this._valueMin()) {
              return
            }
            g = this._trimAlignValue(e - j)
        }
        this._slide(f, d, g)
      },
      keyup: function(d) {
        var e = b(d.target).data("ui-slider-handle-index");
        this._keySliding && (this._keySliding = !1, this._stop(d, e), this._change(d, e), b(d.target).removeClass("ui-state-active"))
      }
    }
  })
})(jQuery);(function(e) {
  function h() {
  }
  for (var g = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","), f; f = g.pop();) {
    e[f] = e[f] || h
  }
})((function() {
  try {
    console.log();return window.console
  } catch (a) {
    return window.console = {}
  }
})());(function(b) {
  var a = {};
  b.publish = function(d, c) {
    a[d] && b.each(a[d], function() {
      try {
        this.apply(b, c || [])
      } catch (e) {
        console.log(e, b, c)
      }
    })
  };
  b.subscribe = function(c, d) {
    if (!a[c]) {
      a[c] = []
    }
    a[c].push(d);return [c, d]
  };
  b.unsubscribe = function(c, d) {
    a[c] && b.each(a[c], function(e) {
      if (this == d) {
        a[c].splice(e, 1)
      }
    })
  };
  b.subscribers = function(c) {
    l = [];a[c] && b.each(a[c], function(d) {
      l.push(this.name)
    });return l
  }
})(jQuery);
function getURLParameter(a) {
  return decodeURIComponent((new RegExp("[?|&]" + a + "=([^&;]+?)(&|#|;|$)").exec(location.search) || [, ""])[1].replace(/\+/g, "%20")) || null
}
function mapInit() {
  map = new L.Map("map", {
    center: [35.26, -80.827],
    zoom: 10,
    minZoom: 9,
    maxZoom: 18
  });map.attributionControl.setPrefix(false).setPosition("bottomleft");L.tileLayer("http://maps.co.mecklenburg.nc.us/mbtiles/mbtiles-server.php?db=meckbase.mbtiles&z={z}&x={x}&y={y}", {
    attribution: "<a href='http://emaps.charmeck.org' target='_blank'>Mecklenburg County GIS</a>"
  }).addTo(map)
}
function zoomToLngLat(a) {
  map.setView([a.lat, a.lng], 17)
}
function addMarker(b) {
  if (marker) {
    try {
      map.removeLayer(marker)
    } catch (a) {}
  }
  marker = L.marker([b.lat, b.lng]).addTo(map);
  if (b.label) {
    marker.bindPopup(b.label).openPopup()
  }
}
var map,
  marker;
$(document).ready(function() {
  $("a[rel=tooltip]").tooltip();$("*[rel=popover]").popover();$.subscribe("/map/addmarker", zoomToLngLat);$.subscribe("/map/addmarker", addMarker);
  if (Modernizr.history) {
    $.subscribe("/map/addmarker", newHistory)
  }
  $("#searchbox").click(function() {
    $(this).select()
  });$.widget("custom.catcomplete", $.ui.autocomplete, {
    _renderMenu: function(c, b) {
      var d = this,
        a = "";
      $.each(b, function(e, f) {
        if (f.responsetype !== a) {
          c.append("<li class='ui-autocomplete-category'>" + f.responsetype + "</li>");
          a = f.responsetype
        }
        d._renderItemData(c, f)
      })
    }
  });$("#searchbox").catcomplete({
    minLength: 4,
    delay: 250,
    autoFocus: true,
    source: function(b, a) {
      $.ajax({
        url: "http://maps.co.mecklenburg.nc.us/rest/v4/ws_geo_ubersearch.php",
        dataType: "jsonp",
        data: {
          searchtypes: "address,library,school,park,geoname,cast,nsa,intersection,pid,business,road",
          query: b.term
        },
        success: function(c) {
          if (c.length > 0) {
            a($.map(c, function(d) {
              return {
                label: d.name,
                gid: d.gid,
                responsetype: d.type,
                lng: d.lng,
                lat: d.lat
              }
            }))
          } else {
            a($.map([{}], function(d) {
              return {
                label: "No matches found.",
                responsetype: "I've got nothing"
              }
            }))
          }
        }
      })
    },
    select: function(a, b) {
      if (b.item.lat) {
        $.publish("/map/addmarker", [b.item])
      }
      $(this).popover("hide").blur()
    },
    open: function(a, b) {
      $(this).popover("hide")
    }
  });$(".searchbtn").bind("click", function(a) {
    $("#searchbox").catcomplete("search")
  })
});$(window).load(function() {
  mapInit();
  if (Modernizr.history) {
    $(window).bind("popstate", function() {
      if (getURLParameter("loc")) {
        var a = getURLParameter("loc").split(",");
        a = {
          lat: a[0],
          lng: a[1]
        };$.unsubscribe("/map/addmarker", newHistory);$.publish("/map/addmarker", [a]);$.subscribe("/map/addmarker", newHistory)
      } else {
        if (map.getCenter().lat.toString().substr(0, 6) != 35.26) {
          map.setView([35.26, -80.807], 10)
        }
      }
    })
  }
});
function newHistory(a) {
  history.pushState(null, null, "?loc=" + a.lat + "," + a.lng)
}
;
