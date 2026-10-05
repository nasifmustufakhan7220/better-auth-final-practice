"use client";
import { useSearchParams } from "next/navigation";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import {
  Button,
  Form,
  Label,
  TextField,
  InputGroup,
  toast,
} from "@heroui/react";
import { useState } from "react";
import { resetPassword } from "@/lib/auth-client";

const ResetPasswordForm = () => {
    const [isVisible, setIsVisible] = useState(false);
    const searchParams = useSearchParams();

    const token = searchParams.get('token');
    if(!token){
        toast.danger("It is not a valid token");
        return;
    }

    const handelResetPassword = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const userData = Object.fromEntries(formData.entries()) as Record<string, string>;

        const {data:resData, error} = await resetPassword({
            newPassword: userData.password,
            token: token
        });

        if(resData){
            toast.success("Password Reset Successfully!");
        }

        if (error) {
          console.log(error);
          throw new Error(`error is from login page ${error}`);
        }
    }
  return (
    <div>
      <Form className="flex w-96 flex-col gap-4" onSubmit={handelResetPassword}>

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

export default ResetPasswordForm;
