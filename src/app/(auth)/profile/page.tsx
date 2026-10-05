"use client";
import { changePassword, updateUser } from "@/lib/auth-client";
import { Eye, EyeSlash, FloppyDisk } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
  toast,
  InputGroup,
} from "@heroui/react";
import { useState } from "react";

const ProfilePage = () => {
    const [isVisible, setIsVisible] = useState(false);
  const handelUpdateUserProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries()) as Record<string,string>;

    if(userData.name.length >0){
        const { data: resData, error } = await updateUser({
          name: userData.name,
        });
        if (resData) {
          toast.success("Updated successfully!");
          console.log(resData);
        }

        if (error) {
          console.log(error);
          throw new Error(`error is from profile ${error}`);
        }
    }


    if(userData.newPassword.length > 0 || userData.currentPassword.length > 0){
        const {data:resPass, error} = await changePassword({
      newPassword: userData.newPassword,
      currentPassword: userData.currentPassword,
      revokeOtherSessions: true
    });

    if (resPass) {
      toast.success("Updated successfully!");
      console.log(resPass);
    }

    if (error) {
      console.log(error);
      throw new Error(`error is from profile ${error}`);
    }
    }
  };
  return (
    <div>
      <Form className="w-full max-w-96" onSubmit={handelUpdateUserProfile}>
        <Fieldset>
          <Fieldset.Legend>Profile Settings</Fieldset.Legend>
          <Description>Update your profile information.</Description>
          <FieldGroup>
            <TextField
              name="name"
            >
              <Label>Name</Label>
              <Input placeholder="John Doe" />
              <FieldError />
            </TextField>

            <TextField className="w-full max-w-70" name="currentPassword">
              <Label>Current Password</Label>
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
            <TextField className="w-full max-w-70" name="newPassword">
              <Label>New Password</Label>
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

          </FieldGroup>
          <Fieldset.Actions>
            <Button type="submit">
              <FloppyDisk />
              Save changes
            </Button>
            <Button type="reset" variant="secondary">
              Cancel
            </Button>
          </Fieldset.Actions>
        </Fieldset>
      </Form>
    </div>
  );
};

export default ProfilePage;
