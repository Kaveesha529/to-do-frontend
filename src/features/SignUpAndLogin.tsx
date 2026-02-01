import LoginCard from "@/components/features/LoginCard";
import SignUpCard from "@/components/features/SignupCard";
import { useLoginCtx } from "@/contexts/LoginContext";

export default function signUpSignUpAndLogin() {

    const { isLogin } = useLoginCtx()

    return (
        <>
            {isLogin ? (
                <div className="flex flex-row w-full h-screen">
                    <div className="flex flex-1 items-center justify-center">
                        <div className="w-1/2">
                            <LoginCard />
                        </div>
                    </div>
                    <div className="flex flex-1 bg-green-300"></div>
                </div>
            ) :
                (
                    <div className="flex flex-row w-full h-screen">
                        <div className="flex flex-1 bg-green-300"></div>
                        <div className="flex flex-1 items-center justify-center">
                            <div className="w-1/2">
                                <SignUpCard />
                            </div>
                        </div>
                    </div>
                )}
        </>
    )
}