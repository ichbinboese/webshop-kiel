// Import necessary dependencies
import Plugin from 'src/plugin-system/plugin.class';
import PluginManager from 'src/plugin-system/plugin.manager';

// Import all necessary storefront plugins
import CartAddProductPlugin from 'src/plugin/header/cart-add-product.plugin';
import OffCanvasCartPlugin from 'src/plugin/offcanvas-cart/offcanvas-cart.plugin';
import AddToCartPlugin from 'src/plugin/add-to-cart/add-to-cart.plugin';
import CookiePermissionPlugin from 'src/plugin/cookie/cookie-permission.plugin';
import ScrollUpPlugin from 'src/plugin/scroll-up/scroll-up.plugin';
import CollapseFooterColumnsPlugin from 'src/plugin/collapse/collapse-footer-columns.plugin';
import FlyoutMenuPlugin from 'src/plugin/main-menu/flyout-menu.plugin';
import OffCanvasMenuPlugin from 'src/plugin/offcanvas-menu/offcanvas-menu.plugin';
import FormAutoSubmitPlugin from 'src/plugin/forms/form-auto-submit.plugin';
import FormAjaxSubmitPlugin from 'src/plugin/forms/form-ajax-submit.plugin';
import FormValidationPlugin from 'src/plugin/forms/form-validation.plugin';
import FormFieldTogglePlugin from 'src/plugin/forms/form-field-toggle.plugin';
import ListingPlugin from 'src/plugin/listing/listing.plugin';
import OffCanvasFilterPlugin from 'src/plugin/offcanvas-filter/offcanvas-filter.plugin';
import RatingSystemPlugin from 'src/plugin/rating-system/rating-system.plugin';
import MagnifierPlugin from 'src/plugin/magnifier/magnifier.plugin';
import ImageZoomPlugin from 'src/plugin/image-zoom/image-zoom.plugin';
import VariantSwitchPlugin from 'src/plugin/variant-switch/variant-switch.plugin';
import CmsSliderPlugin from 'src/plugin/cms-slider/cms-slider.plugin';
import CmsImageZoomModalPlugin from 'src/plugin/cms-image-zoom-modal/cms-image-zoom-modal.plugin';
import GallerySliderPlugin from 'src/plugin/gallery-slider/gallery-slider.plugin';

// Register all Shopware plugins
PluginManager.register('CartAddProductPlugin', CartAddProductPlugin, '[data-cart-add-product]');
PluginManager.register('OffCanvasCartPlugin', OffCanvasCartPlugin, '[data-offcanvas-cart]');
PluginManager.register('AddToCartPlugin', AddToCartPlugin, '[data-add-to-cart]');
PluginManager.register('CookiePermissionPlugin', CookiePermissionPlugin, '[data-cookie-permission]');
PluginManager.register('ScrollUpPlugin', ScrollUpPlugin, '[data-scroll-up]');
PluginManager.register('CollapseFooterColumnsPlugin', CollapseFooterColumnsPlugin, '[data-collapse-footer]');
PluginManager.register('FlyoutMenuPlugin', FlyoutMenuPlugin, '[data-flyout-menu]');
PluginManager.register('OffCanvasMenuPlugin', OffCanvasMenuPlugin, '[data-offcanvas-menu]');
PluginManager.register('FormAutoSubmitPlugin', FormAutoSubmitPlugin, '[data-form-auto-submit]');
PluginManager.register('FormAjaxSubmitPlugin', FormAjaxSubmitPlugin, '[data-form-ajax-submit]');
PluginManager.register('FormValidationPlugin', FormValidationPlugin, '[data-form-validation]');
PluginManager.register('FormFieldTogglePlugin', FormFieldTogglePlugin, '[data-form-field-toggle]');
PluginManager.register('ListingPlugin', ListingPlugin, '[data-listing]');
PluginManager.register('OffCanvasFilterPlugin', OffCanvasFilterPlugin, '[data-offcanvas-filter]');
PluginManager.register('RatingSystemPlugin', RatingSystemPlugin, '[data-rating-system]');
PluginManager.register('MagnifierPlugin', MagnifierPlugin, '[data-magnifier]');
PluginManager.register('ImageZoomPlugin', ImageZoomPlugin, '[data-image-zoom]');
PluginManager.register('VariantSwitchPlugin', VariantSwitchPlugin, '[data-variant-switch]');
PluginManager.register('CmsSliderPlugin', CmsSliderPlugin, '[data-cms-slider]');
PluginManager.register('CmsImageZoomModalPlugin', CmsImageZoomModalPlugin, '[data-cms-image-zoom-modal]');
PluginManager.register('GallerySliderPlugin', GallerySliderPlugin, '[data-gallery-slider]');

