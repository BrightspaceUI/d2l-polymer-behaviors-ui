# @brightspace-ui/polymer-behaviors

Shared [Polymer](https://www.polymer-project.org/1.0/)-based behaviors and modules for implementing and consuming web components.

## Installation

Install from NPM:

```shell
npm install @brightspace-ui/polymer-behaviors
```

## Usage

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

### Versioning and Releasing

This repo is configured to use `semantic-release`. Commits prefixed with `fix:` and `feat:` will trigger patch and minor releases when merged to `main`.

To learn how to create major releases and release from maintenance branches, refer to the [semantic-release GitHub Action](https://github.com/BrightspaceUI/actions/tree/main/semantic-release) documentation.
