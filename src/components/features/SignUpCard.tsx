import { useLoginCtx } from "@/contexts/LoginContext";
import { Button } from "../ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { HiEye, HiEyeOff } from "react-icons/hi"
import { useHandleSignUp } from "@/hooks/useHandleSignUp";

export default function SignUpCard() {

    const { setIsLogin } = useLoginCtx()
    const { show, setShow, email, setEmail, password, setPassword, success, setSuccess, handleSubmit } = useHandleSignUp()

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Fill the details and click "Sign up" to register</CardDescription>
                <CardAction>
                    <Button
                        variant={"link"}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <form id="signUpForm" onSubmit={(e) => {
                    handleSubmit(e)
                    if (success) {
                        setIsLogin(true)
                        setSuccess(false)
                    }
                }}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                placeholder="abc@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="flex flex-row relative items-center">
                                <Input
                                    className="pr-10"
                                    type={show ? "text" : "password"}
                                    id="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className="absolute right-2 items-center justify-center">
                                    {(password.length > 0) && (
                                        show ? (
                                            <Button
                                                type="button"
                                                className="rounded-full h-8 w-8"
                                                variant={"ghost"}
                                                onClick={() => setShow(false)}
                                            >
                                                <HiEye />
                                            </Button>
                                        ) : (
                                            <Button
                                                type="button"
                                                className="rounded-full h-8 w-8"
                                                variant={"ghost"}
                                                onClick={() => setShow(true)}
                                            >
                                                <HiEyeOff />
                                            </Button>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <div className="flex flex-col w-full gap-2">
                    <Button
                        type="submit"
                        form="signUpForm"
                        className="w-full"
                    >
                        Sign up
                    </Button>
                    <Button
                        variant={"link"}
                        onClick={() => setIsLogin(true)}
                    >
                        Already have an account?
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}