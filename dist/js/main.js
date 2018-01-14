/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["h"] = h;
/* harmony export (immutable) */ __webpack_exports__["app"] = app;
function h(name, props) {
  var node
  var children = []

  for (var stack = [], i = arguments.length; i-- > 2; ) {
    stack.push(arguments[i])
  }

  while (stack.length) {
    if (Array.isArray((node = stack.pop()))) {
      for (var i = node.length; i--; ) {
        stack.push(node[i])
      }
    } else if (node == null || node === true || node === false) {
    } else {
      children.push(node)
    }
  }

  return typeof name === "string"
    ? {
        name: name,
        props: props || {},
        children: children
      }
    : name(props || {}, children)
}

function app(state, actions, view, container) {
  var patchLock
  var lifecycle = []
  var root = container && container.children[0]
  var node = vnode(root, [].map)

  repaint(init([], (state = copy(state)), (actions = copy(actions))))

  return actions

  function vnode(element, map) {
    return (
      element && {
        name: element.nodeName.toLowerCase(),
        props: {},
        children: map.call(element.childNodes, function(element) {
          return element.nodeType === 3
            ? element.nodeValue
            : vnode(element, map)
        })
      }
    )
  }

  function render(next) {
    patchLock = !patchLock
    next = view(state, actions)

    if (container && !patchLock) {
      root = patch(container, root, node, (node = next))
    }

    while ((next = lifecycle.pop())) next()
  }

  function repaint() {
    if (!patchLock) {
      patchLock = !patchLock
      setTimeout(render)
    }
  }

  function copy(a, b) {
    var target = {}

    for (var i in a) target[i] = a[i]
    for (var i in b) target[i] = b[i]

    return target
  }

  function set(path, value, source, target) {
    if (path.length) {
      target[path[0]] =
        1 < path.length ? set(path.slice(1), value, source[path[0]], {}) : value
      return copy(source, target)
    }
    return value
  }

  function get(path, source) {
    for (var i = 0; i < path.length; i++) {
      source = source[path[i]]
    }
    return source
  }

  function init(path, slice, actions) {
    for (var key in actions) {
      typeof actions[key] === "function"
        ? (function(key, action) {
            actions[key] = function(data) {
              slice = get(path, state)

              if (typeof (data = action(data)) === "function") {
                data = data(slice, actions)
              }

              if (data && data !== slice && !data.then) {
                repaint((state = set(path, copy(slice, data), state, {})))
              }

              return data
            }
          })(key, actions[key])
        : init(
            path.concat(key),
            (slice[key] = slice[key] || {}),
            (actions[key] = copy(actions[key]))
          )
    }
  }

  function getKey(node) {
    return node && node.props ? node.props.key : null
  }

  function setElementProp(element, name, value, oldValue) {
    if (name === "key") {
    } else if (name === "style") {
      for (var i in copy(oldValue, value)) {
        element[name][i] = value == null || value[i] == null ? "" : value[i]
      }
    } else {
      try {
        element[name] = value == null ? "" : value
      } catch (_) {}

      if (typeof value !== "function") {
        if (value == null || value === false) {
          element.removeAttribute(name)
        } else {
          element.setAttribute(name, value)
        }
      }
    }
  }

  function createElement(node, isSVG) {
    var element =
      typeof node === "string" || typeof node === "number"
        ? document.createTextNode(node)
        : (isSVG = isSVG || node.name === "svg")
          ? document.createElementNS("http://www.w3.org/2000/svg", node.name)
          : document.createElement(node.name)

    if (node.props) {
      if (node.props.oncreate) {
        lifecycle.push(function() {
          node.props.oncreate(element)
        })
      }

      for (var i = 0; i < node.children.length; i++) {
        element.appendChild(createElement(node.children[i], isSVG))
      }

      for (var name in node.props) {
        setElementProp(element, name, node.props[name])
      }
    }

    return element
  }

  function updateElement(element, oldProps, props) {
    for (var name in copy(oldProps, props)) {
      if (
        props[name] !==
        (name === "value" || name === "checked"
          ? element[name]
          : oldProps[name])
      ) {
        setElementProp(element, name, props[name], oldProps[name])
      }
    }

    if (props.onupdate) {
      lifecycle.push(function() {
        props.onupdate(element, oldProps)
      })
    }
  }

  function removeChildren(element, node, props) {
    if ((props = node.props)) {
      for (var i = 0; i < node.children.length; i++) {
        removeChildren(element.childNodes[i], node.children[i])
      }

      if (props.ondestroy) {
        props.ondestroy(element)
      }
    }
    return element
  }

  function removeElement(parent, element, node, cb) {
    function done() {
      parent.removeChild(removeChildren(element, node))
    }

    if (node.props && (cb = node.props.onremove)) {
      cb(element, done)
    } else {
      done()
    }
  }

  function patch(parent, element, oldNode, node, isSVG, nextSibling) {
    if (node === oldNode) {
    } else if (oldNode == null) {
      element = parent.insertBefore(createElement(node, isSVG), element)
    } else if (node.name && node.name === oldNode.name) {
      updateElement(element, oldNode.props, node.props)

      var oldElements = []
      var oldKeyed = {}
      var newKeyed = {}

      for (var i = 0; i < oldNode.children.length; i++) {
        oldElements[i] = element.childNodes[i]

        var oldChild = oldNode.children[i]
        var oldKey = getKey(oldChild)

        if (null != oldKey) {
          oldKeyed[oldKey] = [oldElements[i], oldChild]
        }
      }

      var i = 0
      var j = 0

      while (j < node.children.length) {
        var oldChild = oldNode.children[i]
        var newChild = node.children[j]

        var oldKey = getKey(oldChild)
        var newKey = getKey(newChild)

        if (newKeyed[oldKey]) {
          i++
          continue
        }

        if (newKey == null) {
          if (oldKey == null) {
            patch(element, oldElements[i], oldChild, newChild, isSVG)
            j++
          }
          i++
        } else {
          var recyledNode = oldKeyed[newKey] || []

          if (oldKey === newKey) {
            patch(element, recyledNode[0], recyledNode[1], newChild, isSVG)
            i++
          } else if (recyledNode[0]) {
            patch(
              element,
              element.insertBefore(recyledNode[0], oldElements[i]),
              recyledNode[1],
              newChild,
              isSVG
            )
          } else {
            patch(element, oldElements[i], null, newChild, isSVG)
          }

          j++
          newKeyed[newKey] = newChild
        }
      }

      while (i < oldNode.children.length) {
        var oldChild = oldNode.children[i]
        if (getKey(oldChild) == null) {
          removeElement(element, oldElements[i], oldChild)
        }
        i++
      }

      for (var i in oldKeyed) {
        if (!newKeyed[oldKeyed[i][1].props.key]) {
          removeElement(element, oldKeyed[i][0], oldKeyed[i][1])
        }
      }
    } else if (node.name === oldNode.name) {
      element.nodeValue = node
    } else {
      element = parent.insertBefore(
        createElement(node, isSVG),
        (nextSibling = element)
      )
      removeElement(parent, nextSibling, oldNode)
    }
    return element
  }
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Link__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return __WEBPACK_IMPORTED_MODULE_0__Link__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Route__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return __WEBPACK_IMPORTED_MODULE_1__Route__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Switch__ = __webpack_require__(8);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Switch", function() { return __WEBPACK_IMPORTED_MODULE_2__Switch__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Redirect__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Redirect", function() { return __WEBPACK_IMPORTED_MODULE_3__Redirect__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__location__ = __webpack_require__(10);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "location", function() { return __WEBPACK_IMPORTED_MODULE_4__location__["a"]; });







/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["a"] = a;
/* harmony export (immutable) */ __webpack_exports__["abbr"] = abbr;
/* harmony export (immutable) */ __webpack_exports__["address"] = address;
/* harmony export (immutable) */ __webpack_exports__["area"] = area;
/* harmony export (immutable) */ __webpack_exports__["article"] = article;
/* harmony export (immutable) */ __webpack_exports__["aside"] = aside;
/* harmony export (immutable) */ __webpack_exports__["audio"] = audio;
/* harmony export (immutable) */ __webpack_exports__["b"] = b;
/* harmony export (immutable) */ __webpack_exports__["bdi"] = bdi;
/* harmony export (immutable) */ __webpack_exports__["bdo"] = bdo;
/* harmony export (immutable) */ __webpack_exports__["blockquote"] = blockquote;
/* harmony export (immutable) */ __webpack_exports__["br"] = br;
/* harmony export (immutable) */ __webpack_exports__["button"] = button;
/* harmony export (immutable) */ __webpack_exports__["canvas"] = canvas;
/* harmony export (immutable) */ __webpack_exports__["caption"] = caption;
/* harmony export (immutable) */ __webpack_exports__["cite"] = cite;
/* harmony export (immutable) */ __webpack_exports__["code"] = code;
/* harmony export (immutable) */ __webpack_exports__["col"] = col;
/* harmony export (immutable) */ __webpack_exports__["colgroup"] = colgroup;
/* harmony export (immutable) */ __webpack_exports__["data"] = data;
/* harmony export (immutable) */ __webpack_exports__["datalist"] = datalist;
/* harmony export (immutable) */ __webpack_exports__["dd"] = dd;
/* harmony export (immutable) */ __webpack_exports__["del"] = del;
/* harmony export (immutable) */ __webpack_exports__["details"] = details;
/* harmony export (immutable) */ __webpack_exports__["dfn"] = dfn;
/* harmony export (immutable) */ __webpack_exports__["dialog"] = dialog;
/* harmony export (immutable) */ __webpack_exports__["div"] = div;
/* harmony export (immutable) */ __webpack_exports__["dl"] = dl;
/* harmony export (immutable) */ __webpack_exports__["dt"] = dt;
/* harmony export (immutable) */ __webpack_exports__["em"] = em;
/* harmony export (immutable) */ __webpack_exports__["embed"] = embed;
/* harmony export (immutable) */ __webpack_exports__["fieldset"] = fieldset;
/* harmony export (immutable) */ __webpack_exports__["figcaption"] = figcaption;
/* harmony export (immutable) */ __webpack_exports__["figure"] = figure;
/* harmony export (immutable) */ __webpack_exports__["footer"] = footer;
/* harmony export (immutable) */ __webpack_exports__["form"] = form;
/* harmony export (immutable) */ __webpack_exports__["h1"] = h1;
/* harmony export (immutable) */ __webpack_exports__["h2"] = h2;
/* harmony export (immutable) */ __webpack_exports__["h3"] = h3;
/* harmony export (immutable) */ __webpack_exports__["h4"] = h4;
/* harmony export (immutable) */ __webpack_exports__["h5"] = h5;
/* harmony export (immutable) */ __webpack_exports__["h6"] = h6;
/* harmony export (immutable) */ __webpack_exports__["header"] = header;
/* harmony export (immutable) */ __webpack_exports__["hr"] = hr;
/* harmony export (immutable) */ __webpack_exports__["i"] = i;
/* harmony export (immutable) */ __webpack_exports__["img"] = img;
/* harmony export (immutable) */ __webpack_exports__["input"] = input;
/* harmony export (immutable) */ __webpack_exports__["ins"] = ins;
/* harmony export (immutable) */ __webpack_exports__["kbd"] = kbd;
/* harmony export (immutable) */ __webpack_exports__["label"] = label;
/* harmony export (immutable) */ __webpack_exports__["legend"] = legend;
/* harmony export (immutable) */ __webpack_exports__["li"] = li;
/* harmony export (immutable) */ __webpack_exports__["main"] = main;
/* harmony export (immutable) */ __webpack_exports__["map"] = map;
/* harmony export (immutable) */ __webpack_exports__["mark"] = mark;
/* harmony export (immutable) */ __webpack_exports__["menu"] = menu;
/* harmony export (immutable) */ __webpack_exports__["menuitem"] = menuitem;
/* harmony export (immutable) */ __webpack_exports__["meter"] = meter;
/* harmony export (immutable) */ __webpack_exports__["nav"] = nav;
/* harmony export (immutable) */ __webpack_exports__["object"] = object;
/* harmony export (immutable) */ __webpack_exports__["ol"] = ol;
/* harmony export (immutable) */ __webpack_exports__["optgroup"] = optgroup;
/* harmony export (immutable) */ __webpack_exports__["option"] = option;
/* harmony export (immutable) */ __webpack_exports__["output"] = output;
/* harmony export (immutable) */ __webpack_exports__["p"] = p;
/* harmony export (immutable) */ __webpack_exports__["param"] = param;
/* harmony export (immutable) */ __webpack_exports__["pre"] = pre;
/* harmony export (immutable) */ __webpack_exports__["progress"] = progress;
/* harmony export (immutable) */ __webpack_exports__["q"] = q;
/* harmony export (immutable) */ __webpack_exports__["rp"] = rp;
/* harmony export (immutable) */ __webpack_exports__["rt"] = rt;
/* harmony export (immutable) */ __webpack_exports__["rtc"] = rtc;
/* harmony export (immutable) */ __webpack_exports__["ruby"] = ruby;
/* harmony export (immutable) */ __webpack_exports__["s"] = s;
/* harmony export (immutable) */ __webpack_exports__["samp"] = samp;
/* harmony export (immutable) */ __webpack_exports__["section"] = section;
/* harmony export (immutable) */ __webpack_exports__["select"] = select;
/* harmony export (immutable) */ __webpack_exports__["small"] = small;
/* harmony export (immutable) */ __webpack_exports__["source"] = source;
/* harmony export (immutable) */ __webpack_exports__["span"] = span;
/* harmony export (immutable) */ __webpack_exports__["strong"] = strong;
/* harmony export (immutable) */ __webpack_exports__["sub"] = sub;
/* harmony export (immutable) */ __webpack_exports__["summary"] = summary;
/* harmony export (immutable) */ __webpack_exports__["sup"] = sup;
/* harmony export (immutable) */ __webpack_exports__["svg"] = svg;
/* harmony export (immutable) */ __webpack_exports__["table"] = table;
/* harmony export (immutable) */ __webpack_exports__["tbody"] = tbody;
/* harmony export (immutable) */ __webpack_exports__["td"] = td;
/* harmony export (immutable) */ __webpack_exports__["textarea"] = textarea;
/* harmony export (immutable) */ __webpack_exports__["tfoot"] = tfoot;
/* harmony export (immutable) */ __webpack_exports__["th"] = th;
/* harmony export (immutable) */ __webpack_exports__["thead"] = thead;
/* harmony export (immutable) */ __webpack_exports__["time"] = time;
/* harmony export (immutable) */ __webpack_exports__["tr"] = tr;
/* harmony export (immutable) */ __webpack_exports__["track"] = track;
/* harmony export (immutable) */ __webpack_exports__["u"] = u;
/* harmony export (immutable) */ __webpack_exports__["ul"] = ul;
/* harmony export (immutable) */ __webpack_exports__["video"] = video;
/* harmony export (immutable) */ __webpack_exports__["vvar"] = vvar;
/* harmony export (immutable) */ __webpack_exports__["wbr"] = wbr;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hyperapp__ = __webpack_require__(0);


function vnode(tag) {
  return function (props, children) {
    return typeof props === "object" && !Array.isArray(props)
      ? Object(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["h"])(tag, props, children)
      : Object(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["h"])(tag, {}, props)
  }
}


function a(props, children) {
  return vnode("a")(props, children)
}

function abbr(props, children) {
  return vnode("abbr")(props, children)
}

function address(props, children) {
  return vnode("address")(props, children)
}

function area(props, children) {
  return vnode("area")(props, children)
}

function article(props, children) {
  return vnode("article")(props, children)
}

function aside(props, children) {
  return vnode("aside")(props, children)
}

function audio(props, children) {
  return vnode("audio")(props, children)
}

function b(props, children) {
  return vnode("b")(props, children)
}

function bdi(props, children) {
  return vnode("bdi")(props, children)
}

function bdo(props, children) {
  return vnode("bdo")(props, children)
}

function blockquote(props, children) {
  return vnode("blockquote")(props, children)
}

function br(props, children) {
  return vnode("br")(props, children)
}

function button(props, children) {
  return vnode("button")(props, children)
}

function canvas(props, children) {
  return vnode("canvas")(props, children)
}

function caption(props, children) {
  return vnode("caption")(props, children)
}

function cite(props, children) {
  return vnode("cite")(props, children)
}

function code(props, children) {
  return vnode("code")(props, children)
}

function col(props, children) {
  return vnode("col")(props, children)
}

function colgroup(props, children) {
  return vnode("colgroup")(props, children)
}

function data(props, children) {
  return vnode("data")(props, children)
}

function datalist(props, children) {
  return vnode("datalist")(props, children)
}

function dd(props, children) {
  return vnode("dd")(props, children)
}

function del(props, children) {
  return vnode("del")(props, children)
}

function details(props, children) {
  return vnode("details")(props, children)
}

function dfn(props, children) {
  return vnode("dfn")(props, children)
}

function dialog(props, children) {
  return vnode("dialog")(props, children)
}

function div(props, children) {
  return vnode("div")(props, children)
}

function dl(props, children) {
  return vnode("dl")(props, children)
}

function dt(props, children) {
  return vnode("dt")(props, children)
}

function em(props, children) {
  return vnode("em")(props, children)
}

function embed(props, children) {
  return vnode("embed")(props, children)
}

function fieldset(props, children) {
  return vnode("fieldset")(props, children)
}

function figcaption(props, children) {
  return vnode("figcaption")(props, children)
}

function figure(props, children) {
  return vnode("figure")(props, children)
}

function footer(props, children) {
  return vnode("footer")(props, children)
}

function form(props, children) {
  return vnode("form")(props, children)
}

function h1(props, children) {
  return vnode("h1")(props, children)
}

function h2(props, children) {
  return vnode("h2")(props, children)
}

function h3(props, children) {
  return vnode("h3")(props, children)
}

function h4(props, children) {
  return vnode("h4")(props, children)
}

function h5(props, children) {
  return vnode("h5")(props, children)
}

function h6(props, children) {
  return vnode("h6")(props, children)
}

function header(props, children) {
  return vnode("header")(props, children)
}

function hr(props, children) {
  return vnode("hr")(props, children)
}

function i(props, children) {
  return vnode("i")(props, children)
}

function img(props, children) {
  return vnode("img")(props, children)
}

function input(props, children) {
  return vnode("input")(props, children)
}

function ins(props, children) {
  return vnode("ins")(props, children)
}

function kbd(props, children) {
  return vnode("kbd")(props, children)
}

function label(props, children) {
  return vnode("label")(props, children)
}

function legend(props, children) {
  return vnode("legend")(props, children)
}

function li(props, children) {
  return vnode("li")(props, children)
}

function main(props, children) {
  return vnode("main")(props, children)
}

function map(props, children) {
  return vnode("map")(props, children)
}

function mark(props, children) {
  return vnode("mark")(props, children)
}

function menu(props, children) {
  return vnode("menu")(props, children)
}

function menuitem(props, children) {
  return vnode("menuitem")(props, children)
}

function meter(props, children) {
  return vnode("meter")(props, children)
}

function nav(props, children) {
  return vnode("nav")(props, children)
}

function object(props, children) {
  return vnode("object")(props, children)
}

function ol(props, children) {
  return vnode("ol")(props, children)
}

function optgroup(props, children) {
  return vnode("optgroup")(props, children)
}

function option(props, children) {
  return vnode("option")(props, children)
}

function output(props, children) {
  return vnode("output")(props, children)
}

function p(props, children) {
  return vnode("p")(props, children)
}

function param(props, children) {
  return vnode("param")(props, children)
}

function pre(props, children) {
  return vnode("pre")(props, children)
}

function progress(props, children) {
  return vnode("progress")(props, children)
}

function q(props, children) {
  return vnode("q")(props, children)
}

function rp(props, children) {
  return vnode("rp")(props, children)
}

function rt(props, children) {
  return vnode("rt")(props, children)
}

function rtc(props, children) {
  return vnode("rtc")(props, children)
}

function ruby(props, children) {
  return vnode("ruby")(props, children)
}

function s(props, children) {
  return vnode("s")(props, children)
}

function samp(props, children) {
  return vnode("samp")(props, children)
}

function section(props, children) {
  return vnode("section")(props, children)
}

function select(props, children) {
  return vnode("select")(props, children)
}

function small(props, children) {
  return vnode("small")(props, children)
}

function source(props, children) {
  return vnode("source")(props, children)
}

function span(props, children) {
  return vnode("span")(props, children)
}

function strong(props, children) {
  return vnode("strong")(props, children)
}

function sub(props, children) {
  return vnode("sub")(props, children)
}

function summary(props, children) {
  return vnode("summary")(props, children)
}

function sup(props, children) {
  return vnode("sup")(props, children)
}

function svg(props, children) {
  return vnode("svg")(props, children)
}

function table(props, children) {
  return vnode("table")(props, children)
}

function tbody(props, children) {
  return vnode("tbody")(props, children)
}

function td(props, children) {
  return vnode("td")(props, children)
}

function textarea(props, children) {
  return vnode("textarea")(props, children)
}

function tfoot(props, children) {
  return vnode("tfoot")(props, children)
}

function th(props, children) {
  return vnode("th")(props, children)
}

function thead(props, children) {
  return vnode("thead")(props, children)
}

function time(props, children) {
  return vnode("time")(props, children)
}

function tr(props, children) {
  return vnode("tr")(props, children)
}

function track(props, children) {
  return vnode("track")(props, children)
}

function u(props, children) {
  return vnode("u")(props, children)
}

function ul(props, children) {
  return vnode("ul")(props, children)
}

function video(props, children) {
  return vnode("video")(props, children)
}

function vvar(props, children) {
  return vnode("vvar")(props, children)
}

function wbr(props, children) {
  return vnode("wbr")(props, children)
}



/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hyperapp_1 = __webpack_require__(0);
var router_1 = __webpack_require__(1);
function Route(_a, children) {
    var parent = _a.parent, path = _a.path;
    return hyperapp_1.h(router_1.Route, { parent: parent, path: path, render: function () { return children; } });
}
exports.Route = Route;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var hyperapp_1 = __webpack_require__(0);
var router_1 = __webpack_require__(1);
__webpack_require__(2);
var Config_1 = __webpack_require__(11);
var Storage_1 = __webpack_require__(12);
var Services_1 = __webpack_require__(13);
var Route_1 = __webpack_require__(3);
var RSSList_1 = __webpack_require__(14);
var RSSView_1 = __webpack_require__(15);
var cache = {
    rss: new Storage_1.Storage("rss"),
};
var actions = {
    fetch: function () { return function (state, actions) { return __awaiter(_this, void 0, void 0, function () {
        var pages;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Services_1.fetchAll(state.rsss)];
                case 1:
                    pages = _a.sent();
                    actions.update(pages);
                    return [2 /*return*/];
            }
        });
    }); }; },
    update: function (pages) { return function (state) {
        return {
            pages: pages,
        };
    }; },
    configActions: {
        addRSSEndpoint: function () { return function (state, actions) {
            if (!cache.rss.get()) {
                cache.rss.set([]);
            }
            cache.rss.set(cache.rss.get().concat([{ url: state.config.additionalRss }]));
            return {
                rsss: cache.rss.get(),
            };
        }; },
        removeRSSEndpoint: function (url) { return function (state, actions) {
            cache.rss.set(cache.rss.get().filter(function (rss) { return rss.url !== url; }));
            return {
                rsss: cache.rss.get(),
            };
        }; },
        updateRSSEndpointUrl: function (_a) {
            var value = _a.target.value;
            return function (state) {
                return {
                    config: {
                        additionalRss: value,
                    },
                };
            };
        },
    },
    location: router_1.location.actions,
};
var state = {
    location: router_1.location.state,
    config: {
        additionalRss: "",
    },
    rsss: cache.rss.get(),
    pages: [],
};
function view(state, actions) {
    return (hyperapp_1.h("div", null,
        hyperapp_1.h(Route_1.Route, { path: "/dist/config" },
            hyperapp_1.h(Config_1.Config, { rsss: state.rsss, configActions: actions.configActions })),
        hyperapp_1.h(Route_1.Route, { path: "/dist/" },
            hyperapp_1.h(RSSList_1.RSSList, { pages: state.pages, fetch: actions.fetch })),
        hyperapp_1.h(RSSView_1.RSSView, { pages: state.pages })));
}
var main = hyperapp_1.app(state, actions, view, document.body);
router_1.location.subscribe(main.location);
main.fetch();


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Link;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hyperapp__ = __webpack_require__(0);


