/*
 * jQuery FlickEdit UI Widget 0.1
 * Copyright (c) 2013 thanix (Thanikachalam Ananthakrishnan)
 *
 * http://thanix.info/jquery/jquery-ui-flick-edit/
 *
 * Depends:
 *   - jQuery 1.4.2+
 *   - jQuery UI 1.8 widget factory
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */

(function ($, undefined) {

    $.widget("tx.flickedit", {

        fHandle: null,
        rHandle: null,
        _isOpen: false,

        // default options
        options: {
            classes: '',
            handle: '',       //selector for the handle
            items: '',        //selector for items to be removed
            handleMarkup: '<p class="edit f-handle"><a href="javascript:void(0);">[EDIT]</a></p>',
            itemMarkup: '<span class="remove">&ndash;</span>',
            callback: null
        },

        _create: function() {
            console.log('_create called!');
            var self = this;

            self._isOpen = false;

            var el = this.element;
            var o = this.options;

            console.log('ele:', this.element.get(0).id);
            console.log('ele2:', this.element);
            itemSelector = '#' + this.element.get(0).id + ' li';
            o.items = $(itemSelector);
            //insert flick edit specific markup
            el.prepend(o.handleMarkup);

            console.log('o.items', o.items);
            o.items.each(function(i, v) {
                var $this = $(this);
                console.log('this item:', $this);
                $this.prepend(o.itemMarkup);
            });

            this.fHandle = $('#' + this.element.get(0).id + ' .f-handle');
            this.rHandle = $(itemSelector + ' .remove');

            this._bindEvents();

        },

        _init: function() {
            console.log('_init called!');
            var self = this;

            if (self._isOpen == false) {
                self._show();
            }
        },

        _bindEvents: function() {
            console.log('_bindEvents called!');
            var self = this;

            function toggleHandler() {
                self[ self._isOpen ? 'close' : 'open' ]();
                return false;
            }

            self.fHandle.bind({
                click: toggleHandler
            });

            self.rHandle.bind({
                click: $.proxy(function(e){
                            this._callback(e.target);
                        }, this)
            });
        },

        _hide: function()
        {
            var self = this;
            console.log('_hide called!');
            self.rHandleStyle = this.rHandle.css('display');
            self.rHandle.css('display', 'none');
            self._isOpen = false;
        },

        _show: function()
        {
            var self = this;
            console.log('_show called!');
            if (self.rHandleStyle) {
                self.rHandle.css('display', self.rHandleStyle);
            }
            this._isOpen = true;
        },

        close: function() {
            console.log('close called!');
            var self = this;
            self._hide();
        },

        open: function() {
            console.log('open called!');
            var self = this;
            self._show();
        },

        isOpen: function() {
            console.log('isOpen called');
            return this._isOpen;
        },

        _callback: function(target) {
            console.log('_callback called!');
            var o = this.options;

            console.log('options:', o);

            if (!o.callback) {
                return;
            }

            (o.callback)(target);
        },

        _destroy: function() {
            console.log('_destroy called!');
        }


    });

})(jQuery);



