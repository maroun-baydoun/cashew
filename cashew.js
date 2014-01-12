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
            $.cashew.pause();
            
            var result = selectFromDOM(selector, context);
            cache[selector] = result;
            
            $.cashew.resume();
            
            return result;
        },
        clear : function (selector) {
            if (selector) {
                delete cache[selector];
            } else {
                cache = {};
            }
        },
        pause : function () {
            $.fn.init = jQueryInit;
        },
        resume: function () {
            $.fn.init = jQueryInitOverride;
        }
        
    };
    
    $.fn.refresh = function () {
        var selector = this.selector,
            context  = this.context;
        
        return $.cashew.refresh(selector, context);
            
    };
    
    $.cashew.resume();
    
}(jQuery));
