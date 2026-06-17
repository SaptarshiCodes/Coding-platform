import './App.css'
import { Show, SignInButton, SignOutButton, SignUpButton, UserButton } from '@clerk/react'

function App() {
  return (
    <>
      <header>
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button>Sign in</button>
          </SignInButton>
        </Show>
        <Show when="signed-in">
          <SignOutButton/>
          <UserButton />
        </Show>
      </header>
    </>
  )
}

export default App