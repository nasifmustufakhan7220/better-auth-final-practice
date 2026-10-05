"use client";
import { requestPasswordReset } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  toast,
} from "@heroui/react";

const ForgotPassword = () => {
    const handelForgotPass = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries()) as Record<string, string>;

        const {data:resData, error} = await requestPasswordReset({
          email: userData.email,
          redirectTo: "/reset-password",
        });

        if(resData){
            console.log(resData);
            toast.success("A link is sent to your email address!");
        }

        if(error){
            console.log(error);
            throw new Error(`Error is happend inside the forgot passworde ${error}`);
        }


    }
  return (
    <div>
      <Form className="flex w-96 flex-col gap-4" onSubmit={handelForgotPass}>
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <div className="flex gap-2">
          <Button type="submit">
            <Check />
            Submit
          </Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ForgotPassword;
