# DropKick for Wee 2.x

Create styled dropdown menus from selects

## Setup

Drop the module in your Wee Modules directory. By default the module ships with autoload set true. If you only wish to load this module on certain pages, set autoload to false in the `module.json` configuration file and load the javascript and CSS output from this module conditionally on the pages you wish to use it on.

## Usage

### data-ref="dropKick" selector

By default, DropKick will only effect selects with the data-ref attribute set to dropKick. If you wish for all selects to be affected throughout your site, set the following in the module custom script file:

	Wee.$set('dropKickConf', {
		allSelects: true
	});

## Custom menu max-height per select

Selects can have a custom menu max-height set per select. Use a data attribute as follows:

	<select data-max-height="220px">

The value of the data attribute must be a valid CSS unit such as `px` or `rem`. Note that you can set the overall default max height via the custom Less variables file.

## Custom Variables, Style, or JavaScript

To override any of the varialbes in the core module variables, simply duplicate the variable to the custom variables file and change the value there. You can also apply custom styling in the custom screen.less file, or run custom javascript based on the select change events that are fired in the custom script.js file.