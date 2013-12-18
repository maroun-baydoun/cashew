/*jslint browser: true */
/*global jQuery */

(function ($) {
    'use strict';
    var cache = {}, JQueryInit = jQuery.fn.init;

    jQuery.fn.init = function (selector, context, rootjQuery) {

        context = context || window.document;
        
        var result;
        if (selector !== undefined && typeof (selector) === 'string') {

            if (!cache.hasOwnProperty(selector)) {
                result = new JQueryInit(selector, context, rootjQuery);
                cache[selector] = result;

            } else if (cache.hasOwnProperty(selector)) {
                result = cache[selector];
            }

        } else {
            result = new JQueryInit(selector, context, rootjQuery);
        }
        
        return result;

    };
    
    $.fn.refresh = function () {
        var selector = this.selector,
            context  = this.context,
            result = new JQueryInit(selector, context);
        
        cache[selector] = result;
        
        return result;
    };
    
}(jQuery));
