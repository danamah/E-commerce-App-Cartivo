import * as z from "zod"

export const registerSchema = z.object({
    name: z.string().nonempty("name is required").min(2, "name should be at least 2 characters").max(15, "name should not exceed 15 characters"),
    email: z.email({ error: "email is requerid" }).nonempty("email is required"),
    password: z.string().nonempty("password is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
    rePassword: z.string().nonempty("Re-password is required"),
    phone: z.string().nonempty("phone is required").regex(/^01[0125][0-9]{8}$/, "phone number must be egyptian")
}).refine((object) => object.password == object.rePassword,
    {
        path: ["rePassword"],
        error: "rePassword and password must match"
    }
)

export type registerSchemaType = z.infer<typeof registerSchema>

export const logInSchema = z.object({
    email: z.email({ error: "email is requerid" }).nonempty("email is required"),
    password: z.string().nonempty("password is required")
})

export type logInSchemaType = z.infer<typeof logInSchema>

// Forgot Password (email only)
export const forgotPasswordSchema = z.object({
    email: z.email("invaild mail ").nonempty("required"),
});

export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;

// Verify Reset Code
export const verifyResetCodeSchema = z.object({
    email: z.email("invaild mail"),
    resetCode: z.string().length(6, "Code must be 6 digit ").regex(/^\d{6}$/, "Code must be only number "),
});

export type VerifyResetCodeType = z.infer<typeof verifyResetCodeSchema>;

// Reset Password
export const resetPasswordSchema = z
    .object({
        newPassword: z
            .string()
            .nonempty("NewPassword is Required")
            .regex(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
            ),
        confirmPassword: z.string().nonempty("Required"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords must match",
    });
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;

// Update User Data Schema
export const updateUserDataSchema = z.object({
  name: z.string().min(2, " name must be at least 2 character").max(50, "name must not exceed 50 character "),
  email: z.email("Non valid email ").nonempty("Email is required"),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, "Plase enter a valid egyptian number"),
});

export type UpdateUserDataType = z.infer<typeof updateUserDataSchema>;

// Change Password Schema
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().nonempty("Current Password is Required "),
    password: z
      .string()
      .nonempty("New Password is Requried")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character "
      ),
    rePassword: z.string().nonempty("rePassword is required"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "rePassword and password must match",
  });

export type ChangePasswordType = z.infer<typeof changePasswordSchema>;