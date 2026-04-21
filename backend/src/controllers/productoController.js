const { Producto, Categoria } = require('../models/associations');

// Listar todos los productos activos con su categoría
const listarProductos = async (req, res) => {
    try {
        // Obtener todos los productos 
        const productos = await Producto.findAll({
            include: [
                {
                    model: Categoria,
                    attributes: ['nombre']  
                }
            ],
            attributes: ['id_producto', 'nombre', 'descripcion', 'precio', 'stock'],
            order: [['nombre', 'ASC']]
        });

        
        if (!productos || productos.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No hay productos disponibles en el catálogo',
                data: []
            });
        }

        // Éxito: devolver lista de productos
        res.status(200).json({
            success: true,
            count: productos.length,
            data: productos
        });
    } catch (error) {
        console.error('Error al listar productos:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor. No se pudo obtener el catálogo.'
        });
    }
};

module.exports = { listarProductos };