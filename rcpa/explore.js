// Generated by CoffeeScript 1.10.0
(function() {
  var Graph, Jumbotron, MAX_ABS_WEIGHT, Skills, a, advancedPanel, br, button, countNonzero, descriptionIntro, descriptionMap, div, dotprod, form, h1, h2, h3, h4, i, input, label, li, option, p, prettyName, queryString, ref, resultPanel, select, table, tbody, td, tfoot, th, thead, tr, ul, weightLine, weightPanel,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  ref = React.DOM, div = ref.div, h1 = ref.h1, h2 = ref.h2, h3 = ref.h3, h4 = ref.h4, p = ref.p, a = ref.a, i = ref.i, select = ref.select, option = ref.option, label = ref.label, form = ref.form, button = ref.button, thead = ref.thead, tfoot = ref.tfoot, th = ref.th, td = ref.td, tr = ref.tr, table = ref.table, tbody = ref.tbody, input = ref.input, li = ref.li, ul = ref.ul, br = ref.br;

  queryString = (function(a) {
    var b, ind;
    if (a === '') {
      return {};
    }
    b = {};
    ind = 0;
    while (ind < a.length) {
      p = a[ind].split('=', 2);
      if (p.length === 1) {
        b[p[0]] = '';
      } else {
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '));
      }
      ++ind;
    }
    return b;
  })(window.location.search.substr(1).split('&'));

  descriptionIntro = "This box displays the item that was used to ask about the currently hovered characteristic.";

  descriptionMap = {
    skill: "How much skill is required?",
    predict: "How predictable is the action?",
    novelty: "To what extent do you find new and fresh experiences during the activity?",
    creative: "To what extent are there opportunities to express creativity during the activity?",
    complex: "How complex is the action and the environment in which it takes place?",
    goal1: "How clear and straightforward are the short-term rules and goals?",
    feedback1: "How quickly do you know whether what you wanted to accomplish in the short term was successful?",
    goal2: "How clear and straightforward are the long-term rules and goals?",
    feedback2: "How quickly do you know whether what you wanted to accomplish in the long term was successful?",
    chatter: "Does your extraneous mental chatter temporarily shut down during the activity?",
    waiting: "How much time do you feel like is spent waiting for the next step in the activity?",
    body: "How much of your body is involved in the activity? Is it full-body or only part of your body?",
    control: "How much control do you feel like you can exert over your performance?",
    present: "During the activity, to what extent do you feel like you are in the present moment?",
    spont: "How spontaneous is your action?",
    stakes: "During the activity, how important does the activity feel?",
    evaluated: "To what extent do you care about how others judge your performance?",
    reward: "After engaging in the physical activity, to what extent do you feel great?",
    injury1: "What is the risk of minor physical injury (more than just muscle soreness)?",
    injury2: "What is the risk of serious physical injury?",
    flow: "Approximate flow score"
  };

  Skills = ["Novice", "Amateur", "Expert"];

  MAX_ABS_WEIGHT = 3;

  String.prototype.trunc = function( n, useWordBoundary ){
         if (this.length <= n) { return this; }
         var subString = this.substr(0, n-1);
         return (useWordBoundary 
            ? subString.substr(0, subString.lastIndexOf(' ')) 
            : subString) + "...";
      };;

  weightLine = function(props) {
    var items, j, ref1, results;
    items = (function() {
      results = [];
      for (var j = ref1 = -MAX_ABS_WEIGHT; ref1 <= MAX_ABS_WEIGHT ? j <= MAX_ABS_WEIGHT : j >= MAX_ABS_WEIGHT; ref1 <= MAX_ABS_WEIGHT ? j++ : j--){ results.push(j); }
      return results;
    }).apply(this).map(function(val) {
      return option({
        key: val,
        value: val
      }, val);
    });
    return tr({
      key: props.facet
    }, td({}, props.abbreviateFacet ? props.facet : descriptionMap[props.facet]), td({}, select({
      name: props.facet,
      value: props.weight,
      onChange: function(event) {
        return props.onClick(RCPA_FACETS.indexOf(props.facet), event.target.value);
      }
    }, items)));
  };

  advancedPanel = function(props) {
    var lis, sortDir, sortIndicatorC, sortIndicatorW, x;
    lis = ((function() {
      var j, len, ref1, results;
      ref1 = props.facetOrder;
      results = [];
      for (j = 0, len = ref1.length; j < len; j++) {
        x = ref1[j];
        results.push(RCPA_FACETS[x]);
      }
      return results;
    })()).map(function(text) {
      return weightLine({
        facet: text,
        abbreviateFacet: props.abbreviateFacet,
        onClick: props.onClick,
        weight: props.weight[RCPA_FACETS.indexOf(text)]
      });
    });
    sortIndicatorC = "";
    sortIndicatorW = "";
    sortDir = props.sortAsc ? 'ascending' : 'descending';
    if (props.sortedBy === 'characteristic') {
      sortIndicatorC = sortDir;
    }
    if (props.sortedBy === 'weight') {
      sortIndicatorW = sortDir;
    }
    return table({
      className: "ui very compact table sortable"
    }, thead({}, tr({}, th({
      className: "sorted " + sortIndicatorC,
      onClick: function() {
        var j, newOrder, ref1, results;
        if (sortIndicatorC === "descending") {
          props.setFacetOrder(null, null, (function() {
            results = [];
            for (var j = 0, ref1 = RCPA_FACETS.length - 1; 0 <= ref1 ? j <= ref1 : j >= ref1; 0 <= ref1 ? j++ : j--){ results.push(j); }
            return results;
          }).apply(this));
          return;
        }
        if (sortIndicatorC === "") {
          props.sortAsc = true;
        }
        if (sortIndicatorC === "ascending") {
          props.sortAsc = false;
        }
        newOrder = props.facetOrder.slice();
        newOrder.sort(function(a, b) {
          var ref2;
          if (!props.sortAsc) {
            ref2 = [b, a], a = ref2[0], b = ref2[1];
          }
          return RCPA_FACET_ALPHA[a] - RCPA_FACET_ALPHA[b];
        });
        return props.setFacetOrder("characteristic", props.sortAsc, newOrder);
      }
    }, "Characteristic"), th({
      className: "sorted " + sortIndicatorW,
      onClick: function() {
        var j, newOrder, ref1, results;
        if (sortIndicatorW === "descending") {
          props.setFacetOrder(null, null, (function() {
            results = [];
            for (var j = 0, ref1 = RCPA_FACETS.length - 1; 0 <= ref1 ? j <= ref1 : j >= ref1; 0 <= ref1 ? j++ : j--){ results.push(j); }
            return results;
          }).apply(this));
          return;
        }
        if (sortIndicatorW === "") {
          props.sortAsc = true;
        }
        if (sortIndicatorW === "ascending") {
          props.sortAsc = false;
        }
        newOrder = props.facetOrder.slice();
        newOrder.sort(function(a, b) {
          var c, cmp, d, ref2, ref3;
          ref2 = [a, b], c = ref2[0], d = ref2[1];
          if (!props.sortAsc) {
            ref3 = [b, a], c = ref3[0], d = ref3[1];
          }
          cmp = props.weight[c] - props.weight[d];
          if (cmp === 0) {
            cmp = a - b;
          }
          return cmp;
        });
        return props.setFacetOrder("weight", props.sortAsc, newOrder);
      }
    }, "Weight"))), tbody({}, lis), tfoot({}, tr({}, th({}, div({
      className: "ui toggle checkbox"
    }, input({
      className: "hidden",
      type: "checkbox",
      checked: props.abbreviateFacet
    }), label({
      onClick: function() {
        return props.setAbbreviateFacet(!props.abbreviateFacet);
      }
    }, "Abbreviate"))), th({}, button({
      className: "negative ui button",
      onClick: function() {
        return $("#reset-weights-modal").modal({
          onApprove: function() {
            return props.resetWeights();
          }
        }).modal("show");
      }
    }, "Reset")))));
  };

  countNonzero = function(vec) {
    var j, len, nonzero, w;
    nonzero = 0;
    for (j = 0, len = vec.length; j < len; j++) {
      w = vec[j];
      if (w !== 0) {
        nonzero += 1;
      }
    }
    return nonzero;
  };

  weightPanel = function(props) {
    var curWeight, panel, x;
    panel = props.advancedSort ? advancedPanel(props) : (curWeight = props.weight.findIndex(function(w) {
      return w !== 0;
    }), div({}, br(), select({
      value: RCPA_FACETS[curWeight],
      onChange: function(event) {
        var index;
        index = RCPA_FACETS.indexOf(event.target.value);
        return props.setSingleWeight(index);
      }
    }, ((function() {
      var j, len, ref1, results;
      ref1 = props.facetOrder;
      results = [];
      for (j = 0, len = ref1.length; j < len; j++) {
        x = ref1[j];
        results.push(RCPA_FACETS[x]);
      }
      return results;
    })()).map(function(text) {
      return option({
        value: text
      }, descriptionMap[text].trunc(80, 1));
    })), br(), br()));
    return div({
      className: "column"
    }, div({
      className: "ui message"
    }, div({
      className: "header"
    }, "Which characteristic" + (props.advancedSort ? 's' : '') + " do you value?"), panel, div({
      className: "ui toggle checkbox"
    }, input({
      className: "hidden",
      type: "checkbox",
      checked: props.advancedSort
    }), label({
      onClick: function() {
        var j, len, nonzero, ref1, w;
        nonzero = 0;
        ref1 = props.weight;
        for (j = 0, len = ref1.length; j < len; j++) {
          w = ref1[j];
          if (w !== 0) {
            nonzero += 1;
          }
        }
        if (props.advancedSort && nonzero > 1) {
          return $("#reset-weights-modal").modal({
            onApprove: function() {
              return props.setAdvancedSort(!props.advancedSort);
            }
          }).modal("show");
        } else {
          return props.setAdvancedSort(!props.advancedSort);
        }
      }
    }, "Show advanced controls"))));
  };

  dotprod = function(v1, v2) {
    var j, maxIndex, out, ref1, x;
    if (v1.length !== v2.length) {
      throw new Error("dotprod: " + v1.length + " != " + v2.length);
    }
    maxIndex = v1.length - 1;
    out = 0;
    for (x = j = 0, ref1 = maxIndex; 0 <= ref1 ? j <= ref1 : j >= ref1; x = 0 <= ref1 ? ++j : --j) {
      if (v1[x] !== "NA" && v2[x] !== "NA") {
        out += v1[x] * v2[x];
      }
    }
    return out;
  };

  prettyName = function(name) {
    var part;
    part = name.split(';');
    if (part.length === 1) {
      return name;
    }
    if (part.length === 2) {
      return part[0] + " (" + part[1] + ")";
    }
    throw new Error("How to prettyName " + name + "?");
  };

  resultPanel = function(props) {
    var j, k, lis, maxPA, order, ref1, results, score, x;
    maxPA = RCPA_PA.length - 1;
    score = new Array(RCPA_PA.length);
    for (x = j = 0, ref1 = maxPA; 0 <= ref1 ? j <= ref1 : j >= ref1; x = 0 <= ref1 ? ++j : --j) {
      score[x] = dotprod(props.weight, RCPA_DATA[x]);
    }
    order = (function() {
      results = [];
      for (var k = 0; 0 <= maxPA ? k <= maxPA : k >= maxPA; 0 <= maxPA ? k++ : k--){ results.push(k); }
      return results;
    }).apply(this);
    order.sort(function(a, b) {
      var cmp;
      cmp = score[a] - score[b];
      if (cmp === 0) {
        if (RCPA_PA[a] < RCPA_PA[b]) {
          cmp = -1;
        }
        if (RCPA_PA[a] > RCPA_PA[b]) {
          cmp = 1;
        }
      }
      return cmp;
    });
    lis = order.map(function(index) {
      var color, part, rawName;
      rawName = RCPA_PA[index];
      if (RCPA_PA_SAMPLESIZE[index] < 10) {
        color = "#999";
      } else {
        color = "#000";
      }
      part = rawName.split(';');
      return div({
        className: "item",
        key: index,
        style: {
          color: color
        }
      }, (prettyName(RCPA_PA[index])) + " ", a({
        href: "https://en.wikipedia.org/wiki/" + (encodeURI(part[0])),
        target: "_blank"
      }, "^"));
    });
    return div({
      className: "column"
    }, div({
      className: "ui list"
    }, lis));
  };

  Graph = (function(superClass) {
    extend(Graph, superClass);

    function Graph(props) {
      Graph.__super__.constructor.call(this, props);
      this.state = {
        network: null
      };
    }

    Graph.prototype.componentDidMount = function() {
      var data, elem, options;
      data = {
        nodes: RCPA_nodes,
        edges: RCPA_edges
      };
      options = {
        height: '700px',
        nodes: {
          shape: 'dot'
        },
        interaction: {
          navigationButtons: true,
          keyboard: {
            enabled: true,
            bindToWindow: false
          }
        }
      };
      elem = $('#graph');
      return this.state.network = new vis.Network(elem[0], data, options);
    };

    Graph.prototype.componentWillUnmount = function() {
      if (typeof network !== "undefined" && network !== null) {
        return network.destroy();
      }
    };

    Graph.prototype.render = function() {
      return div({
        className: "ui message"
      }, div({
        id: "graph"
      }), div({
        className: "ui info message"
      }, "Scroll or use the square bracket keys '[' and ']' to zoom in and out. Drag background or use arrow keys to recenter. Thickness of the line indicate how many respondents chose the pair. Green, brown, and dark red correspond to novice, amateur, and expert, respectively."));
    };

    return Graph;

  })(React.Component);

  Jumbotron = (function(superClass) {
    extend(Jumbotron, superClass);

    function Jumbotron(props) {
      this.setGraphLoaded = bind(this.setGraphLoaded, this);
      this.setCurrentSkill = bind(this.setCurrentSkill, this);
      this.setAdvancedSort = bind(this.setAdvancedSort, this);
      this.setAbbreviateFacet = bind(this.setAbbreviateFacet, this);
      this.setSingleWeight = bind(this.setSingleWeight, this);
      this.resetWeights = bind(this.resetWeights, this);
      this.handleChange = bind(this.handleChange, this);
      this.setFacetOrder = bind(this.setFacetOrder, this);
      var advancedSort, iw, j, ref1, results;
      Jumbotron.__super__.constructor.call(this, props);
      iw = RCPA_FACETS.map(function(facet) {
        var aval, val;
        val = Math.round(Number(queryString[facet]));
        aval = Math.abs(val);
        if (aval <= MAX_ABS_WEIGHT) {
          return val;
        } else {
          return 0;
        }
      });
      advancedSort = countNonzero(iw) > 1;
      if (!advancedSort && countNonzero(iw) === 0) {
        iw[RCPA_FACETS.length - 1] = 1.0;
      }
      this.state = {
        abbreviateFacet: false,
        advancedSort: advancedSort,
        weight: iw,
        skill: Skills[1],
        facetOrder: (function() {
          results = [];
          for (var j = 0, ref1 = RCPA_FACETS.length - 1; 0 <= ref1 ? j <= ref1 : j >= ref1; 0 <= ref1 ? j++ : j--){ results.push(j); }
          return results;
        }).apply(this),
        sortedBy: null,
        sortAsc: null,
        graphLoaded: false
      };
    }

    Jumbotron.prototype.maybeResetSort = function() {
      if (this.state.sortedBy !== "weight") {
        return;
      }
      return this.setState({
        sortedBy: null,
        sortAsc: null
      });
    };

    Jumbotron.prototype.setFacetOrder = function(col, asc, order) {
      return this.setState({
        sortedBy: col,
        sortAsc: asc,
        facetOrder: order
      });
    };

    Jumbotron.prototype.handleChange = function(index, value) {
      var foo;
      this.maybeResetSort();
      foo = this.state.weight.slice();
      foo[index] = Number(value);
      return this.setState({
        weight: foo
      });
    };

    Jumbotron.prototype.resetWeights = function() {
      var foo;
      this.maybeResetSort();
      foo = this.state.weight.slice();
      foo.fill(0);
      return this.setState({
        weight: foo
      });
    };

    Jumbotron.prototype.setSingleWeight = function(index) {
      var foo;
      this.maybeResetSort();
      foo = this.state.weight.slice();
      foo.fill(0);
      foo[index] = 1;
      return this.setState({
        weight: foo
      });
    };

    Jumbotron.prototype.setAbbreviateFacet = function(current) {
      return this.setState({
        abbreviateFacet: current
      });
    };

    Jumbotron.prototype.setAdvancedSort = function(current) {
      var foo;
      if (!current) {
        foo = this.state.weight.slice();
        if (countNonzero(foo) !== 1) {
          foo.fill(0);
          foo[RCPA_FACETS.length - 1] = 1;
        }
        console.log(foo);
        return this.setState({
          advancedSort: current,
          weight: foo
        });
      } else {
        return this.setState({
          advancedSort: current
        });
      }
    };

    Jumbotron.prototype.setCurrentSkill = function(value) {
      return this.setState({
        skill: value
      });
    };

    Jumbotron.prototype.setGraphLoaded = function() {
      return this.setState({
        graphLoaded: true
      });
    };

    Jumbotron.prototype.componentDidMount = function() {
      return $('#content').visibility({
        onUpdate: function(calc) {
          if (calc.width < 960) {
            return $('#table-of-contents').hide();
          } else {
            return $('#table-of-contents').show();
          }
        }
      });
    };

    Jumbotron.prototype.render = function() {
      var parent, qs1, responses, shareURL, weightQS, x;
      parent = this;
      qs1 = function(x) {
        return [RCPA_FACETS[x], parent.state.weight[x]].join('=');
      };
      weightQS = (function() {
        var j, ref1, results;
        results = [];
        for (x = j = 0, ref1 = RCPA_FACETS.length - 1; 0 <= ref1 ? j <= ref1 : j >= ref1; x = 0 <= ref1 ? ++j : --j) {
          if (this.state.weight[x] !== 0) {
            results.push(qs1(x));
          }
        }
        return results;
      }).call(this);
      shareURL = [window.location.href.split('?')[0], weightQS.join('&')].join('?');
      responses = RCPA_edges.map(function(node) {
        var val;
        val = node.value;
        if (val) {
          return val;
        } else {
          return 0;
        }
      });
      return div({}, div({
        className: "ui right rail screen-only",
        id: "table-of-contents",
        style: {
          position: "fixed",
          left: "80%",
          marginTop: "30px"
        }
      }, div({
        className: "ui segment"
      }, h4({
        className: "ui header"
      }, "Contents"), div({
        className: "ui vertical text menu"
      }, div({
        className: "content menu"
      }, a({
        className: "item",
        href: "#introduction"
      }, "Introduction"), a({
        className: "item",
        href: "#data-explorer"
      }, "Data Explorer"), a({
        className: "item",
        href: "#data-connectivity"
      }, "Data Connectivity"), a({
        className: "item",
        href: "#invitation"
      }, "Invitation to Participate"), a({
        className: "item",
        href: "#contact"
      }, "Questions?"))))), h1({
        className: "ui header center aligned"
      }, "Preliminary results"), h2({
        className: "ui header center aligned"
      }, "Relative characteristics of physical activities"), h3({
        className: "ui header center aligned"
      }, "updated " + RCPA_date), div({
        className: "ui text container"
      }, h3({
        className: "ui header",
        id: "introduction"
      }, "Introduction"), "You just completed a ", a({
        href: "http://tiny.cc/physical"
      }, "survey"), ". Not all of the data is in, but we wanted to show you what can be gleaned from preliminary data. We also include a status update on the data collection effort. You may prefer to start with a video introduction.", br(), br(), div({
        dangerouslySetInnerHTML: {
          __html: '<iframe width="560" height="315" src="https://www.youtube.com/embed/qANOOKesBkQ?rel=0" frameborder="0" allowfullscreen></iframe>'
        }
      }), h3({
        className: "ui header",
        id: "data-explorer"
      }, "Data Explorer"), "Below is a drop-down menu of the characteristics that you considered for your pair of physical activities. When you choose one of the characteristics, the order of the list of activities below will update. For example, if you choose 'How much of your body is involved...' then one of the first activities will be hatha yoga and one of last activities will be walking.", br(), br(), "Advanced controls: On the left you'll see a list of the characteristics that you considered for your pair of physical activities. Choose one of the characteristics that you value, or are curious about, and assign it a +1 or -1 weight. When you assign a weight, the order of the list of activities on the right side will update to reflect the preference that you have expressed, from low to high (or high to low for negative weights). You can play around with assigning more than one weight at a time and see how the order changes. Are there physical activities that you haven’t tried that might be worth considering?", br(), br(), "Currently, sample size is limited. Activities with fewer than 10 comparisons are shown in gray. Rankings may not match intuition very well. Simulations suggest that 50-100 comparisons are required for stable estimates.", br(), br(), div({
        className: this.state.advancedSort ? "ui stackable two column grid" : ""
      }, weightPanel({
        onClick: parent.handleChange,
        abbreviateFacet: this.state.abbreviateFacet,
        setAbbreviateFacet: parent.setAbbreviateFacet,
        advancedSort: this.state.advancedSort,
        setAdvancedSort: parent.setAdvancedSort,
        weight: this.state.weight,
        resetWeights: parent.resetWeights,
        setSingleWeight: parent.setSingleWeight,
        facetOrder: this.state.facetOrder,
        sortedBy: this.state.sortedBy,
        sortAsc: this.state.sortAsc,
        setFacetOrder: parent.setFacetOrder
      }), resultPanel({
        weight: this.state.weight,
        skill: this.state.skill,
        setSkill: parent.setCurrentSkill
      })), br(), div({
        className: "ui form"
      }, div({
        className: "field"
      }, label, "Share your weights (copy & paste the link)", input({
        type: "text",
        readOnly: true,
        value: shareURL,
        onMouseEnter: function(ev) {
          return ev.target.select();
        },
        onClick: function(ev) {
          return ev.target.select();
        },
        onFocus: function(ev) {
          return ev.target.select();
        }
      }))), h3({
        className: "ui header",
        id: "data-connectivity"
      }, "Data Connectivity"), "The graph below shows which pairs of activities were compared by participants. Although " + RCPA_nodes.length + " activities have been mentioned, we can only analyze those that are not home to isolated islands. World Sports Encyclopedia (2003) estimated that there are about eight thousand sports. Of course, physical activities are a superset of that. Even if we restrict our interest to, say, the 400 most popular physical activities, there are still about eighty thousand possible pairs. So far, data is available for " + RCPA_edges.length + " pairs from " + (responses.reduce(function(x, y) {
        return x + y;
      })) + " responses. Our statistical model can fill in the gaps, but the more data the better.", !this.state.graphLoaded ? div({
        className: "ui info message"
      }, "Enough data are collected that loading the graph takes a long time. To load the graph, click the button below and be prepared to wait.", br(), br(), button({
        className: "ui button",
        onClick: function() {
          return parent.setGraphLoaded();
        }
      }, "Load")) : React.createElement(Graph), h3({
        className: "ui header",
        id: "invitation"
      }, "Invitation to Participate"), "If you'd like to contribute more data, you can take this survey again with a different pair of physical activities. Or you may want to invite others to participate. The link to the survey is ", a({
        href: "http://tiny.cc/physical"
      }, "http://tiny.cc/physical"), h3({
        className: "ui header",
        id: "contact"
      }, "Questions?"), "Joshua Pritikin, Ph.D. <", a({
        href: "mailto:jpritikin@pobox.com"
      }, "jpritikin@pobox.com"), ">", br(), "Virginia Institute for Psychiatric and Behavioral Genetics", br(), "Virginia Commonwealth University", br(), "800 E Leigh St, Biotech One", br(), "Suite 1-133", br(), "Richmond, VA 23219", br(), br(), br(), br(), br(), br(), br(), br(), br(), br(), br(), br(), br(), br()));
    };

    return Jumbotron;

  })(React.Component);

  ReactDOM.render(React.createElement(Jumbotron), document.getElementById('content'));

}).call(this);
