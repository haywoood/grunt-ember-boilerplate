![rug](http://www.internetrugs.com/blog/wp-content/uploads/2008/06/india-zamin-oriental-rug.jpg)

Grunt Ember Boilerplate
=======================

This is a [Grunt.js](http://gruntjs.com/) `0.4x` starter project that
gives you everything you need to start developing
[Ember.js](http://emberjs.com) applications.

You get:  
- Handlebars precompilation
- Base folder setup
- Commonjs modules
- Coffeescript
- Stylus for CSS
- A precompilation directive for production deploy

Why?
====
Literally so many projects that do this kind of stuff.  
- Yeoman, uses Grunt.js, awesome! Lacks coffeescript and commonjs
modules
- Brunch.io does not use Grunt.js (Grunt.js is a really great task
runner with a very vibrant community / contrib library)
- Ember-tools, I love this project and use it within grunt on other
projects... but it doesn't have coffeescript and it's not as flexible as
a grunt project.

This project is just boilerplate Grunt.js, modify the `Gruntfile.coffee` to
do whatever you want, you have the entire Grunt.js ecosystem!! I've
actually used this project in replacement of the Rails asset pipeline,
so you can use the output files within whatever project you have
currently... throw away the `index.html` file, modify `Gruntfile.coffee`
to output the files wherever you need.

Instructions
============

1. Install the Grunt CLI globally  
`npm install -g grunt-cli`

2. Clone the repo with your own directory name and remove prior `.git`
folder  
`git clone https://github.com/lsdafjklsd/grunt-ember-boilerplate.git
your-application-name`  
`cd your-application-name && rm -rf .git`

3. Install project dependencies  
`npm install`

Now to develop your application, run the `grunt watch` command. This
will run the default action (which does everything) anytime a file in
`libs/` changes. 

When you want to deploy, run the `grunt precompile` command to generate
a production ready version of the `js/application.js` file.

Develop in the `libs` directory, your generated files end up in the the
`js` and `css` folders in the project root.

For an idea on how to incorporate Ember Data, check out my on-going
Forum project [here](https://github.com/lsdafjklsd/vmware-frontend/tree/master/forum/js)

If you are new to Ember, and are not sure how to set up a project, check
out Ryan Florence's
[Ember-tools](https://github.com/rpflorence/ember-tools) That project
provides rails-like-scaffolding, and this project's file structure is based
on that.

Todos
=====

1. Add testing with `grunt-contrib-jasmine`
2. Make this an actually grunt project template, versus cloning this
   repo and deleting the existing `.git` directory.
3. Add ember data
