import joi from "joi";

export const testSchema = joi.object({
  name: joi.string().label("Name").required(),
  pdfUrl: joi.string().uri().label("PDF URL").required(),
  categoryId: joi.number().required(),
  teacherDisciplineId: joi.number().required(),
});
