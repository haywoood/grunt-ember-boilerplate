this["JST"] = this["JST"] || {};

this["JST"]["participant.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<div style=\"margin-top: 50px;margin-left: 50px;\">\n  <strong>W E L C O M E</strong>\n  <br />\n  <br />\n  <br />\n  <em>participant: ";
  stack1 = depth0.participant;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack2 = {};
  foundHelper = helpers.lowercase;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,data:data}) : helperMissing.call(depth0, "lowercase", stack1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</em>\n</div>\n";
  return buffer;});