this["tpl"] = this["tpl"] || {};

Handlebars.registerPartial("_footer", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<br />\n<br />\n<br />\n<br />\n<br />\n<span style=\"font-size: 10px;\">\n  &copy; 2013\n</span>\n";}));

this["tpl"]["participant"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials; data = data || {};
  var buffer = "", stack1, stack2, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n    <em>";
  stack1 = depth0.name;
  stack2 = {};
  foundHelper = helpers.lowercase;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,data:data}) : helperMissing.call(depth0, "lowercase", stack1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</em> <br />\n  ";
  return buffer;}

  buffer += "<div style=\"margin-top: 50px;margin-left: 50px;\">\n\n  <strong>P A R T I C I P A N T S .</strong>\n\n  <br />\n  <br />\n  <br />\n\n  ";
  stack1 = depth0.participants;
  stack2 = {};
  stack1 = helpers.each.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials._footer, '_footer', stack1, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</div>\n";
  return buffer;});