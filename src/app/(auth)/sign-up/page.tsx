"use client";
import { signIn, signUp } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  toast,
} from "@heroui/react";

const SignUpPage = () => {
    const handelsignUp = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const userData = Object.fromEntries(formData.entries()) as Record<string, string>;

        const {data:resData, error} = await signUp.email({
          name: userData.name,
          email: userData.email,
          password: userData.password,
        });

        if(resData){
            toast.success("Sign up successfully!");
            console.log(resData);
        }
        
        if (error) {
          console.log(error);
          throw new Error(`error is from login page ${error}`);
        }

    }

    const handelSignInWithGithub = async()=>{
        const {data: resData, error} = await signIn.social({
            provider:"github"
        });

        if (resData) {
          toast.success("Sign in with github successfully!");
          console.log(resData);
        }

        if (error) {
          console.log(error);
          throw new Error(`error is from login page ${error}`);
        }
    }


    const handelSignInWithGoggle = async()=>{
        const {data:resData, error} = await signIn.social({
            provider: "google"
        });
         if (resData) {
           toast.success("Sign in with github successfully!");
           console.log(resData);
         }

         if (error) {
           console.log(error);
           throw new Error(`error is from login page ${error}`);
         }
    }
  return (
    <div>
      <Form className="flex w-96 flex-col gap-4" onSubmit={handelsignUp}>
        <TextField
          isRequired
          name="name"
          validate={(value) => {
            if (value.length < 3) {
              return "Name must be at least 3 characters";
            }
            return null;
          }}
        >
          <Label>Name</Label>
          <Input placeholder="John Doe" />
          <FieldError />
        </TextField>
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
        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }
            return null;
          }}
        >
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
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


      <div className="flex items-center gap-3 mt-6">
        <p>OR</p>
        <Button onClick={()=>handelSignInWithGithub()}>Sign In with Github</Button>
        <Button onClick={()=>handelSignInWithGoggle()}>Sign In with Goggle</Button>
      </div>
    </div>
  );
};

export default SignUpPage;
