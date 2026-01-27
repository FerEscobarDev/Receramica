**NOTA:** Aunque le llamaremos creaciones u obras, en la base de datos se encuentra como productos, por eso se puede encontrar propiedades como product_id, price, etc.


# Endpoint /api/creaciones
Endpoint que retorna todas las obras del artista con todos los datos de las mismas
### Ejemplo de respuesta:
```JSON
    [
        {
            "id": 1,
            "created_at": "2024-09-30T15:23:51.000000Z",
            "updated_at": "2024-09-30T16:21:03.000000Z",
            "name": "Thalassa",
            "description": "Esta pieza de gres blanco revela un cuidadoso juego de texturas y tonalidades, logrado mediante la incorporaci\u00f3n de \u00f3xidos de hierro en diferentes proporciones. La t\u00e9cnica de construcci\u00f3n a partir de rollitos enfatiza las variaciones sutiles en la superficie, creando una lectura t\u00e1ctil y visual \u00fanica. Cocida a 1080\u00b0C en un ambiente oxidante en Faenza, Italia, en 2014, esta obra captura la esencia de la cer\u00e1mica contempor\u00e1nea, fusionando tradici\u00f3n artesanal con una est\u00e9tica minimalista y experimental.",
            "price": "5000000.00",
            "quantity": 1,
            "landing": 1,
            "images": [
                {
                    "id": 1,
                    "created_at": "2024-09-30T15:23:51.000000Z",
                    "updated_at": "2024-09-30T15:23:51.000000Z",
                    "product_id": 1,
                    "url": "creaciones_images\/AyPbYeQGhvPVqPIbshc1u1BFZKnZlru3unKEYTQc.jpg",
                    "alt": "Thalassa",
                    "main": 1
                },
                {
                    "id": 2,
                    "created_at": "2024-09-30T15:23:51.000000Z",
                    "updated_at": "2024-09-30T15:23:51.000000Z",
                    "product_id": 1,
                    "url": "creaciones_images\/nZYfRElU5QIRG7PjkvhibhUrRWFyBJ8gDTyHQmD0.jpg",
                    "alt": "Thalassa",
                    "main": 0
                }
            ]
        },
        {
            "id": 2,
            "created_at": "2024-09-30T15:28:56.000000Z",
            "updated_at": "2024-09-30T15:28:56.000000Z",
            "name": "La Geva",
            "description": "Escultura en terracota esmaltada, hecha en Faenza, Italia (2015). Formada a mano con rollitos de arcilla y cocida a 1000\u00b0C en ambiente oxidante. La pieza mezcla texturas naturales con el brillo del esmalte, creando un equilibrio entre lo org\u00e1nico y lo estructural.",
            "price": "5000000.00",
            "quantity": 1,
            "landing": 1,
            "images": [
                {
                    "id": 3,
                    "created_at": "2024-09-30T15:28:56.000000Z",
                    "updated_at": "2024-09-30T15:28:56.000000Z",
                    "product_id": 2,
                    "url": "creaciones_images\/w6VJrBDsZQnWB9yxNjyFTgoEcB8ZsYVfVi3NScc4.jpg",
                    "alt": "La Geva",
                    "main": 1
                },
                {
                    "id": 4,
                    "created_at": "2024-09-30T15:28:56.000000Z",
                    "updated_at": "2024-09-30T15:28:56.000000Z",
                    "product_id": 2,
                    "url": "creaciones_images\/tSF5IUNMP0AxoFv3xsrzZ0hrWyPZQSknYB3CrbPr.jpg",
                    "alt": "La Geva",
                    "main": 0
                }
            ]
        },
        {
            "id": 31,
            "created_at": "2024-12-13T13:54:02.000000Z",
            "updated_at": "2024-12-13T13:54:02.000000Z",
            "name": "Manganorhythmus spiralinex",
            "description": "Esta pieza escult\u00f3rica, construida mediante la t\u00e9cnica de rollitos, presenta un dise\u00f1o org\u00e1nico y fluido que combina dos tonos de gres terracota: uno natural y otro intensamente saturado con \u00f3xido de manganeso. Este contraste crom\u00e1tico genera un efecto visual de franjas alternadas que recorren todo su cuerpo, acentuando su textura tridimensional y resaltando los patrones geom\u00e9tricos que semejan escamas o facetas talladas.\r\n\r\nLa estructura general tiene una forma curvil\u00ednea que se alza desde una base estrecha, expandi\u00e9ndose en una figura que podr\u00eda asemejarse a una gota o una flama estilizada. En el centro de la pieza, un orificio circular, que recuerda a un ombligo, constituye un punto focal. Este \"ombligo\" est\u00e1 cuidadosamente esmaltado en un azul oscuro y profundo, casi negro, que crea un contraste impactante con el cuerpo terracota y gu\u00eda la mirada hacia el interior de la obra. La superficie esmaltada en esta zona tiene un acabado brillante, lo que a\u00f1ade un efecto de profundidad y una cualidad casi l\u00edquida al centro de la pieza.\r\n\r\nLa textura de la pieza es din\u00e1mica y r\u00edtmica, lograda mediante el tallado de los rollitos que la componen, formando un patr\u00f3n continuo que amplifica la sensaci\u00f3n de movimiento en la obra. La cocci\u00f3n a 1180\u00b0C en un ambiente de oxidaci\u00f3n asegura la solidez del material y fija de manera precisa los tonos de terracota y los detalles del esmalte.\r\n\r\nEsta obra combina una t\u00e9cnica de construcci\u00f3n tradicional con una est\u00e9tica contempor\u00e1nea que resalta texturas y colores contrastantes. Su forma y acabado evocan elementos naturales como caracolas, semillas o gotas de agua, pero reinterpretados con un lenguaje escult\u00f3rico. La interacci\u00f3n entre los colores de terracota y el azul profundo en el centro aporta un equilibrio entre lo terrestre y lo et\u00e9reo, invitando a reflexionar sobre los puntos de conexi\u00f3n y vac\u00edo en la materia y el espacio. Es una pieza que desaf\u00eda lo utilitario al priorizar lo po\u00e9tico y lo sensorial en su dise\u00f1o.\r\n\r\nEsta pieza hace parte de la colecci\u00f3n Litoral de Dise\u00f1o Colombia, exhibida en Expoartesan\u00edas 2024 desde el 4 hasta el 17 de diciembre en Corferias, Bogot\u00e1.",
            "price": "5000000.00",
            "quantity": 1,
            "landing": 1,
            "images": [
                {
                    "id": 113,
                    "created_at": "2024-12-13T13:54:08.000000Z",
                    "updated_at": "2024-12-13T13:54:08.000000Z",
                    "product_id": 31,
                    "url": "creaciones_images\/q3uKqZZWaBa5ogRgtlivI0uTV7TNUAN6EFhFk0WK.jpg",
                    "alt": "Manganorhythmus spiralinex",
                    "main": 0
                },
                {
                    "id": 114,
                    "created_at": "2024-12-13T13:54:14.000000Z",
                    "updated_at": "2024-12-13T13:54:14.000000Z",
                    "product_id": 31,
                    "url": "creaciones_images\/09EQtVz4VOZecMtJHwko1Pwsf389o4JGnF6kaOxA.jpg",
                    "alt": "Manganorhythmus spiralinex",
                    "main": 0
                },
                {
                    "id": 115,
                    "created_at": "2024-12-13T13:54:19.000000Z",
                    "updated_at": "2024-12-13T13:54:19.000000Z",
                    "product_id": 31,
                    "url": "creaciones_images\/9LsAMSMNjSknlmC5vTzAZ0c8smqOh38u6GwLG11R.jpg",
                    "alt": "Manganorhythmus spiralinex",
                    "main": 0
                },
                {
                    "id": 116,
                    "created_at": "2024-12-13T13:54:25.000000Z",
                    "updated_at": "2024-12-13T13:54:25.000000Z",
                    "product_id": 31,
                    "url": "creaciones_images\/wPf7BIlDFwialwtT0PXpwq4b9Z4yeqB1x9uyQEzD.jpg",
                    "alt": "Manganorhythmus spiralinex",
                    "main": 0
                },
                {
                    "id": 117,
                    "created_at": "2024-12-13T13:54:31.000000Z",
                    "updated_at": "2024-12-13T13:54:31.000000Z",
                    "product_id": 31,
                    "url": "creaciones_images\/Uy00gOUqRZ3RMNLlK8DA34qBuRpSrY4faZtiiku7.jpg",
                    "alt": "Manganorhythmus spiralinex",
                    "main": 0
                },
                {
                    "id": 118,
                    "created_at": "2024-12-13T13:54:36.000000Z",
                    "updated_at": "2024-12-13T13:54:36.000000Z",
                    "product_id": 31,
                    "url": "creaciones_images\/56Nm5UtTLLG51NGetB6iDt4N9Zx7nbwVGHI7gmYn.jpg",
                    "alt": "Manganorhythmus spiralinex",
                    "main": 1
                },
                {
                    "id": 119,
                    "created_at": "2024-12-13T13:54:41.000000Z",
                    "updated_at": "2024-12-13T13:54:41.000000Z",
                    "product_id": 31,
                    "url": "creaciones_images\/rF80ByreZZwjlelLDgluWVnFn1fUMG5t8AxVTnQ0.jpg",
                    "alt": "Manganorhythmus spiralinex",
                    "main": 0
                }
            ]
        },
        {
            "id": 32,
            "created_at": "2024-12-13T14:03:33.000000Z",
            "updated_at": "2024-12-13T14:03:33.000000Z",
            "name": "Mycelisca silvatica",
            "description": "Esta es una escultura cer\u00e1mica que explora la interacci\u00f3n entre la forma org\u00e1nica y la transformaci\u00f3n del material. Su base crece de manera fluida en tres vol\u00famenes que se apilan de manera armoniosa, fundi\u00e9ndose bajo una piel de gres blanco. La estructura, robusta y firme, no sigue las l\u00edneas de la delgadez, sino que acoge la curva como su propia fortaleza. En el centro de esta obra, brotes emergen del cuerpo de la pieza, como si fueran organismos en expansi\u00f3n. Estas formaciones texturizadas se destacan por el contraste entre la claridad de la cer\u00e1mica y la oscuridad brillante del esmalte metalizado, creando una atm\u00f3sfera casi de otro mundo, evocando la aparici\u00f3n espont\u00e1nea de hongos o musgo. Las vetas de manganeso y los esmaltes transparentes entre los rollitos aportan una riqueza de texturas, insinuando un ecosistema cer\u00e1mico lleno de vida y transformaci\u00f3n.\r\n\r\nEsta pieza hace parte de la colecci\u00f3n Litoral de Dise\u00f1o Colombia, exhibida en Expoartesan\u00edas 2024 desde el 4 hasta el 17 de diciembre en Corferias, Bogot\u00e1.",
            "price": "5000000.00",
            "quantity": 1,
            "landing": 1,
            "images": [
                {
                    "id": 120,
                    "created_at": "2024-12-13T14:03:38.000000Z",
                    "updated_at": "2024-12-13T14:03:38.000000Z",
                    "product_id": 32,
                    "url": "creaciones_images\/HxbSfsRd5yIofHnC1feOpPf45QoVOU7Y4hlDUrHO.jpg",
                    "alt": "Mycelisca silvatica",
                    "main": 0
                },
                {
                    "id": 121,
                    "created_at": "2024-12-13T14:03:42.000000Z",
                    "updated_at": "2024-12-13T14:03:42.000000Z",
                    "product_id": 32,
                    "url": "creaciones_images\/mmSRqs1CYtxrlO8vYrQNJXD81lDPMulZ7ebmeQ8u.jpg",
                    "alt": "Mycelisca silvatica",
                    "main": 1
                },
                {
                    "id": 122,
                    "created_at": "2024-12-13T14:03:47.000000Z",
                    "updated_at": "2024-12-13T14:03:47.000000Z",
                    "product_id": 32,
                    "url": "creaciones_images\/FCngVaq8HX56MRfGH6UaPhqI8pweCy2OW5jks85L.jpg",
                    "alt": "Mycelisca silvatica",
                    "main": 0
                },
                {
                    "id": 123,
                    "created_at": "2024-12-13T14:03:52.000000Z",
                    "updated_at": "2024-12-13T14:03:52.000000Z",
                    "product_id": 32,
                    "url": "creaciones_images\/ZkgAf9gPSuvaB9WYDeQevEMLN5FT8yyWScccmY0g.jpg",
                    "alt": "Mycelisca silvatica",
                    "main": 0
                },
                {
                    "id": 124,
                    "created_at": "2024-12-13T14:03:57.000000Z",
                    "updated_at": "2024-12-13T14:03:57.000000Z",
                    "product_id": 32,
                    "url": "creaciones_images\/hwWKTYqbSkaseiFrhNE0IHG0NHoRN1Z6EnZGzz3K.jpg",
                    "alt": "Mycelisca silvatica",
                    "main": 0
                }
            ]
        }
    ]
```
# /api/creaciones/{id}
Endpoint que retorna la información de una creación por su ID
### Ejemplo de respuesta:
```JSON
    {
        "id": 32,
        "created_at": "2024-12-13T14:03:33.000000Z",
        "updated_at": "2024-12-13T14:03:33.000000Z",
        "name": "Mycelisca silvatica",
        "description": "Esta es una escultura cerámica que explora la interacción entre la forma orgánica y la transformación del material. Su base crece de manera fluida en tres volúmenes que se apilan de manera armoniosa, fundiéndose bajo una piel de gres blanco. La estructura, robusta y firme, no sigue las líneas de la delgadez, sino que acoge la curva como su propia fortaleza. En el centro de esta obra, brotes emergen del cuerpo de la pieza, como si fueran organismos en expansión. Estas formaciones texturizadas se destacan por el contraste entre la claridad de la cerámica y la oscuridad brillante del esmalte metalizado, creando una atmósfera casi de otro mundo, evocando la aparición espontánea de hongos o musgo. Las vetas de manganeso y los esmaltes transparentes entre los rollitos aportan una riqueza de texturas, insinuando un ecosistema cerámico lleno de vida y transformación.\r\n\r\nEsta pieza hace parte de la colección Litoral de Diseño Colombia, exhibida en Expoartesanías 2024 desde el 4 hasta el 17 de diciembre en Corferias, Bogotá.",
        "price": "5000000.00",
        "quantity": 1,
        "landing": 1,
        "images": [
            {
                "id": 120,
                "created_at": "2024-12-13T14:03:38.000000Z",
                "updated_at": "2024-12-13T14:03:38.000000Z",
                "product_id": 32,
                "url": "creaciones_images/HxbSfsRd5yIofHnC1feOpPf45QoVOU7Y4hlDUrHO.jpg",
                "alt": "Mycelisca silvatica",
                "main": 0
            },
            {
                "id": 121,
                "created_at": "2024-12-13T14:03:42.000000Z",
                "updated_at": "2024-12-13T14:03:42.000000Z",
                "product_id": 32,
                "url": "creaciones_images/mmSRqs1CYtxrlO8vYrQNJXD81lDPMulZ7ebmeQ8u.jpg",
                "alt": "Mycelisca silvatica",
                "main": 1
            },
            {
                "id": 122,
                "created_at": "2024-12-13T14:03:47.000000Z",
                "updated_at": "2024-12-13T14:03:47.000000Z",
                "product_id": 32,
                "url": "creaciones_images/FCngVaq8HX56MRfGH6UaPhqI8pweCy2OW5jks85L.jpg",
                "alt": "Mycelisca silvatica",
                "main": 0
            },
            {
                "id": 123,
                "created_at": "2024-12-13T14:03:52.000000Z",
                "updated_at": "2024-12-13T14:03:52.000000Z",
                "product_id": 32,
                "url": "creaciones_images/ZkgAf9gPSuvaB9WYDeQevEMLN5FT8yyWScccmY0g.jpg",
                "alt": "Mycelisca silvatica",
                "main": 0
            },
            {
                "id": 124,
                "created_at": "2024-12-13T14:03:57.000000Z",
                "updated_at": "2024-12-13T14:03:57.000000Z",
                "product_id": 32,
                "url": "creaciones_images/hwWKTYqbSkaseiFrhNE0IHG0NHoRN1Z6EnZGzz3K.jpg",
                "alt": "Mycelisca silvatica",
                "main": 0
            }
        ]
    }
```

# /api/images
Endpoint que retorna todas las imágenes de las obras del artista cuya obra tenga landing = 1 y solo la imagen principal (main = 1) para ser usadas en el carrusel
### Ejemplo de respuesta:
```JSON
    [
        {
            "id": 118,
            "created_at": "2024-12-13T13:54:36.000000Z",
            "updated_at": "2024-12-13T13:54:36.000000Z",
            "product_id": 31,
            "url": "creaciones_images\/56Nm5UtTLLG51NGetB6iDt4N9Zx7nbwVGHI7gmYn.jpg",
            "alt": "Manganorhythmus spiralinex",
            "main": 1
        },
        {
            "id": 121,
            "created_at": "2024-12-13T14:03:42.000000Z",
            "updated_at": "2024-12-13T14:03:42.000000Z",
            "product_id": 32,
            "url": "creaciones_images\/mmSRqs1CYtxrlO8vYrQNJXD81lDPMulZ7ebmeQ8u.jpg",
            "alt": "Mycelisca silvatica",
            "main": 1
        }
    ]
```
