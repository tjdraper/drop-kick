Wee.fn.make('dropKick', {
	_construct: function() {
		if (! Wee.$get('dropKickConf')) {
			Wee.$set('dropKickConf', {});
		}

		var conf = Wee.$extend({
			allSelects: false
		}, Wee.$get('dropKickConf'));

		Wee.$set('dropKickConf', conf);

		this.$private('init');
	},
	bindNew: function(el) {
		this.$private('init', el);
	}
}, {
	init: function(sel) {
		var scope = this,
			allSelects = Wee.$get('dropKickConf').allSelects === true;

		sel = sel || (allSelects ? 'select' : 'ref:dropKick');

		$(sel).each(function() {
			scope.selectSetup($(this));
		});
	},
	selectSetup: function($select) {
		var scope = this;

		if (! $select.attr('multiple')) {
			var $options = $select.find('option'),
				optionData = {
					current: {},
					disabled: $select.attr('disabled'),
					items: {},
					maxHeight: $select.data('max-height'),
					borderless: $select.data('borderless') === 'true'
				};

			$options.each(function(el, i) {
				var $option = $(this);

				if (this.selected) {
					optionData.current = $option.text();
				}

				if ($option.data('exclude') != 'true') {
					optionData.items[i] = {};
					optionData.items[i].value = $option.val();
					optionData.items[i].text = $option.text();
				}
			});

			$select.hide();

			scope.selectBinding(
				$select,
				$(Wee.$parseHTML(scope.dropKickTemplate(optionData)))
			);
		}
	},
	selectBinding: function($select, $dropKick) {
		$select.after($dropKick);

		Wee.$setRef($dropKick);

		var scope = this,
			$current = $dropKick.find('ref:dropKickCurrent');

		$current.on('click', function() {
			if (! $current.hasClass('--is-disabled')) {
				scope.dropKickMenuToggle($current);
			}
		});

		$dropKick.find('ref:dropKickItem').on('click', function() {
			var $thisItem = $(this);

			$select.val($thisItem.data('value')).trigger('change');
			$current.find('ref:dropKickCurrentText').text($thisItem.text());

			scope.dropKickMenuToggle($current);
		});
	},
	dropKickMenuToggle: function($current) {
		var scope = this,
			$menu = $current.parent('ref:dropKickRoot').find('ref:dropKickMenu');

		if ($current.hasClass('--is-open')) {
			$current.removeClass('--is-open');
			$menu.removeClass('--is-open');

			$(Wee._body).off('click');
		} else {
			$current.addClass('--is-open');
			$menu.addClass('--is-open');

			setTimeout(function() {
				$(Wee._body).on('click', function() {
					scope.dropKickMenuToggle($current);
				});
			});
		}
	},
	dropKickTemplate: function(data) {
		var template = '<div class="drop-kick" data-ref="dropKickRoot">' +
				'<div class="drop-kick__current{{#disabled|notEmpty}} --is-disabled{{/disabled}}{{#borderless|notEmpty}} --borderless{{/borderless}}" data-ref="dropKickCurrent">' +
					'<span class="drop-kick__current-text" data-ref="dropKickCurrentText">{{current||Select an Item}}</span>' +
				'</div>' +
				'<div class="drop-kick__menu-wrap">' +
					'<ul class="drop-kick__menu{{#borderless|notEmpty}} --borderless{{/borderless}}" data-ref="dropKickMenu"{{#maxHeight|notEmpty}} style="max-height:{{maxHeight}};"{{/maxHeight}}>' +
						'{{#items}}' +
							'<li class="drop-kick__item" data-ref="dropKickItem" data-value="{{value}}">' +
								'{{text}}' +
							'</li>' +
						'{{/items}}' +
					'</ul>' +
				'</div>' +
			'</div>';

		return Wee.view.render(template, data);
	}
});