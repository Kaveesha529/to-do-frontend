import { LoginProvider } from "@/contexts/LoginContext";
import SignUpAndLogin from "@/features/SignUpAndLogin";

export default function SignUpAndLoginPage() {
    return (
        <LoginProvider>
            <SignUpAndLogin />
        </LoginProvider>
    )
}