function Link(props, children) {
  var to = props.to
  var location = props.location || window.location

  props.href = to
  props.onclick = function(e) {
    if (
      e.button !== 0 ||
      e.altKey ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      props.target === "_blank" ||
      e.currentTarget.origin !== location.origin
    ) {
    } else {
      e.preventDefault()

      if (to !== location.pathname) {
        history.pushState(location.pathname, "", to)
      }
    }
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["h"])("a", props, children)
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Route;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__parseRoute__ = __webpack_require__(7);


function Route(props) {
  var location = props.location || window.location
  var match = Object(__WEBPACK_IMPORTED_MODULE_0__parseRoute__["a" /* parseRoute */])(props.path, location.pathname, {
    exact: !props.parent
  })

  return (
    match &&
    props.render({
      match: match,
      location: location
    })
  )
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = parseRoute;
function createMatch(isExact, path, url, params) {
  return {
    isExact: isExact,
    path: path,
    url: url,
    params: params
  }
}

function trimTrailingSlash(url) {
  for (var len = url.length; "/" === url[--len]; );
  return url.slice(0, len + 1)
}

function parseRoute(path, url, options) {
  if (path === url || !path) {
    return createMatch(path === url, path, url)
  }

  var exact = options && options.exact
  var paths = trimTrailingSlash(path).split("/")
  var urls = trimTrailingSlash(url).split("/")

  if (paths.length > urls.length || (exact && paths.length < urls.length)) {
    return
  }

  for (var i = 0, params = {}, len = paths.length, url = ""; i < len; i++) {
    if (":" === paths[i][0]) {
      try {
        params[paths[i].slice(1)] = urls[i] = decodeURI(urls[i])
      } catch (_) {
        continue
      }
    } else if (paths[i] !== urls[i]) {
      return
    }
    url += urls[i] + "/"
  }

  return createMatch(false, path, url.slice(0, -1), params)
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Switch;
function Switch(props, children) {
  return children[0]
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Redirect;
function Redirect(props) {
  var location = props.location || window.location
  history.replaceState(props.from || location.pathname, "", props.to)
}


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return location; });
function wrapHistory(keys) {
  return keys.reduce(function(next, key) {
    var fn = history[key]

    history[key] = function(data, title, url) {
      fn.call(this, data, title, url)
      dispatchEvent(new CustomEvent("pushstate", { detail: data }))
    }

    return function() {
      history[key] = fn
      next && next()
    }
  }, null)
}

var location = {
  state: {
    pathname: window.location.pathname,
    previous: window.location.pathname
  },
  actions: {
    go: function(pathname) {
      history.pushState(null, "", pathname)
    },
    set: function(data) {
      return data
    }
  },
  subscribe: function(actions) {
    function handleLocationChange(e) {
      actions.set({
        pathname: window.location.pathname,
        previous: e.detail
          ? (window.location.previous = e.detail)
          : window.location.previous
      })
    }

    var unwrap = wrapHistory(["pushState", "replaceState"])

    addEventListener("pushstate", handleLocationChange)
    addEventListener("popstate", handleLocationChange)

    return function() {
      removeEventListener("pushstate", handleLocationChange)
      removeEventListener("popstate", handleLocationChange)
      unwrap()
    }
  }
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hyperapp_1 = __webpack_require__(0);
var router_1 = __webpack_require__(1);
__webpack_require__(2);
function Subscribing(_a) {
    var index = _a.index, url = _a.url, removeAction = _a.removeAction;
    return (hyperapp_1.h("span", null,
        hyperapp_1.h("span", null, url),
        hyperapp_1.h("button", { onclick: function () { return removeAction(url); } }, "x")));
}
function Config(_a) {
    var configActions = _a.configActions, rsss = _a.rsss;
    return (hyperapp_1.h("div", null,
        hyperapp_1.h(router_1.Link, { to: "/dist/" }, "home"),
        hyperapp_1.h("div", null, "subscribing"),
        hyperapp_1.h("ul", null, rsss.map(function (rss, index) {
            return hyperapp_1.h("li", null,
                hyperapp_1.h(Subscribing, { url: rss.url, index: index, removeAction: configActions.removeRSSEndpoint }));
        })),
        hyperapp_1.h("div", null, "input url"),
        hyperapp_1.h("input", { oninput: configActions.updateRSSEndpointUrl }),
        hyperapp_1.h("button", { onclick: configActions.addRSSEndpoint }, "add")));
}
exports.Config = Config;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Storage = /** @class */ (function () {
    function Storage(key) {
        this.key = key;
    }
    Storage.prototype.get = function () {
        if (this.cache) {
            return this.cache;
        }
        return this.cache = JSON.parse(localStorage.getItem(this.key));
    };
    Storage.prototype.set = function (parameter) {
        this.cache = parameter;
        localStorage.setItem(this.key, JSON.stringify(parameter));
    };
    return Storage;
}());
exports.Storage = Storage;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
function fetchRSS(url) {
    return __awaiter(this, void 0, void 0, function () {
        var q;
        return __generator(this, function (_a) {
            q = "select * from rss(5) where url='" + encodeURIComponent(url) + "'";
            return [2 /*return*/, fetch("https://query.yahooapis.com/v1/public/yql?q=" + q + "&format=json", { cache: "no-cache" })];
        });
    });
}
function fetchAll(rsss) {
    return __awaiter(this, void 0, void 0, function () {
        var pages, _i, rsss_1, rss, result, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pages = [];
                    _i = 0, rsss_1 = rsss;
                    _a.label = 1;
                case 1:
                    if (!(_i < rsss_1.length)) return [3 /*break*/, 5];
                    rss = rsss_1[_i];
                    return [4 /*yield*/, fetchRSS(rss.url)];
                case 2:
                    result = _a.sent();
                    if (!result.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, result.json()];
                case 3:
                    json = _a.sent();
                    if (Array.isArray(json.query.results.item)) {
                        pages.push.apply(pages, json.query.results.item);
                    }
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/, pages];
            }
        });
    });
}
exports.fetchAll = fetchAll;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hyperapp_1 = __webpack_require__(0);
var router_1 = __webpack_require__(1);
__webpack_require__(2);
function RSSList(_a) {
    var pages = _a.pages, fetch = _a.fetch;
    return (hyperapp_1.h("div", null,
        hyperapp_1.h(router_1.Link, { to: "/dist/config" }, "config"),
        hyperapp_1.h("br", null),
        hyperapp_1.h("button", { onclick: fetch }, "update"),
        hyperapp_1.h("ul", null, pages.map(function (page, index) {
            return (hyperapp_1.h("li", null,
                hyperapp_1.h(router_1.Link, { to: "/dist/" + index }, page.title)));
        }))));
}
exports.RSSList = RSSList;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hyperapp_1 = __webpack_require__(0);
var router_1 = __webpack_require__(1);
__webpack_require__(2);
var Route_1 = __webpack_require__(3);
var Utils_1 = __webpack_require__(16);
function Description(_a) {
    var description = _a.description;
    var desc = typeof description === "string" ?
        description :
        description.content;
    return (hyperapp_1.h("div", null,
        hyperapp_1.h(router_1.Link, { to: "/dist/" }, "back"),
        hyperapp_1.h("div", { oncreate: Utils_1.htmlfy }, desc)));
}
function RSSView(_a) {
    var pages = _a.pages;
    return pages.map(function (page, index) { return (hyperapp_1.h(Route_1.Route, { path: "/dist/" + index },
        hyperapp_1.h(Description, { description: page.description }))); });
}
exports.RSSView = RSSView;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function htmlfy($) {
    $.innerHTML = $.textContent;
}
exports.htmlfy = htmlfy;


/***/ })
/******/ ]);