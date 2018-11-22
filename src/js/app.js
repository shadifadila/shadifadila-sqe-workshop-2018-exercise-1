import $ from 'jquery';
import {parseCode} from './code-analyzer';
import {start} from './Statement';


$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        $('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
        //$('#parsedCode').val(JSON.stringify(start(parsedCode), null, 2));
        resutl_table(start(parsedCode));
        //$('#parsedCode').val(JSON.stringify( start(parsedCode), null, -1));

    });
});


function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}


function resutl_table(rows) {


    var html = '<table style="width: 100%; border: 1px solid #CCCCCC " >';
    html += '<tr>';
    for( var j in rows[0] ) {
        html += '<th style="height: 40px; background-color: #5FAAFF "><span style="color: white; font-weight: 700; ">' + j.toString() + '</span></th>';
    }
    html += '</tr>';
    for( var i = 0; i < rows.length; i++) {
        html += '<tr >';
        for( var y in rows[i] ) {
            html += '<td style="text-align: center; height: 30px; background-color: #f3f3f3"><span>' +  htmlEntities(rows[i][y].toString()).toString()+ '</span></td>';
        }
    }
    html += '</table>';
    document.getElementById('container').innerHTML = html;

}


