import { useRouter } from "next/router";
import Link from "next/link";
import useAuth from "../hooks/useAuth";

export default function DashboardPage() {
  const { loggedIn, setAuthToken } = useAuth();
  const router = useRouter();

  const handleLogoutClick = () => {
    setAuthToken(false);
    router.push("/login");
  };

  return (
    <div>
      {(!loggedIn && (
        <div>
          Please <Link href="/login">login</Link> first
        </div>
      )) || (
        <div>
          Dashboard <span onClick={handleLogoutClick}>Logout</span>
        </div>
      )}
    </div>
  );
}
