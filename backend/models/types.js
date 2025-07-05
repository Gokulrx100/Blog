const {z}=require("zod");

const signUpSchema= z.object({
    name:z.string(),
    gmail: z.string().email("Please enter a valid Gmail address"),
    username:z.string()
    .min(6,"username must be atleast 6 characters")
    .max(20,"username can have a max of 20 characters"),
    password:z.string()
    .min(8,"password must atleast have 8 characters ")
    .max(20,"password can have a max of 20 characters")
    .regex(/[A-Z]/,"password must contain atleast one captial letter")
    .regex(/[a-z]/,"password must contain atleast one small letter")
    .regex(/[0-9]/,"password must atleast contain one digit")
    .regex(/[^A-Za-z0-9]/,"password must atleast have one special character"),
})

const signInSchema=z.object({
     username:z.string()
    .min(6,"username must be atleast 6 characters")
    .max(20,"username can have a max of 20 characters"),
    password:z.string()
    .min(8,"password must atleast have 8 characters ")
    .max(20,"password can have a max of 20 characters")
})

const blogZodSchema=z.object({
    title:z.string()
    .min(1,"Please type something"),
    snippet:z.string()
    .min(1,"Please type something"),
    content:z.string()
    .min(1,"Please type something")
})

module.exports={
    signInSchema,
    signUpSchema,
    blogZodSchema
}