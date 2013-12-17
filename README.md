cashew
======

###### Lightweight jQuery plugin to cache selectors.
------


#####Getting started

- Include ```cashew.js``` in the webpage along with jQuery 1.3+
- Use jQuery selectors as usual. 
- Call ```refresh``` to update the returned set of elements in case the DOM is modified.


```javascript
var items = $("ul>li.member"); //Selects ul>li.member elements and caches the results
    

/*The DOM is modified; elements are added or removed*/
    
items = $("ul>li.member").refresh(); //Updates the cache and returns the new elements
    
```
