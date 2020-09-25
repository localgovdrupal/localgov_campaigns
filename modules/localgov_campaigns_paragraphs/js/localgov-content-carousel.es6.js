/**
 * @file
 * Localgov Content carousel behaviour.
 */

(Drupal => {
  Drupal.behaviors.localgovContentCarousel = {
    /**
     * Attach content carousel behaviour.
     *
     * @param {object} context
     *   DOM object.
     */
    attach(context) {
      const contentCarousels = context.querySelectorAll('.content-carousel');
      for (let i = 0; i < contentCarousels.length; i++) {
        const contentCarousel = contentCarousels[i].querySelectorAll('.glide')[0];
        this.init(contentCarousel, i);
      }
    },

    /**
     * Initialise carousel.
     *
     * @param {HTMLElement} carousel
     *   Carousel element.
     * @param {number} index
     *   Carousel element index.
     */
    init: function init(contentCarousel, index) {
      var disableArrows = function (Glide, Components) {
        return {
          mount() {
            Glide.on(['mount.after', 'run'], () => {
              // Only do this for arrows controls.
              for (let controlItem of Components.Controls.items) {
                if (controlItem.className !== 'glide__arrows') {
                  continue
                }

                // Left (previous) arrow.
                const left = controlItem.querySelector('.glide__arrow--left');
                if (left) {
                  // Disable previous arrow on first slide, enable it on others.
                  if (Glide.index === 0) {
                    left.setAttribute('disabled', '');
                  } else {
                    left.removeAttribute('disabled');
                  }
                }

                // Right (next) arrow.
                var right = controlItem.querySelector('.glide__arrow--right')
                if (right) {
                  // Disable next arrow on last slide, enable it on others.
                  if (Glide.index === Components.Sizes.length - Glide.settings.perView) {
                    right.setAttribute('disabled', '');
                  } else {
                    right.removeAttribute('disabled');
                  }
                }
              }
            });
          }
        }
      }

      const carousel = new Glide(contentCarousel);
      carousel.mount({ disableArrows });
    },
  };
})(Drupal);
