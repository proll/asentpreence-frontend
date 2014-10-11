this["aspe"] = this["aspe"] || {};
this["aspe"]["Templates"] = this["aspe"]["Templates"] || {};
this["aspe"]["Templates"]["ptemplates"] = this["aspe"]["Templates"]["ptemplates"] || {};

this["aspe"]["Templates"]["ptemplates"]["pages/403-page"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<p class=\"error-page__description\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['_'] || depth0['_']),stack1 ? stack1.call(depth0, "Sorry, can’t let you get any further than this.<br/>Please <a href=\"auth:show\" rel=\"nofollow\" type=\"event\" class=\"lnk\">log in</a> or <a  href=\"auth:show\" rel=\"nofollow\" type=\"event\" class=\"lnk\">sign up</a> to see this page.", "p403", options) : helperMissing.call(depth0, "_", "Sorry, can’t let you get any further than this.<br/>Please <a href=\"auth:show\" rel=\"nofollow\" type=\"event\" class=\"lnk\">log in</a> or <a  href=\"auth:show\" rel=\"nofollow\" type=\"event\" class=\"lnk\">sign up</a> to see this page.", "p403", options)))
    + "</p>";
  return buffer;
  });

this["aspe"]["Templates"]["ptemplates"]["pages/404-page"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<ul class=\"error-page__list\">\n	<li class=\"error-page__list-item\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['_'] || depth0['_']),stack1 ? stack1.call(depth0, "Make sure that URL entered correctly;", "p404", options) : helperMissing.call(depth0, "_", "Make sure that URL entered correctly;", "p404", options)))
    + "</li>\n	<li class=\"error-page__list-item\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['_'] || depth0['_']),stack1 ? stack1.call(depth0, "or drop us a line to <a href=\"mailto:hi@aspe.com\" class=\"lnk\">hi@aspe.com.</a>", "p404", options) : helperMissing.call(depth0, "_", "or drop us a line to <a href=\"mailto:hi@aspe.com\" class=\"lnk\">hi@aspe.com.</a>", "p404", options)))
    + "</li>\n</ul>";
  return buffer;
  });

this["aspe"]["Templates"]["ptemplates"]["pages/landing-page"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<section class=\"landing-section landing-section1\">\n	<div class=\"landing-section1__bg\">\n		<video autoplay loop muted poster=\"/images_static/video_bg.jpg\" class=\"landing-section1__video\">\n			<source src=\"/images/video/bg.mp4\" type=\"video/mp4\">\n			<source src=\"/images/video/bg.ogv\" type=\"video/ogg\">\n			<source src=\"/images/video/bg.webm\" type=\"video/webm\">\n		</video>\n	</div>\n	<div class=\"landing-section1__cross\"></div>\n	<div class=\"landing__container\">\n		<span class=\"landing__sound-control\"><i class=\"il\"></i></span>\n		<div class=\"landing-section1__head\">\n			<a class=\"landing__to-backoffice\" href=\"/backoffice/\" target=\"_self\">Личный кабинет</a>\n			<a href=\"/\" class=\"landing-section1-logo\"></a>\n		</div>\n		<div class=\"landing__container-in\">\n			<h1 class=\"landing__h1\">Простой способ<br/>работать с деньгами</h1>\n			<p class=\"landing-section1-p\">aspe готов к работе!<br/>Первым клиентам комплект оборудования будет установлен бесплатно.<br/>Оставьте свой email и мы свяжемся с Вами</p>\n			<form action=\".\" class=\"landing-section__form\">\n				<input type=\"email\" class=\"landing__input\" placeholder=\"me@gmail.com\" name=\"email\">\n				<input type=\"submit\" class=\"input_hidden\">\n				<a href=\".\" class=\"landing__form-a\">Отправить</a>\n			</form>\n			<p class=\"landing__send-ok\">Спасибо за Ваш интерес! Мы обязательно свяжемся с Вами как только будут новости. Или раньше. </p>\n		</div>\n	</div>\n</section>\n<section class=\"landing-section landing-section2\">\n	<div class=\"landing__set\"></div>\n	<div class=\"landing__container\">\n		<div class=\"landing__container-in\">\n			<h2 class=\"landing-s-h\">Торговое оборудование нового поколения</h2>\n			<ul class=\"landing__list row\">\n				<li class=\"landing__list-itm span3\">\n					<i class=\"il il-l1\"></i>\n					<p class=\"landing__list-itm-p\">Прием Visa, MasterCard и наличных платежей</p>\n				</li>\n				<li class=\"landing__list-itm span3\">\n					<i class=\"il il-l2\"></i>\n					<p class=\"landing__list-itm-p\">Онлайн-отчеты по продажам с десятками настраиваемых параметров</p>\n				</li>\n				<li class=\"landing__list-itm span3\">\n					<i class=\"il il-l3\"></i>\n					<p class=\"landing__list-itm-p\">Установка кассового оборудования, интеграция с Вашей бухгалтерией, техподдержка 24/7</p>\n				</li>\n				<li class=\"landing__list-itm span3\">\n					<i class=\"il il-l4\"></i>\n					<p class=\"landing__list-itm-p\">Инструменты для создания программ лояльности </p>\n				</li>\n			</ul>\n		</div>\n	</div>\n</section>\n<section class=\"landing-section landing-section3\">\n	<div class=\"landing__container\">\n		<div class=\"landing__container-in\">\n			<h2 class=\"landing-s-h\">Как это работает?</h2>\n			<div class=\"landing__meaining\">\n				<i class=\"il il-p-o landing__meaining-video-open\"></i>\n			</div>\n		</div>\n	</div>\n</section>\n<section class=\"landing-section landing-section4\">\n	<div class=\"landing__container\">\n		<div class=\"landing__container-in\">\n			<ul class=\"landing__list row\">\n				<li class=\"landing__list-itm span3\">\n					<i class=\"il il-l5\"></i>\n					<p class=\"landing__list-itm-p\">Сертифицированное и отвечающее всем требованиям оборудование</p>\n				</li>\n				<li class=\"landing__list-itm span3\">\n					<i class=\"il il-l6\"></i>\n					<p class=\"landing__list-itm-p\">Интеграция в уже работающий бизнес или установка с нуля</p>\n				</li>\n				<li class=\"landing__list-itm span3\">\n					<i class=\"il il-l7\"></i>\n					<p class=\"landing__list-itm-p\">Подключение за 1 день, регистрация оборудования в Налоговой инспекции</p>\n				</li>\n				<li class=\"landing__list-itm span3\">\n					<i class=\"il il-l8\"></i>\n					<p class=\"landing__list-itm-p\">Мобильное приложение для постоянного мониторинга и управления бизнесом</p>\n				</li>\n			</ul>\n		</div>\n	</div>\n</section>\n<section class=\"landing-section landing-section5\">\n	<div class=\"landing__container\">\n		<div class=\"landing__container-in\">\n			<span class=\"landing-section5__form-desc\">Оставьте свой email<br/>и мы свяжемся с Вами</span>\n			<form action=\".\" class=\"landing-section__form\">\n				<input type=\"email\" class=\"landing__input\" placeholder=\"me@gmail.com\" name=\"email\">\n				<input type=\"submit\" class=\"input_hidden\">\n				<a href=\".\" class=\"landing__form-a\">Отправить</a>\n			</form>\n			<p class=\"landing__send-ok\">Спасибо за Ваш интерес! Мы обязательно свяжемся с Вами как только будут новости. Или раньше. </p>\n		</div>\n	</div>\n</section>";
  });

