import ProfileButton from "@/components/button/ProfileButton"
import SigninButton from "@/components/button/SigninButton"
import SignoutButton from "@/components/button/SignoutButton"
import SignupButton from "@/components/button/SignupButton"




export default async function Home() {


  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-5 p-24">
      <h1>this is a start app</h1>
      <div className="flex flex-col justify-center items-start space-x-5 space-y-5">
        <div className="flex justify-center items-start space-x-5">

          <ProfileButton/>
          <SigninButton/>
          <SignupButton/>
          <SignoutButton/>
        </div>
      </div>
    </main>
  )
}
