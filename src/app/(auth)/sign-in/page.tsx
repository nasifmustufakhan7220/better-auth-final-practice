"use client";
import { signIn } from "@/lib/auth-client";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  InputGroup,
  toast,
} from "@heroui/react";
import { useState } from "react";

const SignInPage = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handelSignIn = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const userData = Object.fromEntries(formData.entries()) as Record<string, string>;

        const {data:resData, error} = await signIn.email({
            email: userData.email,
            password: userData.password,
            callbackURL: '/'
        });

        if(resData){
            console.log(resData);
            toast.success("Login Successfully!");
        }

        if(error){
            console.log(error);
            throw new Error(`error is from login page ${error}`);
        }
    }
  return (
    <div>
      <Form className="flex w-96 flex-col gap-4" onSubmit={handelSignIn}>
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

        <TextField className="w-full max-w-70" name="password">
          <Label>Password</Label>
          <InputGroup>
            <InputGroup.Input
              className="w-full max-w-70"
              type={isVisible ? "text" : "password"}
            />
            <InputGroup.Suffix className="pe-0">
              <Button
                isIconOnly
                aria-label={isVisible ? "Hide password" : "Show password"}
                size="sm"
                variant="ghost"
                onPress={() => setIsVisible(!isVisible)}
              >
                {isVisible ? (
                  <Eye className="size-4" />
                ) : (
                  <EyeSlash className="size-4" />
                )}
              </Button>
            </InputGroup.Suffix>
          </InputGroup>
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

export default SignInPage;
