import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";

export default function useAuthCheck() {
	const [authCheckd, setAuthChecked] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		const localAuth = localStorage?.getItem("auth");

		if (localAuth) {
			const auth = JSON.parse(localAuth);
			if (auth?.accessToken && auth?.user) {
				dispatch(
					userLoggedIn({
						accessToken: auth.accessToken,
						user: auth.user,
					})
				);
			}
		}

		setAuthChecked(true);
	}, [dispatch]);

	return authCheckd;
}