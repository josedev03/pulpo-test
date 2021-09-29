const Joi = require('joi');
//import Joi from 'joi'

export const vehicleSchema = Joi.object({
  'identification': Joi
    .string()
    .required(),
  'marca': Joi
    .string()
    .required(),
  'modelo': Joi
    .number()
    .required(),
  'color': Joi
    .string()
    .required(),
  'fechaIngreso': Joi
    .string()
    .required(),
  'estado': Joi
    .boolean()
    .required(),
  'asignado':  Joi
    .boolean()
    .required(),
  'novedad': Joi
    .array()
    .items({
      'asunto': Joi
        .string().optional(),
      'descripcion': Joi
        .string().optional(),
      'tipo': Joi
        .string()
        .valid('Mecanica', 'Multa', 'Mantenimiento', 'Accidente')
        .optional()
    })
    .optional()
})

export const filterVehicleSchema = Joi.object({
  'id': Joi
    .string()
    .optional(),
  'identification': Joi
    .string()
    .optional(),
  'marca': Joi
    .string()
    .optional(),
  'modelo': Joi
    .number()
    .optional(),
  'color': Joi
    .string()
    .optional(),
  'fechaIngreso': Joi
    .string()
    .optional(),
  'estado': Joi
    .boolean()
    .optional(),
  'asignado':  Joi
    .boolean()
    .optional(),
  'novedad': Joi
    .object({
      'asunto': Joi
        .string().optional(),
      'descripcion': Joi
        .string().optional(),
      'tipo': Joi
        .string()
        .valid('Mecanica', 'Multa', 'Mantenimiento', 'Accidente')
        .optional()
    })
    .optional()
})