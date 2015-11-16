var CustomPlugin = window.CustomPlugin || (function(){
  // RevealJS's layoutSlideContents() method only detects "stretch" elements
  // that are direct descendants of the section. Therefore, it does not apply
  // to stretch elements that are wrapped in a paragraph. Markdown automatically
  // wraps everything in paragraphs, so this code moves the stretch element up
  // to the parent, so that it's detected by RevealJS.
  var elements = document.querySelectorAll('section[data-markdown-parsed] > p > .stretch');
  for (var i = 0, length = elements.length; i < length; i++ ) {
    // This is the stretch element
    var element = elements[i];

    // The element's parent must be a paragraph
    var p = element.parentNode;

    // The paragraph's parent must be a section
    var section = p.parentNode;

    // Detach the stretch element
    p.removeChild(element);
    
    // Replace the original paragraph with the stretch element
    section.insertBefore(element, p);
    section.removeChild(p);
  }
})();
