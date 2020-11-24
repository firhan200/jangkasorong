document.getElementById('base').setAttribute('draggable', false);

var isItemOn = false;
var itemLength = 0;

interact('#pointer')    // target elements with the 'slider' class
    .draggable({                        // make the element fire drag events
    origin: 'self',                   // (0, 0) will be the element's top-left
    modifiers: [
        interact.modifiers.restrict({
        restriction: 'self'           // keep the drag coords within the element
        })
    ]
    })
    .on('dragmove', function (event) {  // call this listener on every dragmove
    const sliderWidth = interact.getElementRect(event.target.parentNode).width
    const value = event.pageX / sliderWidth

    if(isItemOn){
        if(event.pageX >= (itemLength + 100) && value < 0.43){
            event.target.style.paddingLeft = (value * 800) + 'px'
            event.target.setAttribute('data-value', value.toFixed(2))
        }
    }else{
        if(value < 0.43){
            event.target.style.paddingLeft = (value * 800) + 'px'
            event.target.setAttribute('data-value', value.toFixed(2))
        }
    }
});

function dragMoveListener (event) {
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
  
    // translate the element
    target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)'
  
    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }

/* The dragging code for '.draggable' from the demo above
 * applies to this demo as well so it doesn't have to be repeated. */

// enable draggables to be dropped into this
interact('.dropzone').dropzone({
    // only accept elements matching this CSS selector
    accept: '#yes-drop',
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.75,
  
    // listen for drop related events:
  
    ondropactivate: function (event) {
      // add active dropzone feedback
      event.target.classList.add('drop-active')
    },
    ondragenter: function (event) {
      var draggableElement = event.relatedTarget
      var dropzoneElement = event.target
  
      // feedback the possibility of a drop
      dropzoneElement.classList.add('drop-target')
      draggableElement.classList.add('can-drop')
    },
    ondragleave: function (event) {
      // remove the drop feedback style
      event.target.classList.remove('drop-target')
      event.relatedTarget.classList.remove('can-drop')
      isItemOn = false;
    },
    ondrop: function (event) {
        event.relatedTarget.style.transform = "translate(21.5333px, -123.333px)";
        isItemOn = true;
        itemLength = $(event.relatedTarget).data('width');

        //move away sorong
        $("#pointer").css('padding-left', '200px');
    },
    ondropdeactivate: function (event) {
      // remove active dropzone feedback
      event.target.classList.remove('drop-active')
      event.target.classList.remove('drop-target')
    }
  })
  
interact('.drag-drop')
.draggable({
    inertia: true,
    modifiers: [
    interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
    })
    ],
    autoScroll: true,
    // dragMoveListener from the dragging demo above
    listeners: { move: dragMoveListener }
})

$("#pertanyaan").submit(function(){
    var hasil = $("#jawaban").val();
    if(hasil === "5,7"){
        alert("Betul");
    }else{
        alert("Salah");
    }
})