// Custom theme plugins
class ThemeScrollHeaderPlugin extends Plugin {
    static options = {
        scrollThreshold: 100,
        scrollHeaderClass: 'is-sticky'
    };

    init() {
        this.scrollHeader();
        window.addEventListener('scroll', this.scrollHeader.bind(this));
    }

    scrollHeader() {
        if (window.scrollY > this.options.scrollThreshold) {
            this.el.classList.add(this.options.scrollHeaderClass);
        } else {
            this.el.classList.remove(this.options.scrollHeaderClass);
        }
    }
}

class ThemeQuantityFieldPlugin extends Plugin {
    static options = {
        decreaseButton: '.btn-decrease',
        increaseButton: '.btn-increase',
        quantityInput: '.quantity-input',
        minQuantity: 1
    };

    init() {
        this.decreaseButton = this.el.querySelector(this.options.decreaseButton);
        this.increaseButton = this.el.querySelector(this.options.increaseButton);
        this.quantityInput = this.el.querySelector(this.options.quantityInput);
        
        if (!this.decreaseButton || !this.increaseButton || !this.quantityInput) {
            return;
        }
        
        this.initElements();
        this.registerEvents();
    }

    initElements() {
        // Set minimum quantity
        this.quantityInput.setAttribute('min', this.options.minQuantity);
        
        // Disable decrease button if at minimum
        if (parseInt(this.quantityInput.value, 10) <= this.options.minQuantity) {
            this.decreaseButton.setAttribute('disabled', 'disabled');
        }
    }

    registerEvents() {
        this.decreaseButton.addEventListener('click', this.onDecrease.bind(this));
        this.increaseButton.addEventListener('click', this.onIncrease.bind(this));
        this.quantityInput.addEventListener('change', this.onChange.bind(this));
    }

    onDecrease() {
        const newValue = parseInt(this.quantityInput.value, 10) - 1;
        
        if (newValue >= this.options.minQuantity) {
            this.quantityInput.value = newValue;
            this.quantityInput.dispatchEvent(new Event('change'));
        }
    }

    onIncrease() {
        const newValue = parseInt(this.quantityInput.value, 10) + 1;
        this.quantityInput.value = newValue;
        this.quantityInput.dispatchEvent(new Event('change'));
    }

    onChange() {
        const value = parseInt(this.quantityInput.value, 10);
        
        // Enforce minimum quantity
        if (value < this.options.minQuantity) {
            this.quantityInput.value = this.options.minQuantity;
        }
        
        // Toggle decrease button state
        if (parseInt(this.quantityInput.value, 10) <= this.options.minQuantity) {
            this.decreaseButton.setAttribute('disabled', 'disabled');
        } else {
            this.decreaseButton.removeAttribute('disabled');
        }
    }
}

class ThemeMegaMenuPlugin extends Plugin {
    static options = {
        dropdownSelector: '.nav-link.dropdown-toggle',
        megaMenuClass: 'has-mega-menu',
        megaMenuContentClass: 'mega-menu-content',
        openClass: 'show'
    };

    init() {
        this.dropdowns = this.el.querySelectorAll(this.options.dropdownSelector);
        this.registerEvents();
    }

    registerEvents() {
        // Handle desktop hover events
        if (window.matchMedia('(min-width: 992px)').matches) {
            this.dropdowns.forEach(dropdown => {
                const parentItem = dropdown.closest('li');
                
                if (parentItem.classList.contains(this.options.megaMenuClass)) {
                    const megaMenuContent = parentItem.querySelector(`.${this.options.megaMenuContentClass}`);
                    
                    parentItem.addEventListener('mouseenter', () => {
                        parentItem.classList.add(this.options.openClass);
                        if (megaMenuContent) {
                            megaMenuContent.classList.add(this.options.openClass);
                        }
                    });
                    
                    parentItem.addEventListener('mouseleave', () => {
                        parentItem.classList.remove(this.options.openClass);
                        if (megaMenuContent) {
                            megaMenuContent.classList.remove(this.options.openClass);
                        }
                    });
                }
            });
        }
    }
}

// Register custom theme plugins
PluginManager.register('ThemeScrollHeaderPlugin', ThemeScrollHeaderPlugin, '.header-main');
PluginManager.register('ThemeQuantityFieldPlugin', ThemeQuantityFieldPlugin, '.quantity-selector');
PluginManager.register('ThemeMegaMenuPlugin', ThemeMegaMenuPlugin, '.main-navigation-menu');

// Initialize plugins on document ready
document.addEventListener('DOMContentLoaded', () => {
    // Generic helper for all "add to wishlist" buttons
    const wishlistButtons = document.querySelectorAll('.btn-wishlist');
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Toggle active state for visual feedback
            this.classList.toggle('active');
            
            // You could add real wishlist functionality here
            // when implementing with a real backend
        });
    });
});
