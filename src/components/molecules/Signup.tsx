import React, { useState } from "react";
import { styled } from "@stitches/react";
import { indigo, mauve, blackA, tomato } from "@radix-ui/colors";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "@/lib/axios_settings";
import Cookies from "js-cookie";
import { useSetRecoilState } from "recoil";
import { loginState } from "@/globalStates/atoms/Auth";
import styles from "@/styles/components/molecules/Signup.module.scss";

interface SignupFormInput {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  serialnumber: string;
  zipcode: string;
  ppcheck: boolean;
}

const StyledContent = styled(TabsPrimitive.Content, {
  flexGrow: 1,
  padding: 20,
  backgroundColor: "white",
  borderBottomLeftRadius: 6,
  borderBottomRightRadius: 6,
  outline: "none",
});

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
  all: "unset",
  backgroundColor: "white",
  width: 25,
  height: 25,
  borderRadius: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: `0 0 0 1px ${indigo.indigo7}`,
  "&:hover": { backgroundColor: indigo.indigo3 },
});

const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
  color: indigo.indigo11,
});

// Exports
export const TabsContent = StyledContent;
export const Checkbox = StyledCheckbox;
export const CheckboxIndicator = StyledIndicator;

const Flex = styled("div", { display: "flex" });

const Text = styled("div", {
  marginBottom: 20,
  color: mauve.mauve11,
  fontSize: 15,
  lineHeight: 1.5,
});

const Annotation = styled("p", {
  marginTop: 5,
  color: mauve.mauve11,
  fontSize: 12,
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

const FieldCheck = styled("fieldset", {
  all: "unset",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const CheckLink = styled("a", {
  color: indigo.indigo11,
  textDecoration: "underline",
  "&:visited": { color: indigo.indigo11 },
});

const ErrorMsg = styled("p", {
  color: tomato.tomato8,
  fontSize: 12,
  marginTop: 5,
});

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignupFormInput>();
  const [isChecked, setChecked] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string | null>();
  const setLoggedin = useSetRecoilState<boolean>(loginState);

  const signupOnSubmit: SubmitHandler<SignupFormInput> = (data) => {
    setErrMessage("");
    const sendData = {
      first_name: data.firstname,
      last_name: data.lastname,
      email: data.email,
      phone_number: data.phone,
      zip_code: data.zipcode,
      serial_number: data.serialnumber,
      password: data.password,
    };

    api
      .post("/signup", sendData)
      .then((res) => {
        const formData = new FormData();
        formData.append("username", data.email);
        formData.append("password", data.password);

        api
          .post("/login", formData)
          .then((res) => {
            Cookies.set("access_token", res.data.access_token, {
              sameSite: "lax",
            });
            setLoggedin(true);
          })
          .catch((error: any) => {
            setErrMessage(error.response.data.detail);
          });
      })
      .catch((error: any) => {
        if (error.response.status === 400) {
          setErrMessage(error.response.data.detail);
        } else if (error.response.status === 422) {
          setErrMessage(error.response.data.detail[0].msg);
        }
      });
  };

  const handleCheckClick = () => {
    isChecked ? setChecked(false) : setChecked(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit(signupOnSubmit)}>
        <TabsContent value="tab1">
          <Text>Please register your account:</Text>
          {errMessage ? (
            <ErrorMsg css={{ marginBottom: 10 }}>{errMessage}</ErrorMsg>
          ) : (
            ""
          )}
          <div className={styles.signup}>
            <div className={styles.signup__first}>
              <Fieldset>
                <Label htmlFor="firstname">First Name</Label>
                <Input
                  id="firstname"
                  placeholder="Yoshi"
                  {...register("firstname", {
                    required: "* This field is required",
                  })}
                />
                <ErrorMsg>{errors.firstname?.message}</ErrorMsg>
              </Fieldset>
              <Fieldset>
                <Label htmlFor="lastname">Last Name</Label>
                <Input
                  id="lastname"
                  placeholder="Kimura"
                  {...register("lastname", {
                    required: "* This field is required",
                  })}
                />
                <ErrorMsg>{errors.lastname?.message}</ErrorMsg>
              </Fieldset>
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
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  {...register("phone", {
                    required: "* This field is required",
                  })}
                />
                <Annotation>※ Please include hyphens</Annotation>
                <ErrorMsg>{errors.phone?.message}</ErrorMsg>
              </Fieldset>
            </div>
            <div className={styles.signup__second}>
              <Fieldset>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "* This field is required",
                  })}
                />
                <ErrorMsg>{errors.password?.message}</ErrorMsg>
              </Fieldset>
              <Fieldset>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword", {
                    required: "* This field is required",
                    validate: (value) => {
                      return (
                        value === getValues("password") ||
                        "* Fields do not match"
                      );
                    },
                  })}
                />
                <ErrorMsg>{errors.confirmPassword?.message}</ErrorMsg>
              </Fieldset>
              <Fieldset>
                <Label htmlFor="serialnumber">Serial Number</Label>
                <Input
                  id="serialnumber"
                  {...register("serialnumber", {
                    required: "* This field is required",
                  })}
                />
                <Annotation>
                  ※ Please enter the device serial number
                </Annotation>
                <ErrorMsg>{errors.serialnumber?.message}</ErrorMsg>
              </Fieldset>
              <Fieldset>
                <Label htmlFor="zipcode">Zip Code</Label>
                <Input
                  id="zipcode"
                  {...register("zipcode", {
                    required: "* This field is required",
                  })}
                />
                <Annotation>
                  ※ Please enter the device zip code without hyphens
                  <br />
                </Annotation>
                <ErrorMsg>{errors.zipcode?.message}</ErrorMsg>
              </Fieldset>
            </div>
          </div>
          <FieldCheck>
            <Checkbox id="ppcheck" onChange={() => handleCheckClick}>
              <CheckboxIndicator>
                <CheckIcon />
              </CheckboxIndicator>
            </Checkbox>
            <Label css={{ paddingLeft: 15, marginBottom: 0 }} htmlFor="ppcheck">
              Accept <CheckLink href="/privacy">privacy policy</CheckLink>.
            </Label>
          </FieldCheck>
          <ErrorMsg>{errors.ppcheck?.message}</ErrorMsg>
          <Flex css={{ marginTop: 20, justifyContent: "center" }}>
            <Button variant="indigo">Sign Up</Button>
          </Flex>
        </TabsContent>
      </form>
    </>
  );
}