this["aspe"]["Templates"]["ptemplates"]["popups/confirm"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<p class=\"confirm__p\">";
  if (stack1 = helpers.content) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.content; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\n<ul class=\"confirm__line\">\n	<li class=\"confirm__ok\">";
  if (stack1 = helpers.ok_title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ok_title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</li>\n	<li class=\"confirm__close\">";
  if (stack1 = helpers.close_title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.close_title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</li>\n</ul>\n<p class=\"confirm__p_success\">";
  if (stack1 = helpers.success_title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.success_title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\n<p class=\"confirm__p_error\">";
  if (stack1 = helpers.error_title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.error_title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>";
  return buffer;
  });

this["aspe"]["Templates"]["ptemplates"]["popups/landing-video-popup"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<iframe width=\"100%\" height=\"100%\" src=\"";
  if (stack1 = helpers.src) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.src; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"  class=\"landing-video-popup__iframe\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\n<!-- <a href=\"close\" class=\"landing-video-popup__close\"><i class=\"il il-x\"></i></a> -->";
  return buffer;
  });

this["aspe"]["Templates"]["ptemplates"]["popups/popup"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<table class=\"popup__table ";
  if (stack1 = helpers.klass) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.klass; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" tabindex=\"-1\">\n	<tr>\n		<td class=\"popup__td\">\n			<div class=\"popup__close\">\n				<div class=\"popup__close-col\">\n					<span class=\"close\">&times;</span>\n				</div>\n			</div>\n			<div class=\"popup__previous\">\n				<div class=\"popup__previous-col\">\n					<i class=\"prev\"></i>\n				</div>\n			</div>\n			<div class=\"popup__inner\">\n				<div class=\"popup__content\">\n					";
  if (stack1 = helpers.content) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.content; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</div>\n			</div>\n		</td>\n	</tr>\n</table>";
  return buffer;
  });

this["aspe"]["Templates"]["ptemplates"]["popups/warning"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<h1 class=\"warning__h\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['_'] || depth0['_']),stack1 ? stack1.call(depth0, "Warning!", "warning", options) : helperMissing.call(depth0, "_", "Warning!", "warning", options)))
    + "</h1>\n<p class=\"warning__p\">";
  if (stack2 = helpers.content) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.content; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</p>\n<span class=\"warning__close\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['_'] || depth0['_']),stack1 ? stack1.call(depth0, "Ok", "warning", options) : helperMissing.call(depth0, "_", "Ok", "warning", options)))
    + "</span>";
  return buffer;
  });