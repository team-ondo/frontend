import React, { useState } from "react";
import { styled } from "@stitches/react";
import { indigo, mauve, tomato } from "@radix-ui/colors";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "@/lib/axios_settings";
import Cookies from "js-cookie";
import { useSetRecoilState } from "recoil";
import { loginState } from "@/globalStates/atoms/Auth";
import styles from "@/styles/components/molecules/Login.module.scss";

interface LoginFormInput {
  email: string;
  loginPassword: string;
}

const StyledContent = styled(TabsPrimitive.Content, {
  flexGrow: 1,
  padding: 20,
  backgroundColor: "white",
  borderBottomLeftRadius: 6,
  borderBottomRightRadius: 6,
  outline: "none",
});

// Exports
export const TabsContent = StyledContent;

const Flex = styled("div", { display: "flex" });

const Text = styled("div", {
  marginBottom: 20,
  color: mauve.mauve11,
  fontSize: 15,
  lineHeight: 1.5,
});

const Button = styled("button", {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 15px",
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 35,

  variants: {
    variant: {
      indigo: {
        backgroundColor: indigo.indigo4,
        color: indigo.indigo11,
        "&:hover": { backgroundColor: indigo.indigo5 },
        "&:focus": { boxShadow: `0 0 0 2px ${indigo.indigo7}` },
      },
    },
  },

  defaultVariants: {
    variant: "indigo",
  },
});
const Fieldset = styled("fieldset", {
  all: "unset",
  marginBottom: 15,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
});

const Label = styled("label", {
  fontSize: 13,
  lineHeight: 1,
  marginBottom: 10,
  color: indigo.indigo12,
  display: "block",
});

const Input = styled("input", {
  all: "unset",
  flex: "1 0 auto",
  borderRadius: 4,
  padding: "0 10px",
  fontSize: 15,
  lineHeight: 1,
  color: indigo.indigo11,
  boxShadow: `0 0 0 1px ${indigo.indigo7}`,
  height: 35,
  "&:focus": { boxShadow: `0 0 0 2px ${indigo.indigo8}` },
  "&::placeholder": { color: mauve.mauve7 },
});

const ErrorMsg = styled("p", {
  color: tomato.tomato8,
  fontSize: 12,
  marginTop: 5,
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>();
  const [errMessage, setErrMessage] = useState<string | null>();
  const setLoggedin = useSetRecoilState<boolean>(loginState);
  const onSubmit: SubmitHandler<LoginFormInput> = (data) => {
    setErrMessage("");

    const formData = new FormData();
    formData.append("username", data.email);
    formData.append("password", data.loginPassword);

    api
      .post("/login", formData)
      .then((res) => {
        Cookies.set("access_token", res.data.access_token, {
          sameSite: "lax",
        });
        setLoggedin(true);
      })
      .catch((error: any) => {
        if (error.response.data) {
          setErrMessage(error.response.data.detail);
        }
      });
  };

  return (
    <>
      {/* Sign In */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TabsContent value="tab2">
          <Text>If you already have account, please sign in here.</Text>
          {errMessage ? (
            <ErrorMsg css={{ marginBottom: 10 }}>{errMessage}</ErrorMsg>
          ) : (
            ""
          )}
          <div className={styles.login}>
          <Fieldset>
            <Label htmlFor="email">Email</Label>
            <Input
              type="mail"
              id="email"
              placeholder="sample@example.com"
              {...register("email", {
                required: "* This field is required",
                pattern: {
                  value: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
                  message: "* Invalid email address",
                },
              })}
            />
            <ErrorMsg>{errors.email?.message}</ErrorMsg>
          </Fieldset>
          <Fieldset>
            <Label htmlFor="loginPassword">Password</Label>
            <Input
              id="loginPassword"
              type="password"
              {...register("loginPassword", {
                required: "* This field is required",
              })}
            />
            <ErrorMsg>{errors.loginPassword?.message}</ErrorMsg>
          </Fieldset>
          </div>
          <Flex css={{ marginTop: 20, justifyContent: "center" }}>
            <Button css={{ cursor: "pointer" }} variant="indigo">
              Sign In
            </Button>
          </Flex>
        </TabsContent>
      </form>
    </>
  );
}
