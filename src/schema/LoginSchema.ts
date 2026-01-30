import z from 'zod';

export const LoginSchema = z.object({
  identifier: z
    .string()
    .min(1, 'El número de empleado o email es requerido')
    .trim()
    .refine(
      (val) => {
        const isEmail = z.email().safeParse(val).success;
        const isEmployeeNumber = /^EMP-\d+$/.test(val);

        return isEmail || isEmployeeNumber;
      },
      {
        message:
          'Debe ser un email válido o un número de empleado con formato EMP-XXX',
      },
    ),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const defaultLoginValues: LoginSchemaType = {
  identifier: '',
  password: '',
};
