/**
 * @file
 * Localgov Tabs behaviour.
 *
 * DO NOT EDIT THIS FILE.
 * Any changes need to be made in localgov-tabs.es6.js file and compiled into
 * this file.
**/

(function (Drupal) {
  Drupal.behaviors.localgovTabs = {
    /**
     * Attach Tabs behaviour.
     *
     * @param {object} context
     *   DOM object.
     */
    attach: function attach(context) {
      var tabs = context.querySelectorAll('[data-localgov-tabs]');

      for (var i = 0; i < tabs.length; i++) {
        this.init(tabs[i], i);
      }
    },

    /**
     * Initialise tabs.
     *
     * @param {HTMLElement} tabs
     *   Tabs element.
     * @param {integer} index
     *   Current index.
     */
    init: function init(tabs, index) {
      var _this = this;

      var tabPanels = tabs.querySelectorAll('.tab-panel');
      var tabsInitialisedClass = 'tabs--initialised';
      var breakpoint = tabs.dataset.accordionTabsSwitch || null;
      var tabId = index;
      var mq = window.matchMedia('(max-width: ' + breakpoint + ')');

      var create = function create() {
        if (!tabs.classList.contains(tabsInitialisedClass)) {
          var _ret = function () {
            var tabPanelsNumber = tabPanels.length;

            // Only initialise tabs if there are at least 2 panels.
            if (tabPanelsNumber < 2) {
              return {
                v: void 0
              };
            }

            // Create tab list element and its nav wrapper.
            var tabListNav = document.createElement('nav');
            var tabList = document.createElement('ul');
            tabListNav.classList.add('tabs__nav');
            tabList.setAttribute('role', 'tablist');
            tabList.classList.add('tabs__controls');

            // Loop through all tab panels to create tab list items & controls.

            var _loop = function _loop(i) {
              var tabListItem = document.createElement('li');
              var tab = document.createElement('button');
              var tabPanelTitle = tabPanels[i].querySelectorAll('.tab-panel__title')[0].textContent;
              var tabText = document.createTextNode(tabPanelTitle);

              // Add attributes & text to tab list items and tabs.
              tabListItem.setAttribute('role', 'presentation');
              tab.setAttribute('role', 'tab');
              tab.setAttribute('tabindex', -1);
              tab.setAttribute('aria-selected', false);
              tab.setAttribute('aria-controls', 'tab-panel-' + tabId + '-' + i);
              tab.setAttribute('id', 'tab-' + tabId + '-' + i);
              tab.appendChild(tabText);

              tab.addEventListener('click', function (e) {
                e.preventDefault();
                var isActive = e.currentTarget.getAttribute('aria-selected');
                if (isActive === 'false') {
                  Drupal.behaviors.localgovTabs.switchTab(e.currentTarget, tabs);
                }
              });

              // On keydown event listener (for navigating tab controls using
              // arrow keys).
              tab.addEventListener('keydown', function (e) {
                var newActiveControl = void 0;

                switch (e.which) {
                  case 37:
                    // Left arrow. If there's a previous element, switch to it.
                    if (i - 1 >= 0) {
                      newActiveControl = tabList.querySelectorAll('li')[i - 1].querySelectorAll('button');
                      Drupal.behaviors.localgovTabs.switchTab(newActiveControl[0], tabs);
                      newActiveControl[0].focus();
                    }
                    break;
                  case 39:
                    // Right arrow. If there's a next element, switch to it.
                    if (i + 1 < tabPanelsNumber) {
                      newActiveControl = tabList.querySelectorAll('li')[i + 1].querySelectorAll('button');
                      Drupal.behaviors.localgovTabs.switchTab(newActiveControl[0], tabs);
                      newActiveControl[0].focus();
                    }
                    break;
                  case 40:
                    // Arrow down. Move focus into the active panel.
                    tabPanels[i].focus();
                    break;
                  default:
                }
              });

              // Add tabs to tab list items, and list items to tab list.
              tabListItem.appendChild(tab);
              tabList.appendChild(tabListItem);

              // Add attributes to tab panels.
              tabPanels[i].setAttribute('role', 'tabpanel');
              tabPanels[i].setAttribute('tabindex', '-1');
              tabPanels[i].setAttribute('aria-labelledby', 'tab-' + tabId + '-' + i);
              tabPanels[i].setAttribute('id', 'tab-panel-' + tabId + '-' + i);
            };

            for (var i = 0; i < tabPanels.length; i++) {
              _loop(i);
            }

            // Add tab list to tabs element.
            tabListNav.append(tabList);
            tabPanels[0].parentNode.insertBefore(tabListNav, tabPanels[0]);

            // Show the first panel.
            var activeControl = tabList.querySelectorAll('li:first-child button');
            _this.switchTab(activeControl[0], tabs);

            // Add initialised class.
            tabs.classList.add(tabsInitialisedClass);
          }();

          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        }
      };

      var destroy = function destroy() {
        if (tabs.classList.contains(tabsInitialisedClass)) {
          // Remove tabs.
          var tabsElements = tabs.querySelectorAll('.tabs__nav')[0];
          tabsElements.parentNode.removeChild(tabsElements);

          // Remove attributes from tab panels.
          for (var i = 0; i < tabPanels.length; i++) {
            tabPanels[i].removeAttribute('role');
            tabPanels[i].removeAttribute('tabindex');
            tabPanels[i].removeAttribute('aria-labelledby');
            tabPanels[i].removeAttribute('id');

            if (tabs.querySelectorAll('.tab-panel--active').length > 0) {
              tabs.querySelectorAll('.tab-panel--active')[0].classList.remove('tab-panel--active');
            }
          }

          // Remove init class.
          tabs.classList.remove(tabsInitialisedClass);
        }
      };

      var breakpointCheck = function breakpointCheck() {
        if (mq.matches) {
          destroy();
        } else {
          create();
        }
      };

      // Trigger create/destroy functions at different screen widths
      // based on the value of data-accordion-tabs-switch attribute.
      if (window.matchMedia) {
        mq.addListener(function () {
          breakpointCheck();
        });
        breakpointCheck();
      }
    },

    /**
     * Switch tab.
     *
     * @param {HTMLElement} newActiveTab
     *   Tab element.
     * @param {HTMLElement} tabs
     *   Tabs element.
     */
    switchTab: function switchTab(newActiveTab, tabs) {
      var newActivePanelId = newActiveTab.getAttribute('aria-controls');
      var newActivePanel = tabs.querySelectorAll('#' + newActivePanelId);
      var activePanelClass = 'tab-panel--active';
      var oldActiveTab = tabs.querySelectorAll('.tabs__controls [aria-selected="true"]').length > 0 ? tabs.querySelectorAll('.tabs__controls [aria-selected="true"]')[0] : null;
      // Deactivate current active control.
      if (oldActiveTab) {
        oldActiveTab.setAttribute('aria-selected', false);
        oldActiveTab.setAttribute('tabindex', '-1');
      }
      // Set new active control.
      newActiveTab.setAttribute('aria-selected', true);
      newActiveTab.removeAttribute('tabindex');

      // Deactivate current active panel.
      if (tabs.querySelectorAll('.' + activePanelClass).length > 0) {
        tabs.querySelectorAll('.' + activePanelClass)[0].classList.remove(activePanelClass);
      }

      // Set new active panel.
      newActivePanel[0].classList.add(activePanelClass);
      if (oldActiveTab) {
        newActivePanel[0].focus();
      }
    }
  };
})(Drupal);
