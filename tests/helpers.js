QUnit.config.testTimeout = 4000;

/*global $ App*/
Ember.onLoad('application', function(application) {
  //application.deferReadiness();
});

Ember.onLoad('Ember.Application', function(Application) {
  Application.initializer({
    name: 'tests',

    initialize: function(container, application) {
      Ember.testing = true;
    }
  });
});

$(function() {
  $('#qunit, #qunit-fixture').show();
});

Ember._viewsInTest = [];

function urlEquals(expected) {
  var actual  = App.__container__.lookup('router:main').get('location').getURL();
  QUnit.push(actual === expected, actual, expected, "The URL should be " + expected + ", but was " + actual);
}

function click(selector, view) {
  Ember.run(function() {
    if (view) {
      view.$(selector).click();
    } else {
      Ember.$(selector).click();
    }
  });
}

function _shouldHaveElement(selector, content, message, root) {
  var generatedMessage;
  if (typeof content === 'string') {
    generatedMessage = selector + " containing '" + content + "'";
    selector += ':contains("' + content + '")';
  } else if (typeof content === 'object') {
    generatedMessage = selector + " with attribute ";
    var attrs = [];
    for (var prop in content) {
      selector += '[' + prop + '="' + content[prop] + '"]';
      attrs.push(prop + " = " + content[prop]);
    }

    generatedMessage += attrs.join(", ");
  } else {
    generatedMessage = selector;
  }

  generatedMessage = "Should have element " + generatedMessage;

  var element;
  if (root) {
    element = Ember.$(selector, root);
  } else {
    element = Ember.$(selector);
  }

  return [element, message || generatedMessage];
}

function shouldHaveElement(selector, content, message) {
  var ret = _shouldHaveElement(selector, content, message);

  QUnit.push(ret[0].length === 1, null, null, ret[1]);
  removeExpectedFromResult();
}

function viewShouldHaveElement(view, selector, content, message) {
  var element = view.get('element');
  var ret = _shouldHaveElement(selector, content, message, element);

  QUnit.push(ret[0].length === 1, null, null, ret[1]);
  removeExpectedFromResult();
}

function shouldHaveElements(selector, length, message) {
  var elements = Ember.$(selector);

  QUnit.push(elements.length === length, elements.length, length, message || "The page should have " + length + " '" + selector + "' elements");
}

function viewShouldHaveElements(view, selector, length, message) {
  var elements = Ember.$(selector, view.get('element'));

  QUnit.push(elements.length === length, elements.length, length, message || "The view " + view + " should have " + length + " '" + selector + "' elements");
}

function navigateTo(url, callback) {
  stop();

  var router = App.__container__.lookup('router:main');
  function observer() {
    start();

    Ember.run.next(function() {
      callback();
    });

    Ember.removeObserver(router, 'url', observer);
  }

  Ember.addObserver(router, 'url', observer);

  location.hash = url;
}

function invokeHelper(helperName, parameter) {
  var helper = Ember.Handlebars.helpers[helperName];

  Ember.assert("The " + helperName + " helper was not found", helper);

  return helper._rawFunction(parameter);
}

function createController(controllerName) {
  var container = App.buildContainer(App);
  return container.lookup('controller:' + controllerName);
}

function shouldBeView(selector) {
  var id = $(selector).attr('id');
  QUnit.push(Ember.View.views[id] instanceof Ember.View, null, null, "the element " + selector + " in DOM is backed by an Ember.View");
  removeExpectedFromResult();
}

function shouldHaveTemplate(templateName) {
  QUnit.push(Ember.TEMPLATES[templateName], null, null, "The template " + templateName + " should exist");
  removeExpectedFromResult();
}

function testView(viewClass, message, callback) {
  test(message, function() {
    var view;
    view = viewClass.create();
    Ember._viewsInTest.push(view);
    Ember.run(function() {
      view.appendTo('#qunit-fixture');
    });
    callback(view);
  });
}

function propertyShouldBecome(object, property, expectedValue) {
  stop();

  var actualValue;

  function observer() {
    var correctValue, message;

    actualValue = object.get(property);

    if (typeof expectedValue === 'function') {
      if (expectedValue(actualValue)) {
        correctValue = true;
        message = "The " + property + " property on " + object + " fulfills the condition";
      }
    } else if (expectedValue === actualValue) {
      correctValue = true;
      message = "The " + property + " property on " + object + " became " + expectedValue;
    }

    if (correctValue) {
      clearTimeout(timeout);
      start();
      Ember.removeObserver(object, property, observer);
      QUnit.push(true, null, null, message);
      removeExpectedFromResult();
    }
  }

  var timeout = setTimeout(function() {
    start();
    if (typeof expectedValue === 'function') {
      QUnit.push(false, null, null, "The " + property + " property of " + object + " never fulfilled the condition");
      removeExpectedFromResult();
    } else {
      QUnit.push(actualValue === expectedValue, actualValue, expectedValue, "The " + property + " property of " + object + " never became " + expectedValue);
    }
  }, 3800);

  Ember.addObserver(object, property, observer);
}

function waitFor(object, property, callback) {
  stop();

  function observer() {
    if (object.get(property)) {
      start();
      clearTimeout(timeout);
      Ember.removeObserver(object, property, observer);
      Ember.run.next(callback);
    }
  }

  Ember.addObserver(object, property, observer);

  var timeout = setTimeout(function() {
    start();
    QUnit.push(false, null, null, "Timed out waiting for " + property + " of " + object + " to become truthy");
    removeExpectedFromResult();
  }, 3800);
}

function controllerFor(controller) {
  return App.__container__.lookup('controller:' + controller);
}

function removeExpectedFromResult() {
  // I cried the tears of my liiiiife
  var assertions = QUnit.config.current.assertions,
      lastAssertion = assertions[assertions.length - 1];

  lastAssertion.message = lastAssertion.message.replace(/<tr class='test-expected'>.*?<\/tr>/, '');
}
