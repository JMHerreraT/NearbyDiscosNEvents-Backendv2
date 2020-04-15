module.exports.DB_ERROR = { code: '000099', message: 'Ocurrió un error en la Base de Datos' };
module.exports.REQUEST_BODY_ERROR = { code: '000098', message: 'El cuerpo de la solicitud no tiene la estructura adecuada' };
module.exports.VALIDATION_ERROR = { code: '000097', description: 'Inputs Inválidos' };
module.exports.VALIDATION_MESSAGES = {   
    "any": {
        "unknown": "no está permitido",
        "invalid": "contiene un valor inválido",
        "empty": "no debe estar vacío",
        "required": "es requerido",
        "allowOnly": "debe tener uno de estos valores {{valids}}"
    },
    "number": {
        "base": "debe ser un número",
        "min": "debe ser mayor o igual a {{limit}}",
        "max":"'debe ser menor o igual a {{limit}}",
        "less": "debe ser menor que {{limit}}",
        "greater": "debe ser mayor que {{limit}}",
        "float": "debe ser un valor decimal",
        "integer": "debe ser un valor entero",
        "negative": "debe ser un número negativo",
        "positive": "debe ser un número positivo",
        "precision": "no debe tener más de {{limit}} decimales",
        "multiple": "debe ser múltiplo de {{multiple}}"
    },
    "string": {
        "required": {
            "base": "es un campo requerido"
        },
        "base": "debe tener un valor",
        "min": "la cantidad de caracteres debe ser al menos {{limit}}",
        "max": "la cantidad de caracteres debe ser menos o igual a {{limit}}",
        "length": "la cantidad de caracteres debe ser{{limit}}",
        "alphanum": "debe contener solo caracteres alfanuméricos",
        "token": "debe contener solo caracteres alfanuméricos y guión bajo",
        "regex": {
            "base": "con valor \"{{!value}}\" no coincide para el patrón: {{pattern}}",
            "name": "con valor \"{{!value}}\" no coincide para el patrón {{name}}"
        },
        "email": "debe ser un email válido",
        "uri": "debe ser una uri válida",
        "isoDate": "debe ser una fecha ISO 8601 válida",
        "guid": "debe ser un GUID válido",
        "hex": "debe contener solo caracteres hexadecimales",
        "hostname": "debe ser un hostname válido",
        "lowercase": "debe contener solo letras minúsculas",
        "uppercase": "debe contener solo letras mayúsculas",
        "trim": "no debe haber espacios en blanco al inicio o final de la palabra.",
        "creditCard": "debe ser una tarjeta de crédito"
    },
    "required": {
        "base": "es un campo requerido"
    }
};