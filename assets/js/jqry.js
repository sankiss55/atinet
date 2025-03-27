$(document).ready(function() {
    $('#pais_1').select2({
        placeholder: 'Nacionalidad',
        allowClear: true,
        matcher: matcherall,
        language: {
            noResults: function() {
                return "No se encontraron resultados";
            }
        }
    }).val(null).trigger('change');
    $('#pais_fiscal_input').select2({
        placeholder: 'Nacionalidad',
        allowClear: true,
        matcher: matcherall,
        language: {
            noResults: function() {
                return "No se encontraron resultados";
            }
        }
    }).val(null).trigger('change');
    $('#nacionalidad_input').select2({
        placeholder: 'Nacionalidad',
        allowClear: true,
        matcher: matcherall,language: {
            noResults: function() {
                return "No se encontraron resultados"; 
            }
        }
    }).val(null).trigger('change');
    $('#pais_nacimeinto_lista').select2({
        placeholder: 'Pais de Nacimiento',
        allowClear: true,
        matcher: matcherall,
        language: {
            noResults: function() {
                return "No se encontraron resultados";
            }
        }
    }).val(null).trigger('change');
});
function matcherall(params, data) {
    if ($.trim(params.term) === '') {
        return data;
    }
    
    if (data.text.toUpperCase().indexOf(params.term.toUpperCase()) === 0) {
        return data;
    }

    return null;
}