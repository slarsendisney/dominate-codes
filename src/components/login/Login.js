import React from "react"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import firebase from "gatsby-plugin-firebase"
import { isBrowser } from "../../context/auth-context"
import {
  uniqueNamesGenerator,
  animals,
  adjectives,
} from "unique-names-generator"

import Header from "../Header"
const randomName = () =>
  uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
  })

const Login = ({ setUser }) => {
  function getUiConfig(auth) {
    if (auth) {
      return {
        signInFlow: "popup",
        signInOptions: [auth.GoogleAuthProvider.PROVIDER_ID],
        // signInSuccessUrl: '/app/profile',
        callbacks: {
          signInSuccessWithAuthResult: result => {
            setUser(result.user)
          },
        },
      }
    }
  }

  return (
    <div>
      <Header />
      <div className="border-b mb-4 pb-1 ">
        {firebase && (
          <StyledFirebaseAuth
            uiConfig={getUiConfig(firebase.auth)}
            firebaseAuth={isBrowser() ? firebase.auth() : false}
          />
        )}
      </div>
      <div className="h-4 -mt-7 mb-5 text-center">
        <p className="bg-white inline-block px-2 text-xs">OR</p>
      </div>
      <button
        className="primary-btn w-full rounded"
        onClick={() =>
          setUser({ guest: true, email: "na", name: randomName() })
        }
      >
        Login as Guest
      </button>
    </div>
  )
}
export default Login
