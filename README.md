# d2l-polymer-behaviors
[![Bower version][bower-image]][bower-url]
[![Build status][ci-image]][ci-url]

Shared [Polymer](https://www.polymer-project.org/1.0/)-based behaviors and modules for implementing and consuming web components.

## Installation

`d2l-polymer-behaviors` can be installed from [Bower][bower-url]:
```shell
bower install d2l-polymer-behaviors
```

## Usage

Include the [webcomponents.js](http://webcomponents.org/polyfills/) "lite" polyfill (for browsers who don't natively support web components), then import the component or scripts as needed.

```html
<head>
	<script src="https://s.brightspace.com/lib/webcomponentsjs/0.7.21/webcomponents-lite.min.js"></script>
	<link rel="import" href="../d2l-polymer-behaviors/d2l-dom-focus.html">
</head>
```

#### Methods

**D2L.Dom**

```javascript
// returns null or the closest ancestor that fulfills the specified predicate fxn
D2L.Dom.findComposedAncestor(node, predicate);

// gets the composed children (including shadow children & distributed children)
D2L.Dom.getComposedChildren(element);

// gets the composed parent (including shadow host & insertion points)
D2L.Dom.getComposedParent(node);

// returns true/false whether the specified ancestorNode is an ancestor of node
D2L.Dom.isComposedAncestor(ancestorNode, node);

// browser consistent implementation of HTMLElement.offsetParent
D2L.Dom.getOffsetParent(node);
```

**D2L.Dom.Focus**

```javascript
// get the composed active element (i.e. the actual element that has focus)
D2L.Dom.Focus.getComposedActiveElement();

// get first focusable child or descendant
D2L.Dom.Focus.getFirstFocusableDescendant(element);

// get last focusable child or descendant
D2L.Dom.Focus.getLastFocusableDescendant(element);

// get the next focusable child, sibling, etc.
D2L.Dom.Focus.getNextFocusable(element);

// get the previous focusable child, sibling, etc.
D2L.Dom.Focus.getPreviousFocusable(element);

// get the nearest focusable ancestor
D2L.Dom.Focus.getPreviousFocusableAncestor(element);

// check is focusable (tabindex or white-listed elements)
D2L.Dom.Focus.isFocusable(element);
```

**D2L.Dom.Visibility**

```javascript
// checks DOM visibility (includes inline & computed style of element and ancestors)
// ... does not check opacity, elements hidden due to overflow or scrolled out of view
D2L.Dom.Visibility.isVisible(element);
```

**D2L.Id**

```javascript
// gets a unique indexed id (for lifetime of page)
D2L.Id.getUniqueId();
```

#### Behaviors

**D2L.PolymerBehaviors.FocusableArrowKeysBehavior**

The `FocusableArrowKeysBehavior` can be used for managing focus with the arrow keys.

* right/down - focuses next element, or first if currently at the end
* left/up - focuses previous element, or last if currently at beginning
* home - focuses first
* end - focuses last

```javascript

// include the behavior
behaviors: [
  D2L.PolymerBehaviors.FocusableArrowKeysBehavior
],

attached: function() {
  Polymer.RenderStatus.afterNextRender(this, function() {

    // indicate the direction (default is leftright)
    this.arrowKeyFocusablesDirection = 'updown';

    // required container element of focusables (used to listen for key events)
    this.arrowKeyFocusablesContainer = container;

    // required provider method that can return list of focusables - possible async
    this.arrowKeyFocusablesProvider = function() {

      // simple case
      return Promise.resolve(focusables);

      // other cases (ex. check visibility when querying focusables)
      return new Promise(function(resolve) {
        fastdom.measure(function() {
          // ...
          resolve(focusables);
        });
      });

    };

    // optional callback before focus is applied
    this.arrowKeyFocusablesOnBeforeFocus = function(elem) {
        return new Promise(function(resolve) {
            // do some stuff
            resolve();
        });
    };

  });
}
```

**D2L.PolymerBehaviors.VisibleOnAncestorBehavior**

The `VisibleOnAncestorBehavior` can be used to show an element when a specified ancestor is being hovered, or a child of the ancestor has the focus.  Likewise, the element will be hidden if the specified ancestor is not being hovered and none of its children have the focus.  To define a component with this behavior, simply include the styles and behavior as shown in the example below.

```html
<dom-module id="d2l-example">
  <template>
    <style include="d2l-visible-on-ancestor-styles"></style>
  </template>
  <script>
  Polymer({
    is: 'd2l-example',
    behaviors: [
      D2L.PolymerBehaviors.VisibleOnAncestorBehavior
    ]
  });
  </script>
</dom-module>
```

The consumer of `d2l-example` adds the `d2l-visible-on-ancestor-target` class to the desired ancestor that will be the target for mouse and focus events.  If the user hovers the target, or focuses any element contained within, `d2l-example` will be displayed.

```html
<div class="d2l-visible-on-ancestor-target">
  ...
  <d2l-example visible-on-ancestor></d2l-example>
  ...
</div>
```

### Usage in Production

In production, it's recommended to use a build tool like [Vulcanize](https://github.com/Polymer/vulcanize) to combine all your web components into a single import file. [More from the Polymer Docs: Optimize for Production](https://www.polymer-project.org/1.0/tools/optimize-for-production.html)...

## Coding styles

See the [VUI Best Practices & Style Guide](https://github.com/Brightspace/valence-ui-docs/wiki/Best-Practices-&-Style-Guide) for information on VUI naming conventions, plus information about the [EditorConfig](http://editorconfig.org) rules used in this repo.

[bower-url]: http://bower.io/search/?q=d2l-polymer-behaviors
[bower-image]: https://img.shields.io/bower/v/d2l-polymer-behaviors.svg
[ci-url]: https://travis-ci.org/Brightspace/d2l-polymer-behaviors-ui
[ci-image]: https://travis-ci.org/Brightspace/d2l-polymer-behaviors-ui.svg?branch=master

## Versioning

Commits and PR merges to master will automatically do a minor version bump which will:
* Update the version in `package.json`
* Add a tag matching the new version
* Create a github release matching the new version

By using either **[increment major]** or **[increment patch]** notation inside your merge message, you can overwrite the default version upgrade of minor to the position of your choice.
