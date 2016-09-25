// define a lookup for what text should be displayed for each value in your range
// Reference http://stackoverflow.com/questions/15195449/html5-type-range-showing-label
var rangeValues =
{
    "1": "Rational",
    "2": "Still Rational",
    "3": "Bordering on irrationality",
    "4": "Irrational",
    "5": "Paranoid!"
};


$(function () {

    // on page load, set the text of the label based the value of the range
    $('#rangeText').text(rangeValues[$('#rangeInput').val()]);

    // setup an event handler to set the text when the range value is dragged (see event for input) or changed (see event for change)
    $('#rangeInput').on('input change', function () {
        $('#rangeText').text(rangeValues[$(this).val()]);
    });

});
