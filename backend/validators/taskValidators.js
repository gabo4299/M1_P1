const { body } = require('express-validator');

exports.validateCreateTask = [
  body("title").notEmpty().withMessage("El titulo es obligatorio"),
  body("status").equals('pendiente').withMessage("Una tarea nueva siempre inicia como 'pendiente'.")
];



exports.validateUpdate = [
  body('status')
  .optional() 
  .isIn(['en progreso', 'completada'])
  .withMessage('El estado debe ser "en progreso" o "completada"'),
  body('dueDate')
  .optional()
  .isISO8601()
  .withMessage('La fecha debe tener un formato válido (YYYY-MM-DD)')
];