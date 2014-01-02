/*jslint browser: true */
/*global jQuery */

(function ($) {
    'use strict';
    var cache = {},
        jQueryInit = $.fn.init,
        selectFromDOM = function (selector, context, rootjQuery) {
            context = context || window.document;
        
            var result = new jQueryInit(selector, context, rootjQuery);
        
            return result;
        },
        jQueryInitOverride = function (selector, context, rootjQuery) {
            
            var result;
            
            if (selector !== undefined && typeof (selector) === 'string') {
                if (!cache.hasOwnProperty(selector)) {
                    result = selectFromDOM(selector, context, rootjQuery);
                    if (result.length) {
                        cache[selector] = result;
                    }
    
                } else if (cache.hasOwnProperty(selector)) {
                    result = cache[selector];
                }
    
            } else {
                result = selectFromDOM(selector, context, rootjQuery);
            }
            
            return result;

        };
    
    
    $.cashew = {
        refresh: function (selector, context) {
            $.fn.init = jQueryInit;
            
            var result = selectFromDOM(selector, context);
            cache[selector] = result;
            
            $.fn.init = jQueryInitOverride;
            
            return result;
        },
        clear : function (selector) {
            delete cache[selector];
        }
        
    };
    
    $.fn.init = jQueryInitOverride;
    
}(jQuery));
