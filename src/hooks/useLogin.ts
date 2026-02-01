import { useState } from "react";

export function useLogin() {
    const [isLogin, setIsLogin] = useState<boolean>(true)
    return {
        isLogin,
        setIsLogin
    }
}