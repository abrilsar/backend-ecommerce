# Correr el programa
    Run npm install
    Run npm run dev

# Herramientas
    Para el desarrollo de la API REST, se optó por utilizar el framework Fastify de Node.js y TypeScript. Fastify proporciona un rendimiento superior y una estructura de desarrollo rápido, mientras que TypeScript asegura la seguridad de tipos. Se utilizó la biblioteca Zod para la validación de esquemas, lo que garantiza que los datos enviados a la API sean coherentes y correctos.


# Base de Datos y Estructura de Datos
    Se seleccionó MongoDB como el sistema de base de datos para la API REST debido a su flexibilidad para manejar datos no estructurados y su escalabilidad horizontal. Se diseñaron tres modelos de datos principales: User, Order y Product.
    El modelo User mantiene una lista de Orders (pedidos), cada una de las cuales contiene el ID de sus pedidos, creando una relación de referencia con la colección de orders. Cada Order (pedido), a su vez, hace referencia a los Product que se han solicitado. Esta estructura de referencia permite mantener coherencia en los datos y facilita la eliminación de datos relacionados. Cuando se elimina una orden, se borra tanto de la colección Order como de la referencia en el modelo User.

# Paginación por Cursor
    Para optimizar las consultas a la base de datos, se implementó la paginación por cursor. Es una técnica más eficiente con grandes conjuntos de datos, ya que no requiere saltar sobre un número de registros. De esta manera, se mantiene un alto rendimiento incluso con un crecimiento significativo de los datos.

# Autenticación y Autorización
    Para la autenticación de usuarios, se implementó JWT (JSON Web Tokens) con la ayuda de los plugins Fastify JWT. Cuando un usuario inicia sesión, su contraseña se almacena como un hash de Argon2 en la base de datos para garantizar su seguridad. El usuario recibe un token de acceso ( y también se guarda en la cookie del cliente) que tiene una duración de 8 horas, lo que aumenta la seguridad de la API.
    
    Además, se implementó la autorización basada en roles utilizando el plugin de Fastify AUTH. Los usuarios pueden tener roles de administrador o cliente y ciertas rutas están restringidas a los administradores. Por ejemplo, solo los administradores pueden ver todas las órdenes realizadas en la plataforma.

    Para proteger los endpoints, se implementó un middleware que verifica la autenticación y autorización del usuario utilizando los hooks, decoradores y plugins de Fastify.


# Manejo de errores
    Para un manejo efectivo de errores, se definieron errores específicos que podrían surgir durante el uso de la plataforma. Se proporcionan mensajes de error descriptivos para facilitar la depuración y mejorar la experiencia del usuario.

