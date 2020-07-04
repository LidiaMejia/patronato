MODELADO DE DATOS

Un Documento en MongoDB es igual a una Entidad, por lo cual esta debe estar descrita EN SU TOTALIDAD EN ESE DOCUMENTO. 
Así como una factura esta contenida en un solo papel, así esta en un solo Documento (Resumen y Detalle), y se pueden obtener sus datos
en una sola consulta.

Cada documento tiene un máximo de 16mb que pueden ser imágenes, binario, audio o texto. Por lo que si solo son textos permite bastante espacio
para modelar SUBDOCUMENTOS COMO ARREGLOS


COLECCIÓN DE SEGURIDAD

_id
email 
password
lastlogin
passwordchanged
passwordexpires
oldpasswords: [
    {"changed": "fecha", "oldpassword": "password"},
    {"changed": "fecha", "oldpassword": "password"},
    {"changed": "fecha", "oldpassword": "password"}
]
roles: [
    {"public", "guest", "member", "council", "admin"} //ESTE ES UN ARREGLO ATÓMICO
]
preferences: [
    {"key": "1", "value": "DarkTheme"},
    {"key": "2", "value": "LightTheme"} //Preferencias personales como colores o temas...